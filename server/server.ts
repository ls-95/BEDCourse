import { z } from "zod";
import express from "express";

const app = express();
const PORT = 300;

app.use(express.json());

// Task ONE

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});

// Task TWO

const randomUserSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string(),
      }),
      location: z.object({
        country: z.string(),
      }),
    }),
  ),
});

app.get("/random-person", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();

    const validateRandomUser = randomUserSchema.safeParse(data);
    if (!validateRandomUser.success) {
      return res.status(500).json({
        message: "Internal Server Error.",
        details: validateRandomUser.error,
      });
    }
    const randomUser = validateRandomUser.data.results[0];
    res.json({
      name: `${randomUser?.name.first} ${randomUser?.name.last}`,
      country: randomUser?.location.country,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch random user",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
