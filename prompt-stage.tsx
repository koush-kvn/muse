'use client'

import { useRef, useState } from 'react'
import {
  Sparkle,
  Swirl,
  LineStar,
  LineSun,
  Jellyfish,
  LeftSquiggle,
  WavyUnderline,
} from './doodles'
import { generateIdentity, type Identity } from '@/lib/engine'

const COBALT = '#1D3557'

/* text color that stays legible on a given brick */
function inkOn(hex: string): string {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.62 ? '#0a0a0a' : 'rgba(255,255,255,0.9)'
}

/* scatter presets so each font name floats at a different offset / case */
const SCATTER = [
  {
    justify: 'flex-start',
    marginLeft: '0%',
    marginTop: '0',
    rotate: '-2deg',
    transform: 'uppercase' as const,
  },
  {
    justify: 'flex-end',
    marginLeft: 'auto',
    marginTop: '2.5rem',
    rotate: '1.5deg',
    transform: 'lowercase' as const,
  },
  {
    justify: 'flex-start',
    marginLeft: '12%',
    marginTop: '1.5rem',
    rotate: '-1deg',
    transform: 'capitalize' as const,
  },
]

export function PromptStage() {
  const [value, setValue] = useState('')
  const [result, setResult] = useState<Identity | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) {
      inputRef.current?.focus()
      return
    }
    setResult(generateIdentity(trimmed))
  }

  return (
    <section
      id="stage"
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Project prompt"
    >
      {/* doodle punctuation for the empty prompt state */}
      <Sparkle className="pointer-events-none absolute left-[8vw] top-[16%] h-8 w-8" />
      <Swirl className="pointer-events-none absolute right-[7vw] top-[12%] hidden h-24 w-32 md:block" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1180px] flex-col justify-center px-6 py-24">
        <label htmlFor="project-prompt" className="sr-only">
          Type your project prompt
        </label>
        <textarea
          id="project-prompt"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.shiftKey &&
              !e.nativeEvent.isComposing &&
              e.keyCode !== 229
            ) {
              e.preventDefault()
              submit()
            }
          }}
          rows={2}
          placeholder="type your project prompt..."
          className="font-sans w-full resize-none border-0 bg-transparent p-0 font-extrabold lowercase leading-[0.95] tracking-[-0.04em] text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/25 focus:outline-none"
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          spellCheck={false}
        />

        <div className="mt-6 flex items-center gap-6">
          <button
            type="button"
            onClick={submit}
            className="group w-fit cursor-pointer bg-transparent text-left"
          >
            <span
              className="font-sans font-extrabold tracking-[-0.03em] text-[#0a0a0a] transition-colors group-hover:text-[#D21F3C]"
              style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)' }}
            >
              generate identity
            </span>
            <WavyUnderline className="mt-0.5 h-4 w-full" color="#D21F3C" />
          </button>
          <span
            className="font-script"
            style={{ color: COBALT, fontSize: '1.4rem', lineHeight: 1 }}
          >
            (or hit enter)
          </span>
        </div>

        {result && <IdentityOutput result={result} />}
      </div>
    </section>
  )
}

function IdentityOutput({ result }: { result: Identity }) {
  const palette = result.palette ?? []
  const type = result.type ?? []
  const critique = result.critique ?? []
  const descriptors = result.descriptors ?? []
  const moodLabel = result.moodLabel ?? ''

  return (
    <output className="relative mt-20 block">
      {/* the continuous scribble runs through the whole output, behind text */}
      <LeftSquiggle className="pointer-events-none absolute left-[-8%] top-[6%] z-0 h-[120%] w-[70vw] max-w-[900px] opacity-[0.22]" />
      <Jellyfish className="pointer-events-none absolute -right-2 top-0 z-0 hidden h-36 w-24 opacity-70 md:block" />

      {/* generated muse* logo — always lowercase display font */}
      <div className="relative z-10 w-fit">
        <h2
          className="font-display leading-[0.85] tracking-[-0.02em] text-[#0a0a0a]"
          style={{ fontSize: 'clamp(4rem, 13vw, 10rem)' }}
        >
          muse
          <span style={{ color: COBALT }}>*</span>
        </h2>
        <WavyUnderline
          className="mt-1 h-5 w-[60%] max-w-[300px]"
          color={COBALT}
        />
      </div>

      <p
        className="font-script relative z-10 mt-5 max-w-[46ch]"
        style={{
          color: COBALT,
          fontSize: 'clamp(1.3rem, 2vw, 1.85rem)',
          lineHeight: 1.15,
        }}
      >
        {descriptors.join(', ')} — an identity for
        <br />
        {'“'}
        {result.prompt}
        {'”'}
      </p>

      {/* asymmetric color field — full-bleed row, randomized widths, no gaps */}
      <div className="relative z-10 mt-12 flex h-40 w-full md:h-52">
        {palette.map((c) => (
          <div
            key={c.name + c.hex}
            className="relative flex flex-col justify-end p-3"
            style={{
              flexGrow: c.weight,
              flexBasis: 0,
              backgroundColor: c.hex,
            }}
            aria-hidden="true"
          >
            <span
              className="font-mono font-bold lowercase"
              style={{ fontSize: '0.68rem', color: inkOn(c.hex) }}
            >
              {c.name}
            </span>
            <span
              className="font-mono"
              style={{ fontSize: '0.68rem', color: inkOn(c.hex), opacity: 0.75 }}
            >
              {c.hex} · {c.weight}%
            </span>
          </div>
        ))}
      </div>

      {/* scattered typography — raw print-mockup, no headers, no dividers */}
      <div className="relative z-10 mt-20 flex flex-col">
        {type.map((t, i) => {
          const s = SCATTER[i % SCATTER.length]
          return (
            <div
              key={t.family + i}
              className="relative flex w-fit flex-col"
              style={{
                alignSelf: s.justify === 'flex-end' ? 'flex-end' : 'flex-start',
                marginLeft: s.marginLeft,
                marginTop: s.marginTop,
              }}
            >
              {/* the smiling star sits directly on the first type junction */}
              {i === 0 && (
                <LineStar className="pointer-events-none absolute -left-14 -top-8 z-20 hidden h-20 w-20 md:block" />
              )}
              <span
                className="font-mono text-[#0a0a0a]/40"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  marginBottom: '0.15rem',
                }}
              >
                0{i + 1} / {t.kind}
              </span>
              <span
                className={t.fontClass}
                style={{
                  fontSize: 'clamp(2rem, 6.5vw, 5rem)',
                  lineHeight: 0.92,
                  color: i === 2 ? '#D21F3C' : i === 1 ? COBALT : '#0a0a0a',
                  textTransform: s.transform,
                  transform: `rotate(${s.rotate})`,
                }}
              >
                {t.family}
              </span>
            </div>
          )
        })}
        <LineSun className="pointer-events-none absolute -right-2 bottom-0 z-0 hidden h-24 w-24 opacity-80 md:block" />
        <Sparkle className="pointer-events-none absolute left-[40%] top-[42%] hidden h-8 w-8 md:block" />
      </div>

      {/* editorial critique — floating text column, naked on canvas */}
      <div className="relative z-10 mt-24 max-w-[62ch]">
        <span
          className="font-mono mb-4 block text-[#0a0a0a]/45"
          style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}
        >
          {moodLabel} — direction notes
        </span>
        {critique.map((line, i) => (
          <p
            key={i}
            className={i === 0 ? 'font-fraunces' : 'font-sans'}
            style={{
              fontSize: i === 0 ? 'clamp(1.5rem, 3vw, 2.4rem)' : '1.05rem',
              lineHeight: i === 0 ? 1.05 : 1.6,
              marginTop: i === 0 ? 0 : '1.15rem',
              color: '#0a0a0a',
              fontWeight: i === 0 ? 500 : 400,
              maxWidth: i === 0 ? '20ch' : undefined,
            }}
          >
            {line}
          </p>
        ))}
        <span
          className="font-script mt-6 block"
          style={{ color: COBALT, fontSize: '1.5rem', lineHeight: 1 }}
        >
          — muse*, your creative director
        </span>
      </div>

      {/* trailing scribble to close the composition */}
      <LeftSquiggle className="pointer-events-none absolute right-[-10%] bottom-[-6%] z-0 hidden h-40 w-[40vw] max-w-[520px] rotate-180 opacity-[0.18] md:block" />
    </output>
  )
}
