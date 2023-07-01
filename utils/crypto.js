const { CRYPTO_KEY } = require('../conf/config')
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.error('crypto support is disabled!');
}

function getMd5ByCrypto(content) {
  if (!crypto) return
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// password加密
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_KEY}`
  return getMd5ByCrypto(str) ?? content
}

module.exports = doCrypto