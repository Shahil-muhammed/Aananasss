"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import Textarea from "@/components/admin/ui/Textarea";
import Switch from "@/components/admin/ui/Switch";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import { updateHero } from "@/lib/admin/hero";

interface HeroFormProps {
  data: any;
}

export default function HeroForm({ data }: HeroFormProps) {
  const [form, setForm] = useState(data);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(form.mediaUrl || "");
  const [loading, setLoading] = useState(false);

  // Clean up previous preview URL before creating a new blob
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(url);

      setForm({
        ...form,
        mediaAlt: file.name,
      });
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateHero(form, selectedFile);

      alert("Hero updated successfully!");

      setSelectedFile(null);
    } catch (error: any) {
    console.error("FULL ERROR:", error);

    alert(
      error?.message ||
      error?.error_description ||
      JSON.stringify(error)
    );
  }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Media */}
      <Card>
        <SectionTitle title="Media" />

        {/* Image Preview */}
        {preview && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Image Preview
            </label>
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={preview}
                alt={form.mediaAlt || "Hero media preview"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Media Type"
            value={form.mediaType}
            onChange={(e) =>
              setForm({ ...form, mediaType: e.target.value })
            }
          />

          {/* File Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Upload Media</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
            />
          </div>

          <Input
            label="Media Alt"
            value={form.mediaAlt}
            onChange={(e) =>
              setForm({ ...form, mediaAlt: e.target.value })
            }
          />

          <Input
            label="Overlay Opacity"
            type="number"
            step="0.01"
            value={form.overlayOpacity}
            onChange={(e) =>
              setForm({
                ...form,
                overlayOpacity: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="mt-6">
          <Switch
            label="Overlay Enabled"
            checked={form.overlay}
            onChange={(value) =>
              setForm({ ...form, overlay: value })
            }
          />
        </div>
      </Card>

      {/* Content */}
      <Card>
        <SectionTitle title="Content" />

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Title EN"
            value={form.titleEn}
            onChange={(e) =>
              setForm({ ...form, titleEn: e.target.value })
            }
          />

          <Input
            label="Title Highlight EN"
            value={form.titleHighlightEn}
            onChange={(e) =>
              setForm({
                ...form,
                titleHighlightEn: e.target.value,
              })
            }
          />

          <Input
            label="Title AR"
            value={form.titleAr}
            onChange={(e) =>
              setForm({ ...form, titleAr: e.target.value })
            }
          />

          <Input
            label="Title Highlight AR"
            value={form.titleHighlightAr}
            onChange={(e) =>
              setForm({
                ...form,
                titleHighlightAr: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-6 space-y-6">
          <Textarea
            label="Subtitle EN"
            rows={4}
            value={form.subtitleEn}
            onChange={(e) =>
              setForm({
                ...form,
                subtitleEn: e.target.value,
              })
            }
          />

          <Textarea
            label="Subtitle AR"
            rows={4}
            value={form.subtitleAr}
            onChange={(e) =>
              setForm({
                ...form,
                subtitleAr: e.target.value,
              })
            }
          />
        </div>
      </Card>

      {/* Primary Button */}
      <Card>
        <SectionTitle title="Primary Button" />

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Label EN"
            value={form.primaryButton.labelEn}
            onChange={(e) =>
              setForm({
                ...form,
                primaryButton: {
                  ...form.primaryButton,
                  labelEn: e.target.value,
                },
              })
            }
          />

          <Input
            label="Label AR"
            value={form.primaryButton.labelAr}
            onChange={(e) =>
              setForm({
                ...form,
                primaryButton: {
                  ...form.primaryButton,
                  labelAr: e.target.value,
                },
              })
            }
          />

          <Input
            label="Href"
            value={form.primaryButton.href}
            onChange={(e) =>
              setForm({
                ...form,
                primaryButton: {
                  ...form.primaryButton,
                  href: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="mt-6">
          <Switch
            label="Visible"
            checked={form.primaryButton.isVisible}
            onChange={(value) =>
              setForm({
                ...form,
                primaryButton: {
                  ...form.primaryButton,
                  isVisible: value,
                },
              })
            }
          />
        </div>
      </Card>

      {/* Secondary Button */}
      <Card>
        <SectionTitle title="Secondary Button" />

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Label EN"
            value={form.secondaryButton.labelEn}
            onChange={(e) =>
              setForm({
                ...form,
                secondaryButton: {
                  ...form.secondaryButton,
                  labelEn: e.target.value,
                },
              })
            }
          />

          <Input
            label="Label AR"
            value={form.secondaryButton.labelAr}
            onChange={(e) =>
              setForm({
                ...form,
                secondaryButton: {
                  ...form.secondaryButton,
                  labelAr: e.target.value,
                },
              })
            }
          />

          <Input
            label="Href"
            value={form.secondaryButton.href}
            onChange={(e) =>
              setForm({
                ...form,
                secondaryButton: {
                  ...form.secondaryButton,
                  href: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="mt-6">
          <Switch
            label="Visible"
            checked={form.secondaryButton.isVisible}
            onChange={(value) =>
              setForm({
                ...form,
                secondaryButton: {
                  ...form.secondaryButton,
                  isVisible: value,
                },
              })
            }
          />
        </div>
      </Card>

      {/* Save Button */}
      <Button disabled={loading} onClick={handleSave}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}