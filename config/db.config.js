// db.js
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Use env variable for security and flexibility
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Store in .env
  ssl: {
    rejectUnauthorized: false, // Required for secure connections (like Neon, Nile, Heroku, etc.)
  },
});

export async function runCommand(command) {
  const client = await pool.connect();
  try {
    const result = await client.query(command);
    return result;
  } catch (err) {
    console.error("Query failed:", err);
    throw err;
  } finally {
    client.release();
  }
}
