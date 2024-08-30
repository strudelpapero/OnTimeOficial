import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;
    // Ejecutar la consulta
    const result = await sql`SELECT 
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
        r.id = ${id};`;
    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}