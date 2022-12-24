import User from "./User.model";
import Permission from "./Permission.model";
import { Sequelize, Model, DataTypes } from "sequelize";

// Associations
User.hasMany(Permission, { as: "permissions", foreignKey: "userId" });
Permission.belongsTo(User, { as: "user", foreignKey: "userId" });
