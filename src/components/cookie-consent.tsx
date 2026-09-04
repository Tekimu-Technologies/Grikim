"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConsentCookie, setConsentCookie } from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Read the cookie only after mount to avoid a server/client hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getConsentCookie()) setVisible(true);
  }, []);

  function choose(value: "all" | "necessary") {
    setConsentCookie(value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("grikim:consent-change", { detail: value }));
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xl sm:flex-row sm:items-center">
        <Cookie className="hidden h-8 w-8 shrink-0 text-primary sm:block" />
        <div className="flex-1 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">We use cookies</p>
          <p className="mt-1">
            Necessary cookies keep the site working. With your permission we also use basic
            analytics cookies to see which pages people find useful. See our{" "}
            <Link href="/#quote" className="underline underline-offset-2 hover:text-primary">
              privacy details
            </Link>{" "}
            for more.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => choose("necessary")}>
            Necessary only
          </Button>
          <Button size="sm" onClick={() => choose("all")}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
