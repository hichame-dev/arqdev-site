# ARQDEV — Site Vitrine

Studio de developpement freelance specialise en React Native et solutions fullstack sur mesure.

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS + CSS custom (glassmorphism, noise, grid)
- **Animations** : Framer Motion
- **Polices** : Nunito (sans), Space Mono (mono), JetBrains Mono (code)
- **IA** : Groq SDK (chatbot integre)
- **Icones** : Lucide React + SVG custom (workflow)

## Demarrage rapide

```bash
# Installer les dependances
npm install

# Lancer en developpement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de dev (hot reload) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Linter ESLint |

## Structure du projet

```
src/
  app/
    layout.tsx        # Layout principal (polices, metadata)
    page.tsx          # Page d'accueil
    globals.css       # Styles globaux (glass, grid, scrollbar)
    api/chat/         # API route chatbot IA
  components/
    Hero.tsx          # Section hero avec typing effect
    Navbar.tsx        # Navigation sticky glass
    Services.tsx      # Grille des 4 services
    AISection.tsx     # Section IA dediee
    Projects.tsx      # Showcase projets (TiltCard)
    Stats.tsx         # Compteurs animes
    WorkflowSchema.tsx # Schema workflow SVG anime
    TechMarquee.tsx   # Defilement stack technique
    ChatBot.tsx       # Chatbot IA flottant
    Contact.tsx       # Formulaire de contact
    Footer.tsx        # Footer
    Preloader.tsx     # Ecran de chargement
    CursorGlow.tsx    # Effet glow curseur
  lib/
    constants.ts      # Config site, services, projets, workflow
    metadata.ts       # SEO metadata
public/
  asset/              # Images services et IA
```

## Variables d'environnement

```env
GROQ_API_KEY=       # Cle API Groq pour le chatbot
```

## Deploiement

Compatible Vercel (zero config) :

```bash
# Build de production
npm run build

# Ou deployer sur Vercel
npx vercel
```
