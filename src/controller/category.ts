import { ErrorModel, SuccessModel } from '../model/ResModel';
import Info from '../model/ErrorInfo';
import {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  hasExistCategory,
  hasExistCategoryById,
  isExistFiles,
  swapCategoryContService
} from '../services/category';
import { getUuid } from '../utils/tools';

const {
  categoryExistInfo,
  categoryExistInfo2,
  deleteCuccessInfo,
  deleteFailInfo,
  handleFailInfo
} = Info;
/**
 * 获取所有的类别
 */
export async function categoryCont() {
  const data = await getAllCategory();
  return new SuccessModel({ data });
}

/**
 * 创建分类
 * @param {*} name
 * @returns
 */
export async function createCategoryCont(name: string) {
  const hasExist = await hasExistCategory(name);
  if (hasExist) {
    return new ErrorModel(categoryExistInfo);
  }

  const options = { name, categoryId: getUuid() };
  const data = await createCategory(options);
  return new SuccessModel(data);
}

/**
 * 更新名称
 * @param {*} categoryId
 * @param {*} name
 * @returns
 */
export async function updateCategoryCont(categoryId: string, name: string) {
  const hasExist = await hasExistCategoryById(categoryId);
  if (!hasExist) {
    return new ErrorModel(categoryExistInfo2);
  }

  const data = await updateCategory(categoryId, name);
  return new SuccessModel(data);
}

/**
 * 删除分类
 * @param {*} categoryId
 * @returns
 */
export async function deleteCategoryCont(categoryId: string) {
  try {
    const hasExist = await hasExistCategoryById(categoryId);
    if (!hasExist) {
      return new ErrorModel(categoryExistInfo2);
    }

    const hasFiles = await isExistFiles(categoryId);
    if (hasFiles) {
      return new ErrorModel(categoryExistInfo2);
    }

    await deleteCategory(categoryId);
    return new SuccessModel(deleteCuccessInfo);
  } catch (error) {
    return new SuccessModel(deleteFailInfo);
  }
}

export async function swapCategoryCont(categoryIds: string[]) {
  console.log('categoryIds ', categoryIds);
  try {
    await swapCategoryContService(categoryIds);
    return new SuccessModel({});
  } catch (error) {
    return new ErrorModel(handleFailInfo);
  }
}
