"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Textarea from "@/components/admin/ui/Textarea";
import Switch from "@/components/admin/ui/Switch";

import { updateMenuItem } from "@/lib/admin/menu-intro";

const supabase = createClient();

interface MenuItem {
  id: number;

  number: string;

  titleEn: string;
  titleAr: string;

  imagePath: string;
  imageUrl: string;

  dotColor: string;

  descriptionEn: string;
  descriptionAr: string;

  captionEn: string;
  captionAr: string;

  displayOrder: number;

  isActive: boolean;
}

interface Props {
  item: MenuItem;
  onChange: (item: MenuItem) => void;
  onDelete: () => void;
}

export default function MenuIntroItemCard({
  item,
  onChange,
  onDelete,
}: Props) {
  const [form, setForm] = useState(item);

  const [preview, setPreview] = useState(item.imageUrl);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(item);

    if (!selectedFile) {
      setPreview(item.imageUrl);
    }
  }, [item, selectedFile]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);

    const url = URL.createObjectURL(file);

    setPreview(url);
  };

  const update = <K extends keyof MenuItem>(
    key: K,
    value: MenuItem[K]
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

      const newPath = await updateMenuItem(
        form,
        selectedFile
      );

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(newPath);

      const imageUrl = `${publicUrl}?v=${Date.now()}`;

      const updated = {
        ...form,
        imagePath: newPath,
        imageUrl,
      };

      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      setForm(updated);
      setPreview(imageUrl);
      setSelectedFile(null);

      onChange(updated);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>

          <label className="block text-sm font-medium mb-2">
            Image Preview
          </label>

          <div className="relative w-48 h-48 overflow-hidden rounded-lg border">

            {preview ? (
              <Image
                src={preview}
                alt={form.titleEn || "Menu Item"}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

          </div>

          <div className="mt-4">

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm"
            />

          </div>

        </div>

        <div className="space-y-5">

          <Input
            label="Number"
            value={form.number}
            onChange={(e) =>
              update("number", e.target.value)
            }
          />

          <Input
            label="Title EN"
            value={form.titleEn}
            onChange={(e) =>
              update("titleEn", e.target.value)
            }
          />

          <Input
            label="Title AR"
            value={form.titleAr}
            onChange={(e) =>
              update("titleAr", e.target.value)
            }
          />

          <Input
            label="Dot Color"
            value={form.dotColor}
            onChange={(e) =>
              update("dotColor", e.target.value)
            }
          />

          <Textarea
            label="Description EN"
            rows={3}
            value={form.descriptionEn}
            onChange={(e) =>
              update(
                "descriptionEn",
                e.target.value
              )
            }
          />

          <Textarea
            label="Description AR"
            rows={3}
            value={form.descriptionAr}
            onChange={(e) =>
              update(
                "descriptionAr",
                e.target.value
              )
            }
          />

          <Textarea
            label="Caption EN"
            rows={2}
            value={form.captionEn}
            onChange={(e) =>
              update(
                "captionEn",
                e.target.value
              )
            }
          />

          <Textarea
            label="Caption AR"
            rows={2}
            value={form.captionAr}
            onChange={(e) =>
              update(
                "captionAr",
                e.target.value
              )
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

      </div>

      <div className="flex justify-between mt-8">

        <Button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this menu item?\n\nThis action cannot be undone."
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