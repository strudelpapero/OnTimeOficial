
import type { Metadata } from "next";
import Header from '../components/header';
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata: Metadata = {
  title: "OnTime",
  description: "aplicación de almuerzo rápido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId="276454283985-i4qs229a29djvi291r24ro5tkgedisr8.apps.googleusercontent.com">
      <html lang="es">
        <body>
          {/*<Header />   Si el Header debe estar en todas las páginas */}
          {children}
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
