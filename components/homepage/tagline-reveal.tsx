"use client"

import { useEffect, useRef, useState } from "react"

export function TaglineReveal({ text }: { text: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [visibleWords, setVisibleWords] = useState<Set<number>>(() => new Set())
  const words = text.split(/\s+/)
  const wordCount = words.length

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisibleWords(new Set(Array.from({ length: wordCount }, (_, index) => index)))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const revealed = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => Number((entry.target as HTMLElement).dataset.wordIndex))

      if (revealed.length) {
        setVisibleWords((current) => new Set([...current, ...revealed]))
        entries.filter((entry) => entry.isIntersecting).forEach((entry) => observer.unobserve(entry.target))
      }
    }, { threshold: 0.6, rootMargin: "0px 0px -38% 0px" })

    heading.querySelectorAll("[data-word-index]").forEach((word) => observer.observe(word))
    return () => observer.disconnect()
  }, [text, wordCount])

  return (
    <section className="bg-[#f7f7fb] px-5 py-20 text-zinc-950 dark:bg-[#0d0d10] dark:text-white sm:py-28" aria-label="Hireloop's promise">
      <h2 className="mx-auto max-w-4xl text-balance text-center text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {words.map((word, index) => (
          <span
            className={`mr-[0.28em] inline-block transition-colors duration-500 motion-reduce:text-zinc-950 dark:motion-reduce:text-white ${visibleWords.has(index) ? "text-zinc-950 dark:text-white" : "text-zinc-400 dark:text-white/30"}`}
            data-word-index={index}
            key={`${word}-${index}`}
          >
            {word}
          </span>
        ))}
      </h2>
    </section>
  )
}
