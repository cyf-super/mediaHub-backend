import User from './User';
import FileCategory from './FileCategory';
import File from './File';
import Setting from './Setting';

FileCategory.hasMany(File, {
  foreignKey: 'categoryId',
  otherKey: 'categoryId'
} as any);

File.belongsTo(FileCategory, {
  foreignKey: 'categoryId',
  otherKey: 'categoryId'
} as any);

export default {
  User,
  FileCategory,
  File,
  Setting
};
