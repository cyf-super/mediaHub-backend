const Ajv = require('ajv')
const schemaUser = require('./schema/user.json')

const ajv = exports.ajv = new Ajv()

ajv.addSchema(schemaUser, 'user')
