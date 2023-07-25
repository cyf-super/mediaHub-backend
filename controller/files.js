const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { fileRequestFailInfo, uploadFailInfo, uploadSuccessInfo } = require('../model/ErrorInfo')
const { getFilesServer } = require('../services/files')

async function getFilesController({ categoryId }) {
  const res = await getFilesServer({ categoryId })
  if (!res) {
    return new ErrorModel(fileRequestFailInfo)
  }

  return new SuccessModel(res)
}

module.exports = {
  getFilesController
}