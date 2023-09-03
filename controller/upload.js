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

async function saveFile({ name, fileId, categoryId, files }) {
  const file = files.file[0]
  const { size, mimetype } = file
  if (size > MIX_SIZE) {
    return new ErrorModel(fileSizeExceedInfo)
  }

  const fileDir = await ensureFileDir(DIST_FOLDER_PATH, mimetype)

  try {
    const fileName = Date.now() + '.' + name
    let filePath = path.join(fileDir, fileName)
    await fse.writeFile(filePath, file.buffer)

    filePath = ('\\' + path.relative(path.join(process.cwd(), 'uploadFiles'), filePath)).replace(/\\/g, '/')

    let videoImgPath
    if (filePath.startsWith('/video')) {
      console.log("🚀 ~ saveFile ~ filePath:", filePath)
      const [m3u8Path, dirPath] = await m3u8(filePath)

      const imgFile = files.poster[0],
        imgName = imgFile.fieldname + '.png'
      console.log("🚀 ~ saveFile ~ imgFile:", imgFile)

      await fse.writeFile(path.join(dirPath, imgName), imgFile.buffer)
      videoImgPath = m3u8Path.replace('index.m3u8', imgName)
      console.log("🚀 ~ saveFile ~ videoImgPath:", videoImgPath)

      filePath = m3u8Path
    }

    const options = { filePath, fileName, fileId, categoryId, file, videoImgPath }
    const res = await createFile(options)
    if (res) {
      return new SuccessModel(uploadSuccessInfo)
    }
  } catch (err) {
    console.log("🚀 ~ saveFile ~ err:", err)
    return new ErrorModel({ ...uploadFailInfo, file })
  }
}

async function ensureFileDir(DIST_FOLDER_PATH, mimetype) {
  let dir = mimetype.split('/')[0]
  if (mimetype.endsWith('pdf')) {
    dir = mimetype.split('/').pop()
  }
  const fileDir = path.join(DIST_FOLDER_PATH, dir)

  const isExists = await fse.pathExists(fileDir)
  if (!isExists) fse.ensureDir(fileDir)

  return fileDir
}

module.exports = {
  saveFile
}