import { DataTypes } from "sequelize";
import sequelize from "../sequelize.ts";

const Loan = sequelize.define(
	"Loan",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		member_id: {
			type: DataTypes.INTEGER,
			field: "members_id",
			allowNull: false,
		},
		book_id: {
			type: DataTypes.INTEGER,
			field: "books_id",
			allowNull: false,
		},
		loan_date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: "loan_date",
			allowNull: false,
		},
		returned_at: {
			type: DataTypes.DATE,
			field: "returned_at",
		},
	},
	{
		tableName: "loans",
		timestamps: false,
	},
);

export default Loan;
