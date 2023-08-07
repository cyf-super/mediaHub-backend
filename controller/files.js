const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { fileRequestFailInfo, noExistFileInfo, deleteFileSucceedInfo, deleteFileFailInfo } = require('../model/ErrorInfo')
const { getFilesServer, deleteFilesServer } = require('../services/files')

async function getFilesController({ categoryId }) {
  const res = await getFilesServer({ categoryId })
  if (!res) {
    return new ErrorModel(fileRequestFailInfo)
  }

  return new SuccessModel(res)
}

async function deleteFilesController(fileIds) {
  const res = await deleteFilesServer(fileIds)
  if (res === 0) {
    return new ErrorModel(noExistFileInfo)
  }
  if (res > 0) {
    return new SuccessModel({ count: res, ...deleteFileSucceedInfo })
  }
  return new ErrorModel(deleteFileFailInfo)
}

module.exports = {
  getFilesController,
  deleteFilesController
}