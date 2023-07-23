const User = require('./User')
const FileCategory = require('./FileCategory')
const File = require('./File')

FileCategory.hasMany(File, {
  foreignKey: 'categoryId',
  targetKey: 'fileId',
})

File.belongsTo(FileCategory, {
  foreignKey: 'categoryId'
})


module.exports = {
  User,
  FileCategory,
  File,
}
