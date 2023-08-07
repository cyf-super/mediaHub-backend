const router = require('koa-router')()
const { getFilesController, deleteFilesController } = require('../controller/files')

router.prefix('/api')

router.get('/files', async (ctx) => {
  const { categoryId } = ctx.query
  ctx.body = await getFilesController({ categoryId })
})

router.delete('/files', async (ctx) => {
  const { fileIds } = ctx.request.body
  ctx.body = await deleteFilesController(fileIds)
})

module.exports = router