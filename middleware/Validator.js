const { ajv } = require('../validator/index')
const { ErrorModel } = require('../model/ResModel')
const { userParamsError } = require('../model/ResModel')

// 校验用户参数
function validateUser() {
  return async function (ctx, next) {
    const data = ctx.body
    const validate = ajv.getSchema('user')
    if (!validate(data)) {
      ctx.body = new ErrorModel(userParamsError)
      return
    }

    await next()
  }
}

module.exports = {
  validateUser
}