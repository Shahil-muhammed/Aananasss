"use client";

import { useState } from "react";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Textarea from "@/components/admin/ui/Textarea";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import { updateQuoteSection } from "@/lib/admin/quote";

interface Quote {
  id: number;

  labelEn: string;
  labelAr: string;

  dateEn: string;
  dateAr: string;

  quoteEn: string;
  quoteAr: string;

  footerEn: string;
  footerAr: string;
}

interface Props {
  quote: Quote;
}

export default function QuoteForm({
  quote,
}: Props) {
  const [form, setForm] = useState<Quote>(quote);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateQuoteSection(form);

      alert("Quote section updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update quote section.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle title="Quote Section" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Label EN"
          value={form.labelEn}
          onChange={(e) =>
            setForm({
              ...form,
              labelEn: e.target.value,
            })
          }
        />

        <Input
          label="Label AR"
          value={form.labelAr}
          onChange={(e) =>
            setForm({
              ...form,
              labelAr: e.target.value,
            })
          }
        />

        <Input
          label="Date EN"
          value={form.dateEn}
          onChange={(e) =>
            setForm({
              ...form,
              dateEn: e.target.value,
            })
          }
        />

        <Input
          label="Date AR"
          value={form.dateAr}
          onChange={(e) =>
            setForm({
              ...form,
              dateAr: e.target.value,
            })
          }
        />
      </div>

      <div className="mt-6 space-y-6">
        <Textarea
          label="Quote EN"
          rows={5}
          value={form.quoteEn}
          onChange={(e) =>
            setForm({
              ...form,
              quoteEn: e.target.value,
            })
          }
        />

        <Textarea
          label="Quote AR"
          rows={5}
          value={form.quoteAr}
          onChange={(e) =>
            setForm({
              ...form,
              quoteAr: e.target.value,
            })
          }
        />

        <Input
          label="Footer EN"
          value={form.footerEn}
          onChange={(e) =>
            setForm({
              ...form,
              footerEn: e.target.value,
            })
          }
        />

        <Input
          label="Footer AR"
          value={form.footerAr}
          onChange={(e) =>
            setForm({
              ...form,
              footerAr: e.target.value,
            })
          }
        />
      </div>

      <div className="mt-8">
        <Button
          onClick={handleSave}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}