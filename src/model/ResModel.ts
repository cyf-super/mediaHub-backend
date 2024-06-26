type Message404 = {
  status: number;
  errInfo: string;
};

interface BaseModelType {
  code: string;
  message: string | Message404;
  status: boolean;
  [key: string]: any;
}

class BaseModel {
  code: string;
  message: string | Message404;
  status: boolean;
  data: any;

  constructor({ code, message, status, data, ...rest }: BaseModelType) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.data = data || {};
    Object.keys(rest).length && Object.assign(this, { ...rest });
  }
}

interface SuccessModelType {
  message?: string;
  data?: any;
  [key: string]: any;
}
// 成功
class SuccessModel extends BaseModel {
  constructor({ message = 'success', data = {}, ...rest }: SuccessModelType) {
    super({
      code: '0',
      status: true,
      message,
      data,
      ...rest
    });
  }
}

interface ErrorModelType {
  code: string;
  message: string | Message404;
}

// 失败
class ErrorModel extends BaseModel {
  constructor({ code, message }: ErrorModelType) {
    super({
      status: false,
      code,
      message
    });
  }
}

export { SuccessModel, ErrorModel };
