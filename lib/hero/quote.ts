import { createClient } from "@/lib/supabase/server";
import { QuoteSectionData } from "@/components/home/QuoteSection/quote.types";

export async function getQuoteSection(): Promise<QuoteSectionData> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quote_section")
    .select("*")
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch quote section.");
  }

  return {
    labelEn: data.label_en,
    labelAr: data.label_ar,

    dateEn: data.date_en,
    dateAr: data.date_ar,

    quoteEn: data.quote_en,
    quoteAr: data.quote_ar,

    footerEn: data.footer_en,
    footerAr: data.footer_ar,
  };
}