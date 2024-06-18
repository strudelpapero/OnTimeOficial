const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

async function createTable() {
  try {
    const client = await pool.connect();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Platos (
        id SERIAL PRIMARY KEY,
        nombre TEXT,
        descripcion TEXT,
        imagen BYTEA,
        precio DECIMAL(10, 2) NOT NULL,
        kosher BOOLEAN,
        vegano BOOLEAN,
        celiaco BOOLEAN
      );
    `;
  
    await client.query(createTableQuery);
    console.log("Tabla creada exitosamente");
    client.release();
  } catch (err) {
    console.error('Error creando la tabla:', err);
  }
    finally {
    pool.end();
  };
}

createTable();