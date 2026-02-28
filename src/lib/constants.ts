export const SITE_CONFIG = {
  name: "AR\u0394DEV",
  namePlain: "ARQDEV",
  tagline: "Concevoir \u00b7 D\u00e9velopper \u00b7 Architecturer \u00b7 D\u00e9ployer \u00b7 Automatiser",
  description:
    "Studio de d\u00e9veloppement freelance sp\u00e9cialis\u00e9 en React Native et solutions fullstack sur mesure.",
  url: "https://arqdev.dev",
  email: "hichame_dev@outlook.com",
  phone: "+33 6 XX XX XX XX",
  location: "Marseille, France",
  founder: "Shems",
  socials: {
    github: "https://github.com/arqdev",
    linkedin: "https://linkedin.com/company/arqdev",
  },
} as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "#hero" },
  { label: "Projets", href: "#projets" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export interface Project {
  slug: string;
  title: string;
  icon: string;
  image: string;
  imagePosition?: string;
  subtitle: string;
  description: string;
  techStack: string[];
  color: string;
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "motorquest",
    icon: "mobile",
    image: "/motorquest.webp",
    imagePosition: "center",
    title: "MotorQuest",
    subtitle: "Application GPS moto gamifi\u00e9e",
    description:
      "Application GPS moto gamifi\u00e9e. Tracking temps r\u00e9el, challenges, XP, classements.",
    techStack: ["React Native", "Mapbox", "Node.js", "MongoDB"],
    color: "#9333ea",
    features: [
      "Tracking GPS temps r\u00e9el",
      "Syst\u00e8me de challenges et XP",
      "Classements communautaires",
      "Cartes interactives Mapbox",
    ],
  },
  {
    slug: "roadtrippark",
    icon: "mobile",
    image: "/roadtrippark.jpg",
    imagePosition: "bottom",
    title: "RoadTripPark",
    subtitle: "Planificateur road trips camping-car",
    description:
      "Planification de road trips camping-car. Itin\u00e9raires, parkings, attractions, guides.",
    techStack: ["React Native", "Firebase", "Mapbox", "Express"],
    color: "#3ee0f5",
    features: [
      "Planification d'itin\u00e9raires optimis\u00e9s",
      "R\u00e9pertoire de parkings et attractions",
      "Guides communautaires",
      "Mode navigation hors-ligne",
    ],
  },
];

export interface Service {
  icon: string;
  title: string;
  description: string;
  accent: string;
  details: string[];
}

export const SERVICES: Service[] = [
  {
    icon: "/asset/code-dev.png",
    title: "Apps Mobile",
    description: "iOS & Android \u2014 React Native",
    accent: "#9333ea",
    details: [
      "React Native / Expo",
      "Publication stores",
      "Push notifications",
      "Mode hors-ligne",
    ],
  },
  {
    icon: "/asset/laptop-web.png",
    title: "Web & APIs",
    description: "Full Stack \u2014 Node.js \u00b7 Next.js",
    accent: "#c084fc",
    details: [
      "Next.js / React",
      "API REST & GraphQL",
      "CMS headless",
      "D\u00e9ploiement CI/CD",
    ],
  },
  {
    icon: "/asset/chip-archi.png",
    title: "Architecture",
    description: "Scalable \u2014 Cloud \u00b7 DevOps",
    accent: "#3ee0f5",
    details: [
      "Architecture microservices",
      "PostgreSQL / MongoDB",
      "Firebase / Supabase",
      "Tests automatis\u00e9s",
    ],
  },
  {
    icon: "/asset/robot-ai.png",
    title: "IA & Auto",
    description: "Agents IA \u2014 MCP \u00b7 Groq",
    accent: "#f08dff",
    details: [
      "Agents IA conversationnels",
      "Automatisation workflows",
      "Int\u00e9gration MCP",
      "Groq / Llama",
    ],
  },
];

export interface WorkflowNodeData {
  id: string;
  label: string;
  icon: string;
  color: string;
  x: number;
  y: number;
}

export const WORKFLOW_NODES: WorkflowNodeData[] = [
  { id: "concevoir", label: "CONCEVOIR", icon: "concevoir", color: "#c084fc", x: 120, y: 200 },
  { id: "developper", label: "DÉVELOPPER", icon: "developper", color: "#9333ea", x: 340, y: 120 },
  { id: "architecturer", label: "ARCHITECTURER", icon: "architecturer", color: "#3ee0f5", x: 560, y: 200 },
  { id: "deployer", label: "DÉPLOYER", icon: "deployer", color: "#9333ea", x: 780, y: 120 },
  { id: "automatiser", label: "AUTOMATISER", icon: "automatiser", color: "#f08dff", x: 1000, y: 200 },
];

export interface TechItem {
  name: string;
  color: string;
}

export const TECH_STACK_ROW1: TechItem[] = [
  { name: "React Native", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68a063" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "Firebase", color: "#ffca28" },
];

export const TECH_STACK_ROW2: TechItem[] = [
  { name: "Mapbox", color: "#4264fb" },
  { name: "Express", color: "#ffffff" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "Docker", color: "#2496ed" },
  { name: "Groq AI", color: "#f08dff" },
];
