const router = require('koa-router')()
const {
  getFilesController,
  deleteFilesController,
  getFileController,
  updateFileController,
} = require('../controller/files')

router.prefix('/api')

// 获取单个文件的信息
router.get('/file', async (ctx) => {
  const { fileId } = ctx.query
  ctx.body = await getFileController(fileId)
})

// 获取文件
router.get('/files', async (ctx) => {
  const { categoryId, pageSize, currentPage, name = '' } = ctx.query
  ctx.body = await getFilesController({
    categoryId,
    pageSize,
    currentPage,
    name,
  })
})

// 删除单个/批量文件
router.delete('/files', async (ctx) => {
  const { fileIds, fileNames } = ctx.request.body
  ctx.body = await deleteFilesController(fileIds, fileNames)
})

// 修改文件
router.put('/file', async (ctx) => {
  const { fileId, name } = ctx.request.body
  ctx.body = await updateFileController({ fileId, name })
})

module.exports = router
