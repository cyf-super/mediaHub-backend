const { saltRounds } = require('../conf/config')
const bcrypt = require('bcrypt')

/**
 * password加密
 * 
 * @param {string} content 
 * @returns 
 */
async function doBcrypt(content) {
  return await bcrypt.hash(content, saltRounds)
}

/**
 * 内容与加密的hash进行比较
 * 
 * @param {string} content 原始数据
 * @param {string} hash 加密后的hash
 * @returns Boolean
 */
async function compareBcrypt(content, hash) {
  return await bcrypt.compare(content, hash)
}

module.exports = {
  doBcrypt,
  compareBcrypt
}