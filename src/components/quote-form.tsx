"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const SERVICES = [
  "Logistics",
  "Tax Consultancy",
  "Business Registration",
  "Quarrying & Mining",
  "Vehicle Tracking",
  "General Supplies",
];

export function QuoteForm({
  defaultService,
  className,
}: {
  defaultService?: string;
  className?: string;
}) {
  const [service, setService] = useState(defaultService ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      service,
      details: String(formData.get("details") || ""),
    };

    if (!payload.name || !payload.phone || !payload.service) {
      toast.error("Please fill in your name, phone and select a service.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setDone(true);
      form.reset();
      setService(defaultService ?? "");
      toast.success("Request sent — we'll be in touch within one business day.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className={className}>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
          <p className="text-lg font-semibold">Request sent.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks — our team will get back to you with a tailored quote within one business day.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setDone(false)}>
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" placeholder="Jane Wanjiru" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+254 7XX XXX XXX" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="service">Service</Label>
          <Select value={service} onValueChange={(value) => setService(value ?? "")} name="service">
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <Label htmlFor="details">Details</Label>
        <Textarea
          id="details"
          name="details"
          placeholder="Tell us the tonnage, route, deadline or anything else that helps us quote accurately."
          rows={4}
        />
      </div>
      <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Send request
      </Button>
    </form>
  );
}
