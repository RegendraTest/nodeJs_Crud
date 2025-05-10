// db.js
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: 'postgres://0196b87b-d3b7-726f-8459-95b8b62e063c:ab1a8f3e-eef8-448e-885e-67c758a29e86@us-west-2.db.thenile.dev/nile_orange_yacht',
  ssl: {
    rejectUnauthorized: false, // Optional, required if your DB requires SSL (like Heroku/Neon)
  },
});

export default async function runCommand(command) {
  const client = await pool.connect();
  try {
    const result = await client.query(command);
    return result;
  } finally {
    client.release();
  }
}

// Optional: test connection
pool.connect()
  .then(client => {
    console.log("Connected to PostgreSQL successfully.");
    client.release();
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });
