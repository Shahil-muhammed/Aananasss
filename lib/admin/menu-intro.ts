import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface MenuIntroSectionForm {
  id: number;
  sectionNumber: string;
  sectionTitleEn: string;
  sectionTitleAr: string;
  headingLine1En: string;
  headingLine2En: string;
  headingLine1Ar: string;
  headingLine2Ar: string;
  buttonEn: string;
  buttonAr: string;
}

interface MenuItemForm {
  id: number;
  number: string;
  titleEn: string;
  titleAr: string;
  imagePath: string;
  dotColor: string;
  descriptionEn: string;
  descriptionAr: string;
  captionEn: string;
  captionAr: string;
  displayOrder: number;
  isActive: boolean;
}

// ------------------------------------------------
// Helper: Safe Storage Deletion
// ------------------------------------------------
async function removeImageIfNotShared(pathToRemove: string, currentItemId: number) {
  if (!pathToRemove) return;

  // Check if ANY OTHER item uses this exact imagePath
  const { data: sharingItems, error } = await supabase
    .from("menu_intro_items")
    .select("id")
    .eq("image", pathToRemove)
    .neq("id", currentItemId);

  if (error) {
    console.error("Error checking shared images:", error);
    return;
  }

  // If no other item is using this path, safe to remove from storage
  if (!sharingItems || sharingItems.length === 0) {
    const { error: deleteError } = await supabase.storage
      .from("website-assets")
      .remove([pathToRemove]);

    if (deleteError) {
      console.error("Failed to remove unused image from storage:", deleteError);
    }
  }
}

// ------------------------------------------------
// Update Section
// ------------------------------------------------
export async function updateMenuIntroSection(form: MenuIntroSectionForm) {
  const { error } = await supabase
    .from("menu_intro")
    .update({
      section_number: form.sectionNumber,
      section_title_en: form.sectionTitleEn,
      section_title_ar: form.sectionTitleAr,
      heading_line1_en: form.headingLine1En,
      heading_line2_en: form.headingLine2En,
      heading_line1_ar: form.headingLine1Ar,
      heading_line2_ar: form.headingLine2Ar,
      button_en: form.buttonEn,
      button_ar: form.buttonAr,
      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error(error);
    throw error;
  }
}

// ------------------------------------------------
// Update Item
// ------------------------------------------------
export async function updateMenuItem(
  form: MenuItemForm,
  file: File | null
) {
  let imagePath = form.imagePath;

  if (file) {
    const extension = file.name.split(".").pop();
    // Unique filename per save action to avoid cache overlap when replacing
    const newFilePath = `products/menu-item-${form.id}-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(newFilePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError);
      throw uploadError;
    }

    // Clean up the old image if it exists and isn't shared by another item
    if (form.imagePath && form.imagePath !== newFilePath) {
      await removeImageIfNotShared(form.imagePath, form.id);
    }

    imagePath = newFilePath;
  }

  const { error } = await supabase
    .from("menu_intro_items")
    .update({
      number: form.number,
      title_en: form.titleEn,
      title_ar: form.titleAr,
      image: imagePath,
      dot_color: form.dotColor,
      description_en: form.descriptionEn,
      description_ar: form.descriptionAr,
      caption_en: form.captionEn,
      caption_ar: form.captionAr,
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

// ------------------------------------------------
// Create Item
// ------------------------------------------------
export async function createMenuItem() {
  const { data, error } = await supabase
    .from("menu_intro_items")
    .insert({
      number: "00",
      title_en: "New Item",
      title_ar: "عنصر جديد",
      image: "",
      dot_color: "#C7D442",
      description_en: "",
      description_ar: "",
      caption_en: "",
      caption_ar: "",
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

// ------------------------------------------------
// Delete Item
// ------------------------------------------------
export async function deleteMenuItem(
  id: number,
  imagePath: string
) {
  // Use safety check before deleting file upon item removal
  if (imagePath) {
    await removeImageIfNotShared(imagePath, id);
  }

  const { error } = await supabase
    .from("menu_intro_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}