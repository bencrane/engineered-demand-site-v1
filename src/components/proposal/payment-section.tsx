"use client";

import { useMemo, useState } from "react";
import {
  loadStripe,
  type Stripe,
  type StripeElementsOptions,
} from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

function formatUsdCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

const STRIPE_APPEARANCE: StripeElementsOptions["appearance"] = {
  theme: "night",
  variables: {
    colorPrimary: "#10b981",
    colorBackground: "#000000",
    colorText: "#f4f4f5",
    colorTextSecondary: "#a1a1aa",
    colorDanger: "#ef4444",
    fontFamily: "ui-monospace, SFMono-Regular, monospace",
    borderRadius: "3px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": { border: "1px solid #27272a", boxShadow: "none" },
    ".Input:focus": {
      border: "1px solid rgba(16, 185, 129, 0.5)",
      boxShadow: "none",
    },
    ".Label": {
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "#a1a1aa",
    },
    ".Tab": { border: "1px solid #27272a", backgroundColor: "#000000" },
    ".Tab--selected": {
      borderColor: "rgba(16, 185, 129, 0.5)",
      backgroundColor: "rgba(16, 185, 129, 0.05)",
    },
  },
};

function PaymentForm({
  totalCents,
  publicToken,
}: {
  totalCents: number;
  publicToken: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/proposal/${publicToken}/payment?status=success`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Payment failed.");
      setProcessing(false);
    } else {
      setSucceeded(true);
      setProcessing(false);
    }
  };

  if (succeeded) {
    return (
      <div className="border border-emerald-900/50 bg-emerald-950/20 rounded p-6 text-center">
        <p className="text-emerald-400 text-sm font-mono">
          Payment received — outreach to your audience begins now.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error ? <p className="text-xs text-red-400 font-mono">{error}</p> : null}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-950 font-mono text-sm font-bold uppercase tracking-wider py-4 rounded transition-colors cursor-pointer"
      >
        {processing
          ? "Processing…"
          : `Pay ${formatUsdCents(totalCents)} & launch outreach`}
      </button>
    </form>
  );
}

export function PaymentSection({
  publishableKey,
  clientSecret,
  totalCents,
  publicToken,
}: {
  publishableKey: string;
  clientSecret: string;
  totalCents: number;
  publicToken: string;
}) {
  const stripePromise = useMemo<Promise<Stripe | null>>(
    () => loadStripe(publishableKey),
    [publishableKey],
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
    >
      <PaymentForm totalCents={totalCents} publicToken={publicToken} />
    </Elements>
  );
}
