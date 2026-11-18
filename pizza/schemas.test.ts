import { describe, expect, test } from "vitest";
import {
	AmountSchema,
	OrderIdSchema,
	PizzaSchema,
	PizzaTypeSchema,
} from "./pizzashop";

describe("Schema Tests", () => {
	test("PizzaTypeSchema returns margherita", () => {
		const pizza = PizzaTypeSchema.parse("margherita");
		expect(pizza).toBe("margherita");
	});

	test("PizzaTypeSchema throws for capital M in Margherita", () => {
		expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
	});

	test("PizzaSchema returns the correct pizza object", () => {
		const pizza = PizzaSchema.parse({ type: "pepperoni", price: 120 });
		expect(pizza).toEqual({ type: "pepperoni", price: 120 });
	});

	test("PizzaSchema throws when price is missing", () => {
		expect(() => PizzaSchema.parse({ type: "pepperoni" })).toThrow();
	});

	test("AmountSchema throws for a string", () => {
		expect(() => AmountSchema.parse("100")).toThrow();
	});

	test("OrderIdSchema accepts 0", () => {
		const orderId = OrderIdSchema.parse(0);
		expect(orderId).toBe(0);
	});
});
