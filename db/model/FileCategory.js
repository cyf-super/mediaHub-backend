const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const FileCategory = seq.define('fileCategory', {
  categoryId: {
    type: STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, // 主键
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '类别名',
  },
  order: {
    type: INTEGER,
    allowNull: false,
    unique: true,
    comment: '排序',
  },
})

module.exports = FileCategory
