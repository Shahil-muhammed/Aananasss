"use client";

import { useState, useTransition, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import FileUpload from "@/components/admin/ui/FileUpload";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";
import Switch from "@/components/admin/ui/Switch";
import Textarea from "@/components/admin/ui/Textarea";

import {
  createStorySection,
  updateStorySection,
  deleteStorySection,
} from "@/lib/admin/story";

import SectionCard from "./SectionCard";

interface StorySection {
  id: number;
  slug: string;
  chapterEn: string;
  chapterAr: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  imagePath: string;
  imageFile?: File | null;
  backgroundColor: string;
  titleColor: string;
  reverse: boolean;
  displayOrder: number;
  isActive: boolean;
}

interface SectionFormProps {
  initialSections: StorySection[];
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB

export default function SectionForm({
  initialSections,
}: SectionFormProps) {
  const router = useRouter();

  const [sections, setSections] =
    useState<StorySection[]>(initialSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [savingSectionId, setSavingSectionId] = useState<number | null>(null);

  const [isPending, startTransition] = useTransition();

  // Synchronize state when server props update via router.refresh()
  useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const query = searchQuery.toLowerCase();
    return sections.filter(
      (section) =>
        section.titleEn.toLowerCase().includes(query) ||
        section.titleAr.toLowerCase().includes(query) ||
        section.chapterEn.toLowerCase().includes(query) ||
        section.chapterAr.toLowerCase().includes(query)
    );
  }, [sections, searchQuery]);

  function updateSection<K extends keyof StorySection>(
    index: number,
    key: K,
    value: StorySection[K]
  ) {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return updated;
    });
  }

  async function handleSaveSingle(section: StorySection) {
    if (section.imageFile && section.imageFile.size > MAX_FILE_SIZE) {
      alert("Image file size exceeds the 1 MB limit.");
      return;
    }

    setSavingSectionId(section.id);
    startTransition(async () => {
      try {
        await updateStorySection(section, section.imageFile);
        router.refresh();
        alert(`Section "${section.titleEn || section.id}" updated successfully.`);
      } catch (error: any) {
        console.error(error);
        alert(error?.message || "Failed to update section.");
      } finally {
        setSavingSectionId(null);
      }
    });
  }

  async function handleSaveAll() {
    // Validate file sizes prior to saving
    for (const section of sections) {
      if (section.imageFile && section.imageFile.size > MAX_FILE_SIZE) {
        alert(
          `Section "${section.titleEn || section.id}" image exceeds the 1 MB limit.`
        );
        return;
      }
    }

    startTransition(async () => {
      try {
        for (const section of sections) {
          await updateStorySection(section, section.imageFile);
        }
        router.refresh();
        alert("All story sections updated successfully.");
      } catch (error: any) {
        console.error(error);
        alert(error?.message || "Failed to update story sections.");
      }
    });
  }

  async function handleAddSection() {
    startTransition(async () => {
      try {
        await createStorySection();
        router.refresh();
      } catch (error: any) {
        console.error(error);
        alert(error?.message || "Failed to create section.");
      }
    });
  }

  async function handleDelete(id: number) {
    if (
      !confirm(
        "Are you sure you want to delete this section? This action cannot be undone."
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteStorySection(id);
        setSections((prev) => prev.filter((section) => section.id !== id));
        router.refresh();
      } catch (error: any) {
        console.error(error);
        alert(error?.message || "Failed to delete section.");
      }
    });
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Header & Search Bar */}
      <div className="space-y-4 pb-4 border-b">
        <div className="flex items-center justify-between gap-4">
          <SectionTitle title="Story Sections" />
          <Button
            type="button"
            onClick={handleAddSection}
            disabled={isPending}
          >
            Add Section
          </Button>
        </div>

        <div className="max-w-sm">
          <Input
            label="Search Sections"
            type="text"
            placeholder="Search by title or chapter (EN / AR)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Sections List */}
      {filteredSections.length === 0 ? (
        <Card>
          <div className="text-center py-10 text-gray-500">
            No story sections found matching "{searchQuery}".
          </div>
        </Card>
      ) : (
        filteredSections.map((section) => {
          const originalIndex = sections.findIndex((s) => s.id === section.id);
          const isSavingThis = savingSectionId === section.id;

          return (
            <Card key={section.id}>
              <div className="space-y-6">
                {/* Section Preview Header */}
                <SectionCard
                  image={section.image}
                  chapterEn={section.chapterEn}
                  titleEn={section.titleEn}
                  isActive={section.isActive}
                />

                {/* Form Controls Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Chapter (EN)"
                    value={section.chapterEn}
                    onChange={(e) =>
                      updateSection(originalIndex, "chapterEn", e.target.value)
                    }
                  />

                  <Input
                    label="Chapter (AR)"
                    value={section.chapterAr}
                    onChange={(e) =>
                      updateSection(originalIndex, "chapterAr", e.target.value)
                    }
                  />

                  <Input
                    label="Title (EN)"
                    value={section.titleEn}
                    onChange={(e) =>
                      updateSection(originalIndex, "titleEn", e.target.value)
                    }
                  />

                  <Input
                    label="Title (AR)"
                    value={section.titleAr}
                    onChange={(e) =>
                      updateSection(originalIndex, "titleAr", e.target.value)
                    }
                  />

                  <div className="md:col-span-2">
                    <Textarea
                      label="Description (EN)"
                      rows={4}
                      value={section.descriptionEn}
                      onChange={(e) =>
                        updateSection(originalIndex, "descriptionEn", e.target.value)
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Textarea
                      label="Description (AR)"
                      rows={4}
                      value={section.descriptionAr}
                      onChange={(e) =>
                        updateSection(originalIndex, "descriptionAr", e.target.value)
                      }
                    />
                  </div>

                  <Input
                    label="Background Color"
                    value={section.backgroundColor}
                    onChange={(e) =>
                      updateSection(originalIndex, "backgroundColor", e.target.value)
                    }
                  />

                  <Input
                    label="Title Color"
                    value={section.titleColor}
                    onChange={(e) =>
                      updateSection(originalIndex, "titleColor", e.target.value)
                    }
                  />

                  <Input
                    type="number"
                    label="Display Order"
                    value={section.displayOrder}
                    onChange={(e) =>
                      updateSection(
                        originalIndex,
                        "displayOrder",
                        Number(e.target.value)
                      )
                    }
                  />

                  <div className="space-y-4">
                    <Switch
                      label="Reverse Layout"
                      checked={section.reverse}
                      onChange={(checked) =>
                        updateSection(originalIndex, "reverse", checked)
                      }
                    />

                    <Switch
                      label="Active"
                      checked={section.isActive}
                      onChange={(checked) =>
                        updateSection(originalIndex, "isActive", checked)
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FileUpload
                      label="Section Image (Max 1 MB)"
                      accept="image/*"
                      onChange={(file) => {
                        if (!file) return;

                        if (file.size > MAX_FILE_SIZE) {
                          alert("Selected image exceeds the 1 MB limit.");
                          return;
                        }

                        updateSection(
                          originalIndex,
                          "image",
                          URL.createObjectURL(file)
                        );
                        updateSection(originalIndex, "imageFile", file);
                      }}
                    />
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    disabled={sections.length === 1 || isPending}
                    onClick={() => handleDelete(section.id)}
                  >
                    Delete Section
                  </Button>

                  <Button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleSaveSingle(section)}
                  >
                    {isSavingThis ? "Saving..." : "Save Section"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })
      )}

      {/* Global Actions Bar */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          type="button"
          onClick={handleSaveAll}
          disabled={isPending}
        >
          {isPending && !savingSectionId ? "Saving All..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}