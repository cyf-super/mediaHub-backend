const router = require("koa-router")();
const multer = require('@koa/multer');
const { saveFile } = require('../controller/upload')

router.prefix('/api')

const upload = multer()

router.post('/upload', upload.single('file'), async (ctx) => {
  const file = ctx.file;
  const { category, categoryId, name } = ctx.request.body;
  ctx.body = await saveFile({ category, categoryId, name, file });
})


module.exports = router