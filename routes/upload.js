const router = require("koa-router")();
const multer = require('@koa/multer');
const { saveFile } = require('../controller/upload')

router.prefix('/api')

const upload = multer({
  limits: {
    // fileSize: 200 * 1024 * 1024
  }
})

router.post('/upload', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'poster', maxCount: 1 },
]), async (ctx) => {
  console.log(22222, ctx.files)
  const files = ctx.files;
  const { categoryId, fileId, name } = ctx.request.body;
  console.log("🚀 ~ ]), ~ categoryId, fileId, name:", categoryId, fileId, name, files.file)
  ctx.body = await saveFile({ fileId, categoryId, name, files });
})


module.exports = router