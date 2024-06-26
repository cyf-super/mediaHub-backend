import { UploadFileType } from './../routes/upload';
import path from 'path';
import fse from 'fs-extra';
import { ErrorModel, SuccessModel } from '../model/ResModel';
import Info from '../model/ErrorInfo';
import { createFile } from '../services/upload';
import m3u8 from '../utils/transform';
import { FileType, Files } from '../utils/types';

const { fileSizeExceedInfo, uploadFailInfo, uploadSuccessInfo } = Info;

const DIST_FOLDER_PATH = path.join(__dirname, '..', 'uploadFiles');

const MIX_SIZE = 1024 * 1024 * 204.8;

interface SaveFileParams {
  name: string;
  categoryId: string;
  files: UploadFileType;
}

export async function saveFile({ name, categoryId, files }: SaveFileParams) {
  const file = files.file[0];
  const { size, mimetype } = file;
  if (size > MIX_SIZE) {
    return new ErrorModel(fileSizeExceedInfo);
  }

  const fileDir = await ensureFileDir(DIST_FOLDER_PATH, mimetype);

  try {
    const fileName = Date.now() + '.' + name;
    let filePath = path.join(fileDir, fileName);
    await fse.writeFile(filePath, file.buffer);

    filePath = (
      '\\' + path.relative(path.join(process.cwd(), 'uploadFiles'), filePath)
    ).replace(/\\/g, '/');

    let videoImgPath;
    if (filePath.startsWith('/video')) {
      const [m3u8Path, dirPath] = await m3u8(filePath);

      const imgFile = files.poster[0],
        imgName = imgFile.fieldname + '.png';

      await fse.writeFile(path.join(dirPath, imgName), imgFile.buffer);
      videoImgPath = m3u8Path.replace('index.m3u8', imgName);

      filePath = m3u8Path;
    }

    const options = {
      filePath,
      name,
      fileName,
      fileId: Date.now(),
      categoryId,
      file,
      videoImgPath
    };
    const res = await createFile(options);
    if (res) {
      return new SuccessModel(uploadSuccessInfo);
    }
  } catch (err) {
    console.log('🚀 ~ saveFile ~ err:', err);
    return new ErrorModel({ ...uploadFailInfo });
  }
}

async function ensureFileDir(DIST_FOLDER_PATH: string, mimetype: string) {
  let dir = mimetype.split('/')[0];
  if (mimetype.endsWith('pdf')) {
    dir = mimetype.split('/').pop();
  }
  const fileDir = path.join(DIST_FOLDER_PATH, dir);

  const isExists = await fse.pathExists(fileDir);
  if (!isExists) fse.ensureDir(fileDir);

  return fileDir;
}
