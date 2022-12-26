import { Sequelize } from "sequelize";

// const sequelize = new Sequelize(
//   "postgres://postgres:admin@localhost:5432/postgres",
//   {
//     logging: false,
//   }
// );

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "postgres",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "admin",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
