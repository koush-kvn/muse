'use client'

import {
  LineSun,
  SpiralWeb,
  Swirl,
  LineStar,
  LineFlower,
  RibbonLoops,
  Jellyfish,
  LeftSquiggle,
  WavyUnderline,
} from './doodles'

const COBALT = '#1D3557'

function Black({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-sans block text-[#0a0a0a] font-extrabold leading-[1.02] tracking-[-0.03em]"
      style={{ fontSize: 'clamp(1rem, 1.7vw, 1.5rem)' }}
    >
      {children}
    </span>
  )
}

function Script({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-script block leading-[0.9]"
      style={{ color: COBALT, fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)' }}
    >
      {children}
    </span>
  )
}

export function Hero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ---- Decorative doodle layer ---- */}
      <LeftSquiggle className="pointer-events-none absolute -left-4 top-0 h-[130%] w-[38vw] max-w-[560px] opacity-95" />
      <LineSun className="pointer-events-none absolute left-[3vw] top-[34%] h-24 w-24 md:h-28 md:w-28" />
      <SpiralWeb className="pointer-events-none absolute left-[4vw] bottom-[8%] h-40 w-44 md:h-48 md:w-52" />

      <Swirl className="pointer-events-none absolute right-[6vw] top-[8%] h-24 w-32 md:h-28 md:w-40" />
      <LineStar className="pointer-events-none absolute right-[4vw] top-[24%] h-28 w-28 md:h-32 md:w-32" />
      <LineFlower className="pointer-events-none absolute right-[8vw] top-[46%] h-44 w-40 md:h-56 md:w-48" />
      <RibbonLoops className="pointer-events-none absolute right-[2vw] bottom-[4%] h-52 w-52 md:h-64 md:w-64" />

      <Jellyfish className="pointer-events-none absolute left-[50%] top-[30%] hidden h-40 w-24 -translate-x-1/2 md:block" />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1180px] flex-col justify-center px-6 py-20 md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10">
        {/* Left: title */}
        <div className="relative flex flex-col items-center md:items-start md:pl-[8%]">
          <h1
            className="font-sans font-extrabold leading-[0.85] tracking-[-0.05em] text-[#0a0a0a]"
            style={{ fontSize: 'clamp(4.5rem, 13vw, 11rem)' }}
          >
            muse
            <span style={{ color: COBALT }}>*</span>
          </h1>
          <WavyUnderline className="mt-1 h-6 w-[62%] max-w-[340px]" />
        </div>

        {/* Right: editorial stack */}
        <div className="mt-14 flex flex-col gap-[0.35rem] md:mt-0">
          <Black>AI-powered</Black>
          <Black>creative director</Black>
          <Script>(such great ideas)</Script>
          <Black>visual identity designer</Black>
          <Black>typography canvas</Black>
          <Script>chic,</Script>
          <div className="flex items-baseline gap-2">
            <span
              className="font-sans font-extrabold tracking-[-0.03em] text-[#0a0a0a]"
              style={{ fontSize: 'clamp(1rem, 1.7vw, 1.5rem)' }}
            >
              &amp;
            </span>
            <span
              className="font-brush"
              style={{ color: COBALT, fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', letterSpacing: '0.06em' }}
            >
              eccentric?
            </span>
          </div>
          <Black>project outline</Black>
          <Black>technological craft</Black>
          <Black>aesthetic sandbox</Black>
          <Script>
            for the unfinished spark
            <br />
            in need of an identity
          </Script>
          <div className="pt-2">
            <Black>so,</Black>
          </div>

          <button
            type="button"
            onClick={onEnter}
            className="group relative mt-1 w-fit cursor-pointer bg-transparent text-left"
            aria-label="Start — what's your idea?"
          >
            <span className="flex items-baseline gap-1">
              <span
                className="font-sans font-extrabold tracking-[-0.03em] text-[#0a0a0a] transition-colors group-hover:text-[#1D3557]"
                style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.65rem)' }}
              >
                whats your idea
              </span>
              <span className="font-script" style={{ color: COBALT, fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)', lineHeight: 1 }}>
                ?
              </span>
            </span>
            <WavyUnderline className="mt-0.5 h-4 w-full" color={COBALT} />
          </button>
        </div>
      </div>
    </section>
  )
}
