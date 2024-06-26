import seq from '../seq';
import Type from '../types';

const FileCategory = seq.define('fileCategory', {
  categoryId: {
    type: Type.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true // 主键
  },
  name: {
    type: Type.STRING,
    allowNull: false,
    unique: true,
    comment: '类别名'
  },
  order: {
    type: Type.INTEGER,
    allowNull: false,
    unique: true,
    comment: '排序'
  }
});

export default FileCategory;
