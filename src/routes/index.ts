import fs from 'fs';
import Koa from 'koa';

export default function (app: Koa) {
  const curFiles = fs.readdirSync(__dirname);
  curFiles.forEach(file => {
    if (file !== 'index.ts') {
      const router = require(`./${file}`).default;
      app.use(router.routes());
    }
  });
}
