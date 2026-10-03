-- SKILL ONE

-- 1. one-on-one:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE profiles (
id SERIAL PRIMARY KEY,
user_id INT UNIQUE,
bio TEXT,
FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM profiles;

INSERT INTO users (name, email) VALUES ('Laetitia', 'test@test.com');

SELECT * FROM users;

INSERT INTO profiles (user_id, bio) VALUES (1, 'loves coding');

SELECT * FROM profiles;

SELECT users.name, profiles.bio
FROM users
JOIN profiles ON users.id = profiles.user_id

-- 2. one-to-many:

CREATE TABLE authors (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE books (
id SERIAL PRIMARY KEY,
title VARCHAR(100),
author_id INT ,
FOREIGN KEY (author_id) REFERENCES authors(id)
)

INSERT INTO authors (name) 
VALUES 
('Matt Dinniman');

INSERT INTO books (title, author_id) 
VALUES 
('Dungeon Crawler Carl', 1),
('Operation Bounce House', 1);

SELECT authors.name, books.title
FROM authors
JOIN books ON authors.id = books.author_id

-- Tried to add a book with no author id:

INSERT INTO books (title, author_id)
VALUES
('The Fellowship of the Ring', 3);

/*
  ERROR:  insert or update on table "books" violates foreign key constraint "books_author_id_fkey"
  Key (author_id)=(3) is not present in table "authors". 

  SQL state: 23503
  Detail: Key (author_id)=(3) is not present in table "authors".

  This happens as there is no author that has been added to the authors table that has the id of 3. We currently only have one author, so only one id exists which is 1.
*/


-- 3. many-to-many:

CREATE TABLE students (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE courses (
id SERIAL PRIMARY KEY,
title VARCHAR(100)
);

CREATE TABLE student_courses (
student_id INT,
course_id INT,
PRIMARY KEY (student_id, course_id),
FOREIGN KEY (student_id) REFERENCES students(id),
FOREIGN KEY (course_id) REFERENCES courses(id)
)

INSERT INTO students (name) VALUES ('Tom'), ('Sarah');
INSERT INTO courses (title) VALUES ('Maths'), ('Science');
INSERT INTO student_courses (student_id, course_id) VALUES (1, 1), (1, 2), (2, 1);

SELECT students.name, courses.title
FROM students
JOIN student_courses ON students.id = student_courses.student_id
JOIN courses ON courses.id = student_courses.course_id;

-- Try to add a duplicate student:

INSERT INTO students (name) VALUES ('Tom');
INSERT INTO courses (title) VALUES ('Maths');
INSERT INTO student_courses (student_id, course_id) VALUES (1, 1);

/*
  ERROR:  duplicate key value violates unique constraint "student_courses_pkey"
  Key (student_id, course_id)=(1, 1) already exists. 

  SQL state: 23505
  Detail: Key (student_id, course_id)=(1, 1) already exists.

  As student_is and course_id are primary keys, the can only be unique, adding the same values doesn't work.
*/
