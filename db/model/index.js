const User = require('./User')
const FileCategory = require('./FileCategory')
const File = require('./File')

FileCategory.hasMany(File, {
  foreignKey: 'categoryId'
})

File.belongsTo(FileCategory, {
  foreignKey: 'categoryId'
})


module.exports = {
  User,
  FileCategory,
  File,
}
