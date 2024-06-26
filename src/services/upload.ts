import { FileType } from './../utils/types';
import File from '../db/model/File';

interface CreateFileType {
  fileId: number;
  name: string;
  fileName: string;
  filePath: string;
  categoryId: string;
  videoImgPath: string;
  file: FileType;
}

export async function createFile(options: CreateFileType) {
  try {
    const { filePath, name, fileName, fileId, categoryId, file, videoImgPath } =
      options;
    const { mimetype: type, size } = file;
    const params = {
      fileId,
      name,
      fileName,
      size,
      type,
      path: filePath,
      categoryId,
      videoImgPath
    };
    const res = await File.create(params);

    return res.dataValues;
  } catch (error) {
    console.log('error--> ', error);
  }
}
