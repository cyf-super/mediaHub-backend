const router = require('koa-router')()
const {
  categoryCont,
  createCategoryCont,
  updateCategoryCont,
  deleteCategoryCont,
  swapCategoryCont,
} = require('../controller/category')

router.prefix('/api')

router.get('/file-category', async (ctx) => {
  const data = await categoryCont()
  ctx.body = data
})

router.post('/file-category', async (ctx) => {
  const name = ctx.request.body.name
  const data = await createCategoryCont(name)
  ctx.body = data
})

router.put('/file-category', async (ctx) => {
  const { name, categoryId } = ctx.request.body
  const data = await updateCategoryCont(categoryId, name)
  ctx.body = data
})

router.delete('/file-category', async (ctx) => {
  const { categoryId } = ctx.request.body
  const data = await deleteCategoryCont(categoryId)
  ctx.body = data
})

router.post('/swap-category', async (ctx) => {
  const { categoryIds } = ctx.request.body
  ctx.body = await swapCategoryCont(categoryIds)
})

module.exports = router
