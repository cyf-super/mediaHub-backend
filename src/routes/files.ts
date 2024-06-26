import Router from 'koa-router';
import {
  getFilesController,
  deleteFilesController,
  getFileController,
  updateFileController
} from '../controller/files';

export const router = new Router();

router.prefix('/api');

// 获取单个文件的信息
router.get('/file', async ctx => {
  const { fileId } = ctx.query;
  ctx.body = await getFileController(+fileId);
});

// 获取文件
router.get('/files', async ctx => {
  const { categoryId, pageSize = 10, currentPage = 1, name = '' } = ctx.query;
  ctx.body = await getFilesController({
    categoryId: <string>categoryId,
    pageSize: +pageSize,
    currentPage: +currentPage,
    name: <string>name
  });
});

export type DeteleFiles = {
  fileIds: number[];
  fileNames: string[];
};
// 删除单个/批量文件
router.delete('/files', async ctx => {
  const { fileIds, fileNames } = ctx.request.body as DeteleFiles;
  ctx.body = await deleteFilesController(fileIds, fileNames);
});

export type UpdateFiles = {
  fileId: number;
  name: string;
};
// 修改文件
router.put('/file', async ctx => {
  const { fileId, name } = ctx.request.body as UpdateFiles;
  ctx.body = await updateFileController({ fileId, name });
});

export default router;
