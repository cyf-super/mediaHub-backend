const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const {
  fileRequestFailInfo,
  noExistFileInfo,
  deleteFileSucceedInfo,
  deleteFileFailInfo,
  updateFileFailInfo,
  updateFileSuccessInfo,
  updateFileFailInfo1,
} = require('../model/ErrorInfo')
const {
  getFileServer,
  getFilesServer,
  deleteFilesServer,
  updateFileServer,
} = require('../services/files')
const {
  getFileNameSuffix,
  getUploadFilesDir,
  getFileType,
} = require('../utils/tools')

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
 * 获取文件
 * @param {*} param0
 * @returns
 */
async function getFilesController(options) {
  const res = await getFilesServer(options)
  if (!res) {
    return new ErrorModel(fileRequestFailInfo)
  }

  return new SuccessModel(res)
}

/**
 * 删除文件
 * @param {*} fileIds []
 * @returns
 */
async function deleteFilesController(fileIds, fileNames) {
  const res = await deleteFilesServer(fileIds)
  if (res === 0) {
    return new ErrorModel(noExistFileInfo)
  }
  if (res > 0) {
    try {
      fileNames.forEach(async (name) => {
        const [fileName, suffix] = getFileNameSuffix(name)
        const type = getFileType(suffix)
        const ffmpegDir = getUploadFilesDir('ffmpeg/' + fileName)
        const filePath = getUploadFilesDir(type + '/' + name)
        removeFile(ffmpegDir)
        removeFile(filePath)
      })
    } catch (error) {
      console.log('删除本地文件失败 ', error)
    }

    return new SuccessModel({ count: res, ...deleteFileSucceedInfo })
  }
  return new ErrorModel(deleteFileFailInfo)
}

async function updateFileController({ fileId, name }) {
  if (name === '') {
    return new ErrorModel(updateFileFailInfo1)
  }

  const res = await updateFileServer({ fileId, name })
  if (res) {
    return new SuccessModel(updateFileSuccessInfo)
  }
  return new ErrorModel(updateFileFailInfo)
}

module.exports = {
  getFileController,
  getFilesController,
  deleteFilesController,
  updateFileController,
}

async function removeFile(path) {
  try {
    const exist = await fse.pathExists(path)
    if (exist) {
      await fse.remove(path)
    }
  } catch (error) {
    console.log('error--> ', error)
  }
}
