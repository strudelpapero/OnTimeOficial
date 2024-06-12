// Importa el cliente de Prisma
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';

const prisma = new PrismaClient().$extends(withAccelerate())
// Crea una instancia del cliente de Prisma

await prisma.user.findMany({ 
    where: { 
      email: { 
        contains: "alice@prisma.io",
      },
    },
    cacheStrategy: { ttl: 60 },
  });
async function main() {
  // Ejemplo de consulta: Crear un nuevo usuario
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  });
  console.log('Nuevo usuario creado:', newUser);

  // Ejemplo de consulta: Consultar todos los usuarios
  const allUsers = await prisma.user.findMany();
  console.log('Todos los usuarios:', allUsers);
}

main()
  .catch((error) => {
    console.error('Error al ejecutar consultas:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


