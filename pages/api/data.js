import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await db.query('SELECT * FROM Plato');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
