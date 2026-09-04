export const CONSENT_COOKIE = "grikim_cookie_consent";
export type ConsentValue = "all" | "necessary";

export function getConsentCookie(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return value === "all" || value === "necessary" ? value : null;
}

export function setConsentCookie(value: ConsentValue) {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}
