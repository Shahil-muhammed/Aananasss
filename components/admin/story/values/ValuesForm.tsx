"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import Textarea from "@/components/admin/ui/Textarea";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  updateStoryValues,
  updateStoryValueItem,
  createStoryValueItem,
  deleteStoryValueItem,
} from "@/lib/admin/story";

interface ValueItem {
  id: number;
  number: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  displayOrder: number;
}

interface ValuesData {
  id: number;
  sectionLabelEn: string;
  sectionLabelAr: string;
  headingEn: string;
  headingAr: string;
  quoteEn: string;
  quoteAr: string;
  quoteSignatureEn: string;
  quoteSignatureAr: string;
  items: ValueItem[];
}

interface ValuesFormProps {
  initialValues: ValuesData;
}

export default function ValuesForm({ initialValues }: ValuesFormProps) {
  const router = useRouter();

  const [values, setValues] = useState(initialValues);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function updateValue<K extends keyof ValuesData>(
    key: K,
    value: ValuesData[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateItem<K extends keyof ValueItem>(
    id: number,
    key: K,
    value: ValueItem[K]
  ) {
    setValues((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  }

  async function handleSaveValues() {
    startTransition(async () => {
      try {
        await updateStoryValues({
          id: values.id,
          sectionLabelEn: values.sectionLabelEn,
          sectionLabelAr: values.sectionLabelAr,
          headingEn: values.headingEn,
          headingAr: values.headingAr,
          quoteEn: values.quoteEn,
          quoteAr: values.quoteAr,
          quoteSignatureEn: values.quoteSignatureEn,
          quoteSignatureAr: values.quoteSignatureAr,
        });

        router.refresh();
        alert("Story values section saved successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to update story values section.");
      }
    });
  }

  async function handleSaveItem(item: ValueItem) {
    startTransition(async () => {
      try {
        await updateStoryValueItem(item);

        router.refresh();
        alert("Value item saved successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to update value item.");
      }
    });
  }

  async function handleAddItem() {
    startTransition(async () => {
      try {
        await createStoryValueItem();

        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to create value item.");
      }
    });
  }

  async function handleDeleteItem(id: number) {
    if (values.items.length === 1) {
      alert("At least one value item is required.");
      return;
    }

    if (!confirm("Delete this value item?")) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteStoryValueItem(id);

        setValues((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.id !== id),
        }));

        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to delete value item.");
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Story Values Section */}
      <SectionTitle title="Story Values" />

      <Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Section Label (EN)"
            value={values.sectionLabelEn}
            onChange={(e) => updateValue("sectionLabelEn", e.target.value)}
          />

          <Input
            label="Section Label (AR)"
            value={values.sectionLabelAr}
            onChange={(e) => updateValue("sectionLabelAr", e.target.value)}
          />

          <Input
            label="Heading (EN)"
            value={values.headingEn}
            onChange={(e) => updateValue("headingEn", e.target.value)}
          />

          <Input
            label="Heading (AR)"
            value={values.headingAr}
            onChange={(e) => updateValue("headingAr", e.target.value)}
          />

          <div className="md:col-span-2">
            <Textarea
              rows={4}
              label="Quote (EN)"
              value={values.quoteEn}
              onChange={(e) => updateValue("quoteEn", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              rows={4}
              label="Quote (AR)"
              value={values.quoteAr}
              onChange={(e) => updateValue("quoteAr", e.target.value)}
            />
          </div>

          <Input
            label="Signature (EN)"
            value={values.quoteSignatureEn}
            onChange={(e) => updateValue("quoteSignatureEn", e.target.value)}
          />

          <Input
            label="Signature (AR)"
            value={values.quoteSignatureAr}
            onChange={(e) => updateValue("quoteSignatureAr", e.target.value)}
          />

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="button"
              onClick={handleSaveValues}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Section"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Value Items Header & Top Add Button */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Value Items" />
        <Button type="button" onClick={handleAddItem} disabled={isPending}>
          Add Item
        </Button>
      </div>

      {/* Value Items List */}
      {values.items.map((item) => (
        <Card key={item.id}>
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Number"
              value={item.number}
              onChange={(e) => updateItem(item.id, "number", e.target.value)}
            />

            <Input
              type="number"
              label="Display Order"
              value={item.displayOrder}
              onChange={(e) =>
                updateItem(item.id, "displayOrder", Number(e.target.value))
              }
            />

            <Input
              label="Title (EN)"
              value={item.titleEn}
              onChange={(e) => updateItem(item.id, "titleEn", e.target.value)}
            />

            <Input
              label="Title (AR)"
              value={item.titleAr}
              onChange={(e) => updateItem(item.id, "titleAr", e.target.value)}
            />

            <div className="md:col-span-2">
              <Textarea
                rows={4}
                label="Description (EN)"
                value={item.descriptionEn}
                onChange={(e) =>
                  updateItem(item.id, "descriptionEn", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                rows={4}
                label="Description (AR)"
                value={item.descriptionAr}
                onChange={(e) =>
                  updateItem(item.id, "descriptionAr", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2 flex justify-between">
              <Button
                type="button"
                disabled={values.items.length === 1 || isPending}
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete Item
              </Button>

              <Button
                type="button"
                onClick={() => handleSaveItem(item)}
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Item"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}