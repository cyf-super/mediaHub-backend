const router = require("koa-router")();
const multer = require('@koa/multer');

router.prefix('/api')

const upload = multer()

router.post('/upload', upload.single('video'), async (ctx) => {
  console.log('ctx.request.file', ctx.request.file);
  console.log('ctx.file', ctx.file);
  console.log('ctx.request.body', ctx.request.body);
  ctx.body = 'done';
})


module.exports = router