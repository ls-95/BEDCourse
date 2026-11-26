import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { bookFormSchema } from "./schemas";

type Book = {
	id: number;
	title: string;
	genre: string;
	published_year: number;
	author_id: number;
	Author?: { name: string };
};

type Author = {
	id: number;
	name: string;
};

function App() {
	const [books, setBooks] = useState<Book[]>([]);
	const [authors, setAuthors] = useState<Author[]>([]);
	const [title, setTitle] = useState("");
	const [genre, setGenre] = useState("");
	const [publishedYear, setPublishedYear] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
		{},
	);

	const fetchBooks = async () => {
		const response = await axios.get("http://localhost:3001/books");
		setBooks(response.data);
	};

	const fetchAuthors = async () => {
		const response = await axios.get("http://localhost:3001/authors");
		setAuthors(response.data);
	};

	useEffect(() => {
		fetchBooks();
		fetchAuthors();
	}, []);

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		//event.preventDefault();

		const result = bookFormSchema.safeParse({
			title,
			genre,
			published_year: publishedYear,
			author_id: authorId,
		});

		if (!result.success) {
			setErrors(z.flattenError(result.error).fieldErrors);
			return;
		}

		setErrors({});

		await axios.post("http://localhost:3001/books", result.data);
		await fetchBooks();
		setTitle("");
		setGenre("");
		setPublishedYear("");
		setAuthorId("");
	};

	return (
		<div>
			<h1>Library</h1>
			<p className="book-text">{books.length} books in the library</p>
			<div className="books">
				<h2>Books</h2>
				<ul>
					{books.map((book) => (
						<li key={book.id}>
							{book.title} by {book.Author?.name} ({book.published_year})
						</li>
					))}
				</ul>
			</div>
			<div className="authors">
				<h2>Authors</h2>
				<ul>
					{authors.map((author) => (
						<li key={author.id}>{author.name}</li>
					))}
				</ul>
			</div>
			<div className="post">
				<h2>Add Book</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{errors.title && <p className="error">{errors.title[0]}</p>}
					<label htmlFor="genre">Genre</label>
					<input
						type="text"
						name="genre"
						id="genre"
						value={genre}
						onChange={(e) => setGenre(e.target.value)}
					/>
					{errors.genre && <p className="error">{errors.genre[0]}</p>}
					<label htmlFor="published-year">Published Year</label>
					<input
						type="number"
						name="published-year"
						id="published-year"
						min="1450"
						max="2026"
						value={publishedYear}
						onChange={(e) => setPublishedYear(e.target.value)}
					/>
					{errors.published_year && (
						<p className="error">{errors.published_year[0]}</p>
					)}
					<select
						name="author"
						id="author"
						value={authorId}
						onChange={(e) => setAuthorId(e.target.value)}
					>
						<option value="">--Please choose an author--</option>
						{authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))}
					</select>
					{errors.author_id && <p className="error">{errors.author_id[0]}</p>}
					<button type="submit">Add Book</button>
				</form>
			</div>
		</div>
	);
}
export default App;
