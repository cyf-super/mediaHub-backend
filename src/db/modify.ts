import seq from './seq.js';

const g = seq.getQueryInterface();

export default {
  down: function (TableName: string, columnName: string) {
    return g.removeColumn(TableName, columnName);
  },

  up: function ({
    type,
    TableName,
    columnName,
    allowNull = true
  }: {
    type: string;
    TableName: string;
    columnName: string;
    allowNull: boolean;
  }) {
    return g.addColumn(TableName, columnName, {
      type,
      allowNull
    });
  }
};
