import { createClient } from "@/lib/supabase/server";

import StatsForm from "@/components/admin/story/stats/StatsForm";

export default async function StoryStatsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("story_stats")
    .select("*")
    .order("display_order");

  if (error) {
    throw new Error("Failed to load story stats.");
  }

  return (
    <StatsForm
      initialStats={data.map((stat) => ({
        id: stat.id,

        labelEn: stat.label_en,
        labelAr: stat.label_ar,

        valueEn: stat.value_en,
        valueAr: stat.value_ar,

        displayOrder: stat.display_order,
      }))}
    />
  );
}