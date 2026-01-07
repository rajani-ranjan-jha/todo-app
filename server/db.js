import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

// Create the pool to database
export const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: process.env.SQL_PASS,
  database: "todo-app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Setup database table
export async function setupDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query('DROP TABLE IF EXISTS todos');
    await connection.query(`
            CREATE TABLE todos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                text VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    connection.release();
    console.log("Database initialized: todos table recreated.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

// Helper query function (optional, but pool.query is usually sufficient)
export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}
