import seq from '../seq';
import Type from '../types';

const File = seq.define('file', {
  fileId: {
    type: Type.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true // 主键
  },
  name: {
    type: Type.STRING,
    allowNull: false,
    unique: true
  },
  fileName: {
    type: Type.STRING,
    allowNull: false,
    unique: true
  },
  size: {
    type: Type.INTEGER,
    allowNull: false,
    unique: false,
    comment: '文件大小'
  },
  type: {
    type: Type.STRING,
    allowNull: true,
    unique: false,
    comment: '文件类型'
  },
  path: {
    type: Type.STRING,
    allowNull: false,
    unique: true,
    comment: '文件路径'
  },
  videoImgPath: {
    type: Type.STRING,
    allowNull: true,
    unique: true,
    comment: '缩略图'
  },
  categoryId: {
    type: Type.STRING,
    allowNull: false,
    unique: false
  }
});

export default File;
