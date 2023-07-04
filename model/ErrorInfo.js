module.exports = {
  loginFailInfo: {
    code: '10001',
    message: '用户名或密码错误'
  },
  userParamsError: {
    code: '10002',
    message: '参数格式不对'
  },
  userExistInfo: {
    code: '10003',
    message: '用户已经存在'
  },
  createUserFailInfo: {
    code: '10004',
    message: '创建用户失败'
  },
  authenticationErrorInfo: {
    code: '10005',
    message: {
      status: 401,
      errInfo: 'Authentication Error, use the correct Authorization header to get access.'
    }
  },
}