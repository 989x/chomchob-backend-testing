import { Sequelize, Dialect } from "sequelize";

const databaseConfig = {
  dialect: "mariadb" as Dialect,
  host: "127.0.0.1",
  username: "root",
  password: "secret",
  database: "bundlify",
};

const sequelize = new Sequelize(databaseConfig);

export default sequelize;
