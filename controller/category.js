const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { categoryExistInfo } = require('../model/ErrorInfo')
const { getAllCategory, createCategory, hasExistCategory } = require('../services/category')
const { getUuid } = require('../utils/tools')

/**
 * 获取所有的类别
 */
async function categoryCont() {
  const data = await getAllCategory()
  return new SuccessModel(data)
}

async function createCategoryCont(name) {
  const hasExist = await hasExistCategory(name)
  if (hasExist) {
    return new ErrorModel(categoryExistInfo)
  }

  const options = { name, categoryId: getUuid() }
  const data = await createCategory(options)
  return new SuccessModel(data)
}

module.exports = {
  categoryCont,
  createCategoryCont
}
