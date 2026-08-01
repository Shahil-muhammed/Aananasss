"use client";

import { useState } from "react";

import Hero from "@/components/menu/Hero";
import CategoryNavigation from "@/components/menu/CategoryNavigation";
import MenuSection from "@/components/menu/MenuSection";
import ItemModal from "@/components/menu/ItemModal";

import { menuSections } from "@/components/menu/MenuSection/menuSection.data";
import { MenuItem, MenuSectionData } from "@/components/menu/MenuSection/menuSection.types";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // State for tracking the currently selected menu item & its section
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSection, setSelectedSection] = useState<MenuSectionData | null>(null);

  // Filter sections strictly based on selected category tab
  const filteredSections =
    activeCategory === "all"
      ? menuSections
      : menuSections.filter((section) => section.id === activeCategory);

  const handleSelectItem = (item: MenuItem, section: MenuSectionData) => {
    setSelectedItem(item);
    setSelectedSection(section);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedSection(null);
  };

  return (
    <main className="min-h-screen">
      <Hero />

      <CategoryNavigation
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Renders filtered sections with the click handler */}
      <div className="flex flex-col">
        {filteredSections.map((section) => (
          <MenuSection
            key={section.id}
            section={section}
            onSelectItem={handleSelectItem}
          />
        ))}
      </div>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        section={selectedSection}
        onClose={handleCloseModal}
      />
    </main>
  );
}