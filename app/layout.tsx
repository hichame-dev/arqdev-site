import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Space_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import IntroAnimation from "@/components/ui/IntroAnimation";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const DESCRIPTION =
  "Studio de développement à Marseille — apps mobiles React Native, web, backend, agents IA et formations IA pour les équipes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://arqdev.dev"),
  alternates: { canonical: "/" },
  title: "ARQDEV — Studio de développement · Marseille",
  description: DESCRIPTION,
  keywords: [
    "développement mobile",
    "React Native",
    "Expo",
    "application mobile",
    "agents IA",
    "formation IA",
    "intégration LLM",
    "Marseille",
    "studio",
    "ARQDEV",
  ],
  openGraph: {
    title: "ARQDEV — Studio de développement",
    description: DESCRIPTION,
    type: "website",
    locale: "fr_FR",
    siteName: "ARQDEV",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARQDEV — Studio de développement",
    description: DESCRIPTION,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ARQDEV",
  description: DESCRIPTION,
  url: "https://arqdev.dev",
  email: "arqdev@outlook.fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marseille",
    addressCountry: "FR",
  },
  founder: {
    "@type": "Person",
    name: "Hichame El Ghaouti",
  },
  sameAs: [
    "https://github.com/hichame-dev",
    "https://www.linkedin.com/in/hichame-el-ghaouti-874b31376",
  ],
  knowsAbout: [
    "Développement mobile React Native",
    "Développement web Next.js",
    "Backend Node.js",
    "Agents IA et intégration LLM",
    "Formations IA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${displayFont.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
      // Le script inline ci-dessous ajoute `intro-played` avant l'hydratation
      // selon sessionStorage — divergence serveur/client attendue.
      suppressHydrationWarning
    >
      <body className="noise">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Toggle `intro-played` on <html> synchronously before hydration so
            repeat visits don't show the hero-reveal opacity:0 state. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(sessionStorage.getItem('intro-played')==='true'){document.documentElement.classList.add('intro-played')}}catch(e){}})();",
          }}
        />
        <IntroAnimation />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
