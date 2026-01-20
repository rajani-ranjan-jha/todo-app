import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

// Create the pool to database using Neon connection string
export const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false // Required for most cloud Postgres providers like Neon
  }
});

// Setup database table
export async function setupDatabase() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                text VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    console.log("Database initialized: connected to database (PostgreSQL)");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}