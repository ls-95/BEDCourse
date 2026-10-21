import dotenv from "dotenv";
import express from "express";
import "./db.ts";
import mongoose from "mongoose";
import { Book } from "./models/Books.ts";
import { Author } from "./models/Authors.ts";

dotenv.config();

const app = express();
app.use(express.json());

//error handling
// mongoose
// 	.connect(uri)
// 	.then(() => console.log("Connected to MongoDB"))
// 	.catch((err) => console.error("Could not connect to MongoDB", err));

/* Old style:
mongoose.connect("mongodb://localhost:27017/myfirstdatabase", {
  useNewUrlParser: true, -> this ensures the connection string is parsed correctly
  useUnifiedTopology: true, -> improves the connection handling
});
*/

//New style
// mongoose.connect("mongodb://localhost:27017/myfirstdatabase");

app.get("/books", async (req, res) => {
	try {
		const filter: any = {};
		if(req.query.genre) {
			filter.genre = req.query.genre;
		}
		const sort = (req.query.sort as string) || "title";
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 5;
		const skip = (page - 1) * limit;

		const data = await Book.find(filter).sort(sort).limit(limit).skip(skip).populate("author", "name");
		const total = await Book.countDocuments(filter);
		res.json({ page, limit, total, data });
	} catch (err) {
		res.status(500).json({ error: "Failed to get books.", err });
	}
});
/*
When we visit the route, the server runs the callback function.

In the callback function we have the item.find() -> this retrieves all items from the database.
(if in library, it asks the librarian to show all the books in the library).

res.json(items) -> sends the list of items as a JSON response to us or to the user that is asking for it.
*/

app.get("/authors", async (_req, res) => {
	try {
		const authors = await Author.find();
		if (!authors) {
			return res.status(404).json({ error: "Authors not found." });
		}
		res.json(authors);
	} catch (err) {
		res.status(500).json({ error: "Failed to get authors.", err });
	}
});

app.get("/books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ error: "Book not found." });
		}
		res.json(book);
	} catch (err) {
		res.status(500).json({ error: "Failed to get books.", err });
	}
});

app.get("/authors/:id/books", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		if (!author) {
			return res.status(404).json({ error: "Author not found." });
		}
		const books = await Book.find({ author: author._id });
		res.json(books);
	} catch (err) {
		res.status(500).json({ error: "Failed to get books.", err });
	}
});

app.post("/books", async (req, res) => {
	try {
		const newBook = new Book(req.body);
		await newBook.save();
		res.status(201).json(newBook);
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({ error: err.message });
		}
		res.status(500).json({ error: "Failed to post book.", err });
	}
});
/*
Users can send data to this route to add new books.
req.body -> the data the user sends in the request (ex. that fits the bookSchema).

The it saves the new book to the database.

Then the res.json(newBooks) sends the newly added book as a JSON response to confirm to us that it was saved.

Why is this asynchronous?
That is mainly because it is waiting for the items to be saved which might take some time.

Once the item is successfully saved to the database, the code continues to res.json(newBook).

The callback function is async (req, res) => {}
*/

app.post("/authors", async (req, res) => {
	try {
		const newAuthor = new Author(req.body);
		await newAuthor.save();
		res.status(201).json(newAuthor);
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({ error: err.message });
		}
		res.status(500).json({ error: "Failed to post author.", err });
	}
});

app.put("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
			new: true,
		});
		if (!updatedBook) {
			return res.status(404).json({ error: "Book not found." });
		}
		res.json(updatedBook);
	} catch (err) {
		res.status(500).json({ error: "Failed to update books.", err });
	}
});
/*
	The id part is a placeholder for the ID of the book that we want to update.
	The request.params grabs the ID from the URL.
	The request.body contains the new data that we want to update. 
	The Book.findByIdAndUpdate() .> this is the mongoose method, it finds the book by its 'id' and updates it with the 'updatedData'. (these are what is found inside the method of findByIdAndUpdate) and then the { new: true } is the option that tells mongoose to return the updated book instead of the old one.
	If the book with the given id doesn't exists, it returns an error 404 not found. 
	If the update is successful, it sends back the updated book as a response.
	*/

app.delete("/books/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedBook = await Book.findByIdAndDelete(id);
		if (!deletedBook) {
			return res.status(404).json({ error: "Book not found." });
		}
		res.json({ message: "Book deleted.", book: deletedBook });
	} catch (err) {
		res.status(500).json({ error: "Failed to delete books.", err });
	}
});

app.listen(3000, () => {
	console.log("Server is running at http://localhost:3000");
});
