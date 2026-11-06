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

	test("premium member with 5 books can borrow", () => {
		const member = canBorrow({
			id: 4,
			name: "Celine Dion",
			membership: "premium",
			booksOnLoan: 5,
		});
		expect(member).toBe(false);
	});

	test("premium member with 5 books can borrow", () => {
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
});
