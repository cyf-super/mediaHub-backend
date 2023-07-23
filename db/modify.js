const queryInterface = require('sequelize').queryInterface
const seq = require("./seq.js");

const g = seq.getQueryInterface()
console.log("🚀 ~ g:", g)


module.exports = {
  down: function (TableName, columnName) {
    return g.removeColumn(TableName, columnName);
  },

  up: function ({ type, TableName, columnName, allowNull = true }) {
    return g.addColumn(TableName, columnName, {
      type,
      allowNull,
    });
  }
};
