import { Sequelize } from "sequelize";
// import config from "./index";
// const { DATABASE_DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = config;
export const db = new Sequelize(
  //DATABASE_DATABASE_NAME,
  "postgres",
  //DATABASE_USERNAME,
  "postgres",
  // DATABASE_PASSWORD,
  "1234",
  {
    host: "localhost", //config.DATABASE_HOST,
    port: 5432, // config.DATABASE_PORT,
    dialect: "postgres",
    logging: false,
  }
);
