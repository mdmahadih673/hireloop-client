import type { ReactNode } from "react"

type JobFormSectionProps = {
  title: string
  description: string
  children: ReactNode
}

export function JobFormSection({ title, description, children }: JobFormSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#111114] p-5 sm:p-7">
      <div className="mb-6">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-white/45">{description}</p>
      </div>
      {children}
    </section>
  )
}
