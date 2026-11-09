# Queries from logging : console.log

## Get "/authors/5/books"

Executing (default): SELECT "id", "name" FROM "authors" AS "Author" WHERE "Author"."id" = '5';
Executing (default): SELECT "id", "title", "genre", "published_year" AS "publishedYear", "author_id" AS "authorId" FROM "books" AS "Book" WHERE "Book"."author_id" = '5';


SELECT id FROM authors WHERE id = 5;
SELECT books.* FROM books JOIN authors ON books.author_id = authors.id WHERE authors.id = 5;

OR

SELECT * FROM books WHERE author_id = 5;

## Get "/members/1/loans"

Executing (default): SELECT "id", "name" FROM "members" AS "Member" WHERE "Member"."id" = '1';
Executing (default): SELECT "Loan"."id", "Loan"."members_id" AS "memberId", "Loan"."books_id" AS "bookId", "Loan"."loan_date" AS "loanDate", "Loan"."returned_at" AS "returnedAt", "Member"."id" AS "Member.id", "Member"."name" AS "Member.name", "Book"."id" AS "Book.id", "Book"."title" AS "Book.title" FROM "loans" AS "Loan" LEFT OUTER JOIN "members" AS "Member" ON "Loan"."members_id" = "Member"."id" LEFT OUTER JOIN "books" AS "Book" ON "Loan"."books_id" = "Book"."id" WHERE "Loan"."members_id" = '1';

SELECT id FROM members WHERE id = 1;
SELECT loans.*, members.name, books.title 
FROM loans 
JOIN members ON loans.members_id = members.id
JOIN books ON loans.books_id = books.id
WHERE loans.members_id = 1;

# Questions

## Does Sequelize use INNER JOIN or LEFT OUTER JOIN for include ? Why do you think it chose that?

By default, sequelize uses LEFT OUTER JOIN for include. It does this as it keeps all columns from the main table even if there is nothing to show. But if you only want the columns that have something to show, you add 'required: true' which makes it INNER JOIN.

## What is different between its SQL and yours? (Look at the aliases and the column names.)

Sequelize (longer):

- Uses aliases for tables (ex: loan -> Loan).
- Lists every column by name.
- Returns "Member.name" and "Book.title".
- Uses joins like LEFT OUTER JOIN.

My SQL (shorter):

- Uses the table names, no aliases.
- Doesn't need to list out all columns as it uses '*'.
- Returns "name" and "title".
- Uses JOIN.
