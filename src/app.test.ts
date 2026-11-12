import request from "supertest";
import { describe, expect, test } from "vitest";
import { app } from "./app.ts";

describe("validation", () => {
	test("GET / returns the welcome text", async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.text).toBe("Welcome!");
	});

	test("GET /books/abc returns 400 for a non-numerical id", async () => {
		const response = await request(app).get("/books/abc");
		expect(response.status).toBe(400);
	});

	test("POST /books returns 400 without a title", async () => {
		const response = await request(app).post("/books").send({});
		expect(response.status).toBe(400);
	});

	test("POST /authors returns 400 without a name", async () => {
		const response = await request(app).post("/authors").send({});
		expect(response.status).toBe(400);
	});
});
