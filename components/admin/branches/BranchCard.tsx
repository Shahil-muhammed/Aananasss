"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Switch from "@/components/admin/ui/Switch";

import { updateBranch } from "@/lib/admin/branches";

const supabase = createClient();

interface Branch {
  id: number;

  titleEn: string;
  titleAr: string;

  locationEn: string;
  locationAr: string;

  badgeLabelEn: string;
  badgeLabelAr: string;

  imagePath: string;
  imageUrl: string;

  href: string;

  displayOrder: number;

  isActive: boolean;
}

interface Props {
  branch: Branch;
  onChange: (branch: Branch) => void;
  onDelete: () => void;
}

export default function BranchCard({
  branch,
  onChange,
  onDelete,
}: Props) {
  const [form, setForm] = useState(branch);
  const [preview, setPreview] = useState(branch.imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(branch);

    if (!selectedFile) {
      setPreview(branch.imageUrl);
    }
  }, [branch, selectedFile]);

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
    setPreview(URL.createObjectURL(file));
  };

  const update = <K extends keyof Branch>(
    key: K,
    value: Branch[K]
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

      const newPath = await updateBranch(
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
                alt={form.titleEn || "Branch Preview"}
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
            label="Location EN"
            value={form.locationEn}
            onChange={(e) =>
              update("locationEn", e.target.value)
            }
          />

          <Input
            label="Location AR"
            value={form.locationAr}
            onChange={(e) =>
              update("locationAr", e.target.value)
            }
          />

          <Input
            label="Badge Label EN"
            value={form.badgeLabelEn}
            onChange={(e) =>
              update("badgeLabelEn", e.target.value)
            }
          />

          <Input
            label="Badge Label AR"
            value={form.badgeLabelAr}
            onChange={(e) =>
              update("badgeLabelAr", e.target.value)
            }
          />

          <Input
            label="Href"
            value={form.href}
            onChange={(e) =>
              update("href", e.target.value)
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
              "Are you sure you want to delete this branch?\n\nThis action cannot be undone."
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