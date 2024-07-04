import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "OnTime",
  description: "aplicacion de almuerzo rapido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

const page = () => {
  return (
    <div className="fixed w-full h-[39px] top-0 left-0 z-[1000] bg-primaryC"></div>
  )
}

