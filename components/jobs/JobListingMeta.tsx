import type { ReactNode } from "react"

type StatusBadgeProps = { status: string }

export function StatusBadge({ status }: StatusBadgeProps) {
  const active = status === "Active"
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] ${active ? "bg-[#06351f] text-[#31d381]" : "bg-white/[0.08] text-[#a0a0a8]"}`}>
      <span className={`size-1.5 rounded-full ${active ? "bg-[#22c879]" : "bg-[#777780]"}`} />
      {status}
    </span>
  )
}

type InfoProps = { label: string; value: ReactNode }

export function JobInfo({ label, value }: InfoProps) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
      <div className="mt-1 break-words text-white/85">{value}</div>
    </div>
  )
}
