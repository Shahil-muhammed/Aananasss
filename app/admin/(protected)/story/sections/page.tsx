import { createClient } from "@/lib/supabase/server";

import SectionForm from "@/components/admin/story/sections/SectionForm";

export default async function StorySectionsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("story_sections")
    .select("*")
    .order("display_order");

  if (error || !data) {
    throw new Error("Failed to load story sections.");
  }

  const sections = data.map((section) => {
    let image = "";

    if (section.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(section.image);

      image = `${publicUrl}?v=${section.updated_at}`;
    }

    return {
      id: section.id,

      slug: section.slug,

      chapterEn: section.chapter_en,
      chapterAr: section.chapter_ar,

      titleEn: section.title_en,
      titleAr: section.title_ar,

      descriptionEn: section.description_en,
      descriptionAr: section.description_ar,

      image,

      imagePath: section.image,

      backgroundColor: section.background_color,

      titleColor: section.title_color,

      reverse: section.reverse,

      displayOrder: section.display_order,

      isActive: section.is_active,
    };
  });

  return (
    <SectionForm
      initialSections={sections}
    />
  );
}