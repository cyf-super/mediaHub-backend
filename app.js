const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaJwt = require('koa-jwt')
const koaStatic = require('koa-static')
const path = require('path')
const { publicKey } = require('./conf/config')
const staticVideo = require('./middleware/staticVideo')

const router = require('./routes/index')
const ErrorRoutesCatch = require('./middleware/ErrorAuthenticationCatch')

app.use(staticVideo())
app.use(koaStatic(path.join(__dirname, 'uploadFiles')))

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())

app.use(ErrorRoutesCatch())

app.use(
  koaJwt({ secret: publicKey }).unless({
    path: [
      /^\/public|\/assets|\/uploadFiles|\/static/,
      '/api/login',
      '/api/register',
    ],
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
