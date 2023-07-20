const path = require('path')
const fse = require('fs-extra')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { fileSizeExceedInfo } = require('../model/ErrorInfo')

const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

const MIX_SIZE = 1024 * 1024 * 204.8

async function saveFile({ name, type, size, filepath }) {
  if (size > MIX_SIZE) {
    return new ErrorModel(fileSizeExceedInfo)
  }


}

module.exports = {
  saveFile
}