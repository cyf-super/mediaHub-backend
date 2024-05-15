const File = require('../db/model/File')

async function createFile(options) {
  try {
    const { filePath, name, fileName, fileId, categoryId, file, videoImgPath } =
      options
    const { mimetype: type, size } = file
    const params = {
      fileId,
      name,
      fileName,
      size,
      type,
      path: filePath,
      categoryId,
      videoImgPath,
    }
    const res = await File.create(params)

    return res.dataValues
  } catch (error) {
    console.log('error--> ', error)
  }
}

module.exports = {
  createFile,
}
