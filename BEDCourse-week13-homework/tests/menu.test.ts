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
	it.todo("creates a dish and returns 201");
});

describe("E3 · GET /api/menu with filters", () => {
	it.todo("filters by category");
});
