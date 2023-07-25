const router = require('koa-router')()
const { getFilesController } = require('../controller/files')

router.prefix('/api')

router.get('/files', async (ctx) => {
  const { categoryId } = ctx.query
  ctx.body = await getFilesController({ categoryId })
})

module.exports = router