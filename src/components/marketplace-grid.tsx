"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, Truck, Clock, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuoteForm } from "@/components/quote-form";
import { cn } from "@/lib/utils";
import {
  marketplaceCategories,
  marketplaceItems,
  type MarketplaceItem,
} from "@/lib/marketplace-data";

function serviceForCategory(category: MarketplaceItem["category"]) {
  return category === "Quarry Works" ? "Quarrying & Mining" : "Logistics";
}

export function MarketplaceGrid() {
  const [active, setActive] = useState<"All" | MarketplaceItem["category"]>("All");
  const [selected, setSelected] = useState<MarketplaceItem | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? marketplaceItems : marketplaceItems.filter((i) => i.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["All", ...marketplaceCategories] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <Card key={item.id} className="hover-lift overflow-hidden border-border/80 py-0 gap-0">
            <div className="relative h-44 w-full">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              <Badge className="absolute left-3 top-3" variant="secondary">
                {item.category}
              </Badge>
            </div>
            <CardContent className="flex flex-col gap-3 p-5">
              <h3 className="font-semibold leading-snug">{item.title}</h3>

              <div className="space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {item.origin} → {item.destination}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Truck className="h-4 w-4 shrink-0 text-primary" /> {item.capacity}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" /> {item.available}
                </p>
                <p className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 shrink-0 text-primary" /> {item.operator}
                </p>
              </div>

              <p className="text-sm font-semibold">Price on request</p>
              <p className="text-xs italic text-muted-foreground">{item.note}</p>

              <Button className="mt-1 w-full" onClick={() => setSelected(item)}>
                Request quote
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Request a quote{selected ? ` — ${selected.title}` : ""}</DialogTitle>
          </DialogHeader>
          {selected && (
            <QuoteForm key={selected.id} defaultService={serviceForCategory(selected.category)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
