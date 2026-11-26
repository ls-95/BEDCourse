import cors from "cors";
import express from "express";
import { ForeignKeyConstraintError } from "sequelize";
import Author from "./models/Authors.ts";
import Book from "./models/Books.ts";
import Loan from "./models/Loan.ts";
import Member from "./models/Member.ts";
import sequelize from "./sequelize.ts";

Author.hasMany(Book, { foreignKey: "author_id" });
Book.belongsTo(Author, { foreignKey: "author_id" });
Member.belongsToMany(Book, {
	through: Loan,
	foreignKey: "member_id",
	otherKey: "book_id",
});
Book.belongsToMany(Member, {
	through: Loan,
	foreignKey: "book_id",
	otherKey: "member_id",
});
Loan.belongsTo(Member, { foreignKey: "member_id" });
Loan.belongsTo(Book, { foreignKey: "book_id" });

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

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

	const where: Record<string, string> = {};
	const order: [string, string][] = [];

	if (typeof genre === "string") {
		where.genre = genre;
	}

	if (typeof sort === "string") {
		order.push([sort, "ASC"]);
	}

	try {
		const books = await Book.findAll({
			where,
			order,
			include: { model: Author, attributes: ["name"] },
		});
		res.json(books);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/authors", async (_req, res) => {
	try {
		const authors = await Author.findAll();
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
		const book = await Book.findByPk(id);
		if (!book) {
			return res.status(404).send("Book not found.");
		}
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
				member_id: id,
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
		const author = await Author.findByPk(id);
		if (!author) {
			return res.status(404).send("Author not found.");
		}
		const books = await Book.findAll({
			where: {
				author_id: id,
			},
		});
		res.status(200).json(books);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.post("/books", async (req, res) => {
	const { title, genre, published_year, author_id } = req.body;

	if (!title || !genre || !published_year || !author_id) {
		return res.status(400).json({
			error: "Please add a title, genre, published year and author id.",
		});
	}

	try {
		const book = await Book.create({
			title,
			genre,
			published_year,
			author_id,
		});
		res.json(book);
	} catch (error) {
		if (error instanceof ForeignKeyConstraintError) {
			return res.status(400).json({ error: "Author does not exist" });
		}
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

app.post("/authors", async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).send("Please add a name.");
	}

	try {
		const author = await Author.create({ name });
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
			member_id,
			book_id,
			loan_date,
			returned_at,
		});
		res.json(loan);
	} catch (error) {
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.put("/books/:id", async (req, res) => {
	const { id } = req.params;
	const { title, genre, published_year, author_id } = req.body;

	if (!Number.isInteger(Number(id))) {
		return res.status(400).json({ error: "Please enter a numeric id." });
	}

	if (!title || !genre || !published_year || !author_id) {
		return res.status(400).json({
			error: "Please add a title, genre, published year and author id.",
		});
	}

	try {
		const book = await Book.findByPk(id);
		if (!book) {
			return res.status(404).json({ error: "Book not found." });
		}

		await book.update({
			title,
			genre,
			published_year,
			author_id,
		});
		res.json(book);
	} catch (error) {
		if (error instanceof ForeignKeyConstraintError) {
			return res.status(400).json({ error: "Author does not exist" });
		}
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
});

app.patch("/books/:id", async (req, res) => {
	const { id } = req.params;
	const { title, genre, published_year, author_id } = req.body;

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

		const changes: Record<string, unknown> = {};
		if (title !== undefined) changes.title = title;
		if (genre !== undefined) changes.genre = genre;
		if (published_year !== undefined) changes.published_year = published_year;
		if (author_id !== undefined) changes.author_id = author_id;

		await book.update(changes);

		res.json(book);
	} catch (error) {
		if (error instanceof ForeignKeyConstraintError) {
			return res.status(400).json({ error: "Author does not exist" });
		}
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
		const book = await Book.findByPk(id);
		if (!book) {
			return res.status(404).send("Book not found.");
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
