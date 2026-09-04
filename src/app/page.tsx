import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { ServiceGrid } from "@/components/service-grid";
import { QuoteForm } from "@/components/quote-form";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <section id="quote" className="scroll-mt-20 border-b border-border/70 bg-secondary/20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Get a tailored quote in one business day.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Share a few details and our team will get back with a tailored quote within one
            business day.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <QuoteForm />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Or call{" "}
              <a href={siteConfig.phoneHref} className="font-medium text-primary hover:underline">
                {siteConfig.phone}
              </a>{" "}
              ·{" "}
              <a href={siteConfig.emailHref} className="font-medium text-primary hover:underline">
                Email us
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-quarry-texture">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="max-w-3xl text-balance text-lg text-muted-foreground">
            From moving cargo across Kenya to filing your taxes on time, registering a new
            company, supplying construction materials, or tracking your entire fleet — Grikim is
            the one call you make when the job needs doing properly. We bring focused expertise
            under one roof so you spend less time coordinating suppliers and more time growing
            your business.
          </p>

          <div className="mt-12 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                What we handle
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Every service. One partner.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8">
            <ServiceGrid />
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/services" className="flex items-center gap-1 text-sm font-medium text-primary">
              View all services <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Running a business or bidding on a tender?
            </h2>
            <p className="mt-2 max-w-xl text-primary-foreground/85">
              See our corporate solutions for scheduled supply contracts, fleet-wide tracking and
              tender document support.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/corporate" />}
            >
              Corporate solutions <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              render={<a href={siteConfig.phoneHref} />}
            >
              <Phone className="h-4 w-4" /> Call us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
