import db from '../../lib/db';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, descripcion, precio, imagenPath } = req.body;

    try {
      const imagePath = path.join(process.cwd(), imagenPath);
      const imageData = fs.readFileSync(imagePath);

      const query = 'INSERT INTO Platos (nombre, descripcion, imagen, precio) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [nombre, descripcion, imageData, precio];
      const result = await db.query(query, values);

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
