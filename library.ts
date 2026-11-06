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

export const LoanSchema = z.object({
	loanId: z.number().int().positive(),
	title: BookTitleSchema,
	memberId: z.number().int().positive(),
});

export const MembershipSchema = z.enum(["basic", "premium"]);

export const MemberSchema = z.object({
	id: z.number().int().positive(),
	name: z.string().trim().min(1),
	membership: MembershipSchema,
	booksOnLoan: z.number().int().nonnegative(),
});

// Types inferred from the schemas
export type Book = z.infer<typeof BookSchema>;

export type Loan = z.infer<typeof LoanSchema>;

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

export const registerLoan = (
	loanId: unknown,
	title: unknown,
	memberId: unknown,
): Loan => {
	return LoanSchema.parse({ loanId, title, memberId });
};

export const borrowBook = (title: unknown, memberId: unknown): Loan => {
	const book = findBook(title);
	const loanId = checkOutBook(book);
	return registerLoan(loanId, book.title, memberId);
};

export const canBorrow = (member: unknown): boolean => {
	const membership = MemberSchema.parse(member);
	if (membership.membership === "basic") {
		if (membership.booksOnLoan < 2) {
			return true;
		} else {
			return false;
		}
	} else if (membership.membership === "premium") {
		if (membership.booksOnLoan < 5) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};
