const User = require('../db/model/User')
const { compareBcrypt } = require('../utils/crypto')

/**
 * 登陆
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function getUserInfo(username, password) {
  try {
    const whereOpt = {
      username,
    }

    const allUser = await User.findAll()
    console.log('allUser ', allUser)

    const userInfo = await User.findOne({
      where: whereOpt,
      attributes: ['id', 'username', 'nickname', 'password', 'role'],
    })
    console.log('userInfo ', userInfo)

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
  } catch (error) {
    console.log('erroe---> ', error)
  }
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
    role,
  })

  console.log(res)

  const data = res.dataValues
  return data
}

module.exports = {
  getUserInfo,
  createUser,
}
