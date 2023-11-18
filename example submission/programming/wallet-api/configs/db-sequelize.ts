import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const dialect: Dialect = process.env.DB_DIALECT as Dialect;
const host: string = process.env.DB_HOST as string;
const username: string = process.env.DB_USERNAME as string;
const password: string = process.env.DB_PASSWORD as string;
const database: string = process.env.DB_DATABASE as string;

const sequelize = new Sequelize({
  dialect,
  host,
  username,
  password,
  database,
});

export default sequelize;
