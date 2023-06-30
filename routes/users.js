const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { publicKey } = require('../conf/config')

router.prefix('/api')

router.post('/login', function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = {
    id: 1,
    username
  }

  const token = jwt.sign(data, publicKey, {
    expiresIn: '7d'
  })
  ctx.body = {
    token
  }
})

router.get('/getUserInfo', function (ctx, next) {
  let token = ctx.request.header.authorization
  token = token.split(' ')[1]
  const info = jwt.verify(token, publicKey)
  ctx.body = {
    info
  }
})

module.exports = router
