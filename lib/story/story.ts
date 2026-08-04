import { createClient } from "@/lib/supabase/server";

export async function getStoryData() {
  const supabase = await createClient();

  const [
    heroResult,
    sectionsResult,
    valuesResult,
    valueItemsResult,
    statsResult,
  ] = await Promise.all([
    supabase
      .from("story_hero")
      .select("*")
      .single(),

    supabase
      .from("story_sections")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),

    supabase
      .from("story_values")
      .select("*")
      .single(),

    supabase
      .from("story_value_items")
      .select("*")
      .order("display_order"),

    supabase
      .from("story_stats")
      .select("*")
      .order("display_order"),
  ]);

  if (
    heroResult.error ||
    sectionsResult.error ||
    valuesResult.error ||
    valueItemsResult.error ||
    statsResult.error
  ) {
    throw new Error("Failed to fetch story data.");
  }

  const hero = heroResult.data;
  const sections = sectionsResult.data ?? [];
  const values = valuesResult.data;
  const valueItems = valueItemsResult.data ?? [];
  const stats = statsResult.data ?? [];

  let heroImage = "";

  if (hero?.background_image) {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("website-assets")
      .getPublicUrl(hero.background_image);

    const cacheKey = hero.updated_at
      ? new Date(hero.updated_at).getTime()
      : Date.now();

    heroImage = `${publicUrl}?v=${cacheKey}`;
  }

  const formattedSections = sections.map((section) => {
    let image = "";

    if (section.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(section.image);

      const cacheKey = section.updated_at
        ? new Date(section.updated_at).getTime()
        : Date.now();

      image = `${publicUrl}?v=${cacheKey}`;
    }

    return {
      id: section.slug,

      chapter: {
        en: section.chapter_en,
        ar: section.chapter_ar,
      },

      titleEn: section.title_en,
      titleAr: section.title_ar,

      descriptionEn: section.description_en,
      descriptionAr: section.description_ar,

      image,

      backgroundColor: section.background_color,

      titleColor: section.title_color,

      reverse: section.reverse,
    };
  });

  return {
    hero: {
      id: hero.id,

      sectionLabelEn: hero.section_label_en,
      sectionLabelAr: hero.section_label_ar,

      titleEn: hero.title_en,
      titleHighlightEn: hero.title_highlight_en,

      titleAr: hero.title_ar,
      titleHighlightAr: hero.title_highlight_ar,

      subtitleEn: hero.subtitle_en,
      subtitleAr: hero.subtitle_ar,

      backgroundImage: heroImage,

      overlayOpacity: hero.overlay_opacity,

      stats: stats.map((stat) => ({
        id: stat.id,

        labelEn: stat.label_en,
        labelAr: stat.label_ar,

        valueEn: stat.value_en,
        valueAr: stat.value_ar,
      })),
    },

    sections: formattedSections,

    values: {
      id: values.id,

      sectionLabelEn: values.section_label_en,
      sectionLabelAr: values.section_label_ar,

      headingEn: values.heading_en,
      headingAr: values.heading_ar,

      quoteEn: values.quote_en,
      quoteAr: values.quote_ar,

      quoteSignatureEn: values.signature_en,
      quoteSignatureAr: values.signature_ar,

      items: valueItems.map((item) => ({
        id: item.id,

        number: item.number,

        titleEn: item.title_en,
        titleAr: item.title_ar,

        descriptionEn: item.description_en,
        descriptionAr: item.description_ar,
      })),
    },
  };
}