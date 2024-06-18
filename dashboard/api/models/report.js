import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Report = sequelize.define("Report", {
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

export default Report;
