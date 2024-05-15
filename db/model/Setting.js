const { DataTypes } = require('sequelize')
const seq = require('../seq')
const { STRING } = require('../types')

const Setting = seq.define('settings', {
  swiper: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: '轮播图',
  },
  title: {
    type: STRING,
  },
})

module.exports = Setting