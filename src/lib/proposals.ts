// Server-side helpers for the prospect-facing /proposal/[token]/payment
// route. Calls hq-x's public token-gated endpoints. The HQX_API_BASE_URL
// env is server-only — never expose this client-side.

const HQX_API_BASE_URL = process.env.HQX_API_BASE_URL;

export type ProposalPublic = {
  id: string;
  public_token: string;
  status:
    | "draft"
    | "sent"
    | "viewed"
    | "audience_confirmed"
    | "checkout_initiated"
    | "paid"
    | "expired"
    | "cancelled";
  proposed_data_engine_audience_id: string;
  final_data_engine_audience_id: string | null;
  proposed_transfer_count: number;
  proposed_price_per_transfer_cents: number;
  proposed_window_days: number;
  proposed_total_cents: number;
  prospect_company_name: string;
  prospect_contact_name: string | null;
  prospect_contact_email: string | null;
  stripe_checkout_session_id: string | null;
  stripe_publishable_key: string | null;
  paid_at: string | null;
  paid_amount_cents: number | null;
  sent_at: string | null;
  viewed_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentIntentResponse = {
  client_secret: string;
  payment_intent_id: string;
  amount_cents: number;
  proposal: ProposalPublic;
};

function hqxBase(): string {
  if (!HQX_API_BASE_URL) {
    throw new Error("HQX_API_BASE_URL is not configured");
  }
  return HQX_API_BASE_URL.replace(/\/+$/, "");
}

export async function fetchProposalByToken(
  token: string,
): Promise<ProposalPublic | null> {
  const res = await fetch(
    `${hqxBase()}/api/v1/proposals/by-token/${encodeURIComponent(token)}`,
    {
      headers: { "Content-Type": "application/json" },
      // viewed_at flips on first read — re-fetch every render so the
      // page reflects post-view state.
      cache: "no-store",
    },
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `fetchProposalByToken ${token} failed: ${res.status} ${body}`,
    );
  }
  return (await res.json()) as ProposalPublic;
}

export async function initiatePaymentIntentForToken(
  token: string,
): Promise<PaymentIntentResponse> {
  const res = await fetch(
    `${hqxBase()}/api/v1/proposals/by-token/${encodeURIComponent(
      token,
    )}/payment-intent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `initiatePaymentIntentForToken ${token} failed: ${res.status} ${body}`,
    );
  }
  return (await res.json()) as PaymentIntentResponse;
}

export function formatUsdCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatUsdCentsPrecise(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
