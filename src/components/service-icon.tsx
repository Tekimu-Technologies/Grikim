import { Truck, Calculator, FileStack, Mountain, MapPinned, Package, type LucideIcon } from "lucide-react";
import type { Service } from "@/lib/services-data";

const ICONS: Record<Service["icon"], LucideIcon> = {
  truck: Truck,
  calculator: Calculator,
  "file-stack": FileStack,
  mountain: Mountain,
  "map-pinned": MapPinned,
  package: Package,
};

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}
