import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Tschander.Keller Architekten ETH/SIA · Zürich | Architektur, Umbau & Raumgestaltung",
  description:
    "Tschander.Keller Architekten an der Dolderstrasse 30 in 8032 Zürich. Atmosphärisch und funktional gestalteter Wohnraum durch präzisen Umbau historischer Bausubstanz, Neubauten und Raumgestaltung. Persönlich begleitet von Marietta Tschander (dipl. Architektin ETH/SIA) und Christian Keller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#FAFAF9] text-[#121212]">
        {children}
      </body>
    </html>
  );
}
