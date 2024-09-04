import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; 
  try {
    
    // Realiza la consulta para obtener la reserva por id
    const result = await sql`
      SELECT * FROM reserva WHERE id = ${id};
    `;

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error obteniendo la reserva:', error);
    return NextResponse.json({ error: 'Error obteniendo la reserva' }, { status: 500 });
  }
}
