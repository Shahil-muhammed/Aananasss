import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface FeaturedProductForm {
  id: number;

  titleEn: string;
  titleAr: string;

  categoryEn: string;
  categoryAr: string;

  imagePath: string;

  href: string;

  displayOrder: number;

  isActive: boolean;
}

interface FeaturedSectionForm {
  id: number;

  sectionLabelEn: string;
  sectionLabelAr: string;

  headingEn: string;
  headingAr: string;

  quoteEn: string;
  quoteAr: string;
}

// ---------------------------------------------
// Update Product
// ---------------------------------------------
export async function updateFeaturedProduct(
  form: FeaturedProductForm,
  file: File | null
) {
  let imagePath = form.imagePath;

  if (file) {
    const extension = file.name.split(".").pop()?.toLowerCase();

    const filePath = `featured-products/product-${form.id}.${extension}`;

    // Delete old image if the path changed
    if (imagePath && imagePath !== filePath) {
      const { error: deleteError } = await supabase.storage
        .from("website-assets")
        .remove([imagePath]);

      if (deleteError) {
        console.warn(deleteError);
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "0",
      });

    if (uploadError) {
      console.error(uploadError);
      throw uploadError;
    }

    imagePath = filePath;
  }

  const { error } = await supabase
    .from("featured_products")
    .update({
      title_en: form.titleEn,
      title_ar: form.titleAr,

      category_en: form.categoryEn,
      category_ar: form.categoryAr,

      image: imagePath,

      href: form.href,

      display_order: form.displayOrder,

      is_active: form.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error(error);
    throw error;
  }

  return imagePath;
}

// ---------------------------------------------
// Update Featured Section
// ---------------------------------------------
export async function updateFeaturedSection(
  form: FeaturedSectionForm
) {
  const { error } = await supabase
    .from("featured_section")
    .update({
      section_label_en: form.sectionLabelEn,
      section_label_ar: form.sectionLabelAr,

      heading_en: form.headingEn,
      heading_ar: form.headingAr,

      quote_en: form.quoteEn,
      quote_ar: form.quoteAr,

      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------
// Create Product
// ---------------------------------------------
export async function createFeaturedProduct() {
  const { data, error } = await supabase
    .from("featured_products")
    .insert({
      title_en: "New Product",
      title_ar: "منتج جديد",

      category_en: "",
      category_ar: "",

      image: "",

      href: "#",

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
// Delete Product
// ---------------------------------------------
export async function deleteFeaturedProduct(
  id: number,
  imagePath: string
) {
  if (imagePath) {
    const { error: storageError } = await supabase.storage
      .from("website-assets")
      .remove([imagePath]);

    if (storageError) {
      console.error(storageError);
    }
  }

  const { error } = await supabase
    .from("featured_products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}