import { createClient } from "@/lib/supabase/server";
import { MenuIntroData } from "@/components/home/MenuIntro/menuIntro.types";

export async function getMenuIntro(): Promise<MenuIntroData> {
  const supabase = await createClient();

  const { data: section, error: sectionError } = await supabase
    .from("menu_intro")
    .select("*")
    .single();

  if (sectionError || !section) {
    throw new Error("Failed to fetch menu intro section.");
  }

  const { data: items, error: itemsError } = await supabase
    .from("menu_intro_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (itemsError || !items) {
    throw new Error("Failed to fetch menu intro items.");
  }

  return {
    sectionNumber: section.section_number,

    sectionTitleEn: section.section_title_en,
    sectionTitleAr: section.section_title_ar,

    headingLine1En: section.heading_line1_en,
    headingLine2En: section.heading_line2_en,

    headingLine1Ar: section.heading_line1_ar,
    headingLine2Ar: section.heading_line2_ar,

    buttonEn: section.button_en,
    buttonAr: section.button_ar,

    items: items.map((item) => ({
      id: item.id,
      number: item.number,

      titleEn: item.title_en,
      titleAr: item.title_ar,

      image: item.image,

      dotColor: item.dot_color,

      descriptionEn: item.description_en,
      descriptionAr: item.description_ar,

      captionEn: item.caption_en,
      captionAr: item.caption_ar,
    })),
  };
}