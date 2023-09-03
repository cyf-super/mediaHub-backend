const { v4: uuidv4 } = require('uuid');

/**
 * 获取uuid
 * @returns 
 */
const getUuid = () => uuidv4()

/**
 * 通过文件路径获取文件名
 * @param {*} path 
 * @returns 
 */
const getFileName = (path) => {
  const regex = /\/([^/]+)$/; // 只匹配最后一个 / 后的部分
  const match = path.match(regex);
  if (match.length) {
    const fileName = match[1]

    return fileName.split('.').slice(0, -1).join('.')
    // return fileName.split('.')[0]
  }

  return null
}

module.exports = {
  getUuid,
  getFileName
}
