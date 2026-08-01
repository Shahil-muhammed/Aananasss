import { createClient } from "@/lib/supabase/server";

import HeroForm from "@/components/admin/menu/hero/HeroForm";

export default async function MenuHeroPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu_hero")
    .select("*")
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch menu hero.");
  }

  return (
    <HeroForm
      hero={{
        id: data.id,

        labelEn: data.label_en,
        labelAr: data.label_ar,

        titleLine1En: data.title_line1_en,
        titleLine2En: data.title_line2_en,

        titleLine1Ar: data.title_line1_ar,
        titleLine2Ar: data.title_line2_ar,

        display: data.display,

        mediaType: data.media_type,

        mediaPath: data.media_path,
        mediaAlt: data.media_alt ?? "",
      }}
    />
  );
}