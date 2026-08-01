"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  AllergenFormData,
  createAllergen,
  updateAllergen,
  deleteAllergen,
} from "@/lib/admin/menu";

interface Props {
  initialAllergens: AllergenFormData[];
}

export default function AllergenForm({
  initialAllergens,
}: Props) {
  const router = useRouter();

  const [allergens, setAllergens] =
    useState<AllergenFormData[]>(initialAllergens);

  const [loadingId, setLoadingId] =
    useState<number | null>(null);

  const [creating, setCreating] =
    useState(false);

  const updateState = (
    id: number,
    field: keyof AllergenFormData,
    value: string
  ) => {
    setAllergens((prev) =>
      prev.map((allergen) =>
        allergen.id === id
          ? {
              ...allergen,
              [field]: value,
            }
          : allergen
      )
    );
  };

  const handleCreate = async () => {
    try {
      setCreating(true);

      const newAllergen = await createAllergen();

      // Immediately append the new allergen to local state so it appears on screen
      setAllergens((prev) => [...prev, newAllergen]);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Failed to create allergen.");
    } finally {
      setCreating(false);
    }
  };

  const handleSave = async (
    allergen: AllergenFormData
  ) => {
    try {
      setLoadingId(allergen.id);

      await updateAllergen(allergen);

      router.refresh();

      alert("Saved successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to save.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Delete this allergen?"
    );

    if (!confirmed) return;

    try {
      setLoadingId(id);

      await deleteAllergen(id);

      setAllergens((prev) =>
        prev.filter(
          (allergen) =>
            allergen.id !== id
        )
      );

      router.refresh();

      alert("Deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <SectionTitle title="Allergens" />

        <Button
          type="button"
          disabled={creating}
          onClick={handleCreate}
        >
          {creating ? "Creating..." : "Add Allergen"}
        </Button>

      </div>

      <div className="space-y-6">

        {allergens.map((allergen) => (

          <Card key={allergen.id}>

            <div className="grid gap-6 md:grid-cols-3">

              <Input
                label="Code"
                value={allergen.code}
                onChange={(e) =>
                  updateState(
                    allergen.id,
                    "code",
                    e.target.value
                  )
                }
              />

              <Input
                label="English Name"
                value={allergen.nameEn}
                onChange={(e) =>
                  updateState(
                    allergen.id,
                    "nameEn",
                    e.target.value
                  )
                }
              />

              <Input
                label="Arabic Name"
                value={allergen.nameAr}
                onChange={(e) =>
                  updateState(
                    allergen.id,
                    "nameAr",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="mt-6 flex justify-between">

              <Button
                type="button"
                disabled={loadingId === allergen.id}
                onClick={() =>
                  handleDelete(allergen.id)
                }
              >
                Delete
              </Button>

              <Button
                type="button"
                disabled={loadingId === allergen.id}
                onClick={() =>
                  handleSave(allergen)
                }
              >
                {loadingId === allergen.id
                  ? "Saving..."
                  : "Save"}
              </Button>

            </div>

          </Card>

        ))}

      </div>

    </div>
  );
}