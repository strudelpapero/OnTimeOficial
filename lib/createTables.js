// lib/createTables.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS Platos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) UNIQUE NOT NULL,
        Descripcion TEXT,
        Precio INT, 
        Celiaco BOOLEAN,
        Kosher BOOLEAN,
        Vegano BOOLEAN,
        datos BYTEA,
      )
    `;

    await pool.query(query);
    console.log("Tabla 'Plato' creada exitosamente.");
  } catch (err) {
    console.error('Error creando la tabla:', err);
  } finally {
    pool.end();
  }
};

createTable();
