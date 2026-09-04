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

const NEEDS = [
  "Scheduled quarry supply",
  "Freight brokerage retainer",
  "Fleet vehicle tracking",
  "Tender documentation",
  "Multiple / other",
];

export function CorporateForm() {
  const [need, setNeed] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      company: String(formData.get("company") || ""),
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      need,
      details: String(formData.get("details") || ""),
    };

    if (!payload.name || !payload.phone || !payload.email || !payload.need) {
      toast.error("Please fill in your name, phone, work email and what you need.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/corporate", {
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
      setNeed("");
      toast.success("Enquiry sent — we'll come back with pricing within one working day.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="text-lg font-semibold">Enquiry sent.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks — your account manager will follow up with pricing within one working day.
        </p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setDone(false)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="company">Company / organisation</Label>
          <Input id="company" name="company" placeholder="Your company name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-name">Your name</Label>
          <Input id="c-name" name="name" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" name="phone" type="tel" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="c-email">Work email</Label>
          <Input id="c-email" name="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="need">What do you need?</Label>
          <Select value={need} onValueChange={(value) => setNeed(value ?? "")} name="need">
            <SelectTrigger id="need" className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {NEEDS.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-details">Contract or tender details</Label>
        <Textarea
          id="c-details"
          name="details"
          rows={5}
          placeholder="Tell us about the tender, sites involved, fleet size, or contract term."
        />
      </div>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Request corporate proposal
      </Button>
    </form>
  );
}
