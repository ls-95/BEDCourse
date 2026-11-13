import "../instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import Author from "../models/Authors.ts";
import Book from "../models/Books.ts";
import Loan from "../models/Loan.ts";
import Member from "../models/Member.ts";
import sequelize from "../sequelize.ts";
import { reportError } from "../utils/reportError.ts";

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

export const app = express();

app.use(express.json());

const testDBConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connection established.");
		await sequelize.sync();
		console.log("Database synced");
	} catch (error) {
		console.error(`Unable to connect to the database: ${error}`);
	}
};
void testDBConnection();

app.get("/", (_req, res) => {
	res.send("Welcome!");
});

// app.get("/debug-sentry", function mainHandler(_req, _res) {
// 	throw new Error("My first Sentry error!");
// });

const allowedSorts = ["title", "published_year", "genre"];

app.get("/books", async (req, res) => {
	Sentry.addBreadcrumb({ message: "Fetch all books", level: "info" });
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
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/authors", async (_req, res) => {
	Sentry.addBreadcrumb({ message: "Fetch all authors", level: "info" });
	try {
		const authors = await Author.findAll();
		res.json(authors);
	} catch (error) {
		reportError(error, "authors");
		// Sentry.setTag("feature", "authors");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/members", async (_req, res) => {
	Sentry.addBreadcrumb({ message: "Fetch all members", level: "info" });
	try {
		const members = await Member.findAll();
		res.json(members);
	} catch (error) {
		reportError(error, "members");
		// Sentry.setTag("feature", "members");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/loans", async (_req, res) => {
	Sentry.addBreadcrumb({ message: "Fetch all loans", level: "info" });
	try {
		const loans = await Loan.findAll({
			include: [
				{ model: Member, attributes: ["name"] },
				{ model: Book, attributes: ["title"] },
			],
		});
		res.json(loans);
	} catch (error) {
		reportError(error, "loans");
		// Sentry.setTag("feature", "loans");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/books/:id", async (req, res) => {
	Sentry.addBreadcrumb({ message: "Fetch books by id", level: "info" });
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
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/members/:id/loans", async (req, res) => {
	Sentry.addBreadcrumb({
		message: "Fetch all loans by member id",
		level: "info",
	});
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
		reportError(error, "loans");
		// Sentry.setTag("feature", "loans");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.get("/authors/:id/books", async (req, res) => {
	Sentry.addBreadcrumb({
		message: "Fetch all books by author id",
		level: "info",
	});
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
				authorId: id,
			},
		});
		res.status(200).json(books);
	} catch (error) {
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.post("/books", async (req, res) => {
	Sentry.addBreadcrumb({ message: "Send a book", level: "info" });
	const { title, genre, published_year, author_id } = req.body;
	if (!title) {
		return res.status(400).send("Please add a title.");
	}
	try {
		const book = await Book.create({
			title,
			genre,
			publishedYear: published_year,
			authorId: author_id,
		});
		res.json(book);
	} catch (error: any) {
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
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
	Sentry.addBreadcrumb({ message: "Send an author", level: "info" });
	const { name } = req.body;
	if (!name) {
		return res.status(400).send("Please add a name.");
	}
	try {
		const author = await Author.create({ name });
		res.json(author);
	} catch (error) {
		reportError(error, "authors");
		// Sentry.setTag("feature", "authors");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.post("/loans", async (req, res) => {
	Sentry.addBreadcrumb({ message: "Send a loan", level: "info" });
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
		reportError(error, "loans");
		// Sentry.setTag("feature", "loans");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.put("/books/:id", async (req, res) => {
	Sentry.addBreadcrumb({ message: "Update a whole book by id", level: "info" });
	const { id } = req.params;
	const { title, genre, publishedYear, authorId } = req.body;
	if (!Number.isInteger(Number(id))) {
		return res.status(400).send("Please enter a numeric id.");
	} else if (!title || !genre || !publishedYear || !authorId) {
		return res
			.status(400)
			.send("Please add a title, genre, published year and author id.");
	}
	try {
		const book = await Book.findByPk(id);
		if (!book) {
			return res.status(404).send("Book not found.");
		}
		await book.update({
			title,
			genre,
			publishedYear,
			authorId,
		});
		res.json(book);
	} catch (error) {
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.patch("/books/:id", async (req, res) => {
	Sentry.addBreadcrumb({
		message: "Update parts of a book by id",
		level: "info",
	});
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
		const changes: Record<string, unknown> = {};
		if (title !== undefined) changes.title = title;
		if (genre !== undefined) changes.genre = genre;
		if (publishedYear !== undefined) changes.publishedYear = publishedYear;
		if (authorId !== undefined) changes.authorId = authorId;

		await book.update(changes);

		res.json(book);
	} catch (error) {
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

app.delete("/books/:id", async (req, res) => {
	Sentry.addBreadcrumb({ message: "Delete a book", level: "info" });
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
		reportError(error, "books");
		// Sentry.setTag("feature", "books");
		// Sentry.captureException(error);
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

Sentry.setupExpressErrorHandler(app);
