import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; // Obtiene el ID del restaurante de los parámetros de la URL

  try {
    const {
      nombre,
      contrasena,
      direccion,
      mail,
      telefono,
      debito,
      credito,
      modo,
      mercadopago,
      efectivo,
      foto,
      descripcion,
    } = await request.json(); // Lee el cuerpo de la solicitud como JSON

    // Actualiza la información del restaurante
    await sql`
      UPDATE restaurante
      SET 
        nombre = ${nombre},
        contrasena = ${contrasena},
        direccion = ${direccion},
        mail = ${mail},
        telefono = ${telefono},
        debito = ${debito},
        credito = ${credito},
        modo = ${modo},
        mercadopago = ${mercadopago},
        efectivo = ${efectivo},
        foto = ${foto},
        descripcion = ${descripcion}
      WHERE id = ${id}; // Condición para identificar el restaurante a actualizar
    `;

    return NextResponse.json({ message: 'Perfil actualizado con éxito' }, { status: 200 });
  } catch (error: any) {
    console.error('Error al actualizar el perfil:', error.message);
    return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 });
  }
}
