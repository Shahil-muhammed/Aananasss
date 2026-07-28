import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function updateHero(form: any, file: File | null) {
  let mediaPath = form.mediaPath;

  // Upload new image if selected
  if (file) {
    const extension = file.name.split(".").pop();
    
    // Fixed path so it replaces the old hero image instead of accumulating new ones
    const filePath = `hero/hero-media.${extension}`;

    // Optional: Delete old file if the extension changed (e.g. replacing .png with .webp)
    if (mediaPath && mediaPath !== filePath) {
      await supabase.storage
        .from("website-assets")
        .remove([mediaPath]);
    }

    // Upload with upsert: true to overwrite any existing file at filePath
    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(filePath, file, {
        cacheControl: "0", // Avoid CDN caching stale versions
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw uploadError;
    }

    mediaPath = filePath;
  }

  // Update hero table record
  const { error } = await supabase
    .from("hero")
    .update({
      media_type: form.mediaType,
      media_url: mediaPath, // Clean relative path saved in database
      media_alt: form.mediaAlt,

      overlay: form.overlay,
      overlay_opacity: form.overlayOpacity,

      title_en: form.titleEn,
      title_highlight_en: form.titleHighlightEn,

      title_ar: form.titleAr,
      title_highlight_ar: form.titleHighlightAr,

      subtitle_en: form.subtitleEn,
      subtitle_ar: form.subtitleAr,

      primary_label_en: form.primaryButton.labelEn,
      primary_label_ar: form.primaryButton.labelAr,
      primary_href: form.primaryButton.href,
      primary_visible: form.primaryButton.isVisible,

      secondary_label_en: form.secondaryButton.labelEn,
      secondary_label_ar: form.secondaryButton.labelAr,
      secondary_href: form.secondaryButton.href,
      secondary_visible: form.secondaryButton.isVisible,

      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error("Database update error:", error);
    throw error;
  }

  return mediaPath;
}