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

// Task THREE

const newUserSchema = z.object({
  name: z.string().min(3).max(12),
  age: z.number().min(18).max(100).optional().default(28),
  email: z.email().toLowerCase(),
});

app.post("/users", (req, res) => {
  const validateNewUser = newUserSchema.safeParse(req.body);
  if (!validateNewUser.success) {
    res.status(400).json({ message: validateNewUser.error });
  } else {
    res.status(201).json({ user: validateNewUser });
  }
});

// Task FOUR

const randomLoginSchema = z.object({
  results: z.array(
    z.object({
      login: z.object({
        username: z.string(),
      }),
      registered: z.object({
        date: z.string(),
      }),
    }),
  ),
});

app.get("/random-login", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) {
      return res.status(response.status).json({ error: "Error fetching data" });
    }
    const data = await response.json();
    const validateLogin = randomLoginSchema.safeParse(data);
    if (!validateLogin.success) {
      return res.status(500).json({
        message: "Internal Server Error.",
        details: validateLogin.error,
      });
    }
    const login = validateLogin.data?.results[0];
    res.send(
      `${login?.login.username} (registered on ${login?.registered.date.slice(0, 10)})`,
    );
    // res.json({
    //   username: login?.login.username,
    //   registered: login?.registered.date.slice(0, 10),
    // });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
