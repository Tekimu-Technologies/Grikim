export const siteConfig = {
  name: "Grikim Enterprise Ltd",
  shortName: "Grikim",
  tagline: "One partner. Every job done properly.",
  description:
    "Grikim Enterprise Ltd is your single trusted source in Kenya for logistics, tax consultancy, business registration, quarry materials, vehicle tracking and general supplies.",
  phone: "+254 703 250213",
  phoneHref: "tel:+254703250213",
  email: "grikimenterpriseltd@gmail.com",
  emailHref: "mailto:grikimenterpriseltd@gmail.com",
  whatsappHref: "https://wa.me/254703250213",
  socials: {
    instagram: "https://instagram.com/grikimenterpriseltd",
    x: "https://x.com/grikimltd",
    facebook: "https://facebook.com/",
  },
  location: "Jaribuni, Kilifi County, Kenya",
} as const;

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Marketplace", href: "/marketplace" },
  { title: "Corporate", href: "/corporate" },
] as const;

export const trustPoints = [
  "Fast turnaround",
  "Compliant paperwork",
  "One account manager",
  "Predictable pricing",
] as const;
