const router = require("koa-router")();
const { categoryCont, createCategoryCont } = require('../controller/category')

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

module.exports = router