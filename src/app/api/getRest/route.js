import { sql } from '@vercel/postgres';
import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // o la variable de entorno que estés usando
});

export async function GET() {
  try {
    // Ejecutar la consulta
    const result = await sql`SELECT id, nombre, foto FROM restaurante`;

    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
