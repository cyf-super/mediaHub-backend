# MediaHub 后端

资料管理网站[https://github.com/cyf-super/react-video]的后端

技术栈：koa
数据库：MySql
鉴权机制：token（koa-jwt）

## 使用

在 conf 目录下新建 config.js 和 db.js

db.js：数据库相关配置

```
let MYSQL_CONF = {
  host: xxx,
  user: xxx,
  password: xxx,
  pord: xxx,
  database: xxx,
};

module.exports = {
  MYSQL_CONF,
};
```

config.js：密钥信息

```
module.exports = {
  publicKey: xxx,
  CRYPTO_KEY: xxx,
  saltRounds: 10
};
```

```
// 安装依赖
npm i

// 运行
npm run start
```
