const { v4: uuidv4 } = require('uuid')
const path = require('path')
const { addDir } = require('./file')

/**
 * 获取uuid
 * @returns
 */
const getUuid = () => uuidv4()

/**
 * 获取uploadFiles目录
 */
const getUploadFilesPath = () => path.join(__dirname, '..', 'uploadFiles')

/**
 * 生成子目录
 */
const getSubUploadFilesPath = (name) => {
  const uploadFilesPath = getUploadFilesPath()
  return path.join(uploadFilesPath, name)
}

/**
 * 设置路径
 */
const setUploadFilesPath = () => {
  const DIST_FOLDER_PATH = getUploadFilesPath()
  const dir = ['swiper', 'setting']

  addDir(DIST_FOLDER_PATH)
  dir.forEach((name) => {
    const swiperDir = getSubUploadFilesPath(name)
    addDir(swiperDir)
  })
}

/**
 * 剔除对象属性值为 undefind 的属性
 * @param {*} obj
 * @returns
 */
function deleteEmptyObject(obj) {
  const newObj = { ...obj }
  for (let key in newObj) {
    if (!newObj[key]) {
      delete newObj[key]
    }
  }

  return newObj
}

/**
 * 将 buffer 转成字符串
 * @param {*} buffer
 * @returns
 */
function transformBuffer(buffer) {
  return Buffer.from(buffer, 'latin1').toString('utf8')
}

/**
 * 绝对路径转为相对路径
 * @param {*} releavePath
 */
function transformAbsolutePath(absolutePath) {
  return (
    '\\' + path.relative(path.join(process.cwd(), 'uploadFiles'), absolutePath)
  ).replace(/\\/g, '/')
}

module.exports = {
  getUuid,
  getUploadFilesPath,
  getSubUploadFilesPath,
  setUploadFilesPath,
  deleteEmptyObject,
  transformBuffer,
  transformAbsolutePath,
}
