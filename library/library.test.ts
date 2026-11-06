import { describe, expect, test } from "vitest";
import {
	borrowBooks,
	canBorrow,
	checkOutBook,
	findBook,
	registerLoan,
} from "./library";

describe("Library Unit Tests", () => {
	//findBook Unit Tests
	test("findBook accepts dune", () => {
		const book = findBook("dune");
		expect(book).toEqual({ title: "dune", copiesAvailable: 3 });
	});

	test("findBook accepts foundation", () => {
		const book = findBook("foundation");
		expect(book).toEqual({ title: "foundation", copiesAvailable: 0 });
	});

	test("findBook throw when title is Harry Potter", () => {
		expect(() => findBook("harry potter")).toThrow();
	});

	test("findBook throws error when title is not a string", () => {
		expect(() => findBook(42)).toThrow();
	});

	//checkOutBook Unit Tests
	test("checkOutBook returns a number", () => {
		const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });

		expect(typeof loanId).toBe("number");
		expect(Number.isInteger(loanId)).toBe(true);
		expect(loanId).toBeGreaterThanOrEqual(1000);
		expect(loanId).toBeLessThanOrEqual(9999);
	});

	test("checkOutBook throws No copies available when copiesAvailable is 0", () => {
		expect(() =>
			checkOutBook({ title: "foundation", copiesAvailable: 0 }),
		).toThrow("No copies available");
	});

	test("checkOutBook throws error when missing copiesAvailable", () => {
		expect(() => checkOutBook({ title: "neuromancer" })).toThrow();
	});

	//registerBook Unit Tests
	test("registerBook returns a loan object", () => {
		const register = registerLoan(1234, "dune", 7);
		expect(register).toEqual({ loanId: 1234, title: "dune", memberId: 7 });
	});

	test("registerBook throws error when memberId is 0", () => {
		expect(() => registerLoan(1234, "dune", 0)).toThrow();
	});

	test("registerBook throws error when the title isn't in the catalogue", () => {
		expect(() => registerLoan(1234, "harry potter", 4)).toThrow();
	});

	//canBorrow Unit Tests
	test("basic member with 1 book can borrow", () => {
		const member = canBorrow({
			id: 1,
			name: "Jasper",
			membership: "basic",
			booksOnLoan: 1,
		});
		expect(member).toBe(true);
	});

	test("basic member with 2 books cannot borrow", () => {
		const member = canBorrow({
			id: 2,
			name: "Rick Astley",
			membership: "basic",
			booksOnLoan: 2,
		});
		expect(member).toBe(false);
	});

	test("premium member with 4 books can borrow", () => {
		const member = canBorrow({
			id: 3,
			name: "Whitney Houston",
			membership: "premium",
			booksOnLoan: 4,
		});
		expect(member).toBe(true);
	});

	test("premium member with 5 books on loan cannot borrow", () => {
		const member = canBorrow({
			id: 4,
			name: "Celine Dion",
			membership: "premium",
			booksOnLoan: 5,
		});
		expect(member).toBe(false);
	});

	test("premium member with 3 books cannot borrow with an empty name", () => {
		expect(() =>
			canBorrow({
				id: 5,
				name: "",
				membership: "premium",
				booksOnLoan: 3,
			}),
		).toThrow();
	});

	//borrowBooks
	test("borrowBooks accepts mulitple titles", () => {
		const titles = borrowBooks(["dune", "neuromancer"], {
			id: 7,
			name: "Michael Jackson",
			membership: "premium",
			booksOnLoan: 1,
		});
		expect(titles[0].title).toBe("dune");
		expect(titles[0].memberId).toBe(7);
		expect(titles[1].title).toBe("neuromancer");
		expect(titles[1].memberId).toBe(7);
	});

	test("borrowBooks lets a member borrow multiple books", () => {
		const titles = borrowBooks(["dune", "neuromancer"], {
			id: 5,
			name: "Rowan Atkinson",
			membership: "premium",
			booksOnLoan: 1,
		});
		expect(titles[0].title).toBe("dune");
		expect(titles[0].memberId).toBe(5);
		expect(titles[1].title).toBe("neuromancer");
		expect(titles[1].memberId).toBe(5);
	});

	test("borrowBooks throws an error when basic member wants to borrow too many books", () => {
		expect(() =>
			borrowBooks(["dune", "neuromancer"], {
				id: 8,
				name: "John Cleese",
				membership: "basic",
				booksOnLoan: 1,
			}),
		).toThrow("Borrowing limit reached");
	});

	test("borrowBooks throws an error when book has no copies available to borrow", () => {
		expect(() =>
			borrowBooks(["dune", "neuromancer", "foundation"], {
				id: 10,
				name: "David Jason",
				membership: "premium",
				booksOnLoan: 2,
			}),
		).toThrow("No copies available");
	});

	test("borrowBooks throws an error when the array of titles is empty", () => {
		expect(() =>
			borrowBooks([], {
				id: 11,
				name: "Stephen Fry",
				membership: "premium",
				booksOnLoan: 4,
			}),
		).toThrow();
	});

	test("borrowBooks throws an error when there are too many titles: 4", () => {
		expect(() =>
			borrowBooks(["dune", "neuromancer", "foundation", "harry potter"], {
				id: 12,
				name: "Hugh Laurie",
				membership: "premium",
				booksOnLoan: 1,
			}),
		).toThrow();
	});

	test("borrowBooks throws an error when a title is not in the catalogue", () => {
		expect(() =>
			borrowBooks(["the fellowship of the ring"], {
				id: 13,
				name: "Catherine Tate",
				membership: "basic",
				booksOnLoan: 1,
			}),
		).toThrow();
	});

	test("borrowBooks throws an error when there are too many titles: 4 (all titles exist in catalogue)", () => {
		expect(() =>
			borrowBooks(["dune", "neuromancer", "foundation", "frankenstein"], {
				id: 14,
				name: "Claudia Winkleman",
				membership: "premium",
				booksOnLoan: 0,
			}),
		).toThrow();
	});
});
