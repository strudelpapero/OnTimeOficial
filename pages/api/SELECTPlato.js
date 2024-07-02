import {db} from '../../lib/db.js';

async function fetchUsers() {
  try {
    const result = await db.query('SELECT * FROM users');
    console.log(result.rows); // Mostrar los resultados en la consola
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
  }
}

fetchUsers();