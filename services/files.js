const File = require('../db/model/File')

async function getFilesServer({ categoryId }) {
  const options = {
    categoryId
  }

  const res = await File.findAndCountAll({
    where: options
  })

  if (!res) return res
  const data = {
    count: res.count,
    files: res.rows?.map(row => row.dataValues) || []
  }
  return data
}


async function deleteFilesServer(fileIds) {
  try {
    const res = await File.destroy({
      where: {
        fileId: fileIds
      }
    })

    return res
  } catch (e) {
    return e
  }
}

module.exports = {
  getFilesServer,
  deleteFilesServer
}