import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/quarry/evening-stockyard.jpg"
          alt="Evening view across the Jaribuni quarry stockyard"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          A proudly Kenyan enterprise
        </span>

        <h1 className="mt-6 max-w-2xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          One partner. Every job done properly.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base text-white/85 sm:text-lg">
          {siteConfig.name} is your single trusted source in Kenya for logistics, tax
          consultancy, business registration, quarry materials, vehicle tracking and general
          supplies — so you deal with one accountable partner instead of six.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="#quote" />}>
            Request a quote
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<a href={siteConfig.phoneHref} />}
          >
            <Phone className="h-4 w-4" />
            Call us
          </Button>
        </div>

        <Link
          href="/corporate"
          className="mt-8 text-sm font-medium text-white/90 underline-offset-4 hover:underline"
        >
          Running a business or bidding on a tender? See our corporate solutions →
        </Link>

        <p className="mt-10 text-xs font-medium uppercase tracking-wide text-white/60">
          Trusted by contractors and SMEs across Kenya
        </p>
      </div>
    </section>
  );
}
