"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Switch from "@/components/admin/ui/Switch";

import {
  MenuCategoryFormData,
  updateCategory,
  deleteCategory,
} from "@/lib/admin/menu";

const supabase = createClient();

interface Category extends MenuCategoryFormData {
  imageUrl: string;
}

interface Props {
  category: Category;
  onChange: (category: Category) => void;
  onDelete: () => void;
}

export default function CategoryCard({
  category,
  onChange,
  onDelete,
}: Props) {
  const [form, setForm] = useState(category);

  const [preview, setPreview] = useState(category.imageUrl);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(category);

    if (!selectedFile) {
      setPreview(category.imageUrl);
    }
  }, [category, selectedFile]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const update = <K extends keyof Category>(
    key: K,
    value: Category[K]
  ) => {
    const updated = {
      ...form,
      [key]: value,
    };

    setForm(updated);

    onChange(updated);
  };

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const newPath = await updateCategory(
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
        heroImage: newPath,
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
    }

    alert(message);
    }finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(form.id);

      onDelete();

      alert("Category deleted.");
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
            Category Hero Image
          </label>

          <div className="relative w-56 h-56 overflow-hidden rounded-lg border">

            {preview ? (
              <Image
                src={preview}
                alt={form.titleEn || "Category"}
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
              onChange={handleFile}
              className="block w-full text-sm"
            />

          </div>

        </div>

        <div className="space-y-5">

          <Input
            label="Slug"
            value={form.slug}
            onChange={(e) =>
              update("slug", e.target.value)
            }
          />

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
            label="Background Color"
            value={form.backgroundColor}
            onChange={(e) =>
              update("backgroundColor", e.target.value)
            }
          />

          <Input
            label="Accent Color"
            value={form.accentColor}
            onChange={(e) =>
              update("accentColor", e.target.value)
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
          onClick={handleDelete}
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