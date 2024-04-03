const { authenticationErrorInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

module.exports = function () {
  return function (ctx, next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 401
          ctx.body = new ErrorModel(authenticationErrorInfo)
          break
      }
    })
  }
}
