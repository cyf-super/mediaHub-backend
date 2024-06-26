import path from 'path'
import fse from 'fs-extra'

/**
 * 通过文件路径获取文件名
 * @param {*} path
 * @returns
 */
const getFileName = (path: string) => {
  const regex = /\/([^/]+)$/ // 只匹配最后一个 / 后的部分
  const match = path.match(regex)
  if (match.length) {
    const fileName = match[1]
    return fileName.split('.').slice(0, -1).join('.')
  }
  return null
}

// 获取文件名、后缀
const getFileNameSuffix = (fileName: string) => {
  const arr = fileName?.split('.')
  return [arr.slice(0, -1).join('.'), arr.slice(-1).join('.')]
}

// 获取uploadFiles目录下的dir
const getUploadFilesDir = (dir: string) =>
  path.join(__dirname, '..', 'uploadFiles', dir)

// 获取目录下的所有文件
function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
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
const getFileType = (type: string) => {
  const typeMap: {
    [key: string]: string
  } = {
    mp4: 'video',
  }
  return typeMap[type] || type
}

/**
 * 添加目录
 * @param {*} dir
 * @returns
 */
const addDir = async (dir: string) => {
  const exist = await fse.pathExists(dir)
  if (!exist) {
    fse.ensureDir(dir)
  }
  return dir
}

/**
 * 移除文件
 * @param {*} path
 */
async function removeFile(path: string) {
  try {
    const exist = await fse.pathExists(path)
    if (exist) {
      await fse.remove(path)
    }
  } catch (error) {
    console.log('error--> ', error)
  }
}

/**
 * 删除某个目录下前缀为prefix的文件
 * @param {*} prefix
 */
async function removeFileByPrefix(prefix: string, dir = 'setting') {
  const arr: string[] = []
  const newDir = getUploadFilesDir(dir)
  getAllFiles(newDir, arr)
  if (arr.length) {
    arr.forEach((src) => {
      const name = getFileName(src)
      if (name.startsWith(prefix)) {
        removeFile(src)
      }
    })
  }
}

export {
  getFileName,
  getFileType,
  addDir,
  removeFile,
  getAllFiles,
  getFileNameSuffix,
  getUploadFilesDir,
  removeFileByPrefix,
}
