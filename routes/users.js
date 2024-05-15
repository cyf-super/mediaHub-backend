const router = require('koa-router')()
const jwt = require('jsonwebtoken')

const { publicKey } = require('../conf/config')
const { loginController, registerController } = require('../controller/user')
const { validateUser } = require('../middleware/Validator')

router.prefix('/api')

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

module.exports = router
