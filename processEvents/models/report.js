const sequelize = require('../db/db.js');
const DataTypes = require('sequelize');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  websiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Report;
