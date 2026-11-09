CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    published_year INT NOT NULL
);

INSERT INTO books (title, genre, published_year)
VALUES
('The Hobbit', 'fantasy', 1937),
('1984', 'dystopian', 1949),
('Pippi Longstocking', 'children', 1945),
('The Hunger Games', 'dystopian', 2008);

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
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
    (6, 'Shelby Van Pelt'),
    (7, 'F.Scott Fitzgerald');

-- UPDATE books
-- SET author_id = 1
-- WHERE id = 1;

-- UPDATE books
-- SET author_id = 2
-- WHERE id = 3;

-- UPDATE books
-- SET author_id = 3
-- WHERE id = 4;

-- UPDATE books
-- SET author_id = 4
-- WHERE id = 6;

-- UPDATE books
-- SET author_id = 5
-- WHERE id IN (9, 10);

-- UPDATE books
-- SET author_id = 6
-- WHERE id = 7;

UPDATE books
SET author_id = 1
WHERE id = 1;

UPDATE books
SET author_id = 2
WHERE id = 3;

UPDATE books
SET author_id = 3
WHERE id = 4;

INSERT INTO books (title, genre, published_year, author_id)
VALUES
('The Hitchhiker''s Guide to the Galaxy', 'science fiction', 1979, 4),
('The Martian', 'science fiction', 2011, 5),
('Project Hail Mary', 'science fiction', 2021, 5),
('Remarkably Bright Creatures', 'fiction', 2022, 6);

SELECT setval(pg_get_serial_sequence('authors', 'id'), (SELECT MAX(id) FROM authors));

CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO members (name)
VALUES
('Tony Montana'),
('Jack Torrance'),
('Daphne Blake'),
('Walter White'),
('Moira Rose'),
('Morticia Adams');

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    members_id INTEGER NOT NULL REFERENCES members(id),
    books_id INTEGER NOT NULL REFERENCES books(id),
    loan_date TIMESTAMP NOT NULL DEFAULT NOW(),
    returned_at TIMESTAMP
);

INSERT INTO loans (members_id, books_id)
VALUES
(1, 1),
(3, 8);