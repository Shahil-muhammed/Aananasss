"use client";

import { useState } from "react";

import Hero from "@/components/menu/Hero";
import CategoryNavigation from "@/components/menu/CategoryNavigation";
import MenuSection from "@/components/menu/MenuSection";

import { menuSections } from "@/components/menu/MenuSection/menuSection.data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter sections strictly based on selected category tab
  const filteredSections =
    activeCategory === "all"
      ? menuSections
      : menuSections.filter((section) => section.id === activeCategory);

  return (
    <main className="min-h-screen">
      <Hero />

      <CategoryNavigation
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Renders only filtered items. If "savory-pots" is active, sweet-pots is omitted */}
      <div className="flex flex-col">
        {filteredSections.map((section) => (
          <MenuSection
            key={section.id}
            section={section}
          />
        ))}
      </div>
    </main>
  );
}