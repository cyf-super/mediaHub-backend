// const User = require('./User')
const FileCategory = require('./FileCategory')
const File = require('./File')

FileCategory.hasMany(File /**, {
  foreignKey: 'categoryId',
  as: 'files', // 指定别名，以便能够在查询时引用
  targetKey: 'categoryId',
  constraints: false, // 关闭外键约束
} */)

File.belongsTo(FileCategory/**, {
  foreignKey: 'categoryId',
  as: 'category', // 指定别名，以便能够在查询时引用
  targetKey: 'categoryId'
} */)


module.exports = {
  // User,
  FileCategory,
  File,
}
