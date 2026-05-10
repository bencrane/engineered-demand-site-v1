import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  company_name: z.string().min(1).max(200),
  contact_name: z.string().min(1).max(200),
  contact_email: z.email(),
  contact_phone: z.string().max(50).optional(),
  website: z.string().max(200).optional(),

  annual_revenue_range: z.string().max(80),
  monthly_lead_capacity: z.string().max(80),
  current_lead_sources: z.string().max(2000),

  average_ltv_usd: z.string().max(80),
  close_rate_qualified_meetings: z.string().max(80),
  sales_cycle_length: z.string().max(80).optional(),

  ideal_customer: z.string().max(2000),
  anti_fit_notes: z.string().max(2000).optional(),
  acknowledged_selective: z.literal(true),

  meeting_url_or_calendar: z.string().max(500).optional(),
});

const RESEND_FROM = "Engineered Demand <noreply@engineereddemand.com>";
const RESEND_TO = "benjamin.crane@engineereddemand.com";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_error", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local dev without Resend — log + accept. Operator gets a clear
    // signal in the response and form still completes.
    console.warn("RESEND_API_KEY missing — qualify form accepted but not emailed", {
      data,
    });
    return NextResponse.json({ ok: true, emailed: false });
  }

  const subject = `[qualify] ${data.company_name} — ${data.contact_name}`;
  const body = formatBody(data);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [RESEND_TO],
      reply_to: data.contact_email,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("resend send failed", res.status, txt);
    return NextResponse.json(
      { ok: false, error: "send_failed", upstream_status: res.status },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, emailed: true });
}

function formatBody(d: z.infer<typeof Body>): string {
  return [
    "── PROSPECT ──",
    `Company:      ${d.company_name}`,
    `Contact:      ${d.contact_name} <${d.contact_email}>`,
    d.contact_phone ? `Phone:        ${d.contact_phone}` : null,
    d.website ? `Website:      ${d.website}` : null,
    "",
    "── CAPACITY ──",
    `Revenue:      ${d.annual_revenue_range}`,
    `Lead cap/mo:  ${d.monthly_lead_capacity}`,
    `Sources mix:  ${d.current_lead_sources}`,
    "",
    "── ECONOMICS ──",
    `LTV:          ${d.average_ltv_usd}`,
    `Close rate:   ${d.close_rate_qualified_meetings}`,
    d.sales_cycle_length ? `Sales cycle:  ${d.sales_cycle_length}` : null,
    "",
    "── FIT ──",
    "Ideal customer:",
    d.ideal_customer,
    "",
    d.anti_fit_notes
      ? `Anti-fit notes:\n${d.anti_fit_notes}`
      : "Anti-fit notes: (none)",
    "",
    d.meeting_url_or_calendar
      ? `Calendar / meeting URL: ${d.meeting_url_or_calendar}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");
}
