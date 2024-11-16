// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Toyota Fuel Economy App Backend');
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api/data', async (req, res) => {
  try {
    const { model, year } = req.query;
    let query = 'SELECT * FROM fuel_economy';
    const params = [];

    if (model) {
      params.push(`%${model}%`);
      query += ` WHERE model ILIKE $${params.length}`;
    }

    if (year) {
      params.push(year);
      query += params.length === 1 ? ` WHERE year = $${params.length}` : ` AND year = $${params.length}`;
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

