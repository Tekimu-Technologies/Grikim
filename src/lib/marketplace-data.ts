export type MarketplaceCategory =
  | "Quarry Works"
  | "Freight Brokerage"
  | "Empty Return"
  | "Last Mile"
  | "Container Tracking"
  | "Cold Chain";

export const marketplaceCategories: MarketplaceCategory[] = [
  "Quarry Works",
  "Freight Brokerage",
  "Empty Return",
  "Last Mile",
  "Container Tracking",
  "Cold Chain",
];

export type MarketplaceItem = {
  id: string;
  category: MarketplaceCategory;
  title: string;
  description: string;
  origin: string;
  destination: string;
  capacity: string;
  available: string;
  operator: string;
  note: string;
  image: { src: string; alt: string };
};

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "ballast",
    category: "Quarry Works",
    title: "Ballast — graded aggregate for concrete works",
    description: "Graded aggregate for concrete works",
    origin: "Jaribuni, Kilifi County",
    destination: "Site delivery (coastal & countrywide on request)",
    capacity: "7t / 20t tippers",
    available: "Same-day dispatch from Jaribuni",
    operator: "Grikim quarry — direct from source",
    note: "Sold by the tonne. Coastal deliveries same-day; countrywide 1–3 days lead time.",
    image: {
      src: "/images/quarry/tipper-loaded.jpg",
      alt: "Grikim tipper truck loaded with quarry material at the pit",
    },
  },
  {
    id: "chips",
    category: "Quarry Works",
    title: "Chips — graded stone chippings",
    description: "Graded stone chippings",
    origin: "Jaribuni, Kilifi County",
    destination: "Site delivery (coastal & countrywide on request)",
    capacity: "7t / 20t tippers",
    available: "Same-day dispatch from Jaribuni",
    operator: "Grikim quarry — direct from source",
    note: "Sized for concrete, drainage and road works. State your grade when ordering.",
    image: {
      src: "/images/quarry/stockpile-bays.jpg",
      alt: "Stockpile bays of graded aggregate at Jaribuni, Kilifi County",
    },
  },
  {
    id: "quarry-dust",
    category: "Quarry Works",
    title: "Quarry dust — fine aggregate, bagged or bulk",
    description: "Fine aggregate, bagged or bulk",
    origin: "Jaribuni, Kilifi County",
    destination: "Site delivery (coastal & countrywide on request)",
    capacity: "7t / 20t tippers, or bagged",
    available: "Same-day dispatch from Jaribuni",
    operator: "Grikim quarry — direct from source",
    note: "For blockwork, paving beds and backfill. Minimum order 7 tonnes for tipper delivery.",
    image: {
      src: "/images/quarry/tipper-discharging.jpg",
      alt: "Tipper trailer discharging quarry dust at the loading bay",
    },
  },
  {
    id: "quarry-waste",
    category: "Quarry Works",
    title: "Quarry waste — hardcore for filling & levelling",
    description: "Hardcore for filling & levelling",
    origin: "Jaribuni, Kilifi County",
    destination: "Site delivery (coastal & countrywide on request)",
    capacity: "20t / 30t tippers",
    available: "Same-day dispatch from Jaribuni",
    operator: "Grikim quarry — direct from source",
    note: "Ideal for foundations, site levelling and access roads. Bulk loads only.",
    image: {
      src: "/images/quarry/trailer-tipping-crusher.jpg",
      alt: "Trailer tipping a load of fine aggregate beside the crusher",
    },
  },
  {
    id: "freight-brokerage",
    category: "Freight Brokerage",
    title: "Freight brokerage — truck matching for your cargo lane",
    description: "Truck sourcing and dispatch for one-off or repeat cargo runs",
    origin: "Nationwide pickup points",
    destination: "Nationwide, on request",
    capacity: "Matched to load size",
    available: "Quoted per request",
    operator: "Grikim logistics network",
    note: "Share your route, cargo type and tonnage — we'll match the right truck and dispatch it.",
    image: {
      src: "/images/quarry/tipper-offload-site.jpg",
      alt: "Tipper truck at a delivery site",
    },
  },
  {
    id: "empty-return",
    category: "Empty Return",
    title: "Empty-return matching — cut down on wasted trips",
    description: "Backhaul matching so trucks don't run empty on the return leg",
    origin: "Route-dependent",
    destination: "Route-dependent",
    capacity: "Matched to available trucks",
    available: "Quoted per request",
    operator: "Grikim logistics network",
    note: "Tell us your regular route and we'll look for return-leg loads to bring your freight cost down.",
    image: {
      src: "/images/quarry/evening-stockyard.jpg",
      alt: "Evening view across the Jaribuni quarry stockyard",
    },
  },
  {
    id: "last-mile",
    category: "Last Mile",
    title: "Last-mile delivery — from depot to final site",
    description: "Final-leg delivery coordination to your exact drop-off point",
    origin: "Regional depots",
    destination: "Your site or address",
    capacity: "Matched to load size",
    available: "Quoted per request",
    operator: "Grikim logistics network",
    note: "Useful for cargo that needs a final, precise handoff after long-haul transport.",
    image: {
      src: "/images/quarry/wheel-loader.jpg",
      alt: "Wheel loader working the aggregate stockpiles at the quarry",
    },
  },
  {
    id: "container-tracking",
    category: "Container Tracking",
    title: "Container tracking — status updates while cargo is in transit",
    description: "Visibility on container location and status from dispatch to arrival",
    origin: "Port / origin terminal",
    destination: "Final destination",
    capacity: "Per container",
    available: "Quoted per request",
    operator: "Grikim logistics network",
    note: "Ask about tracking visibility for your specific shipment and container type.",
    image: {
      src: "/images/quarry/stockpiles-yard.jpg",
      alt: "Graded ballast and chips stockpiles at the Jaribuni quarry yard",
    },
  },
  {
    id: "cold-chain",
    category: "Cold Chain",
    title: "Cold-chain transport — for temperature-sensitive goods",
    description: "Refrigerated transport options for perishable or sensitive cargo",
    origin: "Route-dependent",
    destination: "Route-dependent",
    capacity: "Matched to load size",
    available: "Quoted per request",
    operator: "Grikim logistics network",
    note: "Share your product type and temperature requirements and we'll confirm suitable vehicles.",
    image: {
      src: "/images/quarry/tipper-discharging.jpg",
      alt: "Refrigerated cargo transport",
    },
  },
];

export const quarryGallery = [
  {
    src: "/images/quarry/stockpiles-yard.jpg",
    alt: "Graded ballast and chips stockpiles at the Jaribuni quarry yard",
  },
  {
    src: "/images/quarry/tipper-loaded.jpg",
    alt: "Grikim tipper truck loaded with quarry material at the pit",
  },
  {
    src: "/images/quarry/tipper-discharging.jpg",
    alt: "Tipper trailer discharging quarry dust at the loading bay",
  },
  {
    src: "/images/quarry/stockpile-bays.jpg",
    alt: "Stockpile bays of graded aggregate at Jaribuni, Kilifi County",
  },
  {
    src: "/images/quarry/trailer-tipping-crusher.jpg",
    alt: "Trailer tipping a load of fine aggregate beside the crusher",
  },
  {
    src: "/images/quarry/wheel-loader.jpg",
    alt: "Wheel loader working the aggregate stockpiles at the quarry",
  },
  {
    src: "/images/quarry/evening-stockyard.jpg",
    alt: "Evening view across the Jaribuni quarry stockyard",
  },
  {
    src: "/images/quarry/tipper-offload-site.jpg",
    alt: "Tipper raising its body to offload ballast at site",
  },
];
