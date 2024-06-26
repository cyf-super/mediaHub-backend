import seq from '../seq';
import Types from '../types';

const User = seq.define('user', {
  userId: {
    type: Types.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: Types.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名唯一'
  },
  password: {
    type: Types.STRING,
    allowNull: false,
    comment: '密码'
  },
  nickname: {
    type: Types.STRING,
    allowNull: true,
    comment: '昵称'
  },
  role: {
    type: Types.DECIMAL,
    allowNull: true,
    defaultValue: 0b10,
    comment: '角色(0b1 管理员 0b10 普通用户)'
  },
  gender: {
    type: Types.DECIMAL,
    allowNull: true,
    defaultValue: 3,
    comment: '性别(1 男 2 女 3 保密)'
  },
  picture: {
    type: Types.STRING,
    comment: '头像'
  }
});

export default User;
