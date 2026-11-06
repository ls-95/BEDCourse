import { z } from "zod";

export const LoanSchema = z.object({
	loanId: z.number().int().positive(),
	title: z.string().min(1),
	memberId: z.number().int().positive(),
});

export type Loan = z.infer<typeof LoanSchema>;

const activeLoans: Loan[] = [
	{ loanId: 1001, title: "dune", memberId: 7 },
	{ loanId: 1002, title: "neuromancer", memberId: 3 },
];

export const findLoan = (loanId: unknown) => {
	const id = z.number().int().positive().parse(loanId);
	const loan = activeLoans.find((l) => l.loanId === id);
	if (!loan) {
		throw new Error("Loan not found");
	}
	return { loanId: loan.loanId, title: loan.title, memberId: loan.memberId };
};

export const markReturned = (loan: unknown) => {
	const validLoan = LoanSchema.parse(loan);
	return { ...validLoan, returned: true };
};

export const returnBook = (loanId: unknown) => {
	const loan = findLoan(loanId);
	return markReturned(loan);
};
