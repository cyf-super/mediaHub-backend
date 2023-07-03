const fs = require("fs");

module.exports = function (app) {
  const curFiles = fs.readdirSync(__dirname)
  curFiles.forEach(file => {
    if (file !== 'index.js') {
      const router = require(`./${file}`)
      app.use(router.routes(), router.allowedMethods())
    }
  })
}