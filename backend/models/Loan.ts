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
		memberId: {
			type: DataTypes.INTEGER,
			field: "members_id",
			allowNull: false,
		},
		bookId: {
			type: DataTypes.INTEGER,
			field: "books_id",
			allowNull: false,
		},
		loanDate: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: "loan_date",
			allowNull: false,
		},
		returnedAt: {
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
