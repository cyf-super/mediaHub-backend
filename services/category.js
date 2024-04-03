const FileCategory = require('../db/model/FileCategory')

async function hasExistCategory(name) {
  const res = await FileCategory.findOne({
    where: {
      name,
    },
  })

  return !!res
}

async function hasExistCategoryById(categoryId) {
  const res = await FileCategory.findOne({
    where: {
      categoryId,
    },
  })

  return !!res
}

/**
 * 获取所有的类别
 * @returns
 */
async function getAllCategory() {
  const data = await FileCategory.findAndCountAll()
  if (!data) return data

  const res = data.rows.map((category) => category.dataValues)
  return {
    count: data.count,
    categories: res,
  }
}

/**
 * 创建类别
 * @param {*} param0
 * @returns
 */
async function createCategory({ name, categoryId }) {
  const res = await FileCategory.create({
    name,
    categoryId,
  })
  const data = res.dataValues
  return data
}

/**
 * 更新名称
 * @param {*} categoryId
 * @param {*} name
 * @returns
 */
async function updateCategory(categoryId, name) {
  try {
    const res = await FileCategory.update(
      {
        name,
      },
      {
        where: {
          categoryId,
        },
      }
    )
    return res.length
  } catch (error) {
    return error
  }
}

/**
 * deleteCategory
 */
async function deleteCategory(categoryId) {
  const res = await FileCategory.destroy({
    where: {
      categoryId,
    },
  })

  return res
}

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  hasExistCategory,
  hasExistCategoryById,
}
