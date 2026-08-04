"use server";

import { createClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB limit

// ============================================
// STORY HERO
// ============================================

export interface StoryHeroFormData {
  id: number;

  sectionLabelEn: string;
  sectionLabelAr: string;

  titleEn: string;
  titleHighlightEn: string;

  titleAr: string;
  titleHighlightAr: string;

  subtitleEn: string;
  subtitleAr: string;

  // Public URL (used only for preview)
  backgroundImage: string;

  // Storage path (used for saving)
  backgroundImagePath: string;

  overlayOpacity: number;
}

export async function updateStoryHero(
  hero: StoryHeroFormData,
  file?: File | null
) {
  const supabase = await createClient();

  // Keep existing storage path if no new file is uploaded
  let backgroundImage = hero.backgroundImagePath;

  if (file) {
    // Validate file size limit (1 MB)
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image file size exceeds the 1 MB limit.");
    }

    const extension = file.name.split(".").pop();
    const newPath = `story/hero/hero.${extension}`;

    // Clean up old hero file if extension changed
    if (hero.backgroundImagePath && hero.backgroundImagePath !== newPath) {
      await supabase.storage
        .from("website-assets")
        .remove([hero.backgroundImagePath]);
    }

    backgroundImage = newPath;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(backgroundImage, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("story_hero")
    .update({
      section_label_en: hero.sectionLabelEn,
      section_label_ar: hero.sectionLabelAr,

      title_en: hero.titleEn,
      title_highlight_en: hero.titleHighlightEn,

      title_ar: hero.titleAr,
      title_highlight_ar: hero.titleHighlightAr,

      subtitle_en: hero.subtitleEn,
      subtitle_ar: hero.subtitleAr,

      background_image: backgroundImage,

      overlay_opacity: hero.overlayOpacity,

      updated_at: new Date().toISOString(),
    })
    .eq("id", hero.id);

  if (error) {
    throw error;
  }

  return backgroundImage;
}

// ============================================
// STORY SECTIONS
// ============================================

export interface StorySectionFormData {
  id: number;

  slug: string;

  chapterEn: string;
  chapterAr: string;

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  image: string;

  imagePath: string;

  backgroundColor: string;

  titleColor: string;

  reverse: boolean;

  displayOrder: number;

  isActive: boolean;
}

export async function createStorySection() {
  const supabase = await createClient();

  const slug = `section-${Date.now()}`;

  const { data, error } = await supabase
    .from("story_sections")
    .insert({
      slug,

      chapter_en: "CH. 00",
      chapter_ar: "الفصل ٠٠",

      title_en: "New Story Section",
      title_ar: "قسم جديد",

      description_en: "",
      description_ar: "",

      image: "",

      background_color: "#ECEFC6",

      title_color: "#1F1F1F",

      reverse: false,

      display_order: 0,

      is_active: true,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateStorySection(
  section: StorySectionFormData,
  file?: File | null
) {
  const supabase = await createClient();

  let image = section.imagePath;

  if (file) {
    // Validate file size limit (1 MB)
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image file size exceeds the 1 MB limit.");
    }

    const extension = file.name.split(".").pop();
    const newImagePath = `story/sections/${section.slug}.${extension}`;

    // Delete existing storage file if path/extension changed
    if (section.imagePath && section.imagePath !== newImagePath) {
      await supabase.storage
        .from("website-assets")
        .remove([section.imagePath]);
    }

    image = newImagePath;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(image, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("story_sections")
    .update({
      slug: section.slug,

      chapter_en: section.chapterEn,
      chapter_ar: section.chapterAr,

      title_en: section.titleEn,
      title_ar: section.titleAr,

      description_en: section.descriptionEn,
      description_ar: section.descriptionAr,

      image,

      background_color: section.backgroundColor,

      title_color: section.titleColor,

      reverse: section.reverse,

      display_order: section.displayOrder,

      is_active: section.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", section.id);

  if (error) {
    throw error;
  }

  return image;
}

export async function deleteStorySection(id: number) {
  const supabase = await createClient();

  // 1. Fetch section first to get its image storage path
  const { data: section } = await supabase
    .from("story_sections")
    .select("image")
    .eq("id", id)
    .single();

  // 2. Remove file from storage if image path exists
  if (section?.image) {
    await supabase.storage
      .from("website-assets")
      .remove([section.image]);
  }

  // 3. Delete database record
  const { error } = await supabase
    .from("story_sections")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}


//--story values by shahil

// ============================================
// STORY VALUES
// ============================================

export interface StoryValuesFormData {
  id: number;

  sectionLabelEn: string;
  sectionLabelAr: string;

  headingEn: string;
  headingAr: string;

  quoteEn: string;
  quoteAr: string;

  quoteSignatureEn: string;
  quoteSignatureAr: string;
}

export async function updateStoryValues(
  values: StoryValuesFormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_values")
    .update({
      section_label_en: values.sectionLabelEn,
      section_label_ar: values.sectionLabelAr,

      heading_en: values.headingEn,
      heading_ar: values.headingAr,

      quote_en: values.quoteEn,
      quote_ar: values.quoteAr,

      signature_en: values.quoteSignatureEn,
      signature_ar: values.quoteSignatureAr,

      updated_at: new Date().toISOString(),
    })
    .eq("id", values.id);

  if (error) {
    throw error;
  }
}

export interface StoryValueItemFormData {
  id: number;

  number: string;

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  displayOrder: number;
}

export async function updateStoryValueItem(
  item: StoryValueItemFormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_value_items")
    .update({
      number: item.number,

      title_en: item.titleEn,
      title_ar: item.titleAr,

      description_en: item.descriptionEn,
      description_ar: item.descriptionAr,

      display_order: item.displayOrder,

      updated_at: new Date().toISOString(),
    })
    .eq("id", item.id);

  if (error) {
    throw error;
  }
}

export async function createStoryValueItem() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_value_items")
    .insert({
      number: "01",

      title_en: "New Value",
      title_ar: "قيمة جديدة",

      description_en: "",
      description_ar: "",

      display_order: 0,
    });

  if (error) {
    throw error;
  }
}

export async function deleteStoryValueItem(
  id: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_value_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

// ============================================
// STORY STATS
// ============================================

export interface StoryStatFormData {
  id: number;

  labelEn: string;
  labelAr: string;

  valueEn: string;
  valueAr: string;

  displayOrder: number;
}

export async function createStoryStat() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_stats")
    .insert({
      label_en: "New Stat",
      label_ar: "إحصائية جديدة",

      value_en: "0",
      value_ar: "٠",

      display_order: 0,
    });

  if (error) {
    throw error;
  }
}

export async function updateStoryStat(
  stat: StoryStatFormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_stats")
    .update({
      label_en: stat.labelEn,
      label_ar: stat.labelAr,

      value_en: stat.valueEn,
      value_ar: stat.valueAr,

      display_order: stat.displayOrder,

      updated_at: new Date().toISOString(),
    })
    .eq("id", stat.id);

  if (error) {
    throw error;
  }
}

export async function deleteStoryStat(
  id: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("story_stats")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}