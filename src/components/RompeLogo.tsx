import React from 'react';

interface RompeLogoProps {
  className?: string;
  size?: number;
  withBackground?: boolean;
}

export const RompeLogo: React.FC<RompeLogoProps> = ({
  className = '',
  size = 40,
  withBackground = true,
}) => {
  // 5 star ray angles matching the authentic Rompe emblem
  // Top (0°), Right (80°), Bottom-Right (152°), Bottom-Left (208°), Left (280°)
  const rays = [
    { angle: 0, length: 360 },
    { angle: 80, length: 355 },
    { angle: 152, length: 370 },
    { angle: 208, length: 370 },
    { angle: 280, length: 355 },
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      className={`shrink-0 aspect-square select-none ${className}`}
      aria-label="Rompe Logo"
    >
      {/* Dark Royal Navy Squircle Background */}
      {withBackground && (
        <rect
          x="4"
          y="4"
          width="992"
          height="992"
          rx="220"
          ry="220"
          fill="#1E2B58"
        />
      )}

      {/* Golden Crescent Canopy */}
      <path
        d="M 88 448 C 170 185, 310 70, 500 70 C 690 70, 830 185, 912 448 C 815 225, 680 148, 500 148 C 320 148, 185 225, 88 448 Z"
        fill="#FDE08B"
        stroke="#1E1D1A"
        strokeWidth="15"
        strokeLinejoin="round"
      />

      {/* 5-Ray Decan Star */}
      <g transform="translate(500, 595)">
        {rays.map((ray) => (
          <g key={ray.angle} transform={`rotate(${ray.angle})`}>
            <rect
              x="-42"
              y={-ray.length}
              width="84"
              height={ray.length + 30}
              rx="42"
              ry="42"
              fill="#FDE08B"
              stroke="#1E1D1A"
              strokeWidth="15"
              strokeLinejoin="round"
            />
          </g>
        ))}

        {/* Center Hub Circle covering rays intersection */}
        <circle
          cx="0"
          cy="0"
          r="90"
          fill="#FDE08B"
          stroke="#1E1D1A"
          strokeWidth="15"
        />
      </g>
    </svg>
  );
};
