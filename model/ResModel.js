class BaseModel {
  constructor({ error, data, message }) {
    this.error = error;
    data && (this.data = data);
    message && (this.message = message);
  }
}

// 成功
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      data,
      code: 0,
    });
  }
}

// 失败
class ErrorModel extends BaseModel {
  constructor({ error, message }) {
    super({
      error,
      message,
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
