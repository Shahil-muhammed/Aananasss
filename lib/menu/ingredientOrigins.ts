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

export async function getIngredientOrigins(): Promise<
  IngredientOrigin[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredient_origins")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    throw error;
  }

  return data.map((item) => ({
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
}