import { NextRequest } from "next/server";

/**
 * Lightweight in-memory security helpers for the public API routes
 * (/api/quote, /api/corporate, /api/analytics). No database and no
 * serverless cold-starts here -- the Node process stays up continuously
 * under Passenger, so in-memory state persists across requests and is a
 * reasonable fit for a low-traffic site on shared hosting.
 */

// ---- Client IP ----

export function getClientIp(req: NextRequest): string {
  // Apache/Passenger on Truehost sits in front of the Node process, so the
  // real client IP arrives via X-Forwarded-For (leftmost entry).
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// ---- Rate limiting ----

type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

// Opportunistic cleanup so `buckets` doesn't grow unbounded over a long
// Passenger process lifetime -- runs on a tiny fraction of requests rather
// than on a timer, since this is a request-driven Node process, not a
// long-lived daemon we can easily attach a background interval to.
function sweepExpired(now: number, windowMs: number) {
  if (Math.random() > 0.02) return;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > windowMs) buckets.delete(key);
  }
}

/**
 * Fixed-window rate limit. Returns true if the request is allowed.
 * `key` should already include a namespace, e.g. `quote:${ip}`, so
 * different routes don't share the same budget.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweepExpired(now, windowMs);

  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

// ---- Honeypot ----

/** Bots that auto-fill every field will fill this hidden one too; real users never see it. */
export const HONEYPOT_FIELD = "website";

export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

// ---- Origin check (lightweight CSRF defense) ----

/**
 * Rejects cross-origin POSTs. There's no session/cookie auth on these
 * routes to steal via classic CSRF, but this still blocks a third-party
 * page from silently using a visitor's browser to spam the contact forms
 * or flood the analytics endpoint.
 */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches in some browsers omit Origin; don't block those
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// ---- Input length guards ----

export function withinLength(value: unknown, max: number): boolean {
  return typeof value !== "string" || value.length <= max;
}

const PHONE_PATTERN = /^[\d+\-\s()]{7,20}$/;

export function isPlausiblePhone(value: string): boolean {
  return PHONE_PATTERN.test(value.trim());
}
