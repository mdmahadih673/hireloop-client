import { redirect } from "next/navigation"
import { checkoutVerify } from "@/lib/actions/jobs"
import { getSesson } from "@/lib/core/server"
import { stripe } from "@/lib/stripe"

export default async function RecruiterPaymentSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const [{ session_id: sessionId }, userSession] = await Promise.all([searchParams, getSesson()])
  if (!sessionId || !userSession?.user) redirect("/Dashboard/Recruiter/Premium")

  const checkout = await stripe.checkout.sessions.retrieve(sessionId)
  if (
    checkout.status !== "complete" ||
    checkout.payment_status !== "paid" ||
    checkout.metadata?.role !== "recruiter" ||
    checkout.metadata?.userId !== userSession.user.id
  ) {
    redirect("/Dashboard/Recruiter/Premium")
  }

  await checkoutVerify(sessionId)
  redirect("/Dashboard/Recruiter/jobs/new?premium=active")
}
