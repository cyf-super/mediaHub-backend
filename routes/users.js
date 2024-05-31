const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const multer = require('@koa/multer')
const { publicKey } = require('../conf/config')
const {
  loginController,
  registerController,
  updateUserInfoController,
} = require('../controller/user')
const { validateUser } = require('../middleware/Validator')

router.prefix('/api')

const upload = multer({})

router.post('/register', validateUser(), async (ctx) => {
  const { username, password, picture } = ctx.request.body
  const data = await registerController({ username, password, picture })
  ctx.body = data
})

/**
 * 登录
 */
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  const data = await loginController(username, password)

  ctx.body = data
})

router.get('/user', function (ctx) {
  let token = ctx.request.header.authorization
  token = token.split(' ')[1]
  const info = jwt.verify(token, publicKey)
  ctx.body = {
    info,
  }
})

// 修改用户信息
router.post(
  '/user-info',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'info', maxCount: 1 },
  ]),
  async (ctx) => {
    const files = ctx.files
    const { info } = ctx.request.body
    ctx.body = await updateUserInfoController(
      JSON.parse(info),
      files?.file?.[0]
    )
  }
)

module.exports = router
