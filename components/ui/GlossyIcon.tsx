import type { LucideIcon } from "lucide-react";

// Pastille métallique façon « objet 3D » (reflet + ombre interne + tilt au
// survol du parent .group). Décorative : l'info reste portée par le texte.
export default function GlossyIcon({
  icon: Icon,
  size = 48,
}: {
  icon: LucideIcon;
  size?: number;
}) {
  return (
    <span
      className="glossy-icon"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <Icon size={Math.round(size * 0.46)} strokeWidth={1.8} />
    </span>
  );
}
