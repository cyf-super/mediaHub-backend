import Ajv from 'ajv';
import schemaUser from './schema/user.json';

export const ajv = (exports.ajv = new Ajv());

ajv.addSchema(schemaUser, 'user');
