class BaseModel {
  constructor({ code, message, ...data }) {
    this.code = code;
    data && (this.data = data);
    message && (this.message = message);
  }
}

// 成功
class SuccessModel extends BaseModel {
  constructor(data = {}) {

    super({
      ...data,
      code: 0,
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
