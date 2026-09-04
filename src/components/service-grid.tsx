import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services-data";
import { ServiceIcon } from "@/components/service-icon";
import { Card, CardContent } from "@/components/ui/card";

export function ServiceGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link key={service.slug} href={`/services/${service.slug}`} className="group block">
          <Card className="hover-lift h-full border-border/80">
            <CardContent className="flex h-full flex-col gap-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ServiceIcon icon={service.icon} className="h-5.5 w-5.5" />
              </span>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.tagline}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
