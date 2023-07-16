const seq = require("../seq");
const { STRING } = require("../types");

const FileCategory = seq.define('fileCategory', {
  categoryId: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '类别名'
  }
})

module.exports = FileCategory

