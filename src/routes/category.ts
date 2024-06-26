import { KoaContext } from './../utils/types';
import Router from 'koa-router';
import {
  categoryCont,
  createCategoryCont,
  updateCategoryCont,
  deleteCategoryCont,
  swapCategoryCont
} from '../controller/category';

const router = new Router();
router.prefix('/api');

router.get('/file-category', async ctx => {
  const data = await categoryCont();
  ctx.body = data;
});

router.post('/file-category', async ctx => {
  const { name } = ctx.request.body as {
    name: string;
  };
  const data = await createCategoryCont(name);
  ctx.body = data;
});

export type FileCategoryType = {
  name: string;
  categoryId: string;
};
router.put('/file-category', async ctx => {
  const { name, categoryId } = ctx.request.body as FileCategoryType;
  const data = await updateCategoryCont(categoryId, name);
  ctx.body = data;
});

router.delete('/file-category', async ctx => {
  const { categoryId } = ctx.request.body as Omit<FileCategoryType, 'name'>;
  const data = await deleteCategoryCont(categoryId);
  ctx.body = data;
});

router.post('/swap-category', async ctx => {
  const { categoryIds } = ctx.request.body as {
    categoryIds: string[];
  };
  ctx.body = await swapCategoryCont(categoryIds);
});

export default router;
