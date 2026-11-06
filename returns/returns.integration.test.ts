import { describe, expect, test } from "vitest";
import { returnBook } from "./returns";

describe("Return Books Integration Test", () => {
	test("returnBook(1001) returns a loan that is returned: true", () => {
		const returned = returnBook(1001);
		expect(returned.returned).toBe(true);
		expect(returned.title).toBe("dune");
	});
});
