import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { checkoutVerify } from "@/lib/actions/jobs"
import { getSesson } from "@/lib/core/server"
import { stripe } from "@/lib/stripe"

async function getPaymentReferences(session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>) {
  const sessionPaymentIntent = session.payment_intent
  let paymentIntentId = typeof sessionPaymentIntent === "string"
    ? sessionPaymentIntent
    : sessionPaymentIntent?.id ?? null
  let transactionId: string | null = null
  let invoiceId: string | null = null

  if (sessionPaymentIntent && typeof sessionPaymentIntent !== "string") {
    const latestCharge = sessionPaymentIntent.latest_charge
    transactionId = typeof latestCharge === "string" ? latestCharge : latestCharge?.id ?? null
  } else if (typeof sessionPaymentIntent === "string") {
    const paymentIntent = await stripe.paymentIntents.retrieve(sessionPaymentIntent, { expand: ["latest_charge"] })
    const latestCharge = paymentIntent.latest_charge
    transactionId = typeof latestCharge === "string" ? latestCharge : latestCharge?.id ?? null
  }

  const subscriptionId = typeof session.subscription === "string"
    ? session.subscription
    : session.subscription?.id

  if (!transactionId && subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["latest_invoice"],
    })
    const invoice = subscription.latest_invoice
    invoiceId = typeof invoice === "string" ? invoice : invoice?.id ?? null

    if (invoiceId) {
      const invoicePayments = await stripe.invoicePayments.list({
        invoice: invoiceId,
        status: "paid",
        expand: ["data.payment.payment_intent.latest_charge", "data.payment.charge"],
      })
      const payment = invoicePayments.data[0]?.payment
      const paymentIntent = payment?.payment_intent
      const charge = payment?.charge
      if (paymentIntent) {
        paymentIntentId = typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id
        if (typeof paymentIntent !== "string") {
          const latestCharge = paymentIntent.latest_charge
          transactionId = typeof latestCharge === "string" ? latestCharge : latestCharge?.id ?? null
        } else {
          const expandedIntent = await stripe.paymentIntents.retrieve(paymentIntent, { expand: ["latest_charge"] })
          const latestCharge = expandedIntent.latest_charge
          transactionId = typeof latestCharge === "string" ? latestCharge : latestCharge?.id ?? null
        }
      }
      if (!transactionId && charge) transactionId = typeof charge === "string" ? charge : charge.id
    }
  }

  return { transactionId: transactionId ?? paymentIntentId, invoiceId }
}

export default async function PaymentSuccessfulPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const sessionId =
    typeof params.session_id === "string" ? params.session_id : undefined

  if (!sessionId) {
    throw new Error("Please provide a valid session_id (`cs_test_...`).")
  }

  const [userSession, requestHeaders] = await Promise.all([getSesson(), headers()])
  if (!userSession?.user) redirect("/sign-in")

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent.latest_charge"],
  })

  if (session.status === "open") {
    return redirect("/")
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return redirect("/payment")
  }

  if (session.metadata?.role !== "seeker" || session.metadata?.userId !== userSession.user.id) {
    redirect(session.metadata?.role === "recruiter" ? "/Dashboard/Recruiter/Premium" : "/payment")
  }

  await checkoutVerify(sessionId, requestHeaders.get("cookie") ?? "")

  const { transactionId, invoiceId } = await getPaymentReferences(session)
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null
  const productName =
    session.line_items?.data[0]?.description ?? "Hireloop Premium access"
  const paidAmount =
    session.amount_total !== null && session.currency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: session.currency.toUpperCase(),
        }).format(session.amount_total / 100)
      : null
  const paidAt = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(session.created * 1000))

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-[#09090b] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]"
      />

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link className="text-lg font-semibold tracking-tight" href="/">
            Hireloop
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60">
            <ShieldCheck
              aria-hidden="true"
              className="size-4 text-emerald-400"
            />
            Secure checkout
          </span>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121217]/90 shadow-[0_24px_100px_rgba(0,0,0,0.45)]">
          <div className="px-6 py-9 text-center sm:px-12 sm:py-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
              <CheckCircle2 aria-hidden="true" className="size-9" />
            </div>
            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-emerald-300 uppercase">
              Payment confirmed
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thank you for your purchase
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/55">
              Your payment was successful. Your Hireloop Premium access is being
              activated, and your receipt details are below.
            </p>
          </div>

          <div className="border-t border-white/10 px-6 py-7 sm:px-12">
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium tracking-wide text-white/40 uppercase">
                  Item
                </dt>
                <dd className="mt-2 text-sm font-medium text-white/90">
                  {productName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-white/40 uppercase">
                  Amount paid
                </dt>
                <dd className="mt-2 text-sm font-medium text-white/90">
                  {paidAmount ?? "Amount unavailable"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-white/40 uppercase">
                  Receipt email
                </dt>
                <dd className="mt-2 text-sm break-all text-white/80">
                  {customerEmail ?? "No email provided"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-white/40 uppercase">
                  Date
                </dt>
                <dd className="mt-2 text-sm text-white/80">{paidAt}</dd>
              </div>
            </dl>

            <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
              <p className="text-xs font-medium tracking-wide text-white/40 uppercase">
                Transaction ID
              </p>
              {transactionId ? (
                <code className="mt-2 block font-mono text-sm break-all text-white/85">
                  {transactionId}
                </code>
              ) : invoiceId ? (
                <div>
                  <p className="mt-2 text-xs text-white/55">No payment intent was attached to this invoice.</p>
                  <p className="mt-3 text-[10px] font-medium tracking-wide text-white/40 uppercase">Stripe invoice reference</p>
                  <code className="mt-1 block font-mono text-sm break-all text-white/85">{invoiceId}</code>
                </div>
              ) : (
                <p className="mt-2 text-sm text-amber-200">
                  The payment was confirmed, but Stripe did not return a payment reference. Please contact support with checkout ID {sessionId}.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-6 sm:flex-row sm:justify-center sm:px-12">
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#09090b] transition hover:bg-white/90"
              href="/browse-jobs"
            >
              Browse jobs
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 text-sm font-medium text-white/75 transition hover:border-white/30 hover:text-white"
              href="/"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">
        Payment processed securely by Stripe.
      </footer>
    </main>
  )
}
