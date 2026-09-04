import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { TrustStrip } from "@/components/trust-strip";
import { ServiceGrid } from "@/components/service-grid";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six services, one partner: logistics, tax consultancy, business registration, quarrying & mining, vehicle tracking and general supplies.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border/70 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            What we handle
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Six services. One partner.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Tap any service for the full breakdown, pricing notes, and frequently asked
            questions.
          </p>
        </div>
      </section>

      <TrustStrip />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <ServiceGrid />
        </div>
      </section>

      <section className="border-t border-border/70 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Ready to get this done properly?
            </h2>
            <p className="mt-2 max-w-xl text-primary-foreground/85">
              Running a business or bidding on a tender?{" "}
              <Link href="/corporate" className="underline underline-offset-2">
                See our corporate solutions
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/#quote" />}
            >
              Request a quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              render={<a href={siteConfig.phoneHref} />}
            >
              <Phone className="h-4 w-4" /> Call {siteConfig.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
