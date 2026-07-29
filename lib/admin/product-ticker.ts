import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface ProductTickerItem {
  id: number;
  textEn: string;
  textAr: string;
  displayOrder: number;
  isActive: boolean;
}

// ---------------------------------------------
// Update
// ---------------------------------------------
export async function updateProductTicker(
  form: ProductTickerItem
) {
  const { error } = await supabase
    .from("product_ticker")
    .update({
      text_en: form.textEn,
      text_ar: form.textAr,
      display_order: form.displayOrder,
      is_active: form.isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------
// Create
// ---------------------------------------------
export async function createProductTicker() {
  const { data, error } = await supabase
    .from("product_ticker")
    .insert({
      text_en: "New Item",
      text_ar: "عنصر جديد",
      display_order: 999,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// ---------------------------------------------
// Delete
// ---------------------------------------------
export async function deleteProductTicker(
  id: number
) {
  const { error } = await supabase
    .from("product_ticker")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}