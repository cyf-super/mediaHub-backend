import { FileType } from '../utils/types';
import { RegisterBody } from '../routes/users';
import { doBcrypt } from '../utils/crypto';
import jwt from 'jsonwebtoken';
import path from 'path';
import fse from 'fs-extra';

import { ErrorModel, SuccessModel } from '../model/ResModel';
import info from '../model/ErrorInfo';
import {
  getUserInfo,
  createUser,
  loginService,
  updateUserInfoService
} from '../services/user';
import config from '../conf/config';
import { removeFileByPrefix, getUploadFilesDir } from '../utils/file';
import {
  deleteEmptyObject,
  transformBuffer,
  transformAbsolutePath
} from '../utils/tools';

export interface UserInfo {
  userId: number;
  nickname: string;
  username: string;
  password: string;
  role: number;
  picture: string;
  gender: number;
}

const {
  loginFailInfo,
  userExistInfo,
  createUserFailInfo,
  loginFailInfo1,
  handleFailInfo
} = info;

/**
 * 用户是否存在
 * @param {string} username
 * @returns
 */
async function isExist(username: string) {
  const userInfo = await getUserInfo({ username });
  if (userInfo) {
    return new ErrorModel(userExistInfo);
  }
  return new SuccessModel({});
}

/**
 * 注册
 * @param {object} param0
 */
async function registerController({
  username,
  password,
  picture
}: RegisterBody) {
  const msg = await isExist(username);
  // 用户已经存在
  if (!msg.status) return msg;

  const cryptPW = await doBcrypt(password);
  console.log(cryptPW);
  try {
    await createUser({
      userId: Date.now(),
      username,
      password: cryptPW,
      picture
    });

    return new SuccessModel({});
  } catch (e) {
    console.log('eee ', e);
    return new ErrorModel(createUserFailInfo);
  }
}

/**
 * 登陆
 * @param {string} username
 * @param {string} password
 * @returns
 */
async function loginController(username: string, password: string) {
  try {
    console.log(2222, username, password);
    const userInfo = await loginService(username, password);
    console.log(111, userInfo);
    if (!userInfo) {
      return new ErrorModel(loginFailInfo);
    }
    const res = new SuccessModel({ data: userInfo });
    const token = jwt.sign(res.data, config.publicKey, { expiresIn: '7d' });

    return {
      ...res,
      token
    };
  } catch (error) {
    console.log('err ', error);
    return new ErrorModel(loginFailInfo1);
  }
}

/**
 * 更新用户信息
 * @param {*} info
 * @returns
 */
async function updateUserInfoController(info: UserInfo, file: FileType) {
  const params = {
    ...info
  };
  // 如果有上传图片
  if (file) {
    removeFileByPrefix('setting');
    const fileDir = getUploadFilesDir('setting');
    const fileName = `setting-${Date.now()}-${transformBuffer(
      file.originalname
    )}`;
    let filePath = path.join(fileDir, fileName);
    fse.writeFile(filePath, file.buffer);
    params.picture = transformAbsolutePath(filePath);
  }
  if (params.password) {
    params.password = await doBcrypt(params.password);
  }
  try {
    await updateUserInfoService(deleteEmptyObject(params));
    const data = await getUserInfo({ userId: params.userId });
    delete data.password;
    return new SuccessModel(data);
  } catch (error) {
    return new ErrorModel(handleFailInfo);
  }
}

export {
  loginController,
  isExist,
  registerController,
  updateUserInfoController
};
