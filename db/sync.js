const seq = require("./seq.js");
const { up } = require('./modify')
const { STRING } = require('./types')


require("./model/index");

// up({
//   type: STRING,
//   TableName: 'file',
//   columnName: 'videoImgPath'
// })

seq
  .authenticate()
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("err");
  });

seq.sync({ force: true }).then(() => {
  console.log('Database synced.');
  process.exit();
}).catch((error) => {
  console.error('Error syncing database:', error);
});
