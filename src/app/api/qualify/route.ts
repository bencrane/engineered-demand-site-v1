import { NextResponse } from "next/server";

// Thin forwarder. Validation + email sending live in hq-x; this route
// just relays the form payload server-side so the browser never talks
// to hq-x directly (avoids CORS) and the site holds zero secrets.

const HQX_API_BASE_URL = process.env.HQX_API_BASE_URL;

export async function POST(request: Request) {
  if (!HQX_API_BASE_URL) {
    return NextResponse.json(
      { ok: false, error: "hqx_not_configured" },
      { status: 500 },
    );
  }

  const body = await request.text();

  const upstream = await fetch(
    `${HQX_API_BASE_URL.replace(/\/+$/, "")}/api/v1/qualify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    },
  );

  // Pass the upstream body through verbatim — hq-x already returns
  // {ok, emailed} on success and {error, ...} envelopes on failure.
  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": "application/json" },
  });
}
