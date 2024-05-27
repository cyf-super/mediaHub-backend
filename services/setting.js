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

module.exports = {
  swpierUploadService,
  getSwiperService,
}
