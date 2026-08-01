import { createClient } from "@/lib/supabase/server";
import {
  MenuItem,
  Allergen,
} from "@/components/menu/MenuSection/menuSection.types";

export async function getMenuItems(): Promise<
  (MenuItem & { category_id: number })[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select(`
      *,
      menu_item_allergens (
        allergens (
          code,
          name_en,
          name_ar
        )
      )
    `)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error || !data) {
    throw new Error("Failed to fetch menu items.");
  }

  return data.map((item) => {
    let image = "";

    if (item.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(item.image);

      image = `${publicUrl}?v=${item.updated_at}`;
    }

    const allergens: Allergen[] =
      item.menu_item_allergens?.map(
        (relation: {
          allergens: {
            code: string;
            name_en: string;
            name_ar: string;
          };
        }) => ({
          code: relation.allergens.code,
          nameEn: relation.allergens.name_en,
          nameAr: relation.allergens.name_ar,
        })
      ) ?? [];

    return {
      id: item.id.toString(),

      category_id: item.category_id,

      titleEn: item.title_en,
      titleAr: item.title_ar,

      descriptionEn: item.description_en ?? "",
      descriptionAr: item.description_ar ?? "",

      captionEn: item.caption_en ?? "",
      captionAr: item.caption_ar ?? "",

      image,

      protein: item.protein?.toString() ?? "",
      carbs: item.carbs?.toString() ?? "",
      fat: item.fat?.toString() ?? "",

      kcal: item.kcal ?? 0,

      price: item.price ?? undefined,

      available: item.available ?? true,

      allergens,
    };
  });
}