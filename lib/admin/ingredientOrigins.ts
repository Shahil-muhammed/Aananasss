"use server";

import { createClient } from "@/lib/supabase/server";

export interface IngredientOriginFormData {
  id: number;

  titleEn: string;
  titleAr: string;

  subtitleEn: string;
  subtitleAr: string;

  originEn: string;
  originAr: string;

  halalEn: string;
  halalAr: string;

  displayOrder: number;

  isActive: boolean;
}

export async function createIngredientOrigin() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("ingredient_origins")
    .insert({
      title_en: "New Ingredient",
      title_ar: "مكون جديد",

      subtitle_en: "",
      subtitle_ar: "",

      origin_en: "",
      origin_ar: "",

      halal_en: "",
      halal_ar: "",

      display_order: 0,

      is_active: true,
    });

  if (error) {
    throw error;
  }
}

export async function updateIngredientOrigin(
  item: IngredientOriginFormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("ingredient_origins")
    .update({
      title_en: item.titleEn,
      title_ar: item.titleAr,

      subtitle_en: item.subtitleEn,
      subtitle_ar: item.subtitleAr,

      origin_en: item.originEn,
      origin_ar: item.originAr,

      halal_en: item.halalEn,
      halal_ar: item.halalAr,

      display_order: item.displayOrder,

      is_active: item.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", item.id);

  if (error) {
    throw error;
  }
}

export async function deleteIngredientOrigin(
  id: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("ingredient_origins")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}