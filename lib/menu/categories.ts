import { createClient } from "@/lib/supabase/server";

export async function getMenuCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error || !data) {
    throw new Error("Failed to fetch menu categories.");
  }

  return data.map((category) => {
    let heroImage = "";

    if (category.hero_image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(category.hero_image);

      heroImage = `${publicUrl}?v=${category.updated_at}`;
    }

    return {
      id: category.id,
      slug: category.slug,

      number: category.number,

      titleEn: category.title_en,
      titleAr: category.title_ar,

      backgroundColor: category.background_color,

      accentColor: category.accent_color,

      image: heroImage,
    };
  });
}