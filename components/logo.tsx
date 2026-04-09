export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wrench handle - long diagonal */}
      <path
        d="M 15 75 L 45 25"
        stroke="url(#neonGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#neonGlow)"
      />

      {/* Wrench head - top rounded square */}
      <rect
        x="40"
        y="8"
        width="20"
        height="22"
        rx="6"
        stroke="url(#neonGradient)"
        strokeWidth="3"
        filter="url(#neonGlow)"
      />

      {/* Wrench head - bottom rounded square */}
      <rect
        x="58"
        y="20"
        width="22"
        height="20"
        rx="6"
        stroke="url(#neonGradient)"
        strokeWidth="3"
        filter="url(#neonGlow)"
      />

      {/* Bottom horizontal line */}
      <rect
        x="20"
        y="80"
        width="50"
        height="8"
        rx="4"
        stroke="url(#neonGradient)"
        strokeWidth="2.5"
        filter="url(#neonGlow)"
      />
    </svg>
  )
}
