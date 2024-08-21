import express from "express"
import Pool from "pg"
import {} from 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool.Pool({
  connectionString: process.env.POSTGRES_URL,
});

app.get('/getDishes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Platos');
    client.release();
    res.json(result.rows);
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
