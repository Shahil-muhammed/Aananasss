import { createClient } from "@/lib/supabase/server";

import MenuIntroForm from "@/components/admin/menu-intro/MenuIntroForm";

export default async function MenuIntroPage() {
  const supabase = await createClient();

  // Section
  const { data: section, error: sectionError } = await supabase
    .from("menu_intro")
    .select("*")
    .single();

  if (sectionError || !section) {
    throw new Error("Failed to fetch menu intro section.");
  }

  // Items
  const { data: items, error: itemsError } = await supabase
    .from("menu_intro_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (itemsError || !items) {
    throw new Error("Failed to fetch menu intro items.");
  }

  const menuItems = items.map((item) => {
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

      number: item.number,

      titleEn: item.title_en,
      titleAr: item.title_ar,

      imagePath: item.image,
      imageUrl,

      dotColor: item.dot_color,

      descriptionEn: item.description_en,
      descriptionAr: item.description_ar,

      captionEn: item.caption_en,
      captionAr: item.caption_ar,

      displayOrder: item.display_order,

      isActive: item.is_active,
    };
  });

  return (
    <MenuIntroForm
      section={{
        id: section.id,

        sectionNumber: section.section_number,

        sectionTitleEn: section.section_title_en,
        sectionTitleAr: section.section_title_ar,

        headingLine1En: section.heading_line1_en,
        headingLine2En: section.heading_line2_en,

        headingLine1Ar: section.heading_line1_ar,
        headingLine2Ar: section.heading_line2_ar,

        buttonEn: section.button_en,
        buttonAr: section.button_ar,
      }}
      items={menuItems}
    />
  );
}