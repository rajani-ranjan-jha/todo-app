const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'mom+dad+raj181810',
  database: 'todo-app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + connection.threadId);
  connection.release(); // Release the connection back to the pool
});

// Export the pool
module.exports = pool;
