const FileCategory = require('../db/model/FileCategory')

async function hasExistCategory(name) {
  const res = await FileCategory.findOne({
    where: {
      name
    }
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

  const res = data.rows.map(category => category.dataValues)
  return {
    count: data.count,
    categories: res
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
    categoryId
  })
  const data = res.dataValues
  return data
}

module.exports = {
  getAllCategory,
  createCategory,
  hasExistCategory
}