// app.js
const cors = require('cors')
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());
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
app.get('/getRestaurantes', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, nombre, foto FROM restaurante');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/getInfoNosotros')

app.get('/getInfo_RestyPlato/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT 
      r.nombre AS restaurante,
      r.direccion,
      r.calle,
      r.foto
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

app.post('/newplato', async (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    id_rest,
    disponible,
    vegetariano,
    sin_gluten,
    kosher
  } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO platos (nombre, descripcion, precio, id_rest, disponible, vegetariano, sin_gluten, kosher)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `[nombre, descripcion, precio, id_rest, disponible, vegetariano, sin_gluten, kosher]);
    client.release();
    res.json(result.rows);
    res.status(201).send('Plato agregado exitosamente');
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/getIdplato/:nombre/:idrest', async (req, res) => {
  const { nombre, idrest } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT id 
    FROM platos 
    WHERE nombre = $1 AND id_rest = $2;
  `,
    [nombre, parseInt(idrest)]);
    client.release();
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/updateplatoNombrePrecio/:id', async (req, res) => {
  const {id} = req.params
  const {nombre, precio} = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(`UPDATE platos
    SET nombre = $1, precio = $2
    WHERE id = $3;
    ` [nombre, precio, id]);
    client.release();
    res.json(result.rows);
    res.status(201).send('Plato modificado exitosamente');
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/updateplatoDescripcionOpcionAlimentaria/:idplato', async (req, res) => {
  const {idplato} = req.params
  const {descripcion, vegetariano, sin_gluten, kosher} = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(`UPDATE platos
    SET descripcion = $1, vegetariano = $2, sin_gluten = $3, kosher = $4
    WHERE id = $5;
    ` [descripcion, vegetariano, sin_gluten, kosher, id]);
    client.release();
    res.json(result.rows);
    res.status(201).send('Plato modificado exitosamente');
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/getMetodosdePago/:idrest', async (req, res) => {
  const { idrest } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT 
    debito, 
    credito, 
    mercadopago, 
    efectivo, 
    modo
FROM 
    restaurante
WHERE 
    id = $1;
  `,
    [idrest]);
    client.release();
    res.json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/updateMetodoPago/:idrest', async (req, res) => {
  const {idrest} = req.params
  const {efectivo, mercadopago, modo, credito, debito} = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(`UPDATE restaurante
    SET efectivo = $1, mercadopago = $2, modo = $3, credito = $4, debito =$5
    WHERE id_rest = $6;
    ` [efectivo, mercadopago, modo, credito, debito, idrest]);
    client.release();
    res.json(result.rows);
    res.status(201).send('Plato modificado exitosamente');
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Server Error');
  }
});

//ejemplo de subida de foto
app.post('/uploadFoto/:id', upload.single('foto'), async (req, res) => {
  const { id } = req.params;
  const filePath = '.\fotos\il-quotidiano.jpg';

  try {
    // Subir la imagen a Vercel Blob
    const blobResponse = await axios.post(
      'https://api.vercel.com/v2/now/blobs', 
      {
        file: filePath
      }, 
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_BLOB_TOKEN}`,
          'Content-Type': 'application/octet-stream'
        }
      }
    );

    // Obtener el link de la imagen subida
    const imageUrl = `https://vercel.app/_next/image?url=${blobResponse.data.url}&w=750&q=75`;

    // Actualizar la columna 'foto' en la tabla 'restaurante'
    const client = await pool.connect();
    await client.query(
      'UPDATE restaurante SET foto = $1 WHERE id = $2',
      [imageUrl, id]
    );
    client.release();

    res.status(200).json({ message: 'Foto subida y link actualizado', imageUrl });
  } catch (error) {
    console.error('Error al subir la foto:', error);
    res.status(500).json({ error: 'Error al subir la foto' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
