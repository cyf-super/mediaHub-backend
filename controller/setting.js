const path = require('path')
const fse = require('fs-extra')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  getAllFiles,
  removeFile,
  removeFileByPrefix,
  getUploadFilesDir,
} = require('../utils/file')
const {
  swpierUploadService,
  getSwiperService,
  getWebsiteInfoService,
  updateWebsiteService,
} = require('../services/setting')
const {
  settingSwiperSuccessInfo,
  settingSwiperFailInfo,
  getSwiperFailInfo,
  handleFailInfo,
  getWebsiteFailInfo,
} = require('../model/ErrorInfo')
const {
  getSubUploadFilesPath,
  transformBuffer,
  transformAbsolutePath,
  deleteEmptyObject,
} = require('../utils/tools')

const swiperDir = getSubUploadFilesPath('swiper')

/**
 * 上传轮播图
 * @param {*} files
 * @param {*} list
 * @returns
 */
async function swpierUploadControll(files, list) {
  try {
    const swiperList = [...list]
    const noEmptyFiles = list.filter((item) => item.src)

    const imgArrs = []
    getAllFiles(swiperDir, imgArrs)

    if (noEmptyFiles.length === list.length) {
      // 只是更换顺序 -> 直接写入数据库
    } else if (noEmptyFiles.length === 0) {
      // 全部更新 -> 删除所有文件、写入新文件
      imgArrs.forEach((path) => removeFile(path))
      files.forEach(async (file, index) => {
        const fileName =
          Date.now() +
          Math.floor(10000 * Math.random()) +
          '.' +
          transformBuffer(file.originalname)
        swiperList[index].src = '/swiper/' + fileName
        let filePath = path.join(swiperDir, fileName)
        await fse.writeFile(filePath, file.buffer)
      })
    } else {
      // 有更新有删除 -> 删除废弃文件、写入新文件
      const filePathArr = []

      list.forEach((item) => {
        if (item.src) {
          const index = imgArrs.findIndex((img) => img.includes(item.src))
          imgArrs.splice(index, 1)
        }
      })
      imgArrs.forEach((path) => removeFile(path))

      files.forEach(async (file) => {
        const now = Date.now()
        const fileName =
          now +
          Math.floor(now * Math.random()) +
          '.' +
          Buffer.from(file.originalname, 'latin1').toString('utf8')
        filePathArr.push('/swiper/' + fileName)
        let filePath = path.join(swiperDir, fileName)
        await fse.writeFile(filePath, file.buffer)
      })

      list.forEach((item) => {
        if (!item.src) {
          const src = filePathArr.shift()
          item.src = src
        }
      })
    }

    await swpierUploadService(swiperList)
    return new SuccessModel(settingSwiperSuccessInfo)
  } catch (error) {
    console.log('error ', error)
    return new ErrorModel(settingSwiperFailInfo)
  }
}

/**
 * 获取轮播图
 * @returns
 */
async function getSwiperController() {
  try {
    const data = await getSwiperService()
    return new SuccessModel({ swiper: data })
  } catch (error) {
    return new ErrorModel(getSwiperFailInfo)
  }
}

async function getWebsiteInfoController() {
  try {
    const data = await getWebsiteInfoService()
    return new SuccessModel(data)
  } catch (error) {
    return new ErrorModel(getWebsiteFailInfo)
  }
}

/**
 * 更新网站信息
 * @param {*} info
 * @param {*} file
 * @returns
 */
async function updateWebsiteController(info, file) {
  const params = { ...info }
  try {
    if (file) {
      removeFileByPrefix('logo')
      const fileDir = getUploadFilesDir('setting')
      const fileName = `logo-${Date.now()}-${transformBuffer(
        file.originalname
      )}`
      let filePath = path.join(fileDir, fileName)
      fse.writeFile(filePath, file.buffer)
      params.logo = transformAbsolutePath(filePath)
    }

    await updateWebsiteService(deleteEmptyObject(params))
    const data = await getWebsiteInfoService()
    return new SuccessModel(data)
  } catch (error) {
    console.log('error ', error)
    return new ErrorModel(handleFailInfo)
  }
}

module.exports = {
  swpierUploadControll,
  getSwiperController,
  updateWebsiteController,
  getWebsiteInfoController,
}
