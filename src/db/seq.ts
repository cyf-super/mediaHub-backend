import { Sequelize, Options } from 'sequelize';
import MYSQL_CONF from '../conf/db';

const { host, user, password, database } = MYSQL_CONF;

const config: Options = {
  host,
  dialect: 'mysql' // 数据库类型
};

const seq = new Sequelize(database, user, password, config);

export default seq;
