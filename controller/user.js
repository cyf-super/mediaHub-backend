const doCrypto = require('../utils/crypto')
const jwt = require("jsonwebtoken");

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { loginFailInfo, userExistInfo } = require('../model/ErrorInfo')
const { loginService } = require('../services/user')
const { publicKey } = require("../conf/config");

/**
 * 用户是否存在
 * @param {string} username 
 * @returns 
 */
async function isExist(username) {
  const userInfo = await loginService(username)
  if (!userInfo) {
    return new ErrorModel(userExistInfo)
  }
  return new SuccessModel()
}

/**
 * 注册
 * @param {object} param0 
 */
async function registerController({ username, password, picture, role }) {
  const msg = await isExist(username)
  if (msg.code !== 0) return msg


}


/**
 * 登陆
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
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
  loginController,
  isExist,
  registerController
}