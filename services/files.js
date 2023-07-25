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

module.exports = {
  getFilesServer
}