const router = require('koa-router')()
const multer = require('@koa/multer')
const { saveFile } = require('../controller/upload')
const { swpierUploadControll } = require('../controller/setting')

router.prefix('/api')

const upload = multer({
  limits: {
    // fileSize: 200 * 1024 * 1024
  },
})

router.post(
  '/setting-swiper',
  upload.fields([{ name: 'file', maxCount: 10 }]),
  async (ctx) => {
    const files = ctx.files
    const { list } = ctx.request.body
    ctx.body = await swpierUploadControll(files.file, JSON.parse(list))
  }
)

router.post(
  '/upload',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ]),
  async (ctx) => {
    const files = ctx.files
    const { categoryId, fileId, name } = ctx.request.body
    ctx.body = await saveFile({ fileId, categoryId, name, files })
  }
)

module.exports = router
