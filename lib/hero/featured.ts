import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("featured_products")
    .select(`
      id,
      title_en,
      title_ar,
      category_en,
      category_ar,
      image,
      href,
      display_order,
      is_active,
      updated_at
    `)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data.map((item) => {
    let imageUrl = "";

    if (item.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(item.image);

      imageUrl = `${publicUrl}?v=${new Date(item.updated_at).getTime()}`;
    }

    return {
      id: item.id,
      titleEn: item.title_en,
      titleAr: item.title_ar,
      categoryEn: item.category_en,
      categoryAr: item.category_ar,
      imagePath: item.image,
      imageUrl,
      href: item.href,
      displayOrder: item.display_order,
      isActive: item.is_active,
    };
  });
}