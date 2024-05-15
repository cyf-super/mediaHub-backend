const User = require('./User')
const FileCategory = require('./FileCategory')
const File = require('./File')
const Setting = require('./Setting')

FileCategory.hasMany(File, {
  foreignKey: 'categoryId',
  otherKey: 'categoryId',
})

File.belongsTo(FileCategory, {
  foreignKey: 'categoryId',
  otherKey: 'categoryId',
})

module.exports = {
  User,
  FileCategory,
  File,
  Setting,
}
