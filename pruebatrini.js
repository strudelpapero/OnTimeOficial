const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('foto'), async (req, res) => {
  const foto = req.file.buffer; // El archivo subida
  try {
    const client = await pool.connect();
    await client.query(
      `INSERT INTO restaurante (foto) VALUES ($1)`,
      [foto]
    );
    client.release();
    res.status(201).send('Imagen subida y guardada exitosamente');
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).send('Error uploading image');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
