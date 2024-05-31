const multer = require('@koa/multer')
const router = require('koa-router')()
const {
  getWebsiteInfoController,
  getSwiperController,
  updateWebsiteController,
} = require('../controller/setting')

const upload = multer({})

router.prefix('/api')

router.get('/setting-swiper', async (ctx) => {
  ctx.body = await getSwiperController()
})

router.get('/website-info', async (ctx) => {
  ctx.body = await getWebsiteInfoController()
})

router.post(
  '/website-info',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'websiteName', maxCount: 1 },
  ]),
  async (ctx) => {
    const files = ctx.files
    const { websiteName } = ctx.request.body
    console.log(websiteName, files)
    ctx.body = await updateWebsiteController({ websiteName }, files?.file?.[0])
  }
)

module.exports = router
