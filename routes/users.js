const router = require("koa-router")();
const jwt = require("jsonwebtoken");

const { publicKey } = require("../conf/config");
const { loginController } = require('../controller/user')

router.prefix("/api");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;

  const data = await loginController(username, password)

  ctx.body = data
});

router.get("/user", function (ctx, next) {
  let token = ctx.request.header.authorization;
  token = token.split(" ")[1];
  const info = jwt.verify(token, publicKey);
  ctx.body = {
    info,
  };
});

module.exports = router;
