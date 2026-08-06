"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import FileUpload from "@/components/admin/ui/FileUpload";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  LocationsHeroFormData,
  updateLocationsHero,
} from "@/lib/admin/locations";

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

interface Props {
  initialHero: LocationsHeroFormData;
}

export default function HeroForm({ initialHero }: Props) {
  const [hero, setHero] = useState<LocationsHeroFormData>(initialHero);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Safely manage object URLs to prevent memory leaks
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const updateField = <K extends keyof LocationsHeroFormData>(
    field: K,
    value: LocationsHeroFormData[K]
  ) => {
    setHero((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file size limit (1 MB)
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      alert(
        `File size exceeds the ${MAX_FILE_SIZE_MB} MB limit. Selected file is ${fileSizeInMB} MB. Please select a smaller file.`
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Preserve existing backgroundImage if no new file is uploaded
      const payload: LocationsHeroFormData = {
        ...hero,
        backgroundImage: hero.backgroundImage ?? "",
      };

      await updateLocationsHero(payload, file);
      setFile(null);
      alert("Locations hero updated successfully.");
      window.location.reload();
    } catch (error: unknown) {
      console.error(error);

      let message = "Failed to update hero.";

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
        alert(`Failed to update hero: ${message}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const imageSrc = previewUrl || hero.backgroundImageUrl;

  return (
    <div className="space-y-8">
      <SectionTitle title="Locations Hero" />

      <Card>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Text Fields */}
          <div className="space-y-6">
            <Input
              label="Section Label (English)"
              value={hero.sectionLabelEn ?? ""}
              onChange={(e) =>
                updateField("sectionLabelEn", e.target.value)
              }
            />

            <Input
              label="Section Label (Arabic)"
              value={hero.sectionLabelAr ?? ""}
              onChange={(e) =>
                updateField("sectionLabelAr", e.target.value)
              }
            />

            <Input
              label="Title (English)"
              value={hero.titleEn ?? ""}
              onChange={(e) => updateField("titleEn", e.target.value)}
            />

            <Input
              label="Title Highlight (English)"
              value={hero.titleHighlightEn ?? ""}
              onChange={(e) =>
                updateField("titleHighlightEn", e.target.value)
              }
            />

            <Input
              label="Title (Arabic)"
              value={hero.titleAr ?? ""}
              onChange={(e) => updateField("titleAr", e.target.value)}
            />

            <Input
              label="Title Highlight (Arabic)"
              value={hero.titleHighlightAr ?? ""}
              onChange={(e) =>
                updateField("titleHighlightAr", e.target.value)
              }
            />

            <Input
              label="Subtitle (English)"
              value={hero.subtitleEn ?? ""}
              onChange={(e) => updateField("subtitleEn", e.target.value)}
            />

            <Input
              label="Subtitle (Arabic)"
              value={hero.subtitleAr ?? ""}
              onChange={(e) => updateField("subtitleAr", e.target.value)}
            />
          </div>

          {/* Right Column: Overlay, Image Upload & Actions */}
          <div className="space-y-6">
            <Input
              label="Overlay Opacity"
              type="number"
              step="0.05"
              min="0"
              max="1"
              value={hero.overlayOpacity ?? 0}
              onChange={(e) =>
                updateField("overlayOpacity", Number(e.target.value))
              }
            />

            <FileUpload
              label="Background Image"
              accept="image/*"
              onChange={handleFileSelect}
            />

            {imageSrc && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Preview</p>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
                  <Image
                    src={imageSrc}
                    alt="Hero Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <Button
              type="button"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}