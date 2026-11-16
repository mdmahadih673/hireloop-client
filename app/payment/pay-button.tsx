"use client"

export function PayButton({ amountLabel }: { amountLabel: string }) {
  // Placeholder — will redirect to Stripe Checkout later, e.g.:
  // window.location.assign(stripeCheckoutUrl)
  function handlePay() {
    // TODO: take the user to the Stripe page
  }

  return (
    <form action="api/checkout_sessions" method="POST">
      <button
        type="submit" role="link"
        className="mt-5 h-12 w-full cursor-pointer rounded-lg bg-[#0073e6] text-sm font-semibold text-white transition hover:bg-[#0a84f0]"
        onClick={handlePay}

      >
        Pay {amountLabel}
      </button>
    </form>

  )
}
