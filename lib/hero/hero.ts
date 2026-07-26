import { createClient } from "@/lib/supabase/server";
import { HeroProps } from "@/components/home/Hero/hero.types";

export async function getHero(): Promise<HeroProps> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero")
    .select("*")
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch Hero data.");
  }

  return {
    mediaType: data.media_type,
    mediaUrl: data.media_url,
    mediaAlt: data.media_alt,

    overlay: data.overlay,
    overlayOpacity: data.overlay_opacity,

    titleEn: data.title_en,
    titleHighlightEn: data.title_highlight_en,

    titleAr: data.title_ar,
    titleHighlightAr: data.title_highlight_ar,

    subtitleEn: data.subtitle_en,
    subtitleAr: data.subtitle_ar,

    primaryButton: {
      labelEn: data.primary_label_en,
      labelAr: data.primary_label_ar,
      href: data.primary_href,
      isVisible: data.primary_visible,
    },

    secondaryButton: {
      labelEn: data.secondary_label_en,
      labelAr: data.secondary_label_ar,
      href: data.secondary_href,
      isVisible: data.secondary_visible,
    },
  };
}