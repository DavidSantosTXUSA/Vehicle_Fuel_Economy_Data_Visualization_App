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

app.get('/api/car-data', async (req, res) => {
  try {
    const { year, manufacturer, division, car_model } = req.query;
    let query = 'SELECT * FROM car_data';
    const params = [];
    const conditions = [];

    if (year) {
      params.push(year);
      conditions.push(`year = $${params.length}`);
    }

    if (manufacturer) {
      params.push(`%${manufacturer}%`);
      conditions.push(`manufacturer ILIKE $${params.length}`);
    }

    if (division) {
      params.push(`%${division}%`);
      conditions.push(`division ILIKE $${params.length}`);
    }

    if (car_model) {
      params.push(`%${car_model}%`);
      conditions.push(`car_model ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

