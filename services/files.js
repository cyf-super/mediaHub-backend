const File = require('../db/model/File')

async function getFilesServer({ categoryId = 'all', pageSize, currentPage }) {
  let options = {
    categoryId,
  }
  if (categoryId === 'all') {
    options = {}
  }

  try {
    const res = await File.findAndCountAll({
      where: options,
      offset: (+currentPage - 1) * +pageSize,
      limit: +pageSize,
    })

    if (!res) return res
    const data = {
      count: res.count,
      files: res.rows?.map((row) => row.dataValues) || [],
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

/**
 * 获取单个文件
 * @param {*} fileId
 */
async function getFileServer(fileId) {
  const res = await File.findOne({
    where: {
      fileId,
    },
  })
  console.log('🚀 ~ getFileServer ~ res:', res)

  return res?.dataValues
}

async function deleteFilesServer(fileIds) {
  try {
    const res = await File.destroy({
      where: {
        fileId: fileIds,
      },
    })

    return res
  } catch (e) {
    return e
  }
}

async function updateFileServer({ fileId, name }) {
  try {
    const res = await File.update(
      {
        name,
      },
      {
        where: {
          fileId,
        },
      }
    )

    console.log(res, res.length)
    return res.length > 0
  } catch (error) {
    console.log('error--> ', error)
    return 0
  }
}

module.exports = {
  getFileServer,
  getFilesServer,
  deleteFilesServer,
  updateFileServer,
}
