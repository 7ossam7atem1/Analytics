const sequelize = require('../db/db.js');
const DataTypes = require('sequelize');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.TINYINT, //0:'pageView' 1: 'Click' 2:'EXIT'
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  browserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  websiteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
});
module.exports = Event;
