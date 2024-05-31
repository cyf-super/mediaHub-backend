const Setting = require('../db/model/Setting')

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
      websiteName: '',
      logo: '',
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
 * 获取网站信息
 * @returns
 */
async function getWebsiteInfoService() {
  const res = await Setting.findAndCountAll({
    attributes: ['websiteName', 'logo'],
  })

  return res.rows?.map((row) => row.dataValues)[0] || {}
}

async function updateWebsiteService(info) {
  const res = await Setting.findAndCountAll()
  if (res.count) {
    await Setting.update(
      {
        ...info,
      },
      { where: {} }
    )
  } else {
    await Setting.create({
      ...info,
      swiper: '[]',
    })
  }
}

module.exports = {
  swpierUploadService,
  getSwiperService,
  getWebsiteInfoService,
  updateWebsiteService,
}
