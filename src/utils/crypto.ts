import config from '../conf/config'
import bcrypt from 'bcrypt'

/**
 * password加密
 *
 * @param {string} content
 * @returns
 */
async function doBcrypt(content: string) {
  return await bcrypt.hash(content, config.saltRounds)
}

/**
 * 内容与加密的hash进行比较
 *
 * @param {string} content 原始数据
 * @param {string} hash 加密后的hash
 * @returns Boolean
 */
async function compareBcrypt(content: string, hash: string) {
  return await bcrypt.compare(content, hash)
}

export {
  doBcrypt,
  compareBcrypt,
}
