"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import FileUpload from "@/components/admin/ui/FileUpload";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";
import Textarea from "@/components/admin/ui/Textarea";

import HeroCard from "./HeroCard";

import {
  StoryHeroFormData,
  updateStoryHero,
} from "@/lib/admin/story";

interface HeroFormProps {
  initialHero: StoryHeroFormData;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB limit

export default function HeroForm({
  initialHero,
}: HeroFormProps) {
  const router = useRouter();

  const [hero, setHero] = useState<StoryHeroFormData>(initialHero);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  // Synchronize local state when server props revalidate via router.refresh()
  useEffect(() => {
    setHero(initialHero);
  }, [initialHero]);

  function updateField<K extends keyof StoryHeroFormData>(
    key: K,
    value: StoryHeroFormData[K]
  ) {
    setHero((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSave() {
    // Client-side 1 MB validation
    if (imageFile && imageFile.size > MAX_FILE_SIZE) {
      alert("Background image size exceeds the 1 MB limit.");
      return;
    }

    startTransition(async () => {
      try {
        await updateStoryHero(hero, imageFile);
        router.refresh();
        alert("Story Hero updated successfully.");
      } catch (error: any) {
        console.error(error);
        alert(error?.message || "Failed to update Story Hero.");
      }
    });
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <SectionTitle title="Story Hero" />

      <HeroCard image={hero.backgroundImage} />

      <Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Section Label (EN)"
            value={hero.sectionLabelEn}
            onChange={(e) =>
              updateField("sectionLabelEn", e.target.value)
            }
          />

          <Input
            label="Section Label (AR)"
            value={hero.sectionLabelAr}
            onChange={(e) =>
              updateField("sectionLabelAr", e.target.value)
            }
          />

          <Input
            label="Title (EN)"
            value={hero.titleEn}
            onChange={(e) =>
              updateField("titleEn", e.target.value)
            }
          />

          <Input
            label="Title Highlight (EN)"
            value={hero.titleHighlightEn}
            onChange={(e) =>
              updateField("titleHighlightEn", e.target.value)
            }
          />

          <Input
            label="Title (AR)"
            value={hero.titleAr}
            onChange={(e) =>
              updateField("titleAr", e.target.value)
            }
          />

          <Input
            label="Title Highlight (AR)"
            value={hero.titleHighlightAr}
            onChange={(e) =>
              updateField("titleHighlightAr", e.target.value)
            }
          />

          <div className="md:col-span-2">
            <Textarea
              label="Subtitle (EN)"
              rows={4}
              value={hero.subtitleEn}
              onChange={(e) =>
                updateField("subtitleEn", e.target.value)
              }
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label="Subtitle (AR)"
              rows={4}
              value={hero.subtitleAr}
              onChange={(e) =>
                updateField("subtitleAr", e.target.value)
              }
            />
          </div>

          <Input
            type="number"
            label="Overlay Opacity"
            min={0}
            max={1}
            step={0.05}
            value={hero.overlayOpacity}
            onChange={(e) =>
              updateField("overlayOpacity", Number(e.target.value))
            }
          />

          <div className="md:col-span-2">
            <FileUpload
              label="Background Image (Max 1 MB)"
              accept="image/*"
              onChange={(file) => {
                if (!file) {
                  setImageFile(null);
                  return;
                }

                if (file.size > MAX_FILE_SIZE) {
                  alert("Selected background image exceeds the 1 MB limit.");
                  return;
                }

                setImageFile(file);

                setHero((prev) => ({
                  ...prev,
                  backgroundImage: URL.createObjectURL(file),
                }));
              }}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}