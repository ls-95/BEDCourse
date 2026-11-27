// EASY · Menu API · Tasks E1, E2, E3
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";
import { createApp } from "../src/app";
import { DishSchema } from "../src/menu";

let app: ReturnType<typeof createApp>;
beforeEach(() => {
	app = createApp();
});

describe("E1 · GET /api/menu", () => {
	// Example to get you started
	it("returns all four dishes in the promised shape", async () => {
		const res = await request(app).get("/api/menu");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(4);
		expect(() => z.array(DishSchema).parse(res.body)).not.toThrow();
	});

	it("returns one dish by id", async () => {
		const res = await request(app).get("/api/menu/4");

		expect(res.status).toBe(200);
		expect(res.body.name).toBe("Cloudberry Parfait");
	});

	it.each([["abc"], ["0"], ["99"]])("returns 404 for id %s", async (id) => {
		const res = await request(app).get(`/api/menu/${id}`);
		expect(res.status).toBe(404);
	});
});

describe("E2 · POST /api/menu", () => {
	it("creates a dish and returns 201", async () => {
		const res = await request(app)
			.post("/api/menu")
			.send({ name: "Soup", price: 95, category: "STARTER" });

		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({ id: 5, name: "Soup", vegetarian: false });
	});

	it("shows 5 dishes after adding one", async () => {
		await request(app)
			.post("/api/menu")
			.send({ name: "Soup", price: 95, category: "STARTER" });

		const res = await request(app).get("/api/menu");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(5);
	});

	it.each([
		["a negative price", { price: -5 }, "price"],
		["a price sent as text", { price: "210" }, "price"],
		["a price with decimals", { price: 222.5 }, "price"],
		["an unknown category", { category: "DINNER" }, "category"],
	])("rejects %s with 400", async (_label, issue, fieldName) => {
		const dish = { name: "Soup", price: 95, category: "STARTER" };

		const res = await request(app)
			.post("/api/menu")
			.send({ ...dish, ...issue });

		expect(res.status).toBe(400);
		expect(res.body.issues).toHaveProperty(fieldName);
	});

	it("400 for a name that is only spaces", async () => {
		const res = await request(app).post("/api/menu").send({
			name: " ",
			price: 95,
			category: "STARTER",
		});
		expect(res.status).toBe(400);
		expect(res.body.issues).toHaveProperty("name");
	});
});

describe("E3 · GET /api/menu with filters", () => {
	it("?category=MAIN returns only main courses", async () => {
		const res = await request(app).get("/api/menu?category=MAIN");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([
			{
				id: 2,
				name: "Grilled Arctic Char",
				price: 295,
				category: "MAIN",
				vegetarian: false,
			},
			{
				id: 3,
				name: "Mushroom Risotto",
				price: 245,
				category: "MAIN",
				vegetarian: true,
			},
		]);
	});

	it("?vegetarian=true returns only vegetarian dishes", async () => {
		const res = await request(app).get("/api/menu?vegetarian=true");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([
			{
				id: 3,
				name: "Mushroom Risotto",
				price: 245,
				category: "MAIN",
				vegetarian: true,
			},
			{
				id: 4,
				name: "Cloudberry Parfait",
				price: 125,
				category: "DESSERT",
				vegetarian: true,
			},
		]);
	});

	it("/api/menu?category=MAIN&vegetarian=true returns main courses that are vegetarian", async () => {
		const res = await request(app).get(
			"/api/menu?category=MAIN&vegetarian=true",
		);

		expect(res.status).toBe(200);
		expect(res.body).toEqual([
			{
				id: 3,
				name: "Mushroom Risotto",
				price: 245,
				category: "MAIN",
				vegetarian: true,
			},
		]);
	});

	it("A filter that matches nothing returns 200 with an empty list", async () => {
		const res = await request(app).get(
			"/api/menu?category=STARTER&vegetarian=true",
		);
		expect(res.status).toBe(200);
		expect(res.body).toEqual([]);
	});

	it.each([
		["an unknown category", "category=SNACK"],
		["a vegetarian value that is not true or false", "vegetarian=yes"],
	])("rejects %s with 400", async (_label, query) => {
		const res = await request(app).get(`/api/menu?${query}`);

		expect(res.status).toBe(400);
	});
});
