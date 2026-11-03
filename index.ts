import express from "express";
import Author from "./models/Authors.ts";
import Book from "./models/Books.ts";
import Loan from "./models/Loan.ts";
import Member from "./models/Member.ts";
import sequelize from "./sequelize.ts";

Author.hasMany(Book, { foreignKey: "authorId" });
Book.belongsTo(Author, { foreignKey: "authorId" });
Member.belongsToMany(Book, {
	through: Loan,
	foreignKey: "memberId",
	otherKey: "bookId",
});
Book.belongsToMany(Member, {
	through: Loan,
	foreignKey: "bookId",
	otherKey: "memberId",
});
Loan.belongsTo(Member, { foreignKey: "memberId" });
Loan.belongsTo(Book, { foreignKey: "bookId" });

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());

const testDBConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connection established.");
	} catch (error) {
		console.error(`Unable to connect to the database: ${error}`);
	}
	await sequelize.sync();
	console.log("Database synced");
};
testDBConnection();

app.get("/", (_req, res) => {
	res.send("Welcome!");
});

const allowedSorts = ["title", "published_year", "genre"];

app.get("/books", async (req, res) => {
	const { genre, sort } = req.query;
	if (typeof sort === "string" && !allowedSorts.includes(sort)) {
		return res.status(400).json({ error: "Invalid sort column" });
	}

	// let sql = "SELECT * FROM books";
	// const values: string[] = [];
	const where: Record<string, string> = {};
	//this holds information where the name is text and the value is text like genre: "fantasy".
	const order: [string, string][] = [];
	//this says that each information that is put inside is a pair of two texts like ["title", "ASC"] -> the column name and the direction (ascending -> sorting from A to Z).

	// if (typeof genre === "string") {
	// 	values.push(genre);
	// 	sql += " WHERE genre = $1";
	// }
	if (typeof genre === "string") {
		where.genre = genre;
	}

	// if (typeof sort === "string") {
	// 	sql += ` ORDER BY ${sort}`;
	// }
	if (typeof sort === "string") {
		order.push([sort, "ASC"]);
	}

	try {
		//const result = await pool.query(sql, values);
		const books = await Book.findAll({
			where,
			order,
			include: { model: Author, attributes: ["name"] },
		});
		//res.json(result.rows);
		res.json(books);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/authors", async (_req, res) => {
	try {
		//const result = await pool.query("SELECT * FROM authors");
		const authors = await Author.findAll();
		//res.json(result.rows);
		res.json(authors);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/members", async (_req, res) => {
	try {
		const members = await Member.findAll();
		res.json(members);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/loans", async (_req, res) => {
	try {
		const loans = await Loan.findAll({
			include: [
				{ model: Member, attributes: ["name"] },
				{ model: Book, attributes: ["title"] },
			],
		});
		res.json(loans);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/books/:id", async (req, res) => {
	const { id } = req.params;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}
	try {
		// const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
		const book = await Book.findByPk(id);
		//if (result.rows.length === 0) {
		if (!book) {
			return res.status(404).send("Book not found.");
		}
		// res.json(result.rows[0]);
		res.json(book);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/members/:id/loans", async (req, res) => {
	const { id } = req.params;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}
	try {
		const member = await Member.findByPk(id);
		if (!member) {
			return res.status(404).send("Member not found.");
		}
		const loans = await Loan.findAll({
			where: {
				memberId: id,
			},
			include: [
				{ model: Member, attributes: ["name"] },
				{ model: Book, attributes: ["title"] },
			],
		});
		res.status(200).json(loans);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/authors/:id/books", async (req, res) => {
	const { id } = req.params;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}
	try {
		// const author = await pool.query("SELECT id FROM authors WHERE id = $1", [
		// 	id,
		// ]);
		const author = await Author.findByPk(id);
		if (!author) {
			return res.status(404).send("Author not found.");
		}
		// const result = await pool.query(
		// 	"SELECT books.* FROM books JOIN authors ON books.author_id = authors.id WHERE authors.id = $1",
		// 	[id],
		// );
		const books = await Book.findAll({
			where: {
				authorId: id,
			},
		});
		// res.status(200).json(result.rows);
		res.status(200).json(books);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.post("/books", async (req, res) => {
	const { title, genre, published_year, author_id } = req.body;
	if (!title) {
		return res.status(400).send("Please add a title.");
	}
	try {
		// const result = await pool.query(
		// 	"INSERT INTO books (title, genre, published_year, author_id) VALUES ($1,$2,$3,$4) RETURNING *",
		// 	[title, genre, published_year, author_id],
		// );
		const book = await Book.create({
			title,
			genre,
			publishedYear: published_year,
			authorId: author_id,
		});
		//res.status(201).json(result.rows[0]);
		res.json(book);
	} catch (error: any) {
		if (error.code === "23503") {
			return res.status(400).json({
				error: "Something went wrong",
			});
		}
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.post("/authors", async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).send("Please add a name.");
	}
	try {
		// const result = await pool.query(
		// 	"INSERT INTO authors (name) VALUES ($1) RETURNING *",
		// 	[name],
		// );
		const author = await Author.create({ name });
		//res.status(201).json(result.rows[0]);
		res.json(author);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.post("/loans", async (req, res) => {
	const { member_id, book_id, loan_date, returned_at } = req.body;
	if (!member_id || !book_id) {
		return res.status(400).send("Please enter the member id and book id.");
	}
	try {
		const loan = await Loan.create({
			memberId: member_id,
			bookId: book_id,
			loanDate: loan_date,
			returnedAt: returned_at,
		});
		res.json(loan);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.put("/books/:id", async (req, res) => {
	//Id book to update:
	const { id } = req.params;
	//New details from request body:
	const { title, genre, publishedYear, authorId } = req.body;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	} else if (!title || !genre || !publishedYear || !authorId) {
		return res
			.status(400)
			.send("Please add a title, genre, published year and author id.");
	}
	try {
		// const result = await pool.query(
		// 	"UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
		// 	[title, genre, published_year, id],
		// );
		//Replace placeholders with new values and id
		const book = await Book.findByPk(id);
		//if (result.rows.length === 0) {
		if (!book) {
			return res.status(404).send("Book not found."); //No books with that id
		}
		/*
		book.title = title;
		book.genre = genre;
		book.publishedYear = published_year;
		await book.save();

		This doesn't work in a TS file as TS is being careful. sequelize.define deosn't tell TS which columns the model has, so 'book' is considered generic with no title on it.

		.update({}) takes an object and TS doesnt check its keys the way it checks book.title.
		*/
		await book.update({
			title,
			genre,
			publishedYear,
			authorId,
		});
		//res.json(result.rows[0]); //Otherwise send back updated book
		res.json(book);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.patch("/books/:id", async (req, res) => {
	const { id } = req.params;
	const { title, genre, publishedYear, authorId } = req.body;
	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).json({ error: "Request body is required" });
	}
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}

	try {
		const book = await Book.findByPk(id);
		if (!book) {
			return res.status(404).send("Book not found.");
		}
		// const result = await pool.query(
		// 	`UPDATE books
		//    SET title = COALESCE($1, title), genre = COALESCE($2, genre), published_year = COALESCE($3, published_year)
		//    WHERE id = $4
		//    RETURNING *`,
		// 	[title, genre, published_year, id],
		// );
		const changes: Record<string, unknown> = {};
		if (title !== undefined) changes.title = title;
		if (genre !== undefined) changes.genre = genre;
		if (publishedYear !== undefined) changes.publishedYear = publishedYear;
		if (authorId !== undefined) changes.authorId = authorId;

		await book.update(changes);

		// if (result.rows.length === 0) {
		// 	return res.status(404).send({ error: "Book not found" });
		// }

		//res.json(result.rows[0]);
		res.json(book);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.delete("/books/:id", async (req, res) => {
	const { id } = req.params;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	}
	try {
		// const result = await pool.query(
		// 	"DELETE FROM books WHERE id = $1 RETURNING *",
		// 	[id],
		// );
		const book = await Book.findByPk(id);
		// if (result.rows.length === 0) {
		if (!book) {
			return res.status(404).send("Book not found."); //No books with that id
		}
		await book.destroy();
		res.status(200).json({ message: "Book deleted successfully", book });
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.listen(port, () => {
	console.log(`The server is running on port: ${port}`);
});
