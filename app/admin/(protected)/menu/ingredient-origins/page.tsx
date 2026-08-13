import { createClient } from "@/lib/supabase/server";

import IngredientOriginsForm from "@/components/admin/menu/IngredientOriginsForm";

export default async function IngredientOriginsPage() {
  const supabase = await createClient();

  // Fetch both ingredient origins and global menu settings in parallel
  const [originsResult, settingsResult] = await Promise.all([
    supabase.from("ingredient_origins").select("*").order("display_order"),
    supabase.from("menu_settings").select("allergen_disclaimer_en, allergen_disclaimer_ar").eq("id", 1).single(),
  ]);

  if (originsResult.error) {
    throw new Error("Failed to load ingredient origins.");
  }

  const items = originsResult.data.map((item) => ({
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

  const settings = settingsResult.data;

  return (
    <IngredientOriginsForm
      initialItems={items}
      initialDisclaimerEn={settings?.allergen_disclaimer_en}
      initialDisclaimerAr={settings?.allergen_disclaimer_ar}
    />
  );
}