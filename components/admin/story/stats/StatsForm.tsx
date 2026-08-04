"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import {
  updateStoryStat,
  createStoryStat,
  deleteStoryStat,
} from "@/lib/admin/story";

interface StoryStat {
  id: number;

  labelEn: string;
  labelAr: string;

  valueEn: string;
  valueAr: string;

  displayOrder: number;
}

interface StatsFormProps {
  initialStats: StoryStat[];
}

export default function StatsForm({
  initialStats,
}: StatsFormProps) {
  const router = useRouter();

  const [stats, setStats] = useState(initialStats);

  const [isPending, startTransition] =
    useTransition();

  function updateStat<K extends keyof StoryStat>(
    index: number,
    key: K,
    value: StoryStat[K]
  ) {
    setStats((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [key]: value,
      };

      return updated;
    });
  }

  async function handleSave() {
    startTransition(async () => {
      try {
        for (const stat of stats) {
          await updateStoryStat(stat);
        }

        router.refresh();

        alert("Story stats updated successfully.");
      } catch (error) {
        console.error(error);

        alert("Failed to update story stats.");
      }
    });
  }

  async function handleAddStat() {
    startTransition(async () => {
      try {
        await createStoryStat();

        router.refresh();
      } catch (error) {
        console.error(error);

        alert("Failed to create stat.");
      }
    });
  }

  async function handleDelete(id: number) {
    if (stats.length === 1) {
      alert("At least one stat is required.");
      return;
    }

    if (!confirm("Delete this stat?")) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteStoryStat(id);

        router.refresh();
      } catch (error) {
        console.error(error);

        alert("Failed to delete stat.");
      }
    });
  }

  return (
    <div className="space-y-8">

      <SectionTitle title="Story Stats" />

      {stats.map((stat, index) => (
        <Card key={stat.id}>

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              label="Label (EN)"
              value={stat.labelEn}
              onChange={(e) =>
                updateStat(
                  index,
                  "labelEn",
                  e.target.value
                )
              }
            />

            <Input
              label="Label (AR)"
              value={stat.labelAr}
              onChange={(e) =>
                updateStat(
                  index,
                  "labelAr",
                  e.target.value
                )
              }
            />

            <Input
              label="Value (EN)"
              value={stat.valueEn}
              onChange={(e) =>
                updateStat(
                  index,
                  "valueEn",
                  e.target.value
                )
              }
            />

            <Input
              label="Value (AR)"
              value={stat.valueAr}
              onChange={(e) =>
                updateStat(
                  index,
                  "valueAr",
                  e.target.value
                )
              }
            />

            <Input
              type="number"
              label="Display Order"
              value={stat.displayOrder}
              onChange={(e) =>
                updateStat(
                  index,
                  "displayOrder",
                  Number(e.target.value)
                )
              }
            />

            <div className="flex items-end justify-end">
              <Button
                type="button"
                disabled={
                  stats.length === 1 || isPending
                }
                onClick={() =>
                  handleDelete(stat.id)
                }
              >
                Delete Stat
              </Button>
            </div>

          </div>

        </Card>
      ))}

      <div className="flex justify-between">

        <Button
          type="button"
          disabled={isPending}
          onClick={handleAddStat}
        >
          Add Stat
        </Button>

        <Button
          type="button"
          disabled={isPending}
          onClick={handleSave}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}