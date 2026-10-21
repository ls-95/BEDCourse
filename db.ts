import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
	throw new Error("MONGODB_URI not found.");
}

mongoose
	.connect(uri)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB", err));
