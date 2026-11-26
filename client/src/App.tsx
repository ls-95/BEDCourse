import axios from "axios";
import { useEffect, useState } from "react";

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
		</div>
	);
}
export default App;
