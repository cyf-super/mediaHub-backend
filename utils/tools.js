const { v4: uuidv4 } = require('uuid')

/**
 * 获取uuid
 * @returns
 */
const getUuid = () => uuidv4()

module.exports = {
  getUuid,
}
