const seq = require('./seq.js')

const g = seq.getQueryInterface()

module.exports = {
  down: function (TableName, columnName) {
    return g.removeColumn(TableName, columnName)
  },

  up: function ({ type, TableName, columnName, allowNull = true }) {
    return g.addColumn(TableName, columnName, {
      type,
      allowNull,
    })
  },
}
