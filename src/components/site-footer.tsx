import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site-config";
import { InstagramGlyph, FacebookGlyph, XGlyph } from "@/components/social-icons";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold tracking-tight">GRIKIM</p>
            <p className="text-sm text-muted-foreground">Enterprise Ltd</p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {siteConfig.tagline} A proudly Kenyan enterprise.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Navigate</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Get in touch</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={siteConfig.emailHref} className="flex items-center gap-2 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-2 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Follow us</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <InstagramGlyph className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <XGlyph className="h-4 w-4" /> X
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                  <FacebookGlyph className="h-4 w-4" /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Grikim Enterprise Ltd. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://tekimu.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-primary"
            >
              Tekimu Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
