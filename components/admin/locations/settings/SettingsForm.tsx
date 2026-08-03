"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  DeliveryPlatformFormData,
  createDeliveryPlatform,
  updateDeliveryPlatform,
  deleteDeliveryPlatform,
} from "@/lib/admin/locations";

interface Props {
  initialPlatforms: DeliveryPlatformFormData[];
}

export default function SettingsForm({
  initialPlatforms,
}: Props) {
  const router = useRouter();

  const [platforms, setPlatforms] =
    useState(initialPlatforms);

  const [loadingId, setLoadingId] =
    useState<number | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  // Sync state and keep newly created items at the top (highest ID first)
  useEffect(() => {
    const sorted = [...initialPlatforms].sort((a, b) => b.id - a.id);
    setPlatforms(sorted);
  }, [initialPlatforms]);

  const updateField = <
    K extends keyof DeliveryPlatformFormData
  >(
    id: number,
    field: K,
    value: DeliveryPlatformFormData[K]
  ) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === id
          ? {
              ...platform,
              [field]: value,
            }
          : platform
      )
    );
  };

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      await createDeliveryPlatform();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create delivery platform.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSave = async (
    platform: DeliveryPlatformFormData
  ) => {
    try {
      setLoadingId(platform.id);

      await updateDeliveryPlatform(platform);

      alert("Delivery platform updated.");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update delivery platform.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    if (
      !confirm(
        "Delete this delivery platform?"
      )
    ) {
      return;
    }

    try {
      setLoadingId(id);

      await deleteDeliveryPlatform(id);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete delivery platform."
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <SectionTitle title="Delivery Platforms" />

      <Button
        type="button"
        disabled={isCreating}
        onClick={handleCreate}
      >
        {isCreating ? "Adding..." : "Add Delivery Platform"}
      </Button>

      <div className="space-y-6">
        {platforms.map((platform) => (
          <Card key={platform.id}>
            <div className="grid gap-6 lg:grid-cols-2">
              <Input
                label="Code"
                value={platform.code}
                onChange={(e) =>
                  updateField(
                    platform.id,
                    "code",
                    e.target.value
                  )
                }
              />

              <Input
                label="Icon"
                value={platform.icon}
                onChange={(e) =>
                  updateField(
                    platform.id,
                    "icon",
                    e.target.value
                  )
                }
              />

              <Input
                label="Name (English)"
                value={platform.nameEn}
                onChange={(e) =>
                  updateField(
                    platform.id,
                    "nameEn",
                    e.target.value
                  )
                }
              />

              <Input
                label="Name (Arabic)"
                value={platform.nameAr}
                onChange={(e) =>
                  updateField(
                    platform.id,
                    "nameAr",
                    e.target.value
                  )
                }
              />

              <div className="flex items-end justify-between lg:col-span-2">
                <Button
                  type="button"
                  disabled={loadingId === platform.id}
                  onClick={() =>
                    handleDelete(platform.id)
                  }
                >
                  Delete
                </Button>

                <Button
                  type="button"
                  disabled={loadingId === platform.id}
                  onClick={() =>
                    handleSave(platform)
                  }
                >
                  {loadingId === platform.id
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