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
    unique: true
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
    unique: true,
    comment: '文件路径'
  },
  categoryId: {
    type: STRING,
    allowNull: true,
    unique: false
  },
})

module.exports = File
