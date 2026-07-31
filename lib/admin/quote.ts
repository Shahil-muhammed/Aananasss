import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface QuoteForm {
  id: number;

  labelEn: string;
  labelAr: string;

  dateEn: string;
  dateAr: string;

  quoteEn: string;
  quoteAr: string;

  footerEn: string;
  footerAr: string;
}

export async function updateQuoteSection(
  form: QuoteForm
) {
  const { error } = await supabase
    .from("quote_section")
    .update({
      label_en: form.labelEn,
      label_ar: form.labelAr,

      date_en: form.dateEn,
      date_ar: form.dateAr,

      quote_en: form.quoteEn,
      quote_ar: form.quoteAr,

      footer_en: form.footerEn,
      footer_ar: form.footerAr,

      updated_at: new Date().toISOString(),
    })
    .eq("id", form.id);

  if (error) {
    console.error(error);
    throw error;
  }
}