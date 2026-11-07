import { Navbar } from "@/components/homepage/navbar"

export function SectionPage({ title }: { title: string }) {
  return (
    <main className="min-h-svh bg-[#202020] px-4 pt-5 text-white sm:px-6 sm:pt-6">
      <Navbar />
      <section className="mx-auto max-w-[1200px] px-2 py-16 sm:px-6 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
      </section>
    </main>
  )
}
