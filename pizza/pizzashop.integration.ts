import { describe, expect, test } from "vitest";
import { orderPizza } from "./pizzashop";

describe("Pizza Shop Integration Test", () => {
	test("should successfully complete a full margherita pizza order", () => {
		const result = orderPizza("margherita");
		expect(result).toBe(true);
	});
	test("should successfully complete a full vegetarian pizza order", () => {
		const result = orderPizza("vegetarian");
		expect(result).toBe(true);
	});
});
