import {Context, Next}  from 'koa'
import info from '../model/ErrorInfo'
import { ErrorModel } from '../model/ResModel'

export default function () {
  return function (ctx: Context, next: Next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 401
          ctx.body = new ErrorModel(info.authenticationErrorInfo)
          break
      }
    })
  }
}
