import { createClient } from "@/lib/supabase/server";

import AllergenForm from "@/components/admin/menu/allergens/AllergenForm";

import { AllergenFormData } from "@/lib/admin/menu";

export default async function AllergensPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("allergens")
    .select("*")
    .order("code", { ascending: true });

  if (error) {
    throw new Error("Failed to load allergens.");
  }

  const allergens: AllergenFormData[] =
    (data ?? []).map((item) => ({
      id: item.id,

      code: item.code,

      nameEn: item.name_en,

      nameAr: item.name_ar,
    }));

  return (
    <AllergenForm
      initialAllergens={allergens}
    />
  );
}