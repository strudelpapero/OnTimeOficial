import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Ejecutar la consulta
    const result = await sql`SELECT id, nombre, foto FROM restaurante`;
    console.log(result.rows); // Añade esto justo después de la consulta
    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    console.error('Error al conectar con la base de datos:', error.message); // Log del error
    return NextResponse.json({ error: 'Error al conectar con la base de datos' }, { status: 500 });
  }
  
}

