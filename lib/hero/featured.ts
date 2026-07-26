import { createClient } from "@/lib/supabase/server";
import { FeaturedProductsData } from "@/components/home/FeaturedProducts/featured.types";

export async function getFeaturedProducts(): Promise<FeaturedProductsData> {
  const supabase = await createClient();

  const { data: section, error: sectionError } = await supabase
    .from("featured_section")
    .select("*")
    .single();

  if (sectionError || !section) {
    throw new Error("Failed to fetch featured section.");
  }

  const { data: products, error: productsError } = await supabase
    .from("featured_products")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (productsError || !products) {
    throw new Error("Failed to fetch featured products.");
  }

  return {
    sectionLabelEn: section.section_label_en,
    sectionLabelAr: section.section_label_ar,

    headingEn: section.heading_en,
    headingAr: section.heading_ar,

    quoteEn: section.quote_en,
    quoteAr: section.quote_ar,

    products: products.map((product) => ({
      id: product.id,
      titleEn: product.title_en,
      titleAr: product.title_ar,
      categoryEn: product.category_en,
      categoryAr: product.category_ar,
      image: product.image,
      href: product.href,
    })),
  };
}