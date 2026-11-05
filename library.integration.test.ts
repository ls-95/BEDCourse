import { describe, expect, test } from "vitest";
import { borrowBook } from "./library";

describe("Borrow Book Integration Test", () => {
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
});
