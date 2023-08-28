const path = require('path')
const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { fileSizeExceedInfo, uploadFailInfo, uploadSuccessInfo } = require('../model/ErrorInfo')
const { createFile } = require('../services/upload')
const m3u8 = require('../utils/transform')

const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

const MIX_SIZE = 1024 * 1024 * 204.8

async function saveFile({ name, fileId, categoryId, file }) {
  const { size, mimetype } = file
  console.log("🚀 ~ saveFile ~ mimetype:", mimetype)
  if (size > MIX_SIZE) {
    return new ErrorModel(fileSizeExceedInfo)
  }

  const fileDir = path.join(DIST_FOLDER_PATH, mimetype.split('/')[0])
  const isExists = await fse.pathExists(fileDir)
  if (!isExists) fse.ensureDir(fileDir)

  try {
    const fileName = Date.now() + '.' + name
    let filePath = path.join(fileDir, fileName)
    await fse.writeFile(filePath, file.buffer)

    filePath = ('\\' + path.relative(path.join(process.cwd(), 'uploadFiles'), filePath)).replace(/\\/g, '/')

    filePath = await m3u8(filePath)

    const res = await createFile({ filePath, fileName, fileId, categoryId, file })
    if (res) {
      return new SuccessModel(uploadSuccessInfo)
    }
  } catch (err) {
    console.log("🚀 ~ saveFile ~ err:", err)
    return new ErrorModel({ ...uploadFailInfo, file })
  }
}

module.exports = {
  saveFile
}