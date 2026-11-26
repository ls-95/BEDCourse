import { z } from "zod";

export const bookFormSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Title is required")
		.max(100, "Title is too long"),
	genre: z
		.string()
		.trim()
		.min(1, "Genre is required")
		.max(50, "Genre is too long"),
	published_year: z.coerce
		.number()
		.int()
		.min(1450, "Year must be 1450 or later")
		.max(new Date().getFullYear(), "Year cannot be in the future"),
	author_id: z.coerce.number().int().positive("Choose an author"),
});
