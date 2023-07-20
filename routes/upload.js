const router = require("koa-router")();
const multer = require('@koa/multer');

router.prefix('/api')

const upload = multer()

router.post('/upload', upload.single('file'), async (ctx) => {
  const file = ctx.file;
  const category = ctx.request.body.category;
  const categoryId = ctx.request.body.categoryId;
  console.log('ctx.file', file);
  console.log('解码 ', decodeURIComponent(file.originalname));
  console.log('ctx.request.category', category);
  console.log('ctx.request.categoryId', categoryId);
  // const { originalname, mimetype, size } = ctx.file
  // console.log('originalname--> ', originalname);
  // console.log('mimetype--> ', mimetype);
  // console.log('size--> ', size);
  ctx.body = 'done';
})


module.exports = router