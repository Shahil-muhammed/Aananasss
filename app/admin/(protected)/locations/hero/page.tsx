import { createClient } from "@/lib/supabase/server";

import HeroForm from "@/components/admin/locations/hero/HeroForm";

export default async function LocationsHeroPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("locations_hero")
    .select("*")
    .single();

  if (error || !data) {
    throw new Error("Failed to load locations hero.");
  }

  let backgroundImage = "";

  if (data.background_image) {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("website-assets")
      .getPublicUrl(data.background_image);

    backgroundImage = `${publicUrl}?v=${data.updated_at}`;
  }

  return (
    <HeroForm
      initialHero={{
        id: data.id,

        sectionLabelEn: data.section_label_en,
        sectionLabelAr: data.section_label_ar,

        titleEn: data.title_en,
        titleHighlightEn: data.title_highlight_en,

        titleAr: data.title_ar,
        titleHighlightAr: data.title_highlight_ar,

        subtitleEn: data.subtitle_en,
        subtitleAr: data.subtitle_ar,

        backgroundImage: data.background_image,
        backgroundImageUrl: backgroundImage,

        overlayOpacity: data.overlay_opacity,
      }}
    />
  );
}