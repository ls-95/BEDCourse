CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    published_year INT
);

INSERT INTO books (title, genre, published_year)
VALUES
('The Hobbit', 'fantasy', 1937),
('1984', 'dystopian', 1949),
('Pippi Longstocking', 'children', 1945),
('The Hunger Games', 'dystopian', 2008);

CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

ALTER TABLE books
ADD COLUMN author_id INTEGER REFERENCES authors(id);

INSERT INTO authors (id, name)
VALUES
    (1, 'J.R.R. Tolkien'),
    (2, 'Astrid Lindgren'),
    (3, 'Suzanne Collins'),
    (4, 'Douglas Adams'),
    (5, 'Andy Weir'),
    (6, 'Shelby Van Pelt');

UPDATE books
SET author_id = 1
WHERE id = 1;

UPDATE books
SET author_id = 2
WHERE id = 3;

UPDATE books
SET author_id = 3
WHERE id = 4;

UPDATE books
SET author_id = 4
WHERE id = 6;

UPDATE books
SET author_id = 5
WHERE id IN (9, 10);

UPDATE books
SET author_id = 6
WHERE id = 7;

INSERT INTO authors (id, name)
VALUES 
	(7, 'F.Scott Fitzgerald');