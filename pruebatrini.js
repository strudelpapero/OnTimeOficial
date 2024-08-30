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
