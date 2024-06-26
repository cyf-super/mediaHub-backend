import { ajv } from '../validator'
import { ErrorModel } from '../model/ResModel'
import info from '../model/ErrorInfo'
import { Context, Next } from 'koa'

// 校验用户参数
function validateUser() {
  return async function (ctx: Context, next: Next) {
    const data = ctx.request.body
    const validate = ajv.getSchema('user')
    if (!validate(data)) {
      ctx.body = new ErrorModel(info.userParamsError)
      return
    }

    await next()
  }
}

export {
  validateUser,
}
