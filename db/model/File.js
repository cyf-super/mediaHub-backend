const seq = require('../seq')
const { STRING, INTEGER } = require("../types");

const File = seq.define('files', {
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
  videoImgPath: {
    type: STRING,
    allowNull: true,
    unique: true,
    comment: '视频图片路径'
  },
  categoryId: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = File
