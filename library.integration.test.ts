import { describe, expect, test } from "vitest";
import { borrowBook, borrowWithLimit } from "./library";

describe("Borrow Book Integration Test", () => {
	//borrowBook integration test
	test("should successfully complete to borrow a book", () => {
		const result = borrowBook("dune", 7);
		expect(result.title).toBe("dune");
		expect(result.memberId).toBe(7);

		expect(result.loanId).toBeGreaterThanOrEqual(1000);
		expect(result.loanId).toBeLessThanOrEqual(9999);
	});

	test("should successfully complete to throw an error when no copies available", () => {
		expect(() => borrowBook("foundation", 7)).toThrow();
	});

	test("should successfully complete to throw an error when member id is negative", () => {
		expect(() => borrowBook("dune", -1)).toThrow();
	});

	//borrowWithLimit integration test
	test("should successfully complete a basic member with 0 books to borrow a book", () => {
		const result = borrowWithLimit("dune", {
			id: 2,
			name: "Rick Astley",
			membership: "basic",
			booksOnLoan: 0,
		});
		expect(result.title).toBe("dune");
		expect(result.memberId).toBe(2);
		expect(result.loanId).toBeGreaterThanOrEqual(1000);
		expect(result.loanId).toBeLessThanOrEqual(9999);
	});

	test("should successfully complete to throw en error when a member has 2 books on loan", () => {
		expect(() =>
			borrowWithLimit("dune", {
				id: 3,
				name: "Whitney Houston",
				membership: "basic",
				booksOnLoan: 2,
			}),
		).toThrow("Borrowing limit reached");
	});

	test("should successfully complete to throw en error when a no copies available", () => {
		expect(() =>
			borrowWithLimit("foundation", {
				id: 4,
				name: "Betty White",
				membership: "premium",
				booksOnLoan: 2,
			}),
		).toThrow("No copies available");
	});
});
