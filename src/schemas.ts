import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .min(1, { message: "The book title must contain at least 1 character." })
    .max(50, {
      message: "The book title must not contain more than 50 characters.",
    }),
  genre: z
    .string()
    .min(1, { message: "The book genre must contain at least 3 characters." })
    .max(50, {
      message: "The book genre must not contain more than 50 characters.",
    }),
  published_year: z
    .number()
    .int()
    .min(1450, {
      message:
        "Year cannot be earlier as the invention of the printing press was in 1450.",
    })
    .max(new Date().getFullYear(), {
      message: "Publication cannot be in the future. ",
    }),
  author_id: z.number().int().positive("A valid author ID is required"),
});

export const authorSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "The author's name must contain at least 3 characters.",
    })
    .max(50, {
      message: "The author's name must not container more than 50 characters",
    }),
});

export const idParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const bookPatchSchema = bookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be sent",
  });

export const bookQuerySchema = z.object({
  genre: z.string().optional(),
  sort: z.enum(["title", "published_year", "genre"]).optional(),
});
