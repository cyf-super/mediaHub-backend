const {
  getSwiperController,
  updateuUserInfoController,
} = require('../controller/setting')

const router = require('koa-router')()

router.prefix('/api')

router.get('/setting-swiper', async (ctx) => {
  ctx.body = await getSwiperController()
})

router.post('/user-info', async (ctx) => {
  const { username, picture } = ctx.body
  ctx.body = await updateuUserInfoController({ username, picture })
})

router.post('/project-info', async (ctx) => {
  ctx.body = 'user'
})

module.exports = router
