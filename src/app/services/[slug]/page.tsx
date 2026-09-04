import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TrustStrip } from "@/components/trust-strip";
import { QuoteForm } from "@/components/quote-form";
import { QuarryGallery } from "@/components/quarry-gallery";
import { ServiceIcon } from "@/components/service-icon";
import { getServiceBySlug, services } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="border-b border-border/70 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <ServiceIcon icon={service.icon} className="h-6 w-6" />
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{service.tagline}</p>
              <p className="mt-4 max-w-xl text-muted-foreground">{service.summary}</p>
            </div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl lg:h-72 lg:w-[420px] lg:shrink-0">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {service.breakdown.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-xl font-semibold">Frequently asked questions</h2>
            <Accordion className="mt-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold">Request this service</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Get a tailored quote within one business day.
              </p>
              <QuoteForm defaultService={service.title} className="mt-5" />
            </div>
          </div>
        </div>
      </section>

      {service.slug === "quarrying-mining" && (
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
            <div className="mt-8 text-center">
              <Link
                href="/marketplace"
                className="text-sm font-medium text-primary hover:underline"
              >
                Browse quarry materials in the marketplace →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
