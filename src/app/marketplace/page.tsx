import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { TrustStrip } from "@/components/trust-strip";
import { MarketplaceGrid } from "@/components/marketplace-grid";
import { QuarryGallery } from "@/components/quarry-gallery";
import { QuoteForm } from "@/components/quote-form";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Quarry materials straight from our Jaribuni pit, plus freight brokerage, empty-return matching, container tracking and cold-chain transport.",
};

export default function MarketplacePage() {
  return (
    <>
      <section className="border-b border-border/70 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Quarry works
          </p>
          <h1 className="mt-2 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Quarry materials, straight from our Jaribuni pit.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Ballast, chips, quarry dust and quarry waste — mined at our own quarry in Jaribuni,
            Kilifi County, and delivered to site by the tipper load.
          </p>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Plus freight brokerage, empty-return matching, container tracking and cold-chain
            transport — browse all categories below.
          </p>
        </div>
      </section>

      <TrustStrip />

      <section id="listings">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <MarketplaceGrid />
        </div>
      </section>

      <section className="border-t border-border/70 bg-secondary/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Inside the pit
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Our Jaribuni quarry, in action.
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Graded stockpiles, loading bays and our own tipper fleet — every load you order is
            dispatched from here.
          </p>
          <div className="mt-10">
            <QuarryGallery />
          </div>
        </div>
      </section>

      <section className="border-t border-border/70">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Can&apos;t see what you need?</h2>
              <p className="mt-1 text-muted-foreground">
                Tell us your tonnage and site — we&apos;ll load it. Special grades, bulk contracts and
                repeat site deliveries are quoted directly.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <QuoteForm defaultService="Quarrying & Mining" />
          </div>
        </div>
      </section>
    </>
  );
}
