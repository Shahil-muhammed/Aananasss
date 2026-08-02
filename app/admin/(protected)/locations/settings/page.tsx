import { createClient } from "@/lib/supabase/server";

import SettingsForm from "@/components/admin/locations/settings/SettingsForm";

export default async function LocationsSettingsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("delivery_platforms")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error("Failed to load delivery platforms.");
  }

  return (
    <SettingsForm
      initialPlatforms={(data ?? []).map((platform) => ({
        id: platform.id,

        code: platform.code,

        name: platform.name,

        icon: platform.icon ?? "",
      }))}
    />
  );
}