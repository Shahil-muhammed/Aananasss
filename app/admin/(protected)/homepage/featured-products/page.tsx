import { createClient } from "@/lib/supabase/server";
import FeaturedProductsForm from "@/components/admin/featured-products/FeaturedProductsForm";

export default async function FeaturedProductsPage() {
  const supabase = await createClient();

  // Fetch section
  const { data: section, error: sectionError } = await supabase
    .from("featured_section")
    .select("*")
    .single();

  if (sectionError) {
    throw new Error("Failed to load featured section.");
  }

  // Fetch ALL products (including inactive)
  const { data: products, error: productsError } = await supabase
    .from("featured_products")
    .select("*")
    .order("display_order", { ascending: true });

  if (productsError) {
    throw new Error("Failed to load featured products.");
  }

  const formattedProducts = products.map((product) => {
    const { data: image } = supabase.storage
      .from("website-assets")
      .getPublicUrl(product.image);

    return {
      id: product.id,

      titleEn: product.title_en,
      titleAr: product.title_ar,

      categoryEn: product.category_en,
      categoryAr: product.category_ar,

      imagePath: product.image,
      imageUrl: image.publicUrl,

      href: product.href,

      displayOrder: product.display_order,

      isActive: product.is_active,
    };
  });

  const formattedSection = {
    id: section.id,

    sectionLabelEn: section.section_label_en,
    sectionLabelAr: section.section_label_ar,

    headingEn: section.heading_en,
    headingAr: section.heading_ar,

    quoteEn: section.quote_en,
    quoteAr: section.quote_ar,
  };

  return (
    <FeaturedProductsForm
      section={formattedSection}
      products={formattedProducts}
    />
  );
}