import express from "express";
import { pool } from "./db.ts";

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());

app.get("/", (_req, res) => {
	res.send("Welcome!");
});

const allowedSorts = ["title", "published_year", "genre"];

app.get("/books", async (req, res) => {
	const { genre, sort } = req.query;
	if (typeof sort === "string" && !allowedSorts.includes(sort)) {
		return res.status(400).json({ error: "Invalid sort column" });
	}

	let sql = "SELECT * FROM books";
	const values: string[] = [];

	if (typeof genre === "string") {
		values.push(genre);
		sql += " WHERE genre = $1";
	}

	if (typeof sort === "string") {
		sql += ` ORDER BY ${sort}`;
	}

	try {
		const result = await pool.query(sql, values);
		res.json(result.rows);
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.get("/authors", async (_req, res) => {
	try {
		const result = await pool.query("SELECT * FROM authors");
		res.json(result.rows);
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

//Easy 1:
//When putting http://localhost:3000/books/9999: Book not found.
//When putting http://localhost:3000/books/abc: invalid input syntax for type integer: "abc"

//Easy 2:
//Now with the validate input, the result is:
//400 Bad Request Please enter a numeric id.
app.get("/books/:id", async (req, res) => {
	const { id } = req.params;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}
	try {
		const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
		if (result.rows.length === 0) {
			return res.status(404).send("Book not found.");
		}
		res.json(result.rows[0]);
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

//app.get("/authors/:id/books") -> didn't manage to do it.

app.post("/books", async (req, res) => {
	const { title, genre, published_year, author_id } = req.body;
	if (!title) {
		return res.status(400).send("Please add a title.");
	}
	try {
		const result = await pool.query(
			"INSERT INTO books (title, genre, published_year, author_id) VALUES ($1,$2,$3,$4) RETURNING *",
			[title, genre, published_year, author_id],
		);
		res.status(201).json(result.rows[0]);
	} catch (error: any) {
		if (error.code === "23503") {
			return res.status(400).json({
				error: "Something went wrong",
			});
		}
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.post("/authors", async (req, res) => {
	const { name } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO authors (name) VALUES ($1) RETURNING *",
			[name],
		);
		res.status(201).json(result.rows[0]);
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
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	} else if (!title) {
		return res.status(400).send("Please add a title.");
	}
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

app.patch("/books/:id", async (req, res) => {
	const { id } = req.params;
	const { title, published_year, genre } = req.body;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}

	if (Object.keys(req.body).length === 0) {
		return res.status(400).send({ error: "Body is empty" });
	}

	try {
		const result = await pool.query(
			`UPDATE books
       SET title = COALESCE($1, title), genre = COALESCE($2, genre), published_year = COALESCE($3, published_year)
       WHERE id = $4
       RETURNING *`,
			[title, genre, published_year, id],
		);

		if (result.rows.length === 0) {
			return res.status(404).send({ error: "Book not found" });
		}

		res.json(result.rows[0]);
	} catch (error) {
		res
			.status(500)
			.send(error instanceof Error ? error.message : "Something went wrong");
	}
});

app.delete("/books/:id", async (req, res) => {
	const { id } = req.params;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}
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
