import { Files, KoaContext } from './../utils/types';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import multer from '@koa/multer';
import config from '../conf/config';
import {
  loginController,
  registerController,
  updateUserInfoController
} from '../controller/user';
import { validateUser } from '../middleware/Validator';

const router = new Router();
router.prefix('/api');

const upload = multer({});

export interface RegisterBody {
  username: string;
  password: string;
  picture?: string;
}

router.post('/register', validateUser(), async ctx => {
  const { username, password, picture } = ctx.request.body as RegisterBody;
  const data = await registerController({ username, password, picture });
  ctx.body = data;
});

type LoginBody = Omit<RegisterBody, 'picture'>;
/**
 * 登录
 */
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body as LoginBody;
  const data = await loginController(username, password);

  ctx.body = data;
});

router.get('/user', function (ctx) {
  let token = ctx.request.header.authorization;
  token = token.split(' ')[1];
  const info = jwt.verify(token, config.publicKey);
  ctx.body = {
    info
  };
});

interface UserInfoBody {
  info: string;
}

// 修改用户信息
router.post(
  '/user-info',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'info', maxCount: 1 }
  ]),
  async (ctx: any) => {
    const files = ctx.files as Files;
    const { info } = ctx.request.body as UserInfoBody;
    ctx.body = await updateUserInfoController(JSON.parse(info), files.file[0]);
  }
);

export default router;
