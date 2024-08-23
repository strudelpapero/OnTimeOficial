// app.js
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

/*app.get('/getDishes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Platos');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});*/

app.get('/getInfo_RestyPlato/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT 
      r.nombre AS restaurante,
      r.direccion,
      r.calle,
      p.nombre AS plato,
      p.precio
  FROM 
      restaurante r
  JOIN 
      platos p ON r.id = p.id_rest
  WHERE 
      r.id = $1;`,
    [id]);
    client.release();
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

//Ejemplo cuando se accede a /ping devulve /pong
app.get("/ping", (req, res) => {
  res.json("pong")
} )

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
