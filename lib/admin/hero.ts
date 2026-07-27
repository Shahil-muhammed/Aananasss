import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function updateHero(form: any, file: File | null) {
  // Always default to the stored relative path (form.mediaPath), NOT the full public URL
  let mediaPath = form.mediaPath;

  // Upload new image if selected
  if (file) {
    // Delete previous image using the relative path
    if (mediaPath) {
      const { error: deleteError } = await supabase.storage
        .from("website-assets")
        .remove([mediaPath]);

      if (deleteError) {
        console.error("Delete error:", deleteError);
      }
    }

    // Create unique file name
    const extension = file.name.split(".").pop();
    const fileName = `${Date.now()}.${extension}`;
    const filePath = `hero/${fileName}`;

    // Upload new image
    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    mediaPath = filePath;
  }

  // Update hero table with the clean path
  const { error } = await supabase
    .from("hero")
    .update({
      media_type: form.mediaType,
      media_url: mediaPath, // Always save the relative path to DB
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

  return mediaPath; // Return the new path so the component state can stay in sync
}