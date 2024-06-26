import seq from './seq';

import './model';

// up({
//   type: STRING,
//   TableName: 'file',
//   columnName: 'videoImgPath'
// })

seq
  .authenticate()
  .then(() => {
    console.log('ok');
  })
  .catch(() => {
    console.log('err');
  });

seq
  .sync({ force: false })
  .then(() => {
    console.log('Database synced.');
    process.exit();
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });
