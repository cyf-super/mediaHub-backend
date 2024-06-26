import { DataTypes } from 'sequelize';
import seq from '../seq';
import Type from '../types';

const Setting = seq.define('setting', {
  swiper: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: '轮播图'
  },
  websiteName: {
    type: Type.STRING
  },
  logo: {
    type: Type.STRING
  }
});

export default Setting;
