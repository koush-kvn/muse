/* muse* generation engine
 * Deterministic-but-dynamic creative direction derived from the prompt string.
 * Everything (palette, type pairing, critique) is a function of the input text,
 * so two different prompts never produce the same identity.
 */

export type Swatch = { name: string; hex: string; weight: number }
export type TypeSpec = {
  role: string
  family: string
  fontClass: string
  kind: 'sans' | 'serif' | 'mono' | 'display'
}
export type Mood =
  | 'nature'
  | 'tech'
  | 'cozy'
  | 'luxury'
  | 'playful'
  | 'brutalist'

export type Identity = {
  prompt: string
  name: string
  mood: Mood
  moodLabel: string
  descriptors: string[]
  palette: Swatch[]
  type: TypeSpec[]
  critique: string[]
}

/* ---------- keyword → mood classification ---------- */

const MOOD_KEYWORDS: Record<Mood, string[]> = {
  nature: [
    'wine', 'garden', 'farm', 'forest', 'plant', 'botanical', 'organic',
    'earth', 'natural', 'green', 'flower', 'coffee', 'tea', 'herbal', 'wood',
    'ceramic', 'bakery', 'bread', 'honey', 'ocean', 'sea', 'mountain',
  ],
  tech: [
    'ai', 'app', 'software', 'startup', 'saas', 'crypto', 'data', 'cloud',
    'digital', 'cyber', 'robot', 'tech', 'platform', 'dev', 'code', 'quantum',
    'neural', 'lab', 'system', 'protocol', 'network',
  ],
  cozy: [
    'cozy', 'home', 'candle', 'blanket', 'cafe', 'diary', 'journal', 'soft',
    'cottage', 'knit', 'warm', 'comfort', 'pastel', 'cute', 'baby', 'gentle',
    'calm', 'sleep', 'wellness', 'yoga', 'spa',
  ],
  luxury: [
    'luxury', 'fashion', 'couture', 'jewelry', 'atelier', 'perfume', 'gold',
    'premium', 'elegant', 'boutique', 'haute', 'silk', 'diamond', 'estate',
    'private', 'exclusive', 'watch', 'leather', 'noir',
  ],
  playful: [
    'kids', 'toy', 'game', 'candy', 'party', 'fun', 'comic', 'arcade',
    'festival', 'circus', 'pop', 'color', 'juice', 'ice', 'skate', 'music',
    'dance', 'zine', 'sticker',
  ],
  brutalist: [
    'brutalist', 'raw', 'concrete', 'industrial', 'gallery', 'art', 'studio',
    'architecture', 'magazine', 'press', 'protest', 'punk', 'techno', 'club',
    'underground', 'archive', 'manifesto',
  ],
}

const MOOD_LABELS: Record<Mood, string> = {
  nature: 'earthen & organic',
  tech: 'electric & synthetic',
  cozy: 'soft & intimate',
  luxury: 'stark & high-fashion',
  playful: 'loud & saturated',
  brutalist: 'raw & structural',
}

/* ---------- palette generators per mood ---------- */
/* Each returns a 5-swatch array. Weights are asymmetric (they sum to 100)
 * and are rotated by the prompt hash so widths shift per prompt. */

const PALETTES: Record<Mood, { name: string; hex: string }[]> = {
  nature: [
    { name: 'moss', hex: '#3B4A2A' },
    { name: 'clay', hex: '#B7743F' },
    { name: 'bone', hex: '#E9E2CE' },
    { name: 'oxblood', hex: '#5E2C24' },
    { name: 'sage', hex: '#9DA97C' },
  ],
  tech: [
    { name: 'voltage', hex: '#00E5FF' },
    { name: 'ultra', hex: '#3B14E0' },
    { name: 'obsidian', hex: '#0A0A12' },
    { name: 'signal', hex: '#C6F135' },
    { name: 'magenta', hex: '#FF2D9A' },
  ],
  cozy: [
    { name: 'blush', hex: '#F3C9C2' },
    { name: 'butter', hex: '#F4E4B8' },
    { name: 'oat', hex: '#EFE7DA' },
    { name: 'terracotta', hex: '#D08C6A' },
    { name: 'dusk', hex: '#A6809B' },
  ],
  luxury: [
    { name: 'noir', hex: '#0A0A0A' },
    { name: 'ivory', hex: '#F4F1EA' },
    { name: 'crimson', hex: '#B00020' },
    { name: 'graphite', hex: '#2B2B2B' },
    { name: 'champagne', hex: '#C6A15B' },
  ],
  playful: [
    { name: 'tangerine', hex: '#FF6A2B' },
    { name: 'bubble', hex: '#FF4FA3' },
    { name: 'lagoon', hex: '#12C2E9' },
    { name: 'sunbeam', hex: '#FFD23F' },
    { name: 'grape', hex: '#7B2FF7' },
  ],
  brutalist: [
    { name: 'ink', hex: '#0A0A0A' },
    { name: 'cement', hex: '#C7C4BC' },
    { name: 'safety', hex: '#FF4D00' },
    { name: 'bone', hex: '#E7E4DC' },
    { name: 'cobalt', hex: '#1B2A6B' },
  ],
}

/* ---------- type pairings per mood ---------- */

const FONTS = {
  syne: { family: 'Syne', fontClass: 'font-syne', kind: 'sans' as const },
  cormorant: {
    family: 'Cormorant Garamond',
    fontClass: 'font-cormorant',
    kind: 'serif' as const,
  },
  mono: { family: 'Space Mono', fontClass: 'font-mono', kind: 'mono' as const },
  fraunces: {
    family: 'Fraunces',
    fontClass: 'font-fraunces',
    kind: 'serif' as const,
  },
  bricolage: {
    family: 'Clash Display',
    fontClass: 'font-bricolage',
    kind: 'display' as const,
  },
  jakarta: {
    family: 'Plus Jakarta Sans',
    fontClass: 'font-sans',
    kind: 'sans' as const,
  },
}

type FontKey = keyof typeof FONTS

const PAIRINGS: Record<Mood, [FontKey, FontKey, FontKey]> = {
  nature: ['fraunces', 'jakarta', 'cormorant'],
  tech: ['syne', 'mono', 'jakarta'],
  cozy: ['fraunces', 'cormorant', 'jakarta'],
  luxury: ['cormorant', 'syne', 'mono'],
  playful: ['bricolage', 'syne', 'mono'],
  brutalist: ['bricolage', 'mono', 'syne'],
}

const ROLE_LABELS = ['display', 'body & interface', 'accent voice']

/* ---------- helpers ---------- */

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

function classify(prompt: string): Mood {
  const text = prompt.toLowerCase()
  const scores = (Object.keys(MOOD_KEYWORDS) as Mood[]).map((mood) => {
    const hits = MOOD_KEYWORDS[mood].reduce(
      (n, kw) => (text.includes(kw) ? n + 1 : n),
      0,
    )
    return { mood, hits }
  })
  scores.sort((a, b) => b.hits - a.hits)
  if (scores[0].hits > 0) return scores[0].mood
  /* no keyword hit — pick a mood deterministically from the hash */
  const moods = Object.keys(MOOD_KEYWORDS) as Mood[]
  return moods[hash(prompt) % moods.length]
}

/* Asymmetric widths derived from the hash, rotated so each prompt differs. */
function makeWeights(seed: number): number[] {
  const base = [34, 22, 18, 14, 12]
  const rot = seed % 5
  const rotated = [...base.slice(rot), ...base.slice(0, rot)]
  return rotated
}

function toName(prompt: string): string {
  const cleaned = prompt
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (cleaned.length === 0) return 'muse'
  const stop = new Set([
    'a', 'an', 'the', 'for', 'of', 'and', 'to', 'with', 'my', 'our',
  ])
  const meaningful = cleaned.filter((w) => !stop.has(w.toLowerCase()))
  const pick = (meaningful.length ? meaningful : cleaned).slice(0, 2)
  return pick.join(' ')
}

const DESCRIPTOR_POOL: Record<Mood, string[]> = {
  nature: ['rooted', 'sun-worn', 'handmade', 'quiet', 'seasonal'],
  tech: ['kinetic', 'synthetic', 'precise', 'luminous', 'engineered'],
  cozy: ['tender', 'hushed', 'woolen', 'unhurried', 'warm'],
  luxury: ['austere', 'exacting', 'restrained', 'couture', 'nocturnal'],
  playful: ['loud', 'sugar-high', 'elastic', 'gleeful', 'pop'],
  brutalist: ['raw', 'load-bearing', 'unpolished', 'dissident', 'concrete'],
}

/* ---------- critique matrix ---------- */

function buildCritique(
  name: string,
  mood: Mood,
  palette: Swatch[],
  type: TypeSpec[],
): string[] {
  const lead = palette[0]
  const accent = palette[palette.length - 1]
  const display = type[0]
  const voice = type[2]

  const openers: Record<Mood, string> = {
    nature: `“${name}” wants to smell like soil, not a screen.`,
    tech: `“${name}” should read as a signal cutting through noise.`,
    cozy: `“${name}” is a small, warm room you don't want to leave.`,
    luxury: `“${name}” earns attention by refusing to ask for it.`,
    playful: `“${name}” is allowed to be too much on purpose.`,
    brutalist: `“${name}” treats the grid as a wall to push against.`,
  }

  return [
    openers[mood],
    `The palette leads with ${lead.name} (${lead.hex}) held at an intentionally oversized width, so the identity has one dominant voice instead of five competing ones — ${accent.name} enters last as a deliberate rupture rather than decoration.`,
    `Type is paired for tension: ${display.family} carries the display weight while ${voice.family} handles the accent voice, letting the system feel ${MOOD_LABELS[mood]} without collapsing into a single register.`,
    `Everything floats on raw off-white with no rules or containers, because a ${mood} brand this early should look drafted by a human hand, not boxed by a template.`,
  ]
}

/* ---------- public entry ---------- */

export function generateIdentity(prompt: string): Identity {
  const trimmed = prompt.trim()
  const seed = hash(trimmed)
  const mood = classify(trimmed)
  const name = toName(trimmed)

  const weights = makeWeights(seed)
  const swatches = PALETTES[mood]
  const palette: Swatch[] = swatches.map((s, i) => ({
    ...s,
    weight: weights[i],
  }))

  const pairing = PAIRINGS[mood]
  const type: TypeSpec[] = pairing.map((key, i) => ({
    role: ROLE_LABELS[i],
    ...FONTS[key],
  }))

  const pool = DESCRIPTOR_POOL[mood]
  const descriptors = [
    pool[seed % pool.length],
    pool[(seed + 2) % pool.length],
    pool[(seed + 4) % pool.length],
  ]

  return {
    prompt: trimmed,
    name,
    mood,
    moodLabel: MOOD_LABELS[mood],
    descriptors,
    palette,
    type,
    critique: buildCritique(name, mood, palette, type),
  }
}
