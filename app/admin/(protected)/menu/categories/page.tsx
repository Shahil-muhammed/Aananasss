import { createClient } from "@/lib/supabase/server";

import CategoryForm from "@/components/admin/menu/categories/CategoryForm";

export default async function MenuCategoriesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) {
    throw new Error("Failed to fetch menu categories.");
  }

  const categories = data.map((category) => {
    let imageUrl = "";

    if (category.hero_image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(category.hero_image);

      imageUrl = `${publicUrl}?v=${category.updated_at}`;
    }

    return {
      id: category.id,

      slug: category.slug,

      number: category.number,

      titleEn: category.title_en,
      titleAr: category.title_ar,

      backgroundColor: category.background_color,

      accentColor: category.accent_color,

      heroImage: category.hero_image,
      imageUrl,

      displayOrder: category.display_order,

      isActive: category.is_active,
    };
  });

  return <CategoryForm initialCategories={categories} />;
}