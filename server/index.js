const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'tickets',
});

// Get ticket availability
app.get('/api/tickets', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT type, available FROM tickets');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update ticket counts (admin)
app.post('/api/tickets/update', async (req, res) => {
  const updates = req.body; // [{type: 'VIP', available: 100}, ...]
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    for (const u of updates) {
      await conn.query('UPDATE tickets SET available=? WHERE type=?', [u.available, u.type]);
    }
    await conn.commit();
    res.json({ status: 'ok' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

// Customer registration
app.post('/api/register', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book ticket
app.post('/api/book', async (req, res) => {
  const { customerId, type } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [[ticket]] = await conn.query('SELECT available FROM tickets WHERE type=? FOR UPDATE', [type]);
    if (!ticket || ticket.available <= 0) {
      throw new Error('Ticket not available');
    }
    await conn.query('UPDATE tickets SET available = available - 1 WHERE type=?', [type]);
    await conn.query('INSERT INTO bookings (customer_id, ticket_type) VALUES (?, ?)', [customerId, type]);
    await conn.commit();
    res.json({ status: 'booked' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));

