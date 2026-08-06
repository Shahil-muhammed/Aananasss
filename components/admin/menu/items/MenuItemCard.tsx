"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Textarea from "@/components/admin/ui/Textarea";
import Switch from "@/components/admin/ui/Switch";

import {
  MenuItemFormData,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/admin/menu";

const supabase = createClient();

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface Category {
  id: number;
  title_en: string;
  title_ar: string;
}

interface Allergen {
  id: number;
  code: string;
  name_en: string;
  name_ar: string;
}

interface MenuItem extends MenuItemFormData {
  imageUrl: string;
}

interface Props {
  item: MenuItem;

  categories: Category[];

  allergens: Allergen[];

  onChange: (item: MenuItem) => void;

  onDelete: () => void;
}

export default function MenuItemCard({
  item,
  categories,
  allergens,
  onChange,
  onDelete,
}: Props) {
  const [form, setForm] = useState(item);

  const [preview, setPreview] = useState(item.imageUrl);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file size limit (1 MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(
        `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit. Selected file is ${fileSizeInMB} MB. Please select a smaller file.`
      );
      e.target.value = ""; // Clear file input selection
      return;
    }

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const newPath = await updateMenuItem(form, selectedFile);

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(newPath);

      const imageUrl = `${publicUrl}?v=${Date.now()}`;

      const updated = {
        ...form,
        image: newPath,
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
    } catch (error: unknown) {
      console.error(error);

      let message = "Failed to save.";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else if (error && typeof error === "object") {
        message = JSON.stringify(error);
      }

      // Handle Next.js body payload size limit errors
      if (
        message.includes("Body exceeded 1 MB limit") ||
        message.includes("body size limit")
      ) {
        alert("Failed to save: Payload size exceeds the 1 MB limit. Please upload a smaller image.");
      } else {
        alert(`Failed to save: ${message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this menu item?");

    if (!confirmed) return;

    try {
      await deleteMenuItem(form.id);

      onDelete();

      alert("Menu item deleted.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete.");
    }
  };

  return (
    <Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            Item Image
          </label>

          <div className="relative w-56 h-56 overflow-hidden rounded-lg border">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium">Category</label>

            <select
              value={form.categoryId}
              onChange={(e) =>
                update("categoryId", Number(e.target.value))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title_en}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Number"
            value={form.number}
            onChange={(e) => update("number", e.target.value)}
          />

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

          <Textarea
            label="Description EN"
            rows={3}
            value={form.descriptionEn}
            onChange={(e) => update("descriptionEn", e.target.value)}
          />

          <Textarea
            label="Description AR"
            rows={3}
            value={form.descriptionAr}
            onChange={(e) => update("descriptionAr", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Protein"
              value={form.protein}
              onChange={(e) => update("protein", e.target.value)}
            />

            <Input
              label="Carbs"
              value={form.carbs}
              onChange={(e) => update("carbs", e.target.value)}
            />

            <Input
              label="Fat"
              value={form.fat}
              onChange={(e) => update("fat", e.target.value)}
            />

            <Input
              label="Calories"
              type="number"
              value={form.kcal}
              onChange={(e) => update("kcal", Number(e.target.value))}
            />

            <Input
              label="Price"
              type="number"
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />

            <Input
              label="Display Order"
              type="number"
              value={form.displayOrder}
              onChange={(e) =>
                update("displayOrder", Number(e.target.value))
              }
            />
          </div>

          <Textarea
            label="Caption EN"
            rows={2}
            value={form.captionEn}
            onChange={(e) => update("captionEn", e.target.value)}
          />

          <Textarea
            label="Caption AR"
            rows={2}
            value={form.captionAr}
            onChange={(e) => update("captionAr", e.target.value)}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Allergens</label>

            <div className="grid grid-cols-2 gap-2">
              {allergens.map((allergen) => (
                <label
                  key={allergen.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={form.allergens.includes(allergen.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        update("allergens", [
                          ...form.allergens,
                          allergen.id,
                        ]);
                      } else {
                        update(
                          "allergens",
                          form.allergens.filter(
                            (id) => id !== allergen.id
                          )
                        );
                      }
                    }}
                  />

                  <span>
                    {allergen.code} - {allergen.name_en}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Switch
            label="Available"
            checked={form.available}
            onChange={(value) => update("available", value)}
          />

          <Switch
            label="Active"
            checked={form.isActive}
            onChange={(value) => update("isActive", value)}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" onClick={handleDelete}>
          Delete
        </Button>

        <Button type="button" disabled={loading} onClick={handleSave}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}