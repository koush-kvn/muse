/* Hand-drawn zine doodles rendered as fine, un-filled cobalt vector paths.
   Each is a plain inline SVG so it can float freely via absolute positioning. */

const stroke = {
  fill: 'none',
  stroke: '#1b2a6b',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* The long chaotic squiggle that loops from the top-left margin down the page. */
export function LeftSquiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 620 1200"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMin meet"
    >
      <path
        {...stroke}
        strokeWidth={5}
        d="M150 60
           C 120 30, 70 40, 70 90
           C 70 135, 140 140, 150 100
           C 158 66, 120 60, 105 78
           C 60 130, 130 190, 200 210
           C 300 240, 250 300, 300 330
           C 360 366, 400 300, 360 270
           C 330 247, 300 285, 320 315
           C 345 352, 300 400, 250 380
           C 200 360, 180 340, 200 330
           C 230 315, 250 355, 235 385
           C 210 430, 150 430, 140 480
           C 130 540, 210 560, 240 520
           C 300 610, 210 700, 280 760
           C 360 830, 470 780, 520 860
           C 560 924, 470 1000, 400 1060
           C 340 1112, 260 1130, 180 1150"
      />
    </svg>
  )
}

/* Spiky little sun / burst with a smile — top left cluster. */
export function LineSun({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={4}
        d="M60 20 L66 40 L86 30 L74 48 L96 52 L74 60 L88 78 L66 70 L64 92 L54 72 L36 84 L42 62 L22 58 L42 50 L30 32 L50 42 Z"
      />
      <path {...stroke} strokeWidth={3} d="M48 56 q4 6 12 2" />
      <circle cx="46" cy="50" r="1.6" fill="#1b2a6b" />
      <circle cx="62" cy="50" r="1.6" fill="#1b2a6b" />
    </svg>
  )
}

/* A tangled spider-web / spiral star — lower left. */
export function SpiralWeb({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 180" fill="none" aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={4}
        d="M20 40 L60 10 L95 50 L140 15 L150 60 L188 70 L150 95 L180 140 L130 130 L110 170 L80 130 L30 150 L55 100 L10 90 L55 70 Z"
      />
      <path
        {...stroke}
        strokeWidth={3}
        d="M95 90
           m0 0
           C 80 78, 70 92, 82 104
           C 98 120, 122 104, 118 82
           C 113 55, 78 52, 62 72
           C 44 95, 66 128, 100 126"
      />
    </svg>
  )
}

/* Top-right loose spiral swirl. */
export function Swirl({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 170 120" fill="none" aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={4}
        d="M14 60
           C 6 40, 30 26, 44 40
           C 56 52, 40 68, 30 58
           C 24 52, 30 44, 36 48
           M44 40
           C 66 20, 96 34, 92 58
           C 90 74, 70 74, 72 60
           C 73 52, 82 52, 82 58
           M92 52
           C 110 30, 150 34, 152 66
           C 153 84, 128 92, 124 74
           C 121 62, 136 58, 138 68"
      />
    </svg>
  )
}

/* Five-point sketchy star with a scribbled center — right side. */
export function LineStar({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 140" fill="none" aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={4}
        d="M70 12 L84 54 L128 54 L92 80 L106 122 L70 96 L34 122 L48 80 L12 54 L56 54 Z"
      />
      <path {...stroke} strokeWidth={2.5} d="M60 60 q10 -8 18 2 q6 10 -6 14 q-14 4 -14 -10" />
    </svg>
  )
}

/* Delicate line-flower / leafy branch — right side. */
export function LineFlower({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 220" fill="none" aria-hidden="true">
      <path {...stroke} strokeWidth={3.5} d="M100 210 C 90 150, 96 120, 110 70" />
      {[
        'M110 70 C 150 30, 190 60, 150 96 C 128 116, 100 96, 110 70',
        'M108 96 C 150 78, 176 118, 132 132 C 112 138, 96 118, 108 96',
        'M100 110 C 60 80, 26 116, 66 140 C 90 154, 108 130, 100 110',
        'M104 140 C 150 128, 168 172, 122 178 C 100 180, 92 154, 104 140',
        'M96 150 C 54 138, 34 182, 78 190 C 100 194, 108 162, 96 150',
      ].map((d, i) => (
        <path key={i} {...stroke} strokeWidth={3} d={d} />
      ))}
    </svg>
  )
}

/* Bottom-right big looping tangle of ribbon loops. */
export function RibbonLoops({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 260" fill="none" aria-hidden="true">
      <path
        {...stroke}
        strokeWidth={5}
        d="M40 60
           C 90 20, 150 40, 130 90
           C 116 126, 60 118, 70 80
           C 78 50, 130 60, 118 100
           C 100 160, 200 150, 210 90
           C 216 54, 170 40, 160 80
           C 150 120, 210 140, 230 100
           M120 120
           C 60 150, 40 210, 100 230
           C 150 246, 190 210, 160 176
           C 138 152, 100 170, 116 196
           C 130 218, 170 214, 180 190"
      />
    </svg>
  )
}

/* Center jellyfish with trailing tentacles + a sparkle. */
export function Jellyfish({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" aria-hidden="true">
      <path {...stroke} strokeWidth={3.5} d="M22 66 C 22 34, 92 34, 92 66 C 92 78, 78 84, 57 84 C 36 84, 22 78, 22 66 Z" />
      <path {...stroke} strokeWidth={2.5} d="M30 72 q26 14 52 0" />
      <path {...stroke} strokeWidth={2.5} d="M34 84 C 30 120, 44 150, 30 186" />
      <path {...stroke} strokeWidth={2.5} d="M48 84 C 50 124, 40 150, 52 188" />
      <path {...stroke} strokeWidth={2.5} d="M64 84 C 70 120, 58 152, 70 186" />
      <path {...stroke} strokeWidth={2.5} d="M80 84 C 84 116, 74 148, 86 178" />
      <path {...stroke} strokeWidth={2.5} d="M104 90 l6 10 l6 -10 M108 70 l4 6" />
      <circle cx="46" cy="24" r="2" fill="#1b2a6b" />
      <circle cx="60" cy="16" r="1.6" fill="#1b2a6b" />
    </svg>
  )
}

/* A small four-point sparkle used to punctuate margins. */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path {...stroke} strokeWidth={2.5} d="M20 4 C 22 16, 24 18, 36 20 C 24 22, 22 24, 20 36 C 18 24, 16 22, 4 20 C 16 18, 18 16, 20 4 Z" />
    </svg>
  )
}

/* Wavy underline stroke used under headings. */
export function WavyUnderline({ className = '', color = '#7d8bc4' }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 24" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M4 12 C 24 2, 44 22, 64 12 C 84 2, 104 22, 124 12 C 144 2, 164 22, 184 12 C 204 2, 224 22, 244 12 C 264 2, 284 22, 304 12"
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  )
}
