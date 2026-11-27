import axios from "axios";
import { useCallback, useEffect, useState } from "react";
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

type Member = {
	id: number;
	name: string;
};

type Loan = {
	id: number;
	member_id: number;
	book_id: number;
	loan_date: string;
	returned_at: number | null;
	Member: {
		name: string;
	};
	Book: {
		title: string;
	};
};

function App() {
	const [books, setBooks] = useState<Book[]>([]);
	const [authors, setAuthors] = useState<Author[]>([]);
	const [members, setMembers] = useState<Member[]>([]);
	const [loans, setLoans] = useState<Loan[]>([]);
	const [title, setTitle] = useState("");
	const [genre, setGenre] = useState("");
	const [publishedYear, setPublishedYear] = useState("");
	const [authorId, setAuthorId] = useState("");
	const [deleteError, setDeleteError] = useState("");
	const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
		{},
	);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editTitle, setEditTitle] = useState("");
	const [editGenre, setEditGenre] = useState("");
	const [editYear, setEditYear] = useState("");
	const [editAuthorId, setEditAuthorId] = useState("");

	const fetchBooks = useCallback(async () => {
		const response = await axios.get("http://localhost:3001/books");
		setBooks(response.data);
	}, []);

	const fetchAuthors = useCallback(async () => {
		const response = await axios.get("http://localhost:3001/authors");
		setAuthors(response.data);
	}, []);

	const fectchMembers = useCallback(async () => {
		const response = await axios.get("http://localhost:3001/members");
		setMembers(response.data);
	}, []);

	const fectchLoans = useCallback(async () => {
		const response = await axios.get("http://localhost:3001/loans");
		setLoans(response.data);
	}, []);

	useEffect(() => {
		fetchBooks();
		fetchAuthors();
		fectchMembers();
		fectchLoans();
	}, [fetchBooks, fetchAuthors, fectchMembers, fectchLoans]);

	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

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

	const handleEdit = (book: Book) => {
		setEditingId(book.id);
		setEditTitle(book.title);
		setEditGenre(book.genre);
		setEditYear(String(book.published_year));
		setEditAuthorId(String(book.author_id));
	};

	const handleSave = async () => {
		const result = bookFormSchema.safeParse({
			title: editTitle,
			genre: editGenre,
			published_year: editYear,
			author_id: editAuthorId,
		});

		if (!result.success) {
			return;
		}

		await axios.put(`http://localhost:3001/books/${editingId}`, result.data);

		await fetchBooks();

		setEditingId(null);
	};

	const handleDelete = async (id: number) => {
		if (!window.confirm("Are you sure?")) {
			return;
		}

		try {
			await axios.delete(`http://localhost:3001/books/${id}`);
			setBooks(books.filter((book) => book.id !== id));
			setDeleteError("");
		} catch (error) {
			setDeleteError("This book can't be deleted. It may be on loan.");
		}
	};

	return (
		<div>
			<h1>Library</h1>
			<p className="book-text">
				<strong>{books.length}</strong> books in the library
			</p>
			<div className="books">
				<h2 className="left-header">Books</h2>
				<ul className="books-list">
					{/* Books List */}
					{books.map((book) => (
						<li key={book.id}>
							{/* Edit Form */}
							{book.id === editingId ? (
								<div className="edit-form">
									<h3>Edit Book</h3>
									<div className="edit-form-inner">
										{/* Edit Title */}
										<label className="edit-label" htmlFor="edit-title">
											Title
										</label>
										<input
											className="edit-input"
											type="text"
											name="edit-title"
											id="edit-title"
											value={editTitle}
											onChange={(e) => setEditTitle(e.target.value)}
										/>
										{/* Edit Genre */}
										<label className="edit-label" htmlFor="edit-genre">
											Genre
										</label>
										<input
											className="edit-input"
											type="text"
											name="edit-genre"
											id="edit-genre"
											value={editGenre}
											onChange={(e) => setEditGenre(e.target.value)}
										/>
										{/* Edit Published Year */}
										<label className="edit-label" htmlFor="edit-published-year">
											Published Year
										</label>
										<input
											className="edit-input"
											type="number"
											name="edit-published-year"
											id="edit-published-year"
											value={editYear}
											onChange={(e) => setEditYear(e.target.value)}
										/>
										{/* Edit Author */}
										<label className="edit-label" htmlFor="edit-author">
											Author
										</label>
										<select
											className="edit-select"
											name="edit-author"
											id="edit-author"
											value={editAuthorId}
											onChange={(e) => setEditAuthorId(e.target.value)}
										>
											{authors.map((author) => (
												<option key={author.id} value={author.id}>
													{author.name}
												</option>
											))}
										</select>
									</div>
									{/* Edit Buttons */}
									<div className="edit-btn-container">
										<button
											className="save-btn"
											type="button"
											onClick={handleSave}
										>
											Save
										</button>
										<button
											className="cancel-btn"
											type="button"
											onClick={() => setEditingId(null)}
										>
											Cancel
										</button>
									</div>
								</div>
							) : (
								<>
									{/* List Book */}
									{book.title} - {book.Author?.name} ({book.published_year})
									{/* Book Edit Delete Buttons */}
									<div>
										<button
											className="edit"
											type="button"
											onClick={() => handleEdit(book)}
										>
											Edit
										</button>
										<button
											className="delete"
											type="button"
											onClick={() => handleDelete(book.id)}
										>
											Delete
										</button>
									</div>
								</>
							)}
						</li>
					))}
				</ul>
				{deleteError && <p className="error">{deleteError}</p>}
			</div>
			<div className="authors-members">
				<div className="authors">
					<h2 className="left-header">Authors</h2>
					<ul className="author-list">
						{/* Authors List */}
						{authors.map((author) => (
							<li key={author.id}>{author.name}</li>
						))}
					</ul>
				</div>
				<div className="members">
					<h2 className="left-header">Members</h2>
					<ul className="member-list">
						{/* Members List */}
						{members.map((member) => (
							<li key={member.id}>{member.name}</li>
						))}
					</ul>
				</div>
			</div>
			<div className="loans">
				<h2 className="left-header">Loans</h2>
				<ul className="loan-list">
					{/* Loans List */}
					{loans.map((loan) => (
						<li key={loan.id}>
							{loan.Member.name} borrowed {loan.Book.title}
						</li>
					))}
				</ul>
			</div>

			{/* Add Book Form */}
			<div className="post">
				<h2>Add Book</h2>
				<form onSubmit={handleSubmit} className="add-form">
					{/* Add Title */}
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{errors.title && <p className="error">{errors.title[0]}</p>}
					{/* Add Genre */}
					<label htmlFor="genre">Genre</label>
					<input
						type="text"
						name="genre"
						id="genre"
						value={genre}
						onChange={(e) => setGenre(e.target.value)}
					/>
					{errors.genre && <p className="error">{errors.genre[0]}</p>}
					{/* Add Published Year */}
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
					{/* Add Author */}
					<label htmlFor="author">Author</label>
					<select
						name="author"
						id="author"
						value={authorId}
						onChange={(e) => setAuthorId(e.target.value)}
					>
						<option value="">Select Author</option>
						{authors.map((author) => (
							<option key={author.id} value={author.id}>
								{author.name}
							</option>
						))}
					</select>
					{errors.author_id && <p className="error">{errors.author_id[0]}</p>}
					{/* Add Book Button */}
					<button type="submit">Add Book</button>
				</form>
			</div>
		</div>
	);
}
export default App;
