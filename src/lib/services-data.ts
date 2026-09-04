export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  icon: "truck" | "calculator" | "file-stack" | "mountain" | "map-pinned" | "package";
  image: { src: string; alt: string; local: boolean };
  summary: string;
  breakdown: string[];
  faqs: ServiceFaq[];
};

export const services: Service[] = [
  {
    slug: "logistics",
    title: "Logistics",
    tagline: "Getting goods where they need to be",
    icon: "truck",
    image: {
      src: "https://images.pexels.com/photos/14005602/pexels-photo-14005602.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Cargo truck travelling on a highway",
      local: false,
    },
    summary:
      "From single loads to scheduled cargo runs, Grikim moves goods across Kenya with one point of contact from pickup to delivery.",
    breakdown: [
      "Cargo transport across coastal and countrywide routes",
      "Freight brokerage and truck matching for one-off or recurring loads",
      "Empty-return matching to cut down on wasted trips and cost",
      "Last-mile delivery coordination to your final site",
      "Container tracking and status updates while cargo is in transit",
      "Cold-chain transport options for temperature-sensitive goods",
    ],
    faqs: [
      {
        question: "What kind of loads can Grikim move?",
        answer:
          "General cargo, construction materials, containers and temperature-sensitive goods. Share your tonnage, route and timeline and we'll confirm the right vehicle for the job.",
      },
      {
        question: "Do you handle one-off deliveries or only contracts?",
        answer:
          "Both. Single loads are welcome, and businesses with recurring routes can move to a scheduled retainer — see our Corporate solutions.",
      },
      {
        question: "How is pricing worked out?",
        answer:
          "Pricing depends on route, tonnage and vehicle type, so it's quoted per request. Send us the details and we'll respond within one business day.",
      },
    ],
  },
  {
    slug: "tax-consultancy",
    title: "Tax Consultancy",
    tagline: "Straightforward advice, filed on time",
    icon: "calculator",
    image: {
      src: "https://images.pexels.com/photos/6927334/pexels-photo-6927334.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Tax forms with a calculator on a desk",
      local: false,
    },
    summary:
      "Grikim keeps your tax obligations compliant and on schedule, so returns get filed correctly and on time without the back-and-forth.",
    breakdown: [
      "KRA PIN registration and iTax account setup",
      "Monthly and annual returns filing",
      "Tax compliance certificate applications",
      "Advisory on VAT, PAYE and income tax obligations",
      "Support during KRA audits and compliance checks",
    ],
    faqs: [
      {
        question: "Do you handle both individual and business tax filing?",
        answer:
          "Yes — Grikim supports individuals, SMEs and larger businesses with their filing and compliance needs.",
      },
      {
        question: "I've missed a filing deadline. Can you still help?",
        answer:
          "Share your situation in the request form and our team will advise on the fastest way to get you compliant again.",
      },
      {
        question: "What do you need from me to get started?",
        answer:
          "Your KRA PIN (or details to register one), relevant financial records, and a description of what needs filing. We'll guide you through the rest.",
      },
    ],
  },
  {
    slug: "business-registration",
    title: "Business Registration",
    tagline: "The paperwork, handled for you",
    icon: "file-stack",
    image: {
      src: "https://images.pexels.com/photos/5673489/pexels-photo-5673489.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Business partners signing a registration document",
      local: false,
    },
    summary:
      "Register a new company, update an existing one, or pull the certificates your tender needs — Grikim handles the paperwork end to end.",
    breakdown: [
      "Company incorporation and business name registration",
      "CR12 and company search documents",
      "Single-business permit applications",
      "KRA PIN and tax compliance certificate support",
      "Amendments — directors, shareholding and registered address changes",
    ],
    faqs: [
      {
        question: "How long does registration usually take?",
        answer:
          "Timelines vary by registration type and current government processing times. Tell us what you need and we'll give you a realistic estimate with your quote.",
      },
      {
        question: "Can you register a business remotely if I'm outside Kenya?",
        answer:
          "Yes, most of the process can be handled remotely with signed documents shared electronically. We'll confirm exact requirements once we know your situation.",
      },
      {
        question: "Do you also help with tender-ready documents?",
        answer:
          "Yes — CR12s, compliance certificates and permits used in tender submissions are all handled here. See our Corporate solutions for bundled tender support.",
      },
    ],
  },
  {
    slug: "quarrying-mining",
    title: "Quarrying & Mining",
    tagline: "Materials sourced and supplied",
    icon: "mountain",
    image: {
      src: "/images/quarry/stockpiles-yard.jpg",
      alt: "Graded ballast and chips stockpiles at the Jaribuni quarry yard",
      local: true,
    },
    summary:
      "Ballast, chips, quarry dust and quarry waste — mined at our own quarry in Jaribuni, Kilifi County, and delivered to site by the tipper load.",
    breakdown: [
      "Ballast — graded aggregate for concrete works",
      "Chips — graded stone chippings for concrete, drainage and road works",
      "Quarry dust — fine aggregate, bagged or bulk, for blockwork and paving beds",
      "Quarry waste — hardcore for filling, levelling and access roads",
      "Same-day dispatch from Jaribuni for coastal deliveries; 1–3 days countrywide",
    ],
    faqs: [
      {
        question: "Where does the material come from?",
        answer:
          "Everything is mined and graded at our own quarry in Jaribuni, Kilifi County, so you're buying direct from source.",
      },
      {
        question: "Is there a minimum order?",
        answer:
          "Minimums depend on the material — for example quarry dust has a 7-tonne minimum for tipper delivery, while quarry waste is supplied in bulk loads. Full detail is on the Marketplace listing for each product.",
      },
      {
        question: "Do you deliver countrywide or only around the coast?",
        answer:
          "Coastal deliveries typically go out same-day. Countrywide delivery is available on request with a 1–3 day lead time.",
      },
    ],
  },
  {
    slug: "vehicle-tracking",
    title: "Vehicle Tracking",
    tagline: "Your fleet, visible in real time",
    icon: "map-pinned",
    image: {
      src: "https://images.pexels.com/photos/15828799/pexels-photo-15828799.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Car dashboard showing a GPS navigation screen",
      local: false,
    },
    summary:
      "GPS tracking for single vehicles or an entire fleet, so you know where every asset is, how it's being driven, and when it needs attention.",
    breakdown: [
      "Real-time GPS location for every tracked vehicle",
      "Geo-fencing and route alerts",
      "Driver behaviour and trip reporting",
      "Fleet dashboards for managers and account owners",
      "Installation and ongoing device support",
    ],
    faqs: [
      {
        question: "Is this for single vehicles or whole fleets?",
        answer:
          "Both — from one car to a full fleet under one enterprise subscription. See Corporate solutions for fleet-wide plans.",
      },
      {
        question: "What hardware is involved?",
        answer:
          "A GPS tracking unit is installed in each vehicle. Our team handles installation and will talk you through device requirements when you request a quote.",
      },
      {
        question: "Can I get reports on driver behaviour, not just location?",
        answer:
          "Yes — trip history, speed and route reporting are available alongside live location tracking.",
      },
    ],
  },
  {
    slug: "general-supplies",
    title: "General Supplies",
    tagline: "Everything your office or site runs on",
    icon: "package",
    image: {
      src: "https://images.pexels.com/photos/5156696/pexels-photo-5156696.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Boxes stacked on shelves inside a warehouse",
      local: false,
    },
    summary:
      "Office supplies, site consumables and general procurement — one supplier for the everyday items that keep your business running.",
    breakdown: [
      "Office stationery and consumables",
      "Site and construction consumables",
      "Cleaning and janitorial supplies",
      "Bulk procurement for recurring orders",
      "Delivery scheduled around your business hours",
    ],
    faqs: [
      {
        question: "Can you handle a recurring supply order?",
        answer:
          "Yes — recurring orders can be set up on a schedule and invoiced monthly. This is also available as a corporate retainer.",
      },
      {
        question: "Is there a minimum order size?",
        answer:
          "Send us your list and quantities and we'll confirm what's practical to fulfil and the best pricing for the order size.",
      },
      {
        question: "Do you supply construction sites as well as offices?",
        answer:
          "Yes, general supplies covers both office needs and day-to-day site consumables.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
