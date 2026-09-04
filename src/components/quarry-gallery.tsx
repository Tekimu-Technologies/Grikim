"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { quarryGallery } from "@/lib/marketplace-data";

export function QuarryGallery() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4500, stopOnInteraction: true })]}
      className="mx-auto w-full max-w-5xl"
    >
      <CarouselContent>
        {quarryGallery.map((photo) => (
          <CarouselItem key={photo.src} className="sm:basis-1/2 lg:basis-1/3">
            <div className="group relative aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-xs font-medium text-white">{photo.alt}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 sm:-left-10" />
      <CarouselNext className="-right-4 sm:-right-10" />
    </Carousel>
  );
}
