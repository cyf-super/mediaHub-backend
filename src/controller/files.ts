import { ErrorModel, SuccessModel } from '../model/ResModel';
import Info from '../model/ErrorInfo';
import {
  getFileServer,
  getFilesServer,
  deleteFilesServer,
  updateFileServer
} from '../services/files';
import {
  getFileNameSuffix,
  getUploadFilesDir,
  getFileType,
  removeFile
} from '../utils/file';
import { UpdateFiles } from '../routes/files';

const {
  fileRequestFailInfo,
  noExistFileInfo,
  deleteFileSucceedInfo,
  deleteFileFailInfo,
  updateFileFailInfo,
  updateFileSuccessInfo,
  updateFileFailInfo1
} = Info;

/**
 * 获取单个文件
 * @param {*} fileId
 */
export async function getFileController(fileId: number) {
  const res = await getFileServer(fileId);
  if (!res) {
    return new ErrorModel(noExistFileInfo);
  }

  return new SuccessModel(res);
}

export type FilesParams = {
  categoryId: string;
  pageSize: number;
  currentPage: number;
  name: string;
};
/**
 * 获取文件
 * @param {*} param0
 * @returns
 */
export async function getFilesController(options: FilesParams) {
  const res = await getFilesServer(options);
  if (!res) {
    return new ErrorModel(fileRequestFailInfo);
  }
  return new SuccessModel({ data: res });
}

/**
 * 删除文件
 * @param {*} fileIds []
 * @returns
 */
export async function deleteFilesController(
  fileIds: number[],
  fileNames: string[]
) {
  const res = await deleteFilesServer(fileIds);
  if (res === 0) {
    return new ErrorModel(noExistFileInfo);
  }
  if (res > 0) {
    try {
      fileNames.forEach(async name => {
        const [fileName, suffix] = getFileNameSuffix(name);
        const type = getFileType(suffix);
        const ffmpegDir = getUploadFilesDir('ffmpeg/' + fileName);
        const filePath = getUploadFilesDir(type + '/' + name);
        removeFile(ffmpegDir);
        removeFile(filePath);
      });
    } catch (error) {
      console.log('删除本地文件失败 ', error);
    }

    return new SuccessModel({ count: res, ...deleteFileSucceedInfo });
  }
  return new ErrorModel(deleteFileFailInfo);
}

export async function updateFileController({ fileId, name }: UpdateFiles) {
  if (name === '') {
    return new ErrorModel(updateFileFailInfo1);
  }

  const res = await updateFileServer({ fileId, name });
  if (res) {
    return new SuccessModel(updateFileSuccessInfo);
  }
  return new ErrorModel(updateFileFailInfo);
}
