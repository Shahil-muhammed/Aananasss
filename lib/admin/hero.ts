import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function updateHero(form: any, file: File | null) {
  let mediaUrl = form.mediaUrl;

  // Upload new image if selected
  if (file) {
    // Delete previous image
    if (mediaUrl) {
      const { error: deleteError } = await supabase.storage
        .from("website-assets")
        .remove([mediaUrl]);

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
      console.error(uploadError);
      throw uploadError;
    }

    mediaUrl = filePath;
  }

  // Update hero table
  const { error } = await supabase
    .from("hero")
    .update({
      media_type: form.mediaType,
      media_url: mediaUrl,
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
    console.error(error);
    throw error;
  }

  return true;
}