const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { fileRequestFailInfo, noExistFileInfo, deleteFileSucceedInfo, deleteFileFailInfo } = require('../model/ErrorInfo')
const { getFileServer, getFilesServer, deleteFilesServer } = require('../services/files')


/**
 * 获取单个文件
 * @param {*} fileId 
 */
async function getFileController(fileId) {
  const res = await getFileServer(fileId)
  if (!res) {
    return new ErrorModel(noExistFileInfo)
  }

  return new SuccessModel(res)
}


/**
 * 根据类别id获取文件
 * @param {*} param0 
 * @returns 
 */
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
  getFileController,
  getFilesController,
  deleteFilesController
}