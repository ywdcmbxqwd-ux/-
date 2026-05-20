const SHAPE_DEFS = {
  circle:    (color) => <circle cx="50" cy="50" r="30" fill={color} />,
  square:    (color) => <rect x="20" y="20" width="60" height="60" fill={color} />,
  triangle:  (color) => <polygon points="50,15 85,85 15,85" fill={color} />,
  rectangle: (color) => <rect x="10" y="25" width="80" height="50" fill={color} />,
  diamond:   (color) => <polygon points="50,10 90,50 50,90 10,50" fill={color} />,
  star:      (color) => <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={color} />,
  pentagon:  (color) => <polygon points="50,10 90,38 76,85 24,85 10,38" fill={color} />,
  cross:     (color) => <path d="M35,10 H65 V35 H90 V65 H65 V90 H35 V65 H10 V35 H35 Z" fill={color} />,
};

export default function ShapeRenderer({ shape, color = '#4A90D9', rotation = 0, size = 100 }) {
  const renderer = SHAPE_DEFS[shape];
  if (!renderer) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block' }}
    >
      <g transform={`rotate(${rotation}, 50, 50)`}>
        {renderer(color)}
      </g>
    </svg>
  );
}
