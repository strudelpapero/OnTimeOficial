import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const {
      documento_usuario,
      nombre,
      fecha,
      hora,
      telefono,
      mail,
      cant_clientes,
      id_restaurante,
      platos,
     // Array { id: número, cantidad: número }
      metododepago
    } = await request.json();

    // Inserta la nueva reserva
    const reservaResult = await sql`
      INSERT INTO reserva (documento_usuario, nombre, fecha, hora, telefono, mail, cant_clientes, id_restaurante)
      VALUES (${documento_usuario}, ${nombre}, ${fecha}, ${hora}, ${telefono}, ${mail}, ${cant_clientes}, ${id_restaurante})
      RETURNING id;
    `;

    const reservaId = reservaResult.rows[0].id;

    // Calcula el precio total 
    const preciosPlatos = await Promise.all(
      platos.map(async (plato: { id: number, cantidad: number }) => {
        const platoResult = await sql`
          SELECT precio FROM platos WHERE id = ${plato.id}
        `;
        return platoResult.rows[0].precio * plato.cantidad;
      })
    );

    const precioTotal = preciosPlatos.reduce((acc, precio) => acc + precio, 0);

    // Inserta el nuevo pedido
    const pedidoResult = await sql`
      INSERT INTO pedido (id_reserva, precio_total, metodo_pago)
      VALUES (${reservaId}, ${precioTotal}, ${metododepago}) 
      RETURNING id;
    `;

    const pedidoId = pedidoResult.rows[0].id;

    const comanda = platos.map((plato: { id: string }) => sql`
      INSERT INTO comanda (id_plato, id_pedido)
      VALUES (${plato.id}, ${pedidoId});
    `);

    await Promise.all(comanda);

    // Responde con el ID de la reserva
    return NextResponse.json({ id: reservaId }, { status: 201 });
  } catch (error: any) {
    // Manejo de errores
    console.error('Error creando la reserva:', error.message);
    return NextResponse.json({ error: 'Error creando la reserva' }, { status: 500 });
  }
}
