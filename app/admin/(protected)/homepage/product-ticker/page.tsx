import { createClient } from "@/lib/supabase/server";

import ProductTickerForm from "@/components/admin/product-ticker/ProductTickerForm";

export default async function ProductTickerPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_ticker")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) {
    throw new Error("Failed to fetch product ticker.");
  }

  const items = data.map((item) => ({
    id: item.id,

    textEn: item.text_en,
    textAr: item.text_ar,

    displayOrder: item.display_order,

    isActive: item.is_active,
  }));

  return <ProductTickerForm items={items} />;
}