const seq = require('../seq')
const { STRING, INTEGER } = require("../types");

const File = seq.define('file', {
  fileId: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: false
  },
  createTime: {
    type: INTEGER,
    allowNull: false,
    unique: false,
    comment: '创建时间'
  },
  size: {
    type: INTEGER,
    allowNull: false,
    unique: false,
    comment: '文件大小'
  },
  type: {
    type: STRING,
    allowNull: true,
    unique: false,
    comment: '文件类型'
  },
  path: {
    type: STRING,
    allowNull: false,
    unique: false,
    comment: '文件路径'
  }
})

module.exports = File
