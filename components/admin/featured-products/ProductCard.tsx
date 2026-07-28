"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Switch from "@/components/admin/ui/Switch";

import { updateFeaturedProduct } from "@/lib/admin/featured-products";

const supabase = createClient();

interface Product {
  id: number;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  imagePath: string;
  imageUrl: string;
  href: string;
  displayOrder: number;
  isActive: boolean;
}

interface Props {
  product: Product;
  onChange: (product: Product) => void;
  onDelete: () => void;
}

export default function ProductCard({
  product,
  onChange,
  onDelete,
}: Props) {
  const [form, setForm] = useState(product);
  const [preview, setPreview] = useState(product.imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync state if props change externally
  useEffect(() => {
    setForm(product);
    if (!selectedFile) {
      setPreview(product.imageUrl);
    }
  }, [product, selectedFile]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clean up existing blob preview if selected multiple times
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const update = <K extends keyof Product>(
    key: K,
    value: Product[K]
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

      const newPath = await updateFeaturedProduct(
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
        imageUrl: imageUrl,
      };

      // Clean up local blob preview after successful upload
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      setForm(updated);
      setPreview(imageUrl);
      setSelectedFile(null);
      onChange(updated);

      alert("Saved successfully");
    } catch (error) {
      console.error(error);
      alert("Save failed");
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

          <div className="relative w-48 h-48 rounded-lg overflow-hidden border">
            {preview ? (
              <Image
                src={preview}
                alt={form.titleEn || "Product Preview"}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-gray-400">
                No image
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
            label="Title EN"
            value={form.titleEn}
            onChange={(e) => update("titleEn", e.target.value)}
          />

          <Input
            label="Title AR"
            value={form.titleAr}
            onChange={(e) => update("titleAr", e.target.value)}
          />

          <Input
            label="Category EN"
            value={form.categoryEn}
            onChange={(e) => update("categoryEn", e.target.value)}
          />

          <Input
            label="Category AR"
            value={form.categoryAr}
            onChange={(e) => update("categoryAr", e.target.value)}
          />

          <Input
            label="Href"
            value={form.href}
            onChange={(e) => update("href", e.target.value)}
          />

          <Input
            label="Display Order"
            type="number"
            value={form.displayOrder}
            onChange={(e) =>
              update("displayOrder", Number(e.target.value))
            }
          />

          <Switch
            label="Active"
            checked={form.isActive}
            onChange={(value) => update("isActive", value)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this product?\n\nThis action cannot be undone."
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