const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const File = seq.define('files', {
  fileId: {
    type: STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, // 主键
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  fileName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  size: {
    type: INTEGER,
    allowNull: false,
    unique: false,
    comment: '文件大小',
  },
  type: {
    type: STRING,
    allowNull: true,
    unique: false,
    comment: '文件类型',
  },
  path: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '文件路径',
  },
  videoImgPath: {
    type: STRING,
    allowNull: true,
    unique: true,
    comment: '缩略图',
  },
  categoryId: {
    type: STRING,
    allowNull: false,
    unique: false,
  },
})

module.exports = File
