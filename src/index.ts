import express, { type Request, type Response } from "express";
import { z } from "zod";
import { pool } from "./db.ts";
import { envSchema } from "./env.ts";
import {
  authorSchema,
  bookPatchSchema,
  bookQuerySchema,
  bookSchema,
  idParamsSchema,
} from "./schemas.ts";

type Book = z.infer<typeof bookSchema> & { id: number };

const app = express();
const { PORT } = envSchema.parse(process.env);

app.use(express.json());

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }
  return "Unknown error.";
};

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome!");
});

app.get("/books", async (req: Request, res: Response) => {
  const validateQuery = bookQuerySchema.safeParse(req.query);
  if (!validateQuery.success) {
    return res
      .status(400)
      .send({ errors: z.flattenError(validateQuery.error) });
  }
  const { genre, sort } = validateQuery.data;

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
    const result = await pool.query<Book>(sql, values);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.get("/authors", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM authors");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

//Easy 1:
//When putting http://localhost:3000/books/9999: Book not found.
//When putting http://localhost:3000/books/abc: invalid input syntax for type integer: "abc"

//Easy 2:
//Now with the validate input, the result is:
//400 Bad Request Please enter a numeric id.
app.get("/books/:id", async (req: Request, res: Response) => {
  const validateId = idParamsSchema.safeParse(req.params);
  if (!validateId.success) {
    return res.status(400).send("Please enter a numeric id.");
  }
  const { id } = validateId.data;
  try {
    const result = await pool.query<Book>("SELECT * FROM books WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found.");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.get("/authors/:id/books", async (req: Request, res: Response) => {
  const validateId = idParamsSchema.safeParse(req.params);
  if (!validateId.success) {
    return res.status(400).send("Please enter a numeric id.");
  }
  const { id } = validateId.data;
  try {
    const result = await pool.query<Book>(
      "SELECT * FROM books JOIN authors ON authors.id = books.author_id WHERE authors.id = $1",
      [id],
    );
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.post("/books", async (req: Request, res: Response) => {
  const validateBook = bookSchema.safeParse(req.body);
  if (!validateBook.success) {
    return res.status(400).json({ errors: z.flattenError(validateBook.error) });
  }
  const { title, genre, published_year, author_id } = validateBook.data;

  try {
    const result = await pool.query<Book>(
      "INSERT INTO books (title, genre, published_year, author_id) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, genre, published_year, author_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "23503") {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    res.status(500).send(getErrorMessage(error));
  }
});

app.post("/authors", async (req: Request, res: Response) => {
  const validateAuthor = authorSchema.safeParse(req.body);
  if (!validateAuthor.success) {
    return res
      .status(400)
      .json({ errors: z.flattenError(validateAuthor.error) });
  }
  const { name } = validateAuthor.data;
  try {
    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [name],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.put("/books/:id", async (req: Request, res: Response) => {
  const validateId = idParamsSchema.safeParse(req.params);
  if (!validateId.success) {
    return res.status(400).send("Please enter a numeric id.");
  }
  const { id } = validateId.data;

  const validateBook = bookSchema.safeParse(req.body);
  if (!validateBook.success) {
    return res.status(400).json({ errors: z.flattenError(validateBook.error) });
  }
  //New details from request body:
  const { title, genre, published_year } = validateBook.data;

  try {
    const result = await pool.query<Book>(
      "UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, genre, published_year, id], //Replace placeholders with new values and id
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Books not found."); //No books with that id
    }
    res.json(result.rows[0]); //Otherwise send back updated book
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.patch("/books/:id", async (req: Request, res: Response) => {
  const validateId = idParamsSchema.safeParse(req.params);
  if (!validateId.success) {
    return res.status(400).send("Please enter a numeric id.");
  }
  const { id } = validateId.data;

  const validateBook = bookPatchSchema.safeParse(req.body);
  if (!validateBook.success) {
    return res.status(400).json({ errors: z.flattenError(validateBook.error) });
  }
  const { title, published_year, genre } = validateBook.data;

  if (Object.keys(validateBook.data).length === 0) {
    return res.status(400).send({ error: "Body is empty" });
  }

  try {
    const result = await pool.query<Book>(
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
    res.status(500).send(getErrorMessage(error));
  }
});

app.delete("/books/:id", async (req: Request, res: Response) => {
  const validateId = idParamsSchema.safeParse(req.params);
  if (!validateId.success) {
    return res.status(400).send("Please enter a numeric id.");
  }
  const { id } = validateId.data;

  try {
    const result = await pool.query<Book>(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Books not found.");
    }
    res.send("Book deleted successfully");
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
