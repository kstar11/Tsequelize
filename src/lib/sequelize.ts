import { Sequelize } from 'sequelize-typescript';
import config from '../../config/config';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.host,
  database: config.database,
  username: config.username,
  password: config.password,
  port: config.port,
  logging: true,
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
  timezone: '+8:00',
  modelPaths: [__dirname + '/src/schemas'],
});
