import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { sql } from '@vercel/postgres';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = profile.email;
      const name = profile.name;

      // 1. Verificar si el usuario ya existe en la tabla `restaurante`
      const existingUser = await sql`
        SELECT id FROM restaurante WHERE mail = ${email};
      `;

      if (existingUser.length === 0) {
        // 2. Si no existe, crear un nuevo usuario en la tabla `restaurante`
        const newUser = await sql`
          INSERT INTO restaurante (nombre, mail)
          VALUES (${name}, ${email})
          RETURNING id;
        `;
        const userId = newUser[0].id;

        return true;  // Permitir el inicio de sesión
      } else {
        const userId = existingUser[0].id;

        // Aquí podrías guardar el userId en la sesión
        return true;  // Permitir el inicio de sesión
      }
    },

    async session({ session, token, user }) {
      // 3. Añadir el ID del usuario a la sesión, para poder utilizarlo más adelante
      const userRecord = await sql`
        SELECT id FROM restaurante WHERE mail = ${session.user.email};
      `;
      
      if (userRecord.length > 0) {
        session.user.id = userRecord[0].id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
