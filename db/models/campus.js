const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: '1234 i dont care'
  },
  phonenumber: {
    type: Sequelize.STRING,
    defaultValue: '911'
  }
});
