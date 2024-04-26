class BaseModel {
  constructor({ code, message, status, ...data }) {
    this.code = code
    this.message = message
    this.status = status
    JSON.stringify(data) !== '{}' && (this.data = data)
  }
}

// 成功
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      code: 0,
      status: true,
      ...data,
    })
  }
}

// 失败
class ErrorModel extends BaseModel {
  constructor({ code, message }) {
    super({
      status: false,
      code,
      message,
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
}
