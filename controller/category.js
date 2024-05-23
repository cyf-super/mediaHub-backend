const { ErrorModel, SuccessModel } = require('../model/ResModel')
const {
  categoryExistInfo,
  categoryExistInfo2,
  deleteCuccessInfo,
  deleteFailInfo,
  handleFailInfo,
} = require('../model/ErrorInfo')
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  hasExistCategory,
  hasExistCategoryById,
  isExistFiles,
  swapCategoryContService,
} = require('../services/category')
const { getUuid } = require('../utils/tools')

/**
 * 获取所有的类别
 */
async function categoryCont() {
  const data = await getAllCategory()
  return new SuccessModel(data)
}

/**
 * 创建分类
 * @param {*} name
 * @returns
 */
async function createCategoryCont(name) {
  const hasExist = await hasExistCategory(name)
  if (hasExist) {
    return new ErrorModel(categoryExistInfo)
  }

  const options = { name, categoryId: getUuid() }
  const data = await createCategory(options)
  return new SuccessModel(data)
}

/**
 * 更新名称
 * @param {*} categoryId
 * @param {*} name
 * @returns
 */
async function updateCategoryCont(categoryId, name) {
  const hasExist = await hasExistCategoryById(categoryId)
  if (!hasExist) {
    return new ErrorModel(categoryExistInfo2)
  }

  const data = await updateCategory(categoryId, name)
  return new SuccessModel(data)
}

/**
 * 删除分类
 * @param {*} categoryId
 * @returns
 */
async function deleteCategoryCont(categoryId) {
  try {
    const hasExist = await hasExistCategoryById(categoryId)
    if (!hasExist) {
      return new ErrorModel(categoryExistInfo2)
    }

    const hasFiles = await isExistFiles(categoryId)
    if (hasFiles) {
      return new ErrorModel(categoryExistInfo2)
    }

    await deleteCategory(categoryId)
    return new SuccessModel(deleteCuccessInfo)
  } catch (error) {
    return new SuccessModel(deleteFailInfo)
  }
}

async function swapCategoryCont(categoryIds) {
  console.log('categoryIds ', categoryIds)
  try {
    await swapCategoryContService(categoryIds)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(handleFailInfo)
  }
}

module.exports = {
  categoryCont,
  createCategoryCont,
  updateCategoryCont,
  deleteCategoryCont,
  swapCategoryCont,
}
