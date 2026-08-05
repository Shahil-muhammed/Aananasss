import { createClient } from "@/lib/supabase/server";

export async function getContactTopics() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_topics")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    throw error;
  }

  return data.map((topic) => ({
    id: topic.slug,

    labelEn: topic.label_en,
    labelAr: topic.label_ar,

    email: topic.email,
  }));
}