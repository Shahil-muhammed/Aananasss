"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  FeatureFormData,
  createFeature,
  updateFeature,
  deleteFeature,
} from "@/lib/admin/locations";

interface Props {
  initialFeatures: FeatureFormData[];
}

export default function FeatureForm({
  initialFeatures,
}: Props) {
  const router = useRouter();

  const [features, setFeatures] = useState(initialFeatures);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Sync state whenever server re-fetches updated data
  useEffect(() => {
    setFeatures(initialFeatures);
  }, [initialFeatures]);

  const updateField = <
    K extends keyof FeatureFormData
  >(
    id: number,
    field: K,
    value: FeatureFormData[K]
  ) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id
          ? {
              ...feature,
              [field]: value,
            }
          : feature
      )
    );
  };

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      await createFeature();
      // Use router.refresh() to update Server Component state seamlessly
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create feature.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSave = async (
    feature: FeatureFormData
  ) => {
    try {
      setLoadingId(feature.id);
      await updateFeature(feature);
      alert("Feature updated.");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update feature.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    if (!confirm("Delete this feature?")) {
      return;
    }

    try {
      setLoadingId(id);
      await deleteFeature(id);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete feature."
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <SectionTitle title="Location Features" />

      <Button
        type="button"
        disabled={isCreating}
        onClick={handleCreate}
      >
        {isCreating ? "Adding..." : "Add Feature"}
      </Button>

      <div className="space-y-6">
        {features.map((feature) => (
          <Card key={feature.id}>
            <div className="grid gap-6 lg:grid-cols-2">
              <Input
                label="Code"
                value={feature.code}
                onChange={(e) =>
                  updateField(
                    feature.id,
                    "code",
                    e.target.value
                  )
                }
              />

              <Input
                label="Icon"
                value={feature.icon}
                onChange={(e) =>
                  updateField(
                    feature.id,
                    "icon",
                    e.target.value
                  )
                }
              />

              <Input
                label="Name (English)"
                value={feature.nameEn}
                onChange={(e) =>
                  updateField(
                    feature.id,
                    "nameEn",
                    e.target.value
                  )
                }
              />

              <Input
                label="Name (Arabic)"
                value={feature.nameAr}
                onChange={(e) =>
                  updateField(
                    feature.id,
                    "nameAr",
                    e.target.value
                  )
                }
              />

              <div className="flex items-end justify-between lg:col-span-2">
                <Button
                  type="button"
                  disabled={loadingId === feature.id}
                  onClick={() =>
                    handleDelete(feature.id)
                  }
                >
                  Delete
                </Button>

                <Button
                  type="button"
                  disabled={loadingId === feature.id}
                  onClick={() =>
                    handleSave(feature)
                  }
                >
                  {loadingId === feature.id
                    ? "Saving..."
                    : "Save"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}