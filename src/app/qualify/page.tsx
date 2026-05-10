"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertTriangle } from "lucide-react";

const FormSchema = z.object({
  company_name: z.string().min(1, "required").max(200),
  contact_name: z.string().min(1, "required").max(200),
  contact_email: z.email("valid email required"),
  contact_phone: z.string().max(50).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),

  annual_revenue_range: z.string().min(1, "required").max(80),
  monthly_lead_capacity: z.string().min(1, "required").max(80),
  current_lead_sources: z.string().min(1, "required").max(2000),

  average_ltv_usd: z.string().min(1, "required").max(80),
  close_rate_qualified_meetings: z.string().min(1, "required").max(80),
  sales_cycle_length: z.string().max(80).optional().or(z.literal("")),

  ideal_customer: z.string().min(10, "be specific").max(2000),
  anti_fit_notes: z.string().max(2000).optional().or(z.literal("")),
  acknowledged_selective: z.literal(true, {
    message: "required",
  }),

  meeting_url_or_calendar: z.string().max(500).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof FormSchema>;

export default function QualifyPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const [submitted, setSubmitted] = useState<null | { emailed: boolean }>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          contact_phone: values.contact_phone || undefined,
          website: values.website || undefined,
          sales_cycle_length: values.sales_cycle_length || undefined,
          anti_fit_notes: values.anti_fit_notes || undefined,
          meeting_url_or_calendar: values.meeting_url_or_calendar || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? `submit failed (${res.status})`);
      }
      setSubmitted({ emailed: !!json.emailed });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background text-foreground font-mono px-6 py-20">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <CheckCircle2
            className="mx-auto text-emerald-400"
            size={32}
            strokeWidth={1.5}
          />
          <h1 className="font-heading text-3xl tracking-tight">Got it.</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We&apos;ll review and reply within 24 hours — either with a hold-call
            confirmation, or with a clean &ldquo;not the right fit&rdquo; and a
            pointer to who might be.
          </p>
          {!submitted.emailed && (
            <p className="text-xs text-amber-400">
              (Local dev: form was accepted but no email was sent — RESEND_API_KEY
              not configured.)
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-mono px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-500 text-xs tracking-widest uppercase">
              Pre-meeting fit check
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl leading-[1.1] tracking-tight">
            We work selectively.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
            This isn&apos;t a sales form. It&apos;s a fit check. We get the best
            outcomes when we and the partner are unambiguously aligned on
            capacity, unit economics, and what good looks like — and we&apos;d
            rather decline a bad fit on day one than churn it on month four.
            Five minutes to fill out. We reply within 24 hours either way.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <Section
            title="Who you are"
            blurb="Just the basics. We won't add you to a list."
          >
            <Field label="Company" error={errors.company_name?.message}>
              <input className={inputCls} {...register("company_name")} />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Your name" error={errors.contact_name?.message}>
                <input className={inputCls} {...register("contact_name")} />
              </Field>
              <Field label="Email" error={errors.contact_email?.message}>
                <input
                  type="email"
                  className={inputCls}
                  {...register("contact_email")}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phone (optional)" error={errors.contact_phone?.message}>
                <input className={inputCls} {...register("contact_phone")} />
              </Field>
              <Field label="Website (optional)" error={errors.website?.message}>
                <input className={inputCls} {...register("website")} />
              </Field>
            </div>
          </Section>

          <Section
            title="Capacity"
            blurb="If we send you 50 qualified meetings next month, can you actually work them? Honesty here saves both of us churn later."
          >
            <Field
              label="Annual revenue"
              error={errors.annual_revenue_range?.message}
              hint="Round numbers fine. e.g. ~$3M ARR / $20M run rate"
            >
              <input
                className={inputCls}
                {...register("annual_revenue_range")}
              />
            </Field>
            <Field
              label="Realistic monthly lead capacity"
              error={errors.monthly_lead_capacity?.message}
              hint="How many qualified intros per month can you actually convert calls into?"
            >
              <input
                className={inputCls}
                {...register("monthly_lead_capacity")}
              />
            </Field>
            <Field
              label="Where leads come from today"
              error={errors.current_lead_sources?.message}
              hint="Outbound, partnerships, content, paid, referrals — rough mix is fine."
            >
              <textarea
                rows={3}
                className={textareaCls}
                {...register("current_lead_sources")}
              />
            </Field>
          </Section>

          <Section
            title="Economics"
            blurb="We anchor pricing to what each transferred opportunity is worth to you. We need to know your numbers to scope the right tier."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="Average LTV (USD)"
                error={errors.average_ltv_usd?.message}
                hint="Closed-customer lifetime value. Estimate is fine."
              >
                <input
                  className={inputCls}
                  {...register("average_ltv_usd")}
                />
              </Field>
              <Field
                label="Close rate from qualified meetings"
                error={errors.close_rate_qualified_meetings?.message}
                hint="Of the meetings that actually happened. % or x/y."
              >
                <input
                  className={inputCls}
                  {...register("close_rate_qualified_meetings")}
                />
              </Field>
            </div>
            <Field
              label="Typical sales cycle (optional)"
              error={errors.sales_cycle_length?.message}
              hint="Days, weeks, or months from first conversation to closed."
            >
              <input
                className={inputCls}
                {...register("sales_cycle_length")}
              />
            </Field>
          </Section>

          <Section
            title="Fit"
            blurb="Define the customer you want to clone. Then — more importantly — the patterns you keep falling for that don't work."
          >
            <Field
              label="Describe your best-fit customer"
              error={errors.ideal_customer?.message}
              hint="Industry, size, geography, role, situation. Be specific. The crisper you are, the better signal we can pull."
            >
              <textarea
                rows={4}
                className={textareaCls}
                {...register("ideal_customer")}
              />
            </Field>
            <Field
              label="Anti-fit / red flags (optional but encouraged)"
              error={errors.anti_fit_notes?.message}
              hint="Customers who looked right on paper but ended badly. Patterns we should screen against."
            >
              <textarea
                rows={3}
                className={textareaCls}
                {...register("anti_fit_notes")}
              />
            </Field>
          </Section>

          <Section title="Meeting" blurb="">
            <Field
              label="Meeting / calendar link (optional)"
              error={errors.meeting_url_or_calendar?.message}
              hint="If you've already booked a call, paste the link so we can match this form to it."
            >
              <input
                className={inputCls}
                {...register("meeting_url_or_calendar")}
              />
            </Field>
          </Section>

          <div className="border border-border rounded p-4 bg-secondary/40">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-emerald-500"
                {...register("acknowledged_selective")}
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I understand Engineered Demand works with a small number of
                partners at a time and that being a great fit on capacity and
                economics matters more than just signing. If we&apos;re not the
                right fit, you&apos;ll tell me — and ideally point me somewhere
                better.
              </span>
            </label>
            {errors.acknowledged_selective?.message && (
              <p className="mt-2 text-xs text-red-400">
                {errors.acknowledged_selective.message}
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2 border border-red-900/40 bg-red-950/20 rounded p-3 text-xs text-red-400">
              <AlertTriangle size={14} strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-950 text-sm font-bold uppercase tracking-wider py-4 rounded transition-colors cursor-pointer"
          >
            {isSubmitting ? "Sending…" : "Submit fit check"}
          </button>

          <p className="text-[11px] text-muted-foreground text-center">
            Direct to Benjamin Crane. No CRM, no list, no automation.
          </p>
        </form>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded border border-border bg-secondary/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500/60 focus:outline-none";
const textareaCls = `${inputCls} resize-y`;

function Section({
  title,
  blurb,
  children,
}: {
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-border/60 pt-8 first:border-t-0 first:pt-0">
      <div>
        <h2 className="font-heading text-xl tracking-tight">{title}</h2>
        {blurb && (
          <p className="mt-1 text-xs text-muted-foreground max-w-prose leading-relaxed">
            {blurb}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
        {error && <span className="text-[10px] text-red-400">{error}</span>}
      </div>
      {children}
      {hint && (
        <p className="mt-1 text-[11px] text-muted-foreground/80 leading-relaxed">
          {hint}
        </p>
      )}
    </label>
  );
}
