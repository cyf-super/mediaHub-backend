const User = require('../db/model/User')


/**
 * 登陆
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function loginService(username, password) {
  const whereOpt = {
    username
  }

  if (password) {
    Object.assign(whereOpt, { password })
  }

  const userInfo = await User.findOne({
    where: whereOpt,
    attributes: ['id', 'userName', 'nickName', 'picture', 'city']
  })

  if (!userInfo) {
    return userInfo
  }

  console.log('userInfo ', userInfo)
  return userInfo
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
  loginService,
  createUser
}