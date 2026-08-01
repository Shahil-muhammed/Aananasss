import { createClient } from "@/lib/supabase/server";
import { MenuHeroData } from "@/components/menu/Hero/hero.types";

export async function getMenuHero(): Promise<MenuHeroData> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_hero")
    .select("*")
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch menu hero.");
  }

  let mediaUrl = "";

  if (data.media_path) {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("website-assets")
      .getPublicUrl(data.media_path);

    mediaUrl = `${publicUrl}?v=${data.updated_at}`;
  }

  return {
    labelEn: data.label_en,
    labelAr: data.label_ar,

    titleLine1En: data.title_line1_en,
    titleLine2En: data.title_line2_en,

    titleLine1Ar: data.title_line1_ar,
    titleLine2Ar: data.title_line2_ar,

    display: data.display,

    mediaType: data.media_type,

    mediaUrl,

    mediaAlt: data.media_alt ?? "",
  };
}