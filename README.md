# MediaHub 后端

[资料管理网站](https://github.com/cyf-super/react-video)的后端

技术栈：koa  
数据库：MySql  
鉴权机制：token（koa-jwt）

## 使用

在 conf 目录下新建 config.js 和 db.js

db.js：数据库相关配置

```
let MYSQL_CONF = {
  host: 'localhost', // 域名，本地为localhost
  user: 'xxx', // 账号
  password: 'xxx', // 密码
  pord: 3306, // 端口号 默认为 3306
  database: 'xxxx' // 数据库名称
};

export default {
  MYSQL_CONF,
};
```

config.js：密钥信息

```
export default {
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
