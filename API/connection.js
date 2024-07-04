const { Pool } = require('pg');
const express = require('express')
const cors = require('cors'); // Importa el paquete cors
const open = require('open'); // Importa el paquete open

require('dotenv').config();

console.log("POSTGRES_URL:", process.env.POSTGRES_URL); 

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Usa cors y permite solicitudes desde localhost:5050

const port = 3000;

app.get('/getDishes', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Platos');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error'); // Envía una respuesta de error en caso de fallo
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
