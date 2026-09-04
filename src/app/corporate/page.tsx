import type { Metadata } from "next";
import { Truck, Radio, MapPinned, FileCheck2 } from "lucide-react";
import { TrustStrip } from "@/components/trust-strip";
import { CorporateForm } from "@/components/corporate-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Corporate & Tenders",
  description:
    "Scheduled supply contracts, freight retainers and fleet-wide tracking for companies bidding on private and government tenders.",
};

const retainers = [
  {
    icon: Truck,
    title: "Scheduled quarry supply",
    description:
      "Weekly or monthly delivery contracts for ballast, hardcore, sand and aggregates — priced per site, invoiced monthly.",
  },
  {
    icon: Radio,
    title: "Freight brokerage retainers",
    description:
      "Dedicated dispatch line, priority truck allocation and consolidated monthly billing for repeat cargo lanes.",
  },
  {
    icon: MapPinned,
    title: "Fleet-wide vehicle tracking",
    description:
      "Enterprise GPS tracking, geo-fencing and driver reporting across your entire fleet under one subscription.",
  },
  {
    icon: FileCheck2,
    title: "Tender document support",
    description:
      "Company registration certificates, tax compliance PINs, CR12s, single-business permits and other tender-ready paperwork.",
  },
];

export default function CorporatePage() {
  return (
    <>
      <section className="border-b border-border/70 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Corporate & tenders
          </p>
          <h1 className="mt-2 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Built for contractors, corporates and procurement officers.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Grikim runs scheduled supply contracts, freight retainers and fleet-wide tracking for
            companies bidding on — and delivering against — private and government tenders. One
            account manager, compliant paperwork, and predictable monthly billing.
          </p>
          <p className="mt-6 text-sm font-medium text-muted-foreground">
            Trusted by contractors, corporates and procurement teams across Kenya
          </p>
        </div>
      </section>

      <TrustStrip />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            What&apos;s available on retainer
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Recurring supply and compliance, under one contract.
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Pick one, or bundle several — most of our corporate clients combine quarry supply with
            fleet tracking and tender support.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {retainers.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="hover-lift border-border/80">
                <CardContent className="flex gap-4 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="corporate-enquiry" className="border-t border-border/70 bg-secondary/20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight">Ready when you are.</h2>
          <p className="mt-2 text-muted-foreground">
            One account manager. Compliant paperwork. Predictable billing. Share the tender or
            contract details and we&apos;ll come back with pricing within one working day.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <CorporateForm />
          </div>
        </div>
      </section>
    </>
  );
}
