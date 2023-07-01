const seq = require("../seq");
const { STRING, DECIMAL } = require("../types");

const User = seq.define("user", {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: "用户名唯一",
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: "密码",
  },
  nickname: {
    type: STRING,
    allowNull: false,
    comment: "昵称",
  },
  role: {
    type: DECIMAL,
    allowNull: false,
    defaultVal: 0b10,
    comment: "角色(0b1 管理员 0b10 普通用户)",
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultVal: 3,
    comment: "性别(1 男 2 女 3 保密)",
  },
  picture: {
    type: STRING,
    comment: "头像",
  },
});

module.exports = User;
