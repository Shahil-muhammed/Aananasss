"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";
import Switch from "@/components/admin/ui/Switch";

import {
  createIngredientOrigin,
  updateIngredientOrigin,
  deleteIngredientOrigin,
} from "@/lib/admin/ingredientOrigins";

import { updateMenuSettings } from "@/lib/admin/menu";

interface IngredientOrigin {
  id: number;

  titleEn: string;
  titleAr: string;

  subtitleEn: string;
  subtitleAr: string;

  originEn: string;
  originAr: string;

  halalEn: string;
  halalAr: string;

  displayOrder: number;

  isActive: boolean;
}

interface IngredientOriginsFormProps {
  initialItems: IngredientOrigin[];
  initialDisclaimerEn?: string;
  initialDisclaimerAr?: string;
}

export default function IngredientOriginsForm({
  initialItems,
  initialDisclaimerEn = "ALLERGEN INFORMATION IS AVAILABLE ON EACH ITEM PAGE.",
  initialDisclaimerAr = "معلومات المسببات للحساسية متوفرة في صفحة كل عنصر.",
}: IngredientOriginsFormProps) {
  const router = useRouter();

  const [items, setItems] = useState<IngredientOrigin[]>(initialItems);
  const [disclaimerEn, setDisclaimerEn] = useState(initialDisclaimerEn);
  const [disclaimerAr, setDisclaimerAr] = useState(initialDisclaimerAr);

  const [isPending, startTransition] = useTransition();

  // Sync state whenever server revalidates initial props via router.refresh()
  useEffect(() => {
    setItems(initialItems);
    setDisclaimerEn(initialDisclaimerEn);
    setDisclaimerAr(initialDisclaimerAr);
  }, [initialItems, initialDisclaimerEn, initialDisclaimerAr]);

  function updateItem<K extends keyof IngredientOrigin>(
    index: number,
    key: K,
    value: IngredientOrigin[K]
  ) {
    setItems((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return updated;
    });
  }

  async function handleSaveDisclaimer() {
    startTransition(async () => {
      try {
        await updateMenuSettings({
          allergenDisclaimerEn: disclaimerEn,
          allergenDisclaimerAr: disclaimerAr,
        });

        router.refresh();

        alert("Allergen disclaimer updated successfully.");
      } catch (error) {
        console.error(error);

        alert("Failed to update allergen disclaimer.");
      }
    });
  }

  async function handleSave(item: IngredientOrigin) {
    startTransition(async () => {
      try {
        await updateIngredientOrigin(item);

        router.refresh();

        alert("Ingredient origin updated successfully.");
      } catch (error) {
        console.error(error);

        alert("Failed to update ingredient origin.");
      }
    });
  }

  async function handleAdd() {
    startTransition(async () => {
      try {
        await createIngredientOrigin();

        router.refresh();
      } catch (error) {
        console.error(error);

        alert("Failed to create ingredient.");
      }
    });
  }

  async function handleDelete(id: number) {
    if (items.length === 1) {
      alert("At least one ingredient is required.");

      return;
    }

    if (!confirm("Delete this ingredient?")) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteIngredientOrigin(id);

        router.refresh();
      } catch (error) {
        console.error(error);

        alert("Failed to delete ingredient.");
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* GLOBAL SETTINGS SECTION */}
      <div className="space-y-4">
        <SectionTitle title="Page Settings" />
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Allergen Disclaimer Footer (EN)"
              value={disclaimerEn}
              onChange={(e) => setDisclaimerEn(e.target.value)}
            />

            <Input
              label="Allergen Disclaimer Footer (AR)"
              value={disclaimerAr}
              onChange={(e) => setDisclaimerAr(e.target.value)}
            />

            <div className="md:col-span-2 flex justify-end">
              <Button
                type="button"
                disabled={isPending}
                onClick={handleSaveDisclaimer}
              >
                {isPending ? "Saving..." : "Save Disclaimer"}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* INGREDIENT ORIGINS SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <SectionTitle title="Ingredient Origins" />

          <Button
            type="button"
            onClick={handleAdd}
            disabled={isPending}
          >
            Add Ingredient
          </Button>
        </div>

        {items.map((item, index) => (
          <Card key={item.id}>
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Title (EN)"
                value={item.titleEn}
                onChange={(e) =>
                  updateItem(index, "titleEn", e.target.value)
                }
              />

              <Input
                label="Title (AR)"
                value={item.titleAr}
                onChange={(e) =>
                  updateItem(index, "titleAr", e.target.value)
                }
              />

              <Input
                label="Subtitle (EN)"
                value={item.subtitleEn}
                onChange={(e) =>
                  updateItem(index, "subtitleEn", e.target.value)
                }
              />

              <Input
                label="Subtitle (AR)"
                value={item.subtitleAr}
                onChange={(e) =>
                  updateItem(index, "subtitleAr", e.target.value)
                }
              />

              <Input
                label="Origin (EN)"
                value={item.originEn}
                onChange={(e) =>
                  updateItem(index, "originEn", e.target.value)
                }
              />

              <Input
                label="Origin (AR)"
                value={item.originAr}
                onChange={(e) =>
                  updateItem(index, "originAr", e.target.value)
                }
              />

              <Input
                label="Halal (EN)"
                value={item.halalEn}
                onChange={(e) =>
                  updateItem(index, "halalEn", e.target.value)
                }
              />

              <Input
                label="Halal (AR)"
                value={item.halalAr}
                onChange={(e) =>
                  updateItem(index, "halalAr", e.target.value)
                }
              />

              <Input
                type="number"
                label="Display Order"
                value={item.displayOrder}
                onChange={(e) =>
                  updateItem(
                    index,
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
              />

              <div className="flex items-center">
                <Switch
                  label="Active"
                  checked={item.isActive}
                  onChange={(checked) =>
                    updateItem(index, "isActive", checked)
                  }
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <Button
                  type="button"
                  disabled={items.length === 1 || isPending}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete Ingredient
                </Button>

                <Button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleSave(item)}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}