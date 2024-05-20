const Setting = require('../db/model/Setting')
const User = require('../db/model/User')

/**
 * 上传轮播图
 * @param {*} swiper 轮播图信息列表
 */
async function swpierUploadService(swiper) {
  const res = await Setting.findAndCountAll()
  if (res.count) {
    await Setting.update(
      {
        swiper,
      },
      { where: {} }
    )
  } else {
    await Setting.create({
      swiper,
      title: '',
    })
  }
}
/**
 * 获取轮播图
 * @returns
 */
async function getSwiperService() {
  const res = await Setting.findAndCountAll({
    attributes: ['swiper'],
  })

  return res.rows?.map((row) => row.dataValues.swiper)[0] || []
}

/**
 * 更新用户信息
 * @param {*} info
 */
async function updateUserInfoService(info) {
  const res = await Setting.findAndCountAll()

  if (res.count) {
    await User.update(
      {
        ...deleteEmptyObject(info),
      },
      { where: {} }
    )
  } else {
    await User.create({
      ...deleteEmptyObject(info),
    })
  }
}

module.exports = {
  swpierUploadService,
  getSwiperService,
  updateUserInfoService,
}

function deleteEmptyObject(obj) {
  const newObj = { ...obj }
  for (let key in newObj) {
    if (!newObj[key]) {
      delete newObj[key]
    }
  }

  return newObj
}
