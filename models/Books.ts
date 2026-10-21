import mongoose from "mongoose";

// import { authorSchema } from "./Authors";

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Title is required."],
	},
	genre: {
		type: String,
		lowercase: true,
		enum: [
			"romance",
			"fantasy",
			"science fiction",
			"dystopian",
			"mystery",
			"crime",
			"thriller",
			"horror",
			"historical fiction",
			"literary fiction",
			"memoir",
			"biography",
			"self-help",
			"history",
			"true crime",
			"essays",
			"journalism",
			"children",
			"young adult",
			"graphic novel",
			"manga",
		],
	},
	publishedYear: {
		type: Number,
		min: [1452, "No book was published before the year 1452."],
		max: [2026, "Cannot be published in the future."],
	},
	author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }
},
{ timestamps: true }
);
//Defines the structure of our data

export const Book = mongoose.model("Book", bookSchema);
//We use a model as a way to interact with our data. A variable called Book and it represents the item collection in our MongoDB. It is a blue for creating, reading, updating and deleting items in the database.
