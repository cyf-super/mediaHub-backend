module.exports = function () {
  return function (ctx, next) {
    return next().catch(err => {
      switch (err.status) {
        case 401:
          ctx.status = 401
          ctx.body = {
            result: {
              status: 401,
              err: 'Authentication Error',
              errInfo: 'Protected resource, use Authorization header to get access.'
            }
          }
          break;
      }
    })
  }
}