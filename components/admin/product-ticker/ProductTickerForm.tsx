"use client";

import { useState } from "react";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import ProductTickerCard from "@/components/admin/product-ticker/ProductTickerCard";

import {
  createProductTicker,
  deleteProductTicker,
} from "@/lib/admin/product-ticker";

interface TickerItem {
  id: number;
  textEn: string;
  textAr: string;
  displayOrder: number;
  isActive: boolean;
}

interface Props {
  items: TickerItem[];
}

export default function ProductTickerForm({ items }: Props) {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(items);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const handleChange = (id: number, updated: TickerItem) => {
    setTickerItems((prev) =>
      prev.map((item) => (item.id === id ? updated : item))
    );
  };

  const handleDelete = async (item: TickerItem) => {
    try {
      await deleteProductTicker(item.id);

      setTickerItems((prev) =>
        prev.filter((i) => i.id !== item.id)
      );

      alert("Item deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete item.");
    }
  };

  const handleAdd = async () => {
    try {
      setLoadingAdd(true);

      const item = await createProductTicker();

      const newItem: TickerItem = {
        id: item.id,
        textEn: item.text_en,
        textAr: item.text_ar,
        displayOrder: item.display_order,
        isActive: item.is_active,
      };

      setTickerItems((prev) =>
        [...prev, newItem].sort(
          (a, b) => a.displayOrder - b.displayOrder
        )
      );

      alert("Item created successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to create item.");
    } finally {
      setLoadingAdd(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle title="Product Ticker" />

        <Button
          onClick={handleAdd}
          disabled={loadingAdd}
        >
          {loadingAdd ? "Adding..." : "+ Add Item"}
        </Button>
      </div>

      <div className="space-y-6">
        {tickerItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No ticker items found.
          </div>
        ) : (
          tickerItems.map((item) => (
            <ProductTickerCard
              key={item.id}
              item={item}
              onChange={(updated: TickerItem) =>
                handleChange(item.id, updated)
              }
              onDelete={() => handleDelete(item)}
            />
          ))
        )}
      </div>
    </Card>
  );
}