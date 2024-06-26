import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { addDir } from './file';

/**
 * 获取uuid
 * @returns
 */
const getUuid = () => uuidv4();

/**
 * 获取uploadFiles目录
 */
const getUploadFilesPath = () => path.join(__dirname, '..', 'uploadFiles');

/**
 * 生成子目录
 */
const getSubUploadFilesPath = (name: string) => {
  const uploadFilesPath = getUploadFilesPath();
  return path.join(uploadFilesPath, name);
};

/**
 * 设置路径
 */
const setUploadFilesPath = () => {
  const DIST_FOLDER_PATH = getUploadFilesPath();
  const dir = ['swiper', 'setting'];

  addDir(DIST_FOLDER_PATH);
  dir.forEach(name => {
    const swiperDir = getSubUploadFilesPath(name);
    addDir(swiperDir);
  });
};

/**
 * 剔除对象属性值为 undefind 的属性
 * @param {*} obj
 * @returns
 */
function deleteEmptyObject(obj: any) {
  const newObj = { ...obj };
  for (let key in newObj) {
    if (!newObj[key]) {
      delete newObj[key];
    }
  }

  return newObj;
}

/**
 * 将 buffer 转成字符串
 * @param {*} buffer
 * @returns
 */
function transformBuffer(buffer: string) {
  return Buffer.from(buffer, 'latin1').toString('utf8');
}

/**
 * 绝对路径转为相对路径
 * @param {*} releavePath
 */
function transformAbsolutePath(absolutePath: string) {
  return (
    '\\' + path.relative(path.join(process.cwd(), 'uploadFiles'), absolutePath)
  ).replace(/\\/g, '/');
}

export {
  getUuid,
  getUploadFilesPath,
  getSubUploadFilesPath,
  setUploadFilesPath,
  deleteEmptyObject,
  transformBuffer,
  transformAbsolutePath
};
