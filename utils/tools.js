const { v4: uuidv4 } = require('uuid')
const path = require('path')

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
  const regex = /\/([^/]+)$/ // 只匹配最后一个 / 后的部分
  const match = path.match(regex)
  if (match.length) {
    const fileName = match[1]
    return fileName.split('.').slice(0, -1).join('.')
  }
  return null
}

// 获取文件名、后缀
const getFileNameSuffix = (fileName) => {
  const arr = fileName?.split('.')
  return [arr.slice(0, -1).join('.'), arr.slice(-1).join('.')]
}

// 获取uploadFiles目录下的dir
const getUploadFilesDir = (dir) =>
  path.join(__dirname, '..', 'uploadFiles', dir)

// 获取文件类型
const getFileType = (type) => {
  const typeMap = {
    mp4: 'video',
  }
  return typeMap[type] || type
}

module.exports = {
  getUuid,
  getFileName,
  getFileType,
  getFileNameSuffix,
  getUploadFilesDir,
}
