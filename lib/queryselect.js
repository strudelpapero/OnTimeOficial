const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function fetchPlatos() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Platos');
    console.log(result.rows);
    client.release();
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    pool.end();
  }
}

fetchPlatos();

