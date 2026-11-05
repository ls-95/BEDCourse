import { z } from "zod";

const catalogue = {
	dune: { title: "dune", copiesAvailable: 3 },
	neuromancer: { title: "neuromancer", copiesAvailable: 1 },
	foundation: { title: "foundation", copiesAvailable: 0 },
};

// Schemas
export const BookTitleSchema = z.enum(["dune", "neuromancer", "foundation"]);

export const BookSchema = z.object({
	title: BookTitleSchema,
	copiesAvailable: z.number().int().nonnegative(),
});

// Types inferred from the schemas
export type Book = z.infer<typeof BookSchema>;

export const findBook = (type: unknown): Book => {
	const bookType = BookTitleSchema.parse(type);
	return BookSchema.parse(catalogue[bookType]);
};

export const checkOutBook = (book: unknown): number => {
	const checkBook = BookSchema.parse(book);
	if (checkBook.copiesAvailable === 0) {
		throw new Error("No copies available");
	}
	return Math.floor(Math.random() * 9000) + 1000;
};
