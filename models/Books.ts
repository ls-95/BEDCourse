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
		publishedYear: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: "published_year",
		},
		authorId: {
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
