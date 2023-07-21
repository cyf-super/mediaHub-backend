const path = require('path')
const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { fileSizeExceedInfo } = require('../model/ErrorInfo')

const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles')
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

const MIX_SIZE = 1024 * 1024 * 204.8

async function saveFile({ name, category, categoryId, file }) {
  const { size, mimetype } = file
  console.log("🚀 ~ saveFile ~ mimetype:", mimetype)
  if (size > MIX_SIZE) {
    return new ErrorModel(fileSizeExceedInfo)
  }

  const filePath = path.join(DIST_FOLDER_PATH, mimetype.split('/')[0])
  const isExists = await fse.pathExists(filePath)
  if (!isExists) fse.ensureDir(filePath)

  try {
    const fileName = Date.now() + '.' + name
    await fse.writeFile(path.join(filePath, fileName), file.buffer)
    return '上传成功'
  } catch (err) {
    return '上传失败'
  }
}

module.exports = {
  saveFile
}