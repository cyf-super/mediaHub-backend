import { UserInfo } from './../controller/user';
import User from '../db/model/User';
import File from '../db/model/File';

import { compareBcrypt } from '../utils/crypto';

/**
 * 获取用户信息
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function getUserInfo(whereOpt: Partial<UserInfo>) {
  const userInfo = await User.findOne({
    where: whereOpt,
    attributes: [
      'userId',
      'password',
      'username',
      'nickname',
      'picture',
      'role'
    ]
  });

  if (!userInfo) {
    return userInfo;
  }

  return userInfo.dataValues;
}

/**
 * 登录
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function loginService(username: string, password: string) {
  const userInfo = await getUserInfo({ username });
  if (!userInfo) {
    return userInfo;
  }

  // 比较前后两次的密码
  const flag = await compareBcrypt(password, userInfo.password);
  if (flag) {
    delete userInfo.password;
    return userInfo;
  }

  return null;
}

type PartialUserType = Partial<Pick<UserInfo, 'picture' | 'gender' | 'role'>> &
  Pick<UserInfo, 'userId' | 'username' | 'password'>;
/**
 * 创建用户
 * @param {*} param0
 * @returns
 */
async function createUser({
  userId,
  username,
  password,
  picture = '',
  gender = 3,
  role = 0b10
}: PartialUserType) {
  picture = picture || '';
  const res = await User.create({
    userId,
    username,
    password,
    picture,
    nickname: username,
    gender,
    role
  });

  console.log(res);

  const data = res.dataValues;
  return data;
}

/**
 * 更新用户信息
 * @param {*} info
 */
async function updateUserInfoService(info: UserInfo) {
  await User.update(
    {
      ...info
    },
    {
      where: {
        userId: info.userId
      }
    }
  );
}

export { getUserInfo, createUser, loginService, updateUserInfoService };
