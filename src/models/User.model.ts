import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../db";
import Permission from "./Permission.model";

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

User.hasMany(Permission, {
  as: "permissions",
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Permission.belongsTo(User, { as: "user", foreignKey: "userId" });

export default User;
