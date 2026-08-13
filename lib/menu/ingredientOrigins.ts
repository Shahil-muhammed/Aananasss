import { createClient } from "@/lib/supabase/server";

export interface IngredientOrigin {
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

export interface IngredientOriginsResponse {
  items: IngredientOrigin[];
  disclaimerEn: string;
  disclaimerAr: string;
}

export async function getIngredientOrigins(): Promise<IngredientOriginsResponse> {
  const supabase = await createClient();

  // 1. Fetch active ingredient origins
  const { data: originsData, error: originsError } = await supabase
    .from("ingredient_origins")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (originsError) {
    throw originsError;
  }

  // 2. Fetch global allergen disclaimer settings
  const { data: settingsData } = await supabase
    .from("menu_settings")
    .select("allergen_disclaimer_en, allergen_disclaimer_ar")
    .eq("id", 1)
    .single();

  const items = originsData.map((item) => ({
    id: item.id,

    titleEn: item.title_en,
    titleAr: item.title_ar,

    subtitleEn: item.subtitle_en,
    subtitleAr: item.subtitle_ar,

    originEn: item.origin_en,
    originAr: item.origin_ar,

    halalEn: item.halal_en,
    halalAr: item.halal_ar,

    displayOrder: item.display_order,

    isActive: item.is_active,
  }));

  return {
    items,
    disclaimerEn:
      settingsData?.allergen_disclaimer_en ??
      "ALLERGEN INFORMATION IS AVAILABLE ON EACH ITEM PAGE.",
    disclaimerAr:
      settingsData?.allergen_disclaimer_ar ??
      "معلومات المسببات للحساسية متوفرة في صفحة كل عنصر.",
  };
}