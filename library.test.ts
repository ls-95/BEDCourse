import { describe, expect, test } from "vitest";
import { checkOutBook, findBook } from "./library";

describe("Library Unit Tests", () => {
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
});
