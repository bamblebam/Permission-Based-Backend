import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../db";

import User from "./User.model";

const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Permission;
