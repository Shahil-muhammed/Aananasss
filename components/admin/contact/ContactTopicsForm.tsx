"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";
import Switch from "@/components/admin/ui/Switch";

import {
  createContactTopic,
  updateContactTopic,
  deleteContactTopic,
} from "@/lib/admin/contact";

interface ContactTopic {
  id: number;
  slug: string;
  labelEn: string;
  labelAr: string;
  email: string;
  displayOrder: number;
  isActive: boolean;
}

interface ContactTopicsFormProps {
  initialTopics: ContactTopic[];
}

export default function ContactTopicsForm({
  initialTopics,
}: ContactTopicsFormProps) {
  const router = useRouter();

  const [topics, setTopics] = useState<ContactTopic[]>(initialTopics);
  const [savingIds, setSavingIds] = useState<Record<number, boolean>>({});
  const [isPending, startTransition] = useTransition();

  // Sync local state whenever server props update (e.g., after router.refresh())
  useEffect(() => {
    setTopics(initialTopics);
  }, [initialTopics]);

  function updateTopic<K extends keyof ContactTopic>(
    index: number,
    key: K,
    value: ContactTopic[K]
  ) {
    setTopics((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return updated;
    });
  }

  async function handleSaveSingle(topic: ContactTopic) {
    setSavingIds((prev) => ({ ...prev, [topic.id]: true }));

    try {
      await updateContactTopic(topic);
      startTransition(() => {
        router.refresh();
      });
      alert(`Topic "${topic.labelEn || topic.slug}" updated successfully.`);
    } catch (error) {
      console.error(error);
      alert("Failed to update topic.");
    } finally {
      setSavingIds((prev) => ({ ...prev, [topic.id]: false }));
    }
  }

  async function handleAdd() {
    startTransition(async () => {
      try {
        await createContactTopic();
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to create topic.");
      }
    });
  }

  async function handleDelete(id: number) {
    if (topics.length === 1) {
      alert("At least one topic is required.");
      return;
    }

    if (!confirm("Delete this topic?")) {
      return;
    }

    startTransition(async () => {
      try {
        // Optimistically remove from state for an instant UI update
        setTopics((prev) => prev.filter((topic) => topic.id !== id));

        await deleteContactTopic(id);
        router.refresh();
      } catch (error) {
        console.error(error);
        // Revert to initial topics if operation fails
        setTopics(initialTopics);
        alert("Failed to delete topic.");
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Contact Topics" />
        <Button type="button" disabled={isPending} onClick={handleAdd}>
          Add Topic
        </Button>
      </div>

      {/* Individual Topic Cards */}
      {topics.map((topic, index) => {
        const isItemSaving = savingIds[topic.id] || false;

        return (
          <Card key={topic.id}>
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Label (EN)"
                value={topic.labelEn}
                onChange={(e) =>
                  updateTopic(index, "labelEn", e.target.value)
                }
              />

              <Input
                label="Label (AR)"
                value={topic.labelAr}
                onChange={(e) =>
                  updateTopic(index, "labelAr", e.target.value)
                }
              />

              <Input
                label="Email"
                type="email"
                value={topic.email}
                onChange={(e) =>
                  updateTopic(index, "email", e.target.value)
                }
              />

              <Input
                label="Display Order"
                type="number"
                value={topic.displayOrder}
                onChange={(e) =>
                  updateTopic(
                    index,
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
              />

              <div className="md:col-span-2">
                <Switch
                  label="Active"
                  checked={topic.isActive}
                  onChange={(checked) =>
                    updateTopic(index, "isActive", checked)
                  }
                />
              </div>

              {/* Individual Card Controls */}
              <div className="md:col-span-2 flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                <Button
                  type="button"
                  disabled={topics.length === 1 || isPending || isItemSaving}
                  onClick={() => handleDelete(topic.id)}
                >
                  Delete Topic
                </Button>

                <Button
                  type="button"
                  disabled={isPending || isItemSaving}
                  onClick={() => handleSaveSingle(topic)}
                >
                  {isItemSaving ? "Saving..." : "Save Topic"}
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}