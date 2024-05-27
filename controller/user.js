const { doBcrypt } = require('../utils/crypto')
const jwt = require('jsonwebtoken')

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const {
  loginFailInfo,
  userExistInfo,
  createUserFailInfo,
  loginFailInfo1,
} = require('../model/ErrorInfo')
const {
  getUserInfo,
  createUser,
  loginService,
  updateUserInfoService,
} = require('../services/user')
const { publicKey } = require('../conf/config')

/**
 * 用户是否存在
 * @param {string} username
 * @returns
 */
async function isExist(username) {
  const userInfo = await getUserInfo(username)
  if (userInfo) {
    return new ErrorModel(userExistInfo)
  }
  return new SuccessModel()
}

/**
 * 注册
 * @param {object} param0
 */
async function registerController({ username, password, picture }) {
  const msg = await isExist(username)
  // 用户已经存在
  if (msg.code !== 0) return msg

  const cryptPW = await doBcrypt(password)
  console.log(cryptPW)
  try {
    await createUser({
      username,
      password: cryptPW,
      picture,
    })

    return new SuccessModel()
  } catch (e) {
    return new ErrorModel(createUserFailInfo)
  }
}

/**
 * 登陆
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function loginController(username, password) {
  try {
    const userInfo = await loginService(username, password)
    if (!userInfo) {
      return new ErrorModel(loginFailInfo)
    }
    const res = new SuccessModel(userInfo)
    const token = jwt.sign(res.data, publicKey, { expiresIn: '1h' })

    return {
      ...res,
      token,
    }
  } catch (error) {
    return new ErrorModel(loginFailInfo1)
  }
}

/**
 * 更新用户信息
 * @param {*} info
 * @returns
 */
async function updateUserInfoController(info) {
  try {
    await updateUserInfoService(info)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel()
  }
}

module.exports = {
  loginController,
  isExist,
  registerController,
  updateUserInfoController,
}
