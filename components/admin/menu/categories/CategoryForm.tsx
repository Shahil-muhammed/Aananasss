"use client";

import { useState } from "react";

import Button from "@/components/admin/ui/Button";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import CategoryCard from "./CategoryCard";

import {
  createCategory,
  MenuCategoryFormData,
} from "@/lib/admin/menu";

interface Category extends MenuCategoryFormData {
  imageUrl: string;
}

interface Props {
  initialCategories: Category[];
}

export default function CategoryForm({
  initialCategories,
}: Props) {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);

      await createCategory();

      location.reload();
    } catch (error) {
      console.error(error);

      alert("Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryState = (
    updated: Category
  ) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === updated.id
          ? updated
          : category
      )
    );
  };

  const deleteCategoryState = (
    id: number
  ) => {
    setCategories((prev) =>
      prev.filter(
        (category) => category.id !== id
      )
    );
  };
    return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <SectionTitle title="Menu Categories" />

        <Button
          type="button"
          disabled={loading}
          onClick={handleCreate}
        >
          {loading ? "Creating..." : "Add Category"}
        </Button>

      </div>

      <div className="space-y-8">

        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onChange={updateCategoryState}
            onDelete={() =>
              deleteCategoryState(category.id)
            }
          />
        ))}

      </div>

    </div>
  );
}