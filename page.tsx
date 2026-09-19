'use client'

import { useCallback } from 'react'
import { Hero } from '@/components/hero'
import { PromptStage } from '@/components/prompt-stage'

export default function Page() {
  const scrollToStage = useCallback(() => {
    document.getElementById('stage')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main className="relative w-full bg-[#FBFBFA]">
      <Hero onEnter={scrollToStage} />
      <PromptStage />
    </main>
  )
}
