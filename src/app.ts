import Koa from 'koa';
import json from 'koa-json';
// import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaJwt from 'koa-jwt';
import koaStatic from 'koa-static';
import path from 'path';
import config from './conf/config';
import staticVideo from './middleware/staticVideo';

import router from './routes/index';
import ErrorRoutesCatch from './middleware/ErrorAuthenticationCatch';
import { setUploadFilesPath } from './utils/tools';

const app = new Koa();
setUploadFilesPath();

app.use(staticVideo());
app.use(koaStatic(path.join(__dirname, 'uploadFiles')));

// error handler
// onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());

app.use(ErrorRoutesCatch());

app.use(
  koaJwt({ secret: config.publicKey }).unless({
    path: [
      /^\/public|\/assets|\/uploadFiles|\/ffmpeg|\/static/,
      '/api/login',
      '/api/register'
    ]
  })
);

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  const user = ctx.state.user;
  console.log('user ', user);
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
router(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

const port = 3000;

app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});

export default app;
