const User = require('../db/model/User')


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

module.exports = {
  loginService
}