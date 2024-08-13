import pg from 'pg';
const { Pool } = pg;
import express from 'express';
import cors from 'cors'; // Importa el paquete cors

import "dotenv/config";

console.log("POSTGRES_URL:", process.env.POSTGRES_URL);

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Usa cors y permite solicitudes desde localhost:5500

const port = 3000;

// Endpoint para obtener platos
app.get('/getDishes', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Platos');
        client.release(); // Libera el cliente después de la consulta
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error'); // Envía una respuesta de error en caso de fallo
    }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
