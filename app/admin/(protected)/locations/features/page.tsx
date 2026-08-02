import { createClient } from "@/lib/supabase/server";

import FeatureForm from "@/components/admin/locations/features/FeaturesForm";

export default async function LocationsFeaturesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("location_features")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error("Failed to load features.");
  }

  return (
    <FeatureForm
      initialFeatures={
        (data ?? []).map((feature) => ({
          id: feature.id,

          code: feature.code,

          nameEn: feature.name_en,
          nameAr: feature.name_ar,

          icon: feature.icon ?? "",
        }))
      }
    />
  );
}