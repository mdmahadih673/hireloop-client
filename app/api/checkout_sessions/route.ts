import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { getSesson } from "@/lib/core/server"

const plans = {
  seeker: {
    monthly: { name: "Hireloop Seeker Premium · 30 days", amount: 49900, durationDays: 30 },
    quarterly: { name: "Hireloop Seeker Premium · 90 days", amount: 129900, durationDays: 90 },
    annual: { name: "Hireloop Seeker Premium · 365 days", amount: 499900, durationDays: 365 },
  },
  recruiter: {
    monthly: { name: "Hireloop Recruiter Premium · 30 days", amount: 149900, durationDays: 30 },
    quarterly: { name: "Hireloop Recruiter Premium · 90 days", amount: 399900, durationDays: 90 },
    annual: { name: "Hireloop Recruiter Premium · 365 days", amount: 1499900, durationDays: 365 },
  },
} as const

type PlanRole = keyof typeof plans
type PlanId = keyof typeof plans.seeker

function isPlanRole(value: unknown): value is PlanRole {
  return value === "seeker" || value === "recruiter"
}

function isPlanId(value: unknown): value is PlanId {
  return value === "monthly" || value === "quarterly" || value === "annual"
}

async function startCheckout(request: Request, role: unknown, planId: unknown) {
  const origin = new URL(request.url).origin
  if (!isPlanRole(role) || !isPlanId(planId)) {
    return NextResponse.json({ error: "Choose a valid subscription plan." }, { status: 400 })
  }

  const session = await getSesson()
  if (!session?.user) {
    const returnTo = new URL("/api/checkout_sessions", origin)
    returnTo.searchParams.set("role", role)
    returnTo.searchParams.set("planId", planId)
    const signIn = new URL("/sign-in", origin)
    signIn.searchParams.set("redirect", `${returnTo.pathname}${returnTo.search}`)
    return NextResponse.redirect(signIn, 303)
  }

  const userRole = session.user.role?.toLowerCase()
  if (role !== userRole) {
    const planPage = userRole === "recruiter" ? "/Dashboard/Recruiter/Premium" : "/payment"
    const mismatch = new URL(planPage, origin)
    mismatch.searchParams.set("roleMismatch", "true")
    return NextResponse.redirect(mismatch, 303)
  }

  const plan = plans[role][planId]
  const successPath = role === "recruiter"
    ? "/Dashboard/Recruiter/payment/success"
    : "/payment/success"
  const cancelPath = role === "recruiter"
    ? "/Dashboard/Recruiter/Premium?canceled=true"
    : "/payment?canceled=true"

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "bdt",
          unit_amount: plan.amount,
          product_data: { name: plan.name },
        },
        quantity: 1,
      }],
      customer_email: session.user.email,
      metadata: { userId: session.user.id, role, planId, durationDays: String(plan.durationDays) },
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath}`,
    })

    if (!checkout.url) throw new Error("Stripe did not return a checkout URL.")
    return NextResponse.redirect(checkout.url, 303)
  } catch {
    const planPage = role === "recruiter" ? "/Dashboard/Recruiter/Premium" : "/payment"
    const errorUrl = new URL(planPage, origin)
    errorUrl.searchParams.set("checkoutError", "true")
    return NextResponse.redirect(errorUrl, 303)
  }
}

export async function POST(request: Request) {
  const formData = await request.formData()
  return startCheckout(request, formData.get("role"), formData.get("planId"))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  return startCheckout(request, searchParams.get("role"), searchParams.get("planId"))
}
