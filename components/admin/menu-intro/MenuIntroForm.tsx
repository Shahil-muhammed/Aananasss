"use client";

import { useState } from "react";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import MenuIntroItemCard from "./MenuIntroItemCard";

import {
  updateMenuIntroSection,
  createMenuItem,
  deleteMenuItem,
} from "@/lib/admin/menu-intro";

interface Section {
  id: number;

  sectionNumber: string;

  sectionTitleEn: string;
  sectionTitleAr: string;

  headingLine1En: string;
  headingLine2En: string;

  headingLine1Ar: string;
  headingLine2Ar: string;

  buttonEn: string;
  buttonAr: string;
}

interface MenuItem {
  id: number;

  number: string;

  titleEn: string;
  titleAr: string;

  imagePath: string;
  imageUrl: string;

  dotColor: string;

  descriptionEn: string;
  descriptionAr: string;

  captionEn: string;
  captionAr: string;

  displayOrder: number;

  isActive: boolean;
}

interface Props {
  section: Section;
  items: MenuItem[];
}

export default function MenuIntroForm({
  section,
  items,
}: Props) {
  const [sectionForm, setSectionForm] =
    useState<Section>(section);

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>(items);

  const [loadingSection, setLoadingSection] =
    useState(false);

  const [loadingAdd, setLoadingAdd] =
    useState(false);

  const handleItemChange = (
    id: number,
    updated: MenuItem
  ) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? updated : item
      )
    );
  };

  const handleDelete = async (
    item: MenuItem
  ) => {
    try {
      await deleteMenuItem(
        item.id,
        item.imagePath
      );

      setMenuItems((prev) =>
        prev.filter(
          (i) => i.id !== item.id
        )
      );

      alert("Menu item deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete menu item.");
    }
  };

  const handleAdd = async () => {
    try {
      setLoadingAdd(true);

      const item = await createMenuItem();

      const newItem: MenuItem = {
        id: item.id,

        number: item.number,

        titleEn: item.title_en,
        titleAr: item.title_ar,

        imagePath: item.image,

        imageUrl: item.image
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/website-assets/${item.image}?t=${Date.now()}`
          : "",

        dotColor: item.dot_color,

        descriptionEn:
          item.description_en,

        descriptionAr:
          item.description_ar,

        captionEn: item.caption_en,

        captionAr: item.caption_ar,

        displayOrder:
          item.display_order,

        isActive: item.is_active,
      };

      setMenuItems((prev) =>
        [...prev, newItem].sort(
          (a, b) =>
            a.displayOrder -
            b.displayOrder
        )
      );

      alert(
        "Menu item created successfully."
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to create menu item."
      );
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleSaveSection =
    async () => {
      try {
        setLoadingSection(true);

        await updateMenuIntroSection(
          sectionForm
        );

        alert(
          "Section updated successfully."
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update section."
        );
      } finally {
        setLoadingSection(false);
      }
    };

  return (
    <div className="space-y-8">

      <Card>

        <SectionTitle title="Menu Intro Section" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input
            label="Section Number"
            value={
              sectionForm.sectionNumber
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionNumber:
                  e.target.value,
              })
            }
          />

          <div />

          <Input
            label="Section Title EN"
            value={
              sectionForm.sectionTitleEn
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionTitleEn:
                  e.target.value,
              })
            }
          />

          <Input
            label="Section Title AR"
            value={
              sectionForm.sectionTitleAr
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionTitleAr:
                  e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 1 EN"
            value={
              sectionForm.headingLine1En
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine1En:
                  e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 1 AR"
            value={
              sectionForm.headingLine1Ar
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine1Ar:
                  e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 2 EN"
            value={
              sectionForm.headingLine2En
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine2En:
                  e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 2 AR"
            value={
              sectionForm.headingLine2Ar
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine2Ar:
                  e.target.value,
              })
            }
          />

          <Input
            label="Button EN"
            value={
              sectionForm.buttonEn
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                buttonEn:
                  e.target.value,
              })
            }
          />

          <Input
            label="Button AR"
            value={
              sectionForm.buttonAr
            }
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                buttonAr:
                  e.target.value,
              })
            }
          />

        </div>

        <div className="mt-6">
          <Button
            onClick={
              handleSaveSection
            }
            disabled={
              loadingSection
            }
          >
            {loadingSection
              ? "Saving..."
              : "Save Section"}
          </Button>
        </div>

      </Card>

      <Card>

        <div className="flex items-center justify-between mb-6">

          <SectionTitle title="Menu Items" />

          <Button
            onClick={handleAdd}
            disabled={loadingAdd}
          >
            {loadingAdd
              ? "Adding..."
              : "+ Add Item"}
          </Button>

        </div>

        <div className="space-y-8">

          {menuItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No menu items found.
            </div>
          ) : (
            menuItems.map((item) => (
              <MenuIntroItemCard
                key={item.id}
                item={item}
                onChange={(
                  updated
                ) =>
                  handleItemChange(
                    item.id,
                    updated
                  )
                }
                onDelete={() =>
                  handleDelete(item)
                }
              />
            ))
          )}

        </div>

      </Card>

    </div>
  );
}