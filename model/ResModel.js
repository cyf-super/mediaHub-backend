class BaseModel {
  constructor({ code, message, ...data }) {
    this.code = code;
    this.message = message;
    JSON.stringify(data) !== '{}' && (this.data = data);
  }
}

// 成功
class SuccessModel extends BaseModel {
  constructor(data = {}) {

    super({
      code: 0,
      ...data,
    });
  }
}

// 失败
class ErrorModel extends BaseModel {
  constructor({ code, message }) {
    super({
      code,
      message,
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
