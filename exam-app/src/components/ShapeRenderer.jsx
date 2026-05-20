const SHAPE_DEFS = {
  circle:    (color) => <circle cx="50" cy="50" r="34" fill={color} />,
  square:    (color) => <rect x="16" y="16" width="68" height="68" fill={color} />,
  triangle:  (color) => <polygon points="50,12 88,88 12,88" fill={color} />,
  rectangle: (color) => <rect x="8" y="24" width="84" height="52" fill={color} />,
  diamond:   (color) => <polygon points="50,8 92,50 50,92 8,50" fill={color} />,
  star:      (color) => <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={color} />,
  pentagon:  (color) => <polygon points="50,8 92,38 76,88 24,88 8,38" fill={color} />,
  cross:     (color) => <path d="M36,8 H64 V36 H92 V64 H64 V92 H36 V64 H8 V36 H36 Z" fill={color} />,
};

/**
 * SVGで かたちをえがきます
 * shape    – かたちのなまえ
 * color    – いろ
 * rotation – かいてんかく (degrees)
 * size     – ピクセルのおおきさ
 */
export default function ShapeRenderer({ shape, color = '#3498DB', rotation = 0, size = 80 }) {
  const renderer = SHAPE_DEFS[shape];
  if (!renderer) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <g transform={`rotate(${rotation}, 50, 50)`}>
        {renderer(color)}
      </g>
    </svg>
  );
}
