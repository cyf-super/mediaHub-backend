import multer from '@koa/multer';
import Router from 'koa-router';
import {
  getWebsiteInfoController,
  getSwiperController,
  updateWebsiteController
} from '../controller/setting';
import { Files, KoaContext } from '../utils/types';
import { Context } from 'koa';

const router = new Router();
const upload = multer({});

router.prefix('/api');

router.get('/setting-swiper', async ctx => {
  ctx.body = await getSwiperController();
});

router.get('/website-info', async ctx => {
  ctx.body = await getWebsiteInfoController();
});

export type WebsiteInfo = {
  logo?: string;
  websiteName?: string;
};

router.post(
  '/website-info',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'websiteName', maxCount: 1 }
  ]),
  async (ctx: any) => {
    const files = ctx.files as Files;
    const { websiteName } = ctx.request.body as WebsiteInfo;
    console.log(websiteName, files);
    ctx.body = await updateWebsiteController({ websiteName }, files?.file?.[0]);
  }
);

export default router;
