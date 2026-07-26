import { createClient } from "@/lib/supabase/server";
import { ProductTickerData } from "@/components/home/ProductTicker/product-ticker.types";

export async function getProductTicker(): Promise<ProductTickerData> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_ticker")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error || !data) {
    throw new Error("Failed to fetch product ticker.");
  }

  return {
    items: data.map((item) => ({
      id: item.id,
      textEn: item.text_en,
      textAr: item.text_ar,
    })),
  };
}