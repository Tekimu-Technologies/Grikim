"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getConsentCookie } from "@/lib/cookie-consent";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function ping() {
      if (getConsentCookie() !== "all") return;
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname }),
        keepalive: true,
      }).catch(() => {});
    }

    ping();
    window.addEventListener("grikim:consent-change", ping);
    return () => window.removeEventListener("grikim:consent-change", ping);
  }, [pathname]);

  return null;
}
