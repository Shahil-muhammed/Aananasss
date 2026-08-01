"use client";

import { useState } from "react";

import Hero from "@/components/menu/Hero";
import CategoryNavigation from "@/components/menu/CategoryNavigation";
import MenuSection from "@/components/menu/MenuSection";
import ItemModal from "@/components/menu/ItemModal";

import {
  MenuHeroData,
} from "@/components/menu/Hero/hero.types";

import {
  MenuItem,
  MenuSectionData,
} from "@/components/menu/MenuSection/menuSection.types";

interface Props {
  hero: MenuHeroData;
  sections: MenuSectionData[];
}

export default function MenuPageClient({
  hero,
  sections,
}: Props) {
  const [activeCategory, setActiveCategory] = useState("all");

  const [selectedItem, setSelectedItem] =
    useState<MenuItem | null>(null);

  const [selectedSection, setSelectedSection] =
    useState<MenuSectionData | null>(null);

  const filteredSections =
    activeCategory === "all"
      ? sections
      : sections.filter(
          (section) => section.id === activeCategory
        );

  const handleSelectItem = (
    item: MenuItem,
    section: MenuSectionData
  ) => {
    setSelectedItem(item);
    setSelectedSection(section);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedSection(null);
  };

  return (
    <main className="min-h-screen">
      <Hero data={hero} />

      <CategoryNavigation
        categories={sections.map((section) => ({
            id: section.id,
            titleEn: section.titleEn,
            titleAr: section.titleAr,
        }))}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
    />

      <div className="flex flex-col">
        {filteredSections.map((section) => (
          <MenuSection
            key={section.id}
            section={section}
            onSelectItem={handleSelectItem}
          />
        ))}
      </div>

      <ItemModal
        item={selectedItem}
        section={selectedSection}
        onClose={handleCloseModal}
      />
    </main>
  );
}