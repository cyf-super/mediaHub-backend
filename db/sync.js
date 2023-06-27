const seq = require('./seq.js')

require('./model/index')

seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('err')
})

seq.sync().then(() => {
  process.exit()
})
