import { describe, expect, test } from "vitest";
import { checkOutBook, findBook, registerLoan } from "./library";

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
});
