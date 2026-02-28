interface DoubleTriangleProps {
  size?: number;
  className?: string;
  opacity?: number;
}

export default function DoubleTriangle({
  size = 500,
  className = "",
  opacity = 0.07,
}: DoubleTriangleProps) {
  const inner = size * 0.7;
  const cx = size / 2;
  const padding = size * 0.05;

  const outerPoints = `${cx},${padding} ${size - padding},${size - padding} ${padding},${size - padding}`;

  const innerOffset = (size - inner) / 2;
  const innerPoints = `${cx},${innerOffset + padding * 0.5} ${cx + inner / 2 - padding * 0.5},${size - innerOffset - padding * 0.5} ${cx - inner / 2 + padding * 0.5},${size - innerOffset - padding * 0.5}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <polygon
        points={outerPoints}
        stroke="url(#outerGrad)"
        strokeWidth="2"
        fill="none"
      />
      <polygon
        points={innerPoints}
        stroke="url(#innerGrad)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
