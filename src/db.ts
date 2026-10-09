import dotenv from "dotenv";
import pg from "pg";
import { z } from "zod";
import { envSchema } from "./env.ts";

dotenv.config();

const { Pool } = pg;

const validateEnv = envSchema.safeParse(process.env);
if (!validateEnv.success) {
  console.error(
    "Invalid environment variables:",
    z.treeifyError(validateEnv.error),
  );
  process.exit(1);
}

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } =
  validateEnv.data;

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});
