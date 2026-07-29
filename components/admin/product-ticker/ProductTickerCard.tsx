"use client";

import { useState } from "react";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Switch from "@/components/admin/ui/Switch";

import { updateProductTicker } from "@/lib/admin/product-ticker";

interface TickerItem {
  id: number;
  textEn: string;
  textAr: string;
  displayOrder: number;
  isActive: boolean;
}

interface Props {
  item: TickerItem;
  onChange: (item: TickerItem) => void;
  onDelete: () => void;
}

export default function ProductTickerCard({
  item,
  onChange,
  onDelete,
}: Props) {
  const [form, setForm] = useState(item);
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof TickerItem>(
    key: K,
    value: TickerItem[K]
  ) => {
    const updated = {
      ...form,
      [key]: value,
    };

    setForm(updated);
    onChange(updated);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateProductTicker(form);

      onChange(form);

      alert("Saved successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="space-y-5">
        <Input
          label="Text EN"
          value={form.textEn}
          onChange={(e) =>
            update("textEn", e.target.value)
          }
        />

        <Input
          label="Text AR"
          value={form.textAr}
          onChange={(e) =>
            update("textAr", e.target.value)
          }
        />

        <Input
          label="Display Order"
          type="number"
          value={form.displayOrder}
          onChange={(e) =>
            update(
              "displayOrder",
              Number(e.target.value)
            )
          }
        />

        <Switch
          label="Active"
          checked={form.isActive}
          onChange={(value) =>
            update("isActive", value)
          }
        />
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this ticker item?\n\nThis action cannot be undone."
            );

            if (confirmed) {
              onDelete();
            }
          }}
        >
          Delete
        </Button>

        <Button
          type="button"
          disabled={loading}
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}