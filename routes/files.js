const router = require('koa-router')()
const { getFilesController, deleteFilesController, getFileController } = require('../controller/files')

router.prefix('/api')

// 获取单个文件的信息
router.get('/file', async (ctx) => {
  const { fileId } = ctx.query
  console.log("🚀 ~ router.get ~ fileId:", fileId)
  ctx.body = await getFileController(fileId)
})

// 获取批量文件
router.get('/files', async (ctx) => {
  const { categoryId } = ctx.query
  ctx.body = await getFilesController({ categoryId })
})

// 删除单个/批量文件
router.delete('/files', async (ctx) => {
  const { fileIds } = ctx.request.body
  ctx.body = await deleteFilesController(fileIds)
})

module.exports = router