const User = require('../db/model/User')
const { compareBcrypt } = require('../utils/crypto')

/**
 * 获取用户信息
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function getUserInfo(username) {
  const whereOpt = {
    username,
  }

  const userInfo = await User.findOne({
    where: whereOpt,
    attributes: [
      'userId',
      'password',
      'username',
      'nickname',
      'picture',
      'role',
    ],
  })

  if (!userInfo) {
    return userInfo
  }

  return userInfo.dataValues
}

/**
 * 登录
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function loginService(username, password) {
  const userInfo = await getUserInfo(username)

  if (!userInfo) {
    return userInfo
  }

  // 比较前后两次的密码
  const flag = await compareBcrypt(password, userInfo.password)
  if (flag) {
    delete userInfo.password
    return userInfo
  }

  return null
}

/**
 * 创建用户
 * @param {*} param0
 * @returns
 */
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

/**
 * 更新用户信息
 * @param {*} info
 */
async function updateUserInfoService(info) {
  const res = await User.findOne({
    where: {
      username: info.username,
    },
  })
  console.log('info ', info)

  if (res.count) {
    await User.update(
      {
        ...deleteEmptyObject(info),
      },
      {
        where: {
          username: info.username,
        },
      }
    )
  } else {
    await User.create({
      ...deleteEmptyObject(info),
    })
  }
}

module.exports = {
  getUserInfo,
  createUser,
  loginService,
  updateUserInfoService,
}

function deleteEmptyObject(obj) {
  const newObj = { ...obj }
  for (let key in newObj) {
    if (!newObj[key]) {
      delete newObj[key]
    }
  }

  return newObj
}
