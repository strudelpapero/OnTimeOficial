// /pages/api/getInfo_RestyPlato.js
import { Pool } from 'pg';
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `SELECT 
          r.nombre AS restaurante,
          r.direccion,
          r.calle,
          r.foto,
          p.nombre AS plato,
          p.precio
        FROM 
          restaurante r
        JOIN 
          platos p ON r.id = p.id_rest
        WHERE 
          r.id = $1;`,
        [id]
      );
      client.release();
      
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
