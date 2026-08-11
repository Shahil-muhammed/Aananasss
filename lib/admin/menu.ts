"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================
// MENU HERO
// ============================================

export interface MenuHeroFormData {
  id: number;

  labelEn: string;
  labelAr: string;

  titleLine1En: string;
  titleLine2En: string;

  titleLine1Ar: string;
  titleLine2Ar: string;

  display: "background" | "inline";

  mediaType: "image" | "video";

  mediaAlt: string;

  mediaPath: string;
}

export async function updateMenuHero(
  hero: MenuHeroFormData,
  file?: File | null
) {
  const supabase = await createClient();

  let mediaPath = hero.mediaPath;

  if (file) {
    const extension = file.name.split(".").pop();

    mediaPath = `menu/hero/hero.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(mediaPath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("menu_hero")
    .update({
      label_en: hero.labelEn,
      label_ar: hero.labelAr,

      title_line1_en: hero.titleLine1En,
      title_line2_en: hero.titleLine2En,

      title_line1_ar: hero.titleLine1Ar,
      title_line2_ar: hero.titleLine2Ar,

      display: hero.display,

      media_type: hero.mediaType,

      media_alt: hero.mediaAlt,

      media_path: mediaPath,

      updated_at: new Date().toISOString(),
    })
    .eq("id", hero.id);

  if (error) {
    throw error;
  }

  return mediaPath;
}

// ============================================
// MENU CATEGORIES
// ============================================

export interface MenuCategoryFormData {
  id: number;

  slug: string;

  number: string;

  titleEn: string;
  titleAr: string;

  backgroundColor: string;

  accentColor: string;

  heroImage: string;

  displayOrder: number;

  isActive: boolean;
}

export async function createCategory() {
  const supabase = await createClient();

  const slug = `category-${Date.now()}`;

  const { error } = await supabase
    .from("menu_categories")
    .insert({
      slug,

      number: "00",

      title_en: "New Category",
      title_ar: "تصنيف جديد",

      background_color: "#435334",

      accent_color: "#C7D442",

      hero_image: "",

      display_order: 0,

      is_active: true,
    });

  if (error) {
    throw error;
  }
}

export async function updateCategory(
  category: MenuCategoryFormData,
  file?: File | null
) {
  const supabase = await createClient();

  let heroImage = category.heroImage;

  if (file) {
    const extension = file.name.split(".").pop();

    heroImage = `menu/categories/${category.slug}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(heroImage, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("menu_categories")
    .update({
      slug: category.slug,

      number: category.number,

      title_en: category.titleEn,
      title_ar: category.titleAr,

      background_color: category.backgroundColor,

      accent_color: category.accentColor,

      hero_image: heroImage,

      display_order: category.displayOrder,

      is_active: category.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", category.id);

  if (error) {
    throw error;
  }

  return heroImage;
}

export async function deleteCategory(id: number) {
  const supabase = await createClient();

  // Check if any items belong to this category first
  const { count, error: countError } = await supabase
    .from("menu_items")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if (countError) {
    throw countError;
  }

  if (count && count > 0) {
    throw new Error(
      `Cannot delete this category because it contains ${count} item(s). Please move or delete the items first.`
    );
  }

  const { error } = await supabase
    .from("menu_categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

// ============================================
// MENU ITEMS
// ============================================

export interface MenuItemFormData {
  id: number;

  categoryId: number;

  number: string;

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  originEn: string;
  originAr: string;

  disclaimerEn: string;
  disclaimerAr: string;

  image: string;

  protein: string;

  carbs: string;

  fat: string;

  kcal: number;

  price: number;

  captionEn: string;
  captionAr: string;

  available: boolean;

  displayOrder: number;

  isActive: boolean;

  allergens: number[];
}

export async function createMenuItem(categoryId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("menu_items")
    .insert({
      category_id: categoryId,

      number: "NEW",

      title_en: "New Item",
      title_ar: "عنصر جديد",

      description_en: "",
      description_ar: "",

      origin_en: "Crafted in-house",
      origin_ar: "صنع منزلياً",

      disclaimer_en: "INDICATIVE ONLY – CONFIRM WITH THE BAR",
      disclaimer_ar: "إرشادي فقط - يرجى التأكيد مع البار",

      image: "",

      protein: 0,

      carbs: 0,

      fat: 0,

      kcal: 0,

      price: 0,

      caption_en: "",
      caption_ar: "",

      available: true,

      display_order: 0,

      is_active: true,
    });

  if (error) {
    throw error;
  }
}

export async function saveMenuItemAllergens(
  menuItemId: number,
  allergenIds: number[]
) {
  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .from("menu_item_allergens")
    .delete()
    .eq("menu_item_id", menuItemId);

  if (deleteError) {
    throw deleteError;
  }

  if (allergenIds.length === 0) {
    return;
  }

  const rows = allergenIds.map((id) => ({
    menu_item_id: menuItemId,
    allergen_id: id,
  }));

  const { error: insertError } = await supabase
    .from("menu_item_allergens")
    .insert(rows);

  if (insertError) {
    throw insertError;
  }
}

export async function updateMenuItem(
  item: MenuItemFormData,
  file?: File | null
) {
  const supabase = await createClient();

  let imagePath = item.image;

  if (file) {
    const extension = file.name.split(".").pop();

    imagePath = `menu/items/${item.id}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(imagePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("menu_items")
    .update({
      category_id: item.categoryId,

      number: item.number,

      title_en: item.titleEn,
      title_ar: item.titleAr,

      description_en: item.descriptionEn,
      description_ar: item.descriptionAr,

      origin_en: item.originEn,
      origin_ar: item.originAr,

      disclaimer_en: item.disclaimerEn,
      disclaimer_ar: item.disclaimerAr,

      image: imagePath,

      protein:
        item.protein === ""
          ? null
          : Number(item.protein),

      carbs:
        item.carbs === ""
          ? null
          : Number(item.carbs),

      fat:
        item.fat === ""
          ? null
          : Number(item.fat),

      kcal: item.kcal,

      price: item.price,

      caption_en: item.captionEn,
      caption_ar: item.captionAr,

      available: item.available,

      display_order: item.displayOrder,

      is_active: item.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", item.id);

  if (error) {
    throw error;
  }

  if (item.allergens) {
    await saveMenuItemAllergens(item.id, item.allergens);
  }

  return imagePath;
}

export async function deleteMenuItem(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

// ============================================
// ALLERGENS
// ============================================

export interface AllergenFormData {
  id: number;

  code: string;

  nameEn: string;

  nameAr: string;
}

export async function createAllergen(): Promise<AllergenFormData> {
  const supabase = await createClient();

  const code = `NEW-${Date.now()}`;

  const { data, error } = await supabase
    .from("allergens")
    .insert({
      code,

      name_en: "New Allergen",

      name_ar: "مسبب حساسية جديد",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    code: data.code,
    nameEn: data.name_en,
    nameAr: data.name_ar,
  };
}

export async function updateAllergen(allergen: AllergenFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("allergens")
    .update({
      code: allergen.code,

      name_en: allergen.nameEn,

      name_ar: allergen.nameAr,
    })
    .eq("id", allergen.id);

  if (error) {
    throw error;
  }
}

export async function deleteAllergen(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("allergens")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}