import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "ARQDEV \u2014 D\u00e9veloppeur Fullstack Freelance | Marseille",
    template: "%s | ARQDEV",
  },
  description:
    "Applications mobiles, web, APIs et IA. React Native, Node.js, MongoDB. Marseille.",
  keywords: [
    "d\u00e9veloppement mobile",
    "React Native",
    "freelance",
    "Marseille",
    "application mobile",
    "d\u00e9veloppeur fullstack",
    "TypeScript",
    "Next.js",
    "iOS",
    "Android",
    "IA",
    "automatisation",
    "Node.js",
    "MongoDB",
  ],
  authors: [{ name: SITE_CONFIG.namePlain, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.namePlain,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.namePlain,
    title: "ARQDEV \u2014 D\u00e9veloppeur Fullstack Freelance",
    description:
      "Concevoir \u00b7 D\u00e9velopper \u00b7 Architecturer \u00b7 D\u00e9ployer \u00b7 Automatiser",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.namePlain,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARQDEV \u2014 D\u00e9veloppeur Fullstack Freelance",
    description:
      "Concevoir \u00b7 D\u00e9velopper \u00b7 Architecturer \u00b7 D\u00e9ployer \u00b7 Automatiser",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
