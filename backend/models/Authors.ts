import { DataTypes } from "sequelize";
import sequelize from "../sequelize.ts";

const Author = sequelize.define(
	"Author",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		tableName: "authors",
		timestamps: false,
	},
);

export default Author;
