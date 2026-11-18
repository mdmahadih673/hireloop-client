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
}

export async function POST(request: Request) {
  const session = await getSesson()
  const origin = new URL(request.url).origin

  if (!session?.user) {
    return NextResponse.redirect(new URL("/sign-in", origin), 303)
  }

  const formData = await request.formData()
  const role = formData.get("role")
  const planId = formData.get("planId")
  const userRole = session.user.role?.toLowerCase()

  if ((role !== "seeker" && role !== "recruiter") || role !== userRole) {
    return NextResponse.json({ error: "Your account cannot purchase this plan." }, { status: 403 })
  }
  if (typeof planId !== "string" || !(planId in plans[role])) {
    return NextResponse.json({ error: "Choose a valid subscription plan." }, { status: 400 })
  }

  const plan = plans[role][planId as keyof typeof plans.seeker]
  const durationDays = plan.durationDays
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
      metadata: { userId: session.user.id, role, planId, durationDays: String(durationDays) },
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancelPath}`,
    })

    if (!checkout.url) throw new Error("Stripe did not return a checkout URL.")
    return NextResponse.redirect(checkout.url, 303)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not start checkout."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
