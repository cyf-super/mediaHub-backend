const File = require('../db/model/File')

async function createFile({ filePath, fileName, fileId, categoryId, file }) {
  const { mimetype: type, size } = file
  console.log(1111, {
    fileId,
    name: fileName,
    size,
    type,
    path: filePath,
    categoryId
  })
  const res = await File.create({
    fileId,
    name: fileName,
    size,
    type,
    path: filePath,
    categoryId
  })

  return res.dataValues
}

module.exports = {
  createFile
}