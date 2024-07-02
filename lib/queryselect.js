const { Pool } = require('pg');
require('dotenv').config();

console.log("POSTGRES_URL:", process.env.POSTGRES_URL);  // Verifica la URL aquí

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function fetchPlatos() {
  try {
    console.log('Connecting to database...');
    const client = await pool.connect();
    console.log('Connected successfully.');
    
    const result = await client.query('SELECT * FROM Platos');
    console.log('Query executed successfully.');
    console.log(result.rows);
    
    client.release();
    console.log('Client released.');
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    await pool.end();
    console.log('Pool ended.');
  }
}

fetchPlatos();
 