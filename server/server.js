import express from 'express'
import cors from 'cors'
import { pool, setupDatabase } from './db2.js'

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database
setupDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("Todo App API Running");
});

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST new todo
app.post("/todos", async (req, res) => {
  // console.log("POST /todos called");
  // console.log("Body:", req.body);
  const { text } = req.body;
  if (!text) {
    console.log("Missing text");
    return res.status(400).json({ error: "Text is required" });
  }
  try {
    const result = await pool.query("INSERT INTO todos (text) VALUES ($1) RETURNING *", [text]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("SERVER_ERROR_DETAILS:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PUT update todo (toggle completion or update text)
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  try {
    // Build dynamic query
    const fields = [];
    const values = [];
    let paramIndex = 1;
    if (text !== undefined) {
      fields.push(`text = $${paramIndex++}`);
      values.push(text);
    }
    if (completed !== undefined) {
      fields.push(`completed = $${paramIndex++}`);
      values.push(completed);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);
    const query = `UPDATE todos SET ${fields.join(", ")} WHERE id = $${paramIndex}`;

    await pool.query(query, values);
    res.json({ message: "Todo updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
