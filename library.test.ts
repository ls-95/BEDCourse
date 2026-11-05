import { describe, expect, test } from "vitest";
import { findBook } from "./library";

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
});
