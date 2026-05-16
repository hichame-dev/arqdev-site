import type { Metadata } from "next";
import { Nunito, Space_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { baseMetadata } from "@/lib/metadata";
import Starfield from "@/components/Starfield";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${nunito.variable} ${spaceMono.variable} ${jetbrainsMono.variable} antialiased font-sans bg-surface text-foreground`}
      >
        <Starfield />
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
