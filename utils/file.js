const path = require('path')
const fse = require('fs-extra')

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

// 获取目录下的所有文件
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fse.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fse.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, file))
    }
  })

  return arrayOfFiles
}

// 获取文件类型
const getFileType = (type) => {
  const typeMap = {
    mp4: 'video',
  }
  return typeMap[type] || type
}

const setUploadsDir = async (dir) => {
  const exist = await fse.pathExists(dir)
  if (!exist) {
    fse.ensureDir(dir)
  }
  return dir
}

async function removeFile(path) {
  try {
    const exist = await fse.pathExists(path)
    if (exist) {
      await fse.remove(path)
    }
  } catch (error) {
    console.log('error--> ', error)
  }
}

module.exports = {
  getFileName,
  getFileType,
  setUploadsDir,
  removeFile,
  getAllFiles,
  getFileNameSuffix,
  getUploadFilesDir,
}
