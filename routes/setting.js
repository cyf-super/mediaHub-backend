const { getSwiperController } = require('../controller/setting')

const router = require('koa-router')()

router.prefix('/api')

router.get('/setting-swiper', async (ctx) => {
  ctx.body = await getSwiperController()
})

module.exports = router
