const User = require('../db/model/User')
const { compareBcrypt } = require('../utils/crypto')


/**
 * 登陆
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function getUserInfo(username, password) {
  const whereOpt = {
    username
  }

  const userInfo = await User.findOne({
    where: whereOpt,
    attributes: ['id', 'username', 'nickname', 'password', 'role']
  })

  if (!userInfo) {
    return userInfo
  }

  if (!password) {
    delete userInfo.dataValues.password
    return userInfo.dataValues
  }

  // 比较前后两次的密码
  const flag = await compareBcrypt(password, userInfo.dataValues.password)
  if (flag) {
    delete userInfo.dataValues.password
    return userInfo.dataValues
  }

  return null
}

async function createUser({
  username,
  password,
  piture = '',
  gender = 3,
  role = 0b10,
}) {
  piture = piture || ''
  const res = await User.create({
    username,
    password,
    piture,
    nickname: username,
    gender,
    role
  })

  const data = res.dataValues
  return data
}

module.exports = {
  getUserInfo,
  createUser
}
