import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getFeaturedSection() {
  const { data, error } = await supabase
    .from("featured_section")
    .select(`
      section_label_en,
      section_label_ar,
      heading_en,
      heading_ar,
      quote_en,
      quote_ar
    `)
    .single();

  if (error) {
    console.error("Error fetching featured section:", error);
    return null;
  }

  return {
    sectionLabelEn: data.section_label_en ?? "",
    sectionLabelAr: data.section_label_ar ?? "",
    headingEn: data.heading_en ?? "",
    headingAr: data.heading_ar ?? "",
    quoteEn: data.quote_en ?? "",
    quoteAr: data.quote_ar ?? "",
  };
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("featured_products")
    .select(`
      id,
      title_en,
      title_ar,
      category_en,
      category_ar,
      image,
      href,
      display_order,
      is_active,
      updated_at
    `)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data.map((item) => {
    let imageUrl = "";

    if (item.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(item.image);

      imageUrl = `${publicUrl}?v=${new Date(item.updated_at).getTime()}`;
    }

    return {
      id: item.id,
      titleEn: item.title_en,
      titleAr: item.title_ar,
      categoryEn: item.category_en,
      categoryAr: item.category_ar,
      imagePath: item.image,
      imageUrl,
      href: item.href,
      displayOrder: item.display_order,
      isActive: item.is_active,
    };
  });
}

// Wrapper function that matches the 'FeaturedProductsData' interface expected by the UI
export async function getFeaturedProductsData() {
  const [products, section] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedSection(),
  ]);

  return {
    sectionLabelEn: section?.sectionLabelEn ?? "",
    sectionLabelAr: section?.sectionLabelAr ?? "",
    headingEn: section?.headingEn ?? "",
    headingAr: section?.headingAr ?? "",
    quoteEn: section?.quoteEn ?? "",
    quoteAr: section?.quoteAr ?? "",
    products,
  };
}