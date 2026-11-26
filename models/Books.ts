import { DataTypes } from "sequelize";
import sequelize from "../sequelize.ts";

const Book = sequelize.define(
	"Book",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		genre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		published_year: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: "published_year",
		},
		author_id: {
			type: DataTypes.INTEGER,
			field: "author_id",
		},
	},
	{
		tableName: "books",
		timestamps: false,
	},
);

export default Book;
