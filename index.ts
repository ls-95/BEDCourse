import express from "express";
import { pool } from "./db.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (_req, res) => {
	try {
		const result = await pool.query("SELECT * FROM books");
		res.json(result.rows);
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.post("/books", async (req, res) => {
	const { title, genre, published_year } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO books (title, genre, published_year) VALUES ($1,$2,$3) RETURNING *",
			[title, genre, published_year],
		);
		res.json(result.rows[0]);
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.put("/books/:id", async (req, res) => {
	//Id book to update:
	const { id } = req.params;
	//New details from request body:
	const { title, genre, published_year } = req.body;
	try {
		const result = await pool.query(
			"UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
			[title, genre, published_year, id], //Replace placeholders with new values and id
		);
		if (result.rows.length === 0) {
			return res.status(404).send("Books not found."); //No books with that id
		}
		res.json(result.rows[0]); //Otherwise send back updated book
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.delete("/books/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const result = await pool.query(
			"DELETE FROM books WHERE id = $1 RETURNING *",
			[id],
		);
		if (result.rows.length === 0) {
			return res.status(404).send("Books not found.");
		}
		res.send("Book deleted successfully");
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.listen(port, () => {
	console.log(`The server is running on port: ${port}`);
});
