import { Files, KoaContext } from './../utils/types';
import Router from 'koa-router';
import multer from '@koa/multer';
import { saveFile } from '../controller/upload';
import { swpierUploadControll } from '../controller/setting';

const router = new Router();
router.prefix('/api');

const upload = multer({
  limits: {
    // fileSize: 200 * 1024 * 1024
  }
});

interface SettingSwiper {
  list: string;
}
router.post(
  '/setting-swiper',
  upload.fields([{ name: 'file', maxCount: 10 }]),
  async (ctx: any) => {
    const files = ctx.files;
    const { list } = ctx.request.body as SettingSwiper;
    ctx.body = await swpierUploadControll(files.file, JSON.parse(list));
  }
);

export interface Uploadparams {
  categoryId: string;
  fileId: number;
  name: string;
}

export type UploadFileType = Files & {
  poster: {
    fieldname: string;
    buffer: Buffer;
  }[];
};

router.post(
  '/upload',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'poster', maxCount: 1 }
  ]),
  async (ctx: any) => {
    const files = ctx.files as UploadFileType;
    const { categoryId, name } = ctx.request.body;
    ctx.body = await saveFile({ categoryId, name, files });
  }
);

export default router;
