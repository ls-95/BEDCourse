import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_DATABASE as string,
	process.env.DB_USER as string,
	process.env.DB_PASSWORD as string,
	{
		host: process.env.DB_HOST as string,
		port: Number(process.env.DB_PORT),
		dialect: "postgres",
		logging: console.log,
	},
);
/*
new Sequelize -> I want to connect to a db.
first three are like the keys to the db. The tell sequelize the name of the db, the username and the password.

{ js object } -> this is like a container that holds extra information for sequelize. It tells it what kind of db it is and where it is.
- host -> address
- port -> door number
- dialect -> tells sequelize we are using postgres db. (sequelize can work with different db like MySQL or SQLite).
- logging -> optional, when set to true, sequelize will print out all SQL queries it is running. Can be helpful for debugging but can also be noisy. Setting it false for now keeps it kind of clean.


*/

export default sequelize;
