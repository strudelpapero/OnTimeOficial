`const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};`


const { Pool } = require('pg');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configurar la conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Exportar el objeto `db` que contiene la función `query`
const db = {
  query: (text, params) => pool.query(text, params),
};


module.exports = db;

