import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface BranchForm {
  id: number;

  titleEn: string;
  titleAr: string;

  locationEn: string;
  locationAr: string;

  badgeLabelEn: string; // <-- Added here
  badgeLabelAr: string; // <-- Added here

  imagePath: string;

  href: string;

  displayOrder: number;

  isActive: boolean;
}

interface BranchSectionForm {
  id: number;

  sectionNumber: string;

  sectionTitleEn: string;
  sectionTitleAr: string;

  headingLine1En: string;
  headingLine2En: string;

  headingLine1Ar: string;
  headingLine2Ar: string;
}

// ---------------------------------------------
// Update Branch
// ---------------------------------------------
export async function updateBranch(
  form: BranchForm,
  file: File | null
) {
  let imagePath = form.imagePath;

  if (file) {
    const extension = file.name.split(".").pop()?.toLowerCase();

    const filePath = `branches/store${form.id}.${extension}`;

    if (imagePath && imagePath !== filePath) {
      await supabase.storage
        .from("website-assets")
        .remove([imagePath]);
    }

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(filePath, file, {
        cacheControl: "0",
        upsert: true,
      });

    if (uploadError) {
      console.error(uploadError);
      throw uploadError;
    }

    imagePath = filePath;
  }

  const { error } = await supabase
    .from("branches")
    .update({
      title_en: form.titleEn,
      title_ar: form.titleAr,

      location_en: form.locationEn,
      location_ar: form.locationAr,

      badge_label_en: form.badgeLabelEn, // <-- Added here
      badge_label_ar: form.badgeLabelAr, // <-- Added here

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
// Update Section
// ---------------------------------------------
export async function updateBranchesSection(
  form: BranchSectionForm
) {
  const { error } = await supabase
    .from("branches_section")
    .update({
      section_number: form.sectionNumber,

      section_title_en: form.sectionTitleEn,
      section_title_ar: form.sectionTitleAr,

      heading_line1_en: form.headingLine1En,
      heading_line2_en: form.headingLine2En,

      heading_line1_ar: form.headingLine1Ar,
      heading_line2_ar: form.headingLine2Ar,

      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error(error);
    throw error;
  }
}

// ---------------------------------------------
// Create Branch
// ---------------------------------------------
export async function createBranch() {
  const { data, error } = await supabase
    .from("branches")
    .insert({
      title_en: "New Branch",
      title_ar: "فرع جديد",

      location_en: "",
      location_ar: "",

      badge_label_en: "BRANCH", // <-- Default added here
      badge_label_ar: "فرع",    // <-- Default added here

      image: "",

      href: "/locations/",

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
// Delete Branch
// ---------------------------------------------
export async function deleteBranch(
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
    .from("branches")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw error;
  }
}