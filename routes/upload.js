const router = require("koa-router")();
const multer = require('@koa/multer');
const { saveFile } = require('../controller/upload')

router.prefix('/api')

const upload = multer()

router.post('/upload', upload.single('file'), async (ctx) => {
  const file = ctx.file;
  const { categoryId, fileId, name } = ctx.request.body;
  ctx.body = await saveFile({ fileId, categoryId, name, file });
})


module.exports = router