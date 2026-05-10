import { notFound } from "next/navigation";
import {
  fetchProposalByToken,
  formatUsdCents,
  formatUsdCentsPrecise,
  initiatePaymentIntentForToken,
  type ProposalPublic,
} from "@/lib/proposals";
import { PaymentSection } from "@/components/proposal/payment-section";

export const dynamic = "force-dynamic";

type Params = { token: string };

type PaymentLoad =
  | { kind: "paid"; proposal: ProposalPublic }
  | {
      kind: "ready";
      proposal: ProposalPublic;
      publishableKey: string;
      clientSecret: string;
    }
  | { kind: "unconfigured"; proposal: ProposalPublic; reason: string }
  | { kind: "error"; proposal: ProposalPublic; message: string };

async function loadPayment(token: string): Promise<PaymentLoad | null> {
  const proposal = await fetchProposalByToken(token);
  if (!proposal) return null;

  if (proposal.status === "paid") {
    return { kind: "paid", proposal };
  }

  if (!proposal.stripe_publishable_key) {
    return {
      kind: "unconfigured",
      proposal,
      reason:
        "Stripe publishable key not received from hq-x. Either STRIPE_MODE / STRIPE_PUBLISHABLE_KEY_TEST / STRIPE_PUBLISHABLE_KEY_LIVE is unset, or hq-x is running pre-port code.",
    };
  }

  try {
    const intent = await initiatePaymentIntentForToken(token);
    return {
      kind: "ready",
      proposal: intent.proposal,
      publishableKey: intent.proposal.stripe_publishable_key as string,
      clientSecret: intent.client_secret,
    };
  } catch (err) {
    return {
      kind: "error",
      proposal,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

export default async function ProposalPaymentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { token } = await params;
  const load = await loadPayment(token);
  if (!load) notFound();

  const { proposal } = load;

  return (
    <main className="min-h-screen bg-background text-foreground font-mono px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="border-b border-border pb-6">
          <p className="text-[10px] uppercase tracking-widest text-emerald-500 mb-2">
            Lead Transfer Agreement — Payment
          </p>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            {proposal.prospect_company_name}
          </h1>
          {proposal.prospect_contact_name ? (
            <p className="text-sm text-muted-foreground mt-2">
              for {proposal.prospect_contact_name}
              {proposal.prospect_contact_email
                ? ` · ${proposal.prospect_contact_email}`
                : ""}
            </p>
          ) : null}
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 border border-border rounded p-6">
          <Stat label="Transfers" value={String(proposal.proposed_transfer_count)} />
          <Stat
            label="Per transfer"
            value={formatUsdCentsPrecise(proposal.proposed_price_per_transfer_cents)}
          />
          <Stat label="Window" value={`${proposal.proposed_window_days}d`} />
          <Stat
            label="Total"
            value={formatUsdCents(proposal.proposed_total_cents)}
            valueClass="text-emerald-400"
          />
        </section>

        <section className="pt-2">
          {load.kind === "paid" ? (
            <div className="border border-emerald-900/50 bg-emerald-950/20 rounded p-4">
              <p className="text-emerald-400 text-sm">
                Payment received
                {proposal.paid_at
                  ? ` on ${new Date(proposal.paid_at).toLocaleString()}`
                  : ""}
                . Outreach to your audience is underway.
              </p>
            </div>
          ) : load.kind === "unconfigured" ? (
            <div className="border border-amber-900/50 bg-amber-950/20 rounded p-4">
              <p className="text-amber-400 text-xs whitespace-pre-wrap">
                {load.reason}
              </p>
            </div>
          ) : load.kind === "error" ? (
            <div className="border border-red-900/50 bg-red-950/20 rounded p-4">
              <p className="text-red-400 text-xs whitespace-pre-wrap break-all">
                {load.message}
              </p>
            </div>
          ) : (
            <PaymentSection
              publishableKey={load.publishableKey}
              clientSecret={load.clientSecret}
              totalCents={proposal.proposed_total_cents}
              publicToken={proposal.public_token}
            />
          )}
        </section>

        <p className="text-xs text-muted-foreground pt-8 text-center">
          Card or US bank account (instant verification via Plaid). Powered by
          Stripe.
        </p>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </p>
      <p className={`text-xl ${valueClass ?? "text-foreground"}`}>{value}</p>
    </div>
  );
}
