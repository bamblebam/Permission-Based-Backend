import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../db";

import Permission from "./Permission.model";
import Employee from "./Employee.model";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

//User-Permission Relationship
User.hasMany(Permission, {
  as: "permissions",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Permission.belongsTo(User, { as: "user", foreignKey: "userId" });

//User-Employee Relationship
User.hasOne(Employee, {
  as: "employee",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Employee.belongsTo(User, { as: "user", foreignKey: "userId" });

export default User;
