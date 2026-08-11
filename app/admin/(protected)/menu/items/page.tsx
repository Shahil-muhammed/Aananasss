import { createClient } from "@/lib/supabase/server";

import MenuItemsForm from "@/components/admin/menu/items/MenuItemsForm";

export default async function MenuItemsPage() {
  const supabase = await createClient();

  const [{ data: items, error: itemsError }, { data: categories, error: categoriesError }, { data: allergens, error: allergensError }] =
    await Promise.all([
      supabase
        .from("menu_items")
        .select(`
          *,
          menu_item_allergens (
            allergen_id
          )
        `)
        .order("display_order", { ascending: true }),

      supabase
        .from("menu_categories")
        .select("id,title_en,title_ar")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),

      supabase
        .from("allergens")
        .select("*")
        .order("name_en", { ascending: true }),
    ]);

  if (itemsError) {
    throw new Error("Failed to load menu items.");
  }

  if (categoriesError) {
    throw new Error("Failed to load menu categories.");
  }

  if (allergensError) {
    throw new Error("Failed to load allergens.");
  }

  const formattedItems =
    items?.map((item) => {
      let imageUrl = "";

      if (item.image) {
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("website-assets")
          .getPublicUrl(item.image);

        imageUrl = `${publicUrl}?v=${item.updated_at}`;
      }

      return {
        id: item.id,

        categoryId: item.category_id,

        number: item.number,

        titleEn: item.title_en,
        titleAr: item.title_ar,

        descriptionEn: item.description_en ?? "",
        descriptionAr: item.description_ar ?? "",

        // MAPPED NEW DB FIELDS
        originEn: item.origin_en ?? "",
        originAr: item.origin_ar ?? "",

        disclaimerEn: item.disclaimer_en ?? "",
        disclaimerAr: item.disclaimer_ar ?? "",

        image: item.image ?? "",
        imageUrl,

        protein: item.protein?.toString() ?? "",

        carbs: item.carbs?.toString() ?? "",

        fat: item.fat?.toString() ?? "",

        kcal: item.kcal ?? 0,

        price: Number(item.price ?? 0),

        captionEn: item.caption_en ?? "",
        captionAr: item.caption_ar ?? "",

        available: item.available ?? true,

        displayOrder: item.display_order,

        isActive: item.is_active,

        allergens:
          item.menu_item_allergens?.map(
            (a: { allergen_id: number }) =>
              a.allergen_id
          ) ?? [],
      };
    }) ?? [];

  return (
    <MenuItemsForm
      initialItems={formattedItems}
      categories={categories ?? []}
      allergens={allergens ?? []}
    />
  );
}