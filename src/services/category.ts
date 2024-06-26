import { FileCategoryType } from './../routes/category';
import FileCategory from '../db/model/FileCategory';
import File from '../db/model/File';

export async function hasExistCategory(name: string) {
  const res = await FileCategory.findOne({
    where: {
      name
    }
  });

  return !!res;
}

export async function hasExistCategoryById(categoryId: string) {
  const res = await FileCategory.findOne({
    where: {
      categoryId
    }
  });

  return !!res;
}

/**
 * 获取所有的类别
 * @returns
 */
export async function getAllCategory() {
  const data = await FileCategory.findAndCountAll({
    order: [['order', 'ASC']]
  });
  if (!data) return data;

  const res = data.rows.map((category: any) => category.dataValues);
  return {
    count: data.count,
    categories: res
  };
}

/**
 * 创建类别
 * @param {*} param0
 * @returns
 */
export async function createCategory({ name, categoryId }: FileCategoryType) {
  const res = await FileCategory.create({
    name,
    categoryId
  });
  const data = res.dataValues;
  return data;
}

/**
 * 更新名称
 * @param {*} categoryId
 * @param {*} name
 * @returns
 */
export async function updateCategory(categoryId: string, name: string) {
  try {
    const res = await FileCategory.update(
      {
        name
      },
      {
        where: {
          categoryId
        }
      }
    );
    return res.length;
  } catch (error) {
    return error;
  }
}

/**
 * deleteCategory
 */
export async function deleteCategory(categoryId: string) {
  const res = await FileCategory.destroy({
    where: {
      categoryId
    }
  });

  return res;
}

export async function isExistFiles(categoryId: string) {
  const res = await File.findOne({
    where: {
      categoryId
    }
  });

  return !!res;
}

export async function swapCategoryContService(categoryIds: string[]) {
  const categories = await FileCategory.findAll({
    where: {
      categoryId: categoryIds
    },
    order: [['categoryId', 'ASC']]
  });

  for (let i = 0; i < categories.length; i++) {
    const index = categoryIds.findIndex(
      categoryId => categoryId === categories[i].dataValues.categoryId
    );
    if (index > -1) {
      await categories[i].update({
        order: index
      });
    }
  }
}
