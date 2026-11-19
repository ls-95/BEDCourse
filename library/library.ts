import { z } from "zod";

const catalogue = {
	dune: { title: "dune", copiesAvailable: 3 },
	neuromancer: { title: "neuromancer", copiesAvailable: 1 },
	foundation: { title: "foundation", copiesAvailable: 0 },
	frankenstein: { title: "frankenstein", copiesAvailable: 2 },
};

// Schemas
export const BookTitleSchema = z.enum([
	"dune",
	"neuromancer",
	"foundation",
	"frankenstein",
]);

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

export const BookTitlesSchema = z.array(BookTitleSchema).min(1).max(3);

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

export const canBorrow = (member: unknown, count = 1): boolean => {
	const membership = MemberSchema.parse(member);
	return membership.booksOnLoan + count <= borrowLimit(membership.membership);
	// if (membership.membership === "basic") {
	// 	return membership.booksOnLoan + count <= 2;
	// } else if (membership.membership === "premium") {
	// 	return membership.booksOnLoan + count <= 5;
	// } else {
	// 	return false;
	// }
};

export const borrowLimit = (membership: unknown): number => {
	const mbrship = MembershipSchema.parse(membership);
	if (mbrship === "basic") {
		return 2;
	}
	return 5;
};

export const borrowWithLimit = (title: unknown, member: unknown): Loan => {
	const mbr = MemberSchema.parse(member);
	if (!canBorrow(mbr)) {
		throw new Error("Borrowing limit reached");
	} else {
		return borrowBook(title, mbr.id);
	}
};

export const borrowBooks = (titles: unknown, member: unknown): Loan[] => {
	const validTitles = BookTitlesSchema.parse(titles);
	const mbr = MemberSchema.parse(member);

	if (canBorrow(member, validTitles.length)) {
		const result = validTitles.map((t) => borrowBook(t, mbr.id));
		return result;
	} else {
		throw new Error("Borrowing limit reached");
	}
};
