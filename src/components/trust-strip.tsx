import { CheckCircle2 } from "lucide-react";
import { trustPoints } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function TrustStrip({ className }: { className?: string }) {
  return (
    <div className={cn("border-y border-border/70 bg-secondary/30 py-4", className)}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">
        {trustPoints.map((point) => (
          <span key={point} className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
