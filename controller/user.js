const doCrypto = require('../utils/crypto')
const jwt = require("jsonwebtoken");

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { loginFailInfo } = require('../model/ErrorInfo')
const { loginService } = require('../services/user')
const { publicKey } = require("../conf/config");

// 登陆
async function loginController(username, password) {
  const userInfo = await loginService(username, doCrypto(password))

  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }

  const data = new SuccessModel(userInfo)
  const token = jwt.sign(data, publicKey, {
    expiresIn: "1h",
  });

  return {
    data,
    token
  }
}

module.exports = {
  loginController
}