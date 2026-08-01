"use client";

import { useMemo, useState } from "react";

import Button from "@/components/admin/ui/Button";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import MenuItemCard from "./MenuItemCard";

import {
  createMenuItem,
  MenuItemFormData,
} from "@/lib/admin/menu";

interface MenuItem extends MenuItemFormData {
  imageUrl: string;
}

interface Category {
  id: number;
  title_en: string;
  title_ar: string;
}

interface Allergen {
  id: number;
  code: string;
  name_en: string;
  name_ar: string;
}

interface Props {
  initialItems: MenuItem[];

  categories: Category[];

  allergens: Allergen[];
}

export default function MenuItemsForm({
  initialItems,
  categories,
  allergens,
}: Props) {
  const [items, setItems] =
    useState<MenuItem[]>(initialItems);

  const [loading, setLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategoryId, setSelectedCategoryId] =
    useState("all");

  const handleCreate = async () => {
    if (categories.length === 0) {
      alert(
        "Create a category before adding menu items."
      );
      return;
    }

    try {
      setLoading(true);

      await createMenuItem(categories[0].id);

      location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to create item.");
    } finally {
      setLoading(false);
    }
  };

  const updateItemState = (
    updated: MenuItem
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === updated.id
          ? updated
          : item
      )
    );
  };

  const deleteItemState = (
    id: number
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        [item.titleEn, item.titleAr]
          .filter(Boolean)
          .some((value) =>
            value.toLowerCase().includes(normalizedSearch)
          );

      const matchesCategory =
        selectedCategoryId === "all" ||
        item.categoryId === Number(selectedCategoryId);

      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategoryId]);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <SectionTitle title="Menu Items" />

        <Button
          type="button"
          disabled={loading}
          onClick={handleCreate}
        >
          {loading ? "Creating..." : "Add Item"}
        </Button>

      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Search item name
            </label>
            <input
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Type item name..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />
          </div>

          <div className="w-full md:w-64">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Filter by category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(event) =>
                setSelectedCategoryId(event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.title_en}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
            No items match the current filters.
          </div>
        ) : (
          filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              categories={categories}
              allergens={allergens}
              onChange={updateItemState}
              onDelete={() =>
                deleteItemState(item.id)
              }
            />
          ))
        )}
      </div>

    </div>
  );
}