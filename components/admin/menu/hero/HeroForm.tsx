"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  MenuHeroFormData,
  updateMenuHero,
} from "@/lib/admin/menu";

const supabase = createClient();

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface Props {
  hero: MenuHeroFormData;
}

export default function HeroForm({ hero }: Props) {
  const [form, setForm] = useState(hero);

  const [preview, setPreview] = useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(hero);

    if (!selectedFile && hero.mediaPath) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(hero.mediaPath);

      setPreview(`${publicUrl}?v=${Date.now()}`);
    }
  }, [hero, selectedFile]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const update = <K extends keyof MenuHeroFormData>(
    key: K,
    value: MenuHeroFormData[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check if file size exceeds 1 MB limit
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      alert(
        `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit. Selected file is ${fileSizeInMB} MB. Please select a smaller file.`
      );
      e.target.value = ""; // Clear file selection
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

      const newPath = await updateMenuHero(
        form,
        selectedFile
      );

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(newPath);

      setPreview(`${publicUrl}?v=${Date.now()}`);

      setForm((prev) => ({
        ...prev,
        mediaPath: newPath,
      }));

      setSelectedFile(null);

      alert("Saved successfully.");
    } catch (error: any) {
      console.error(error);

      const errorMessage =
        error?.message ||
        error?.error_description ||
        (typeof error === "string" ? error : JSON.stringify(error));

      if (
        errorMessage?.includes("Body exceeded 1 MB limit") ||
        errorMessage?.includes("body size limit")
      ) {
        alert("Failed to save: Payload size exceeds the 1 MB size limit. Please upload a smaller image or video.");
      } else {
        alert("Failed to save: " + errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <SectionTitle title="Menu Hero" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>

          <label className="block text-sm font-medium mb-2">
            Hero Preview
          </label>

          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg border">

            {preview ? (
              <Image
                src={preview}
                alt="Hero"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}

          </div>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFile}
            className="mt-4 block w-full text-sm"
          />

        </div>

        <div className="space-y-5">

          <Input
            label="Label EN"
            value={form.labelEn}
            onChange={(e) =>
              update("labelEn", e.target.value)
            }
          />

          <Input
            label="Label AR"
            value={form.labelAr}
            onChange={(e) =>
              update("labelAr", e.target.value)
            }
          />

          <Input
            label="Title Line 1 EN"
            value={form.titleLine1En}
            onChange={(e) =>
              update("titleLine1En", e.target.value)
            }
          />

          <Input
            label="Title Line 2 EN"
            value={form.titleLine2En}
            onChange={(e) =>
              update("titleLine2En", e.target.value)
            }
          />

          <Input
            label="Title Line 1 AR"
            value={form.titleLine1Ar}
            onChange={(e) =>
              update("titleLine1Ar", e.target.value)
            }
          />

          <Input
            label="Title Line 2 AR"
            value={form.titleLine2Ar}
            onChange={(e) =>
              update("titleLine2Ar", e.target.value)
            }
          />

          <Input
            label="Media Alt"
            value={form.mediaAlt}
            onChange={(e) =>
              update("mediaAlt", e.target.value)
            }
          />

          <div className="space-y-2">

            <label className="block text-sm font-medium">
              Display
            </label>

            <select
              value={form.display}
              onChange={(e) =>
                update(
                  "display",
                  e.target.value as
                    | "background"
                    | "inline"
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="background">
                Background
              </option>

              <option value="inline">
                Inline
              </option>

            </select>

          </div>

          <div className="space-y-2">

            <label className="block text-sm font-medium">
              Media Type
            </label>

            <select
              value={form.mediaType}
              onChange={(e) =>
                update(
                  "mediaType",
                  e.target.value as
                    | "image"
                    | "video"
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="image">
                Image
              </option>

              <option value="video">
                Video
              </option>

            </select>

          </div>

        </div>

      </div>

      <div className="flex justify-end mt-8">

        <Button
          type="button"
          disabled={loading}
          onClick={handleSave}
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

    </Card>
  );
}