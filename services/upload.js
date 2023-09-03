const File = require('../db/model/File')

async function createFile(options) {
  const { filePath, fileName, fileId, categoryId, file, videoImgPath } = options
  const { mimetype: type, size } = file
  console.log(1111, options)
  const res = await File.create({
    fileId,
    name: fileName,
    size,
    type,
    path: filePath,
    categoryId,
    videoImgPath
  })

  console.log("🚀 ~ createFile ~ res.dataValues:", res.dataValues)
  return res.dataValues
}

module.exports = {
  createFile
}