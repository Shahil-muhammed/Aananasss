import { createClient } from "@/lib/supabase/server";

import ValuesForm from "@/components/admin/story/values/ValuesForm";

export default async function StoryValuesPage() {
  const supabase = await createClient();

  const [
    valuesResult,
    itemsResult,
  ] = await Promise.all([
    supabase
      .from("story_values")
      .select("*")
      .single(),

    supabase
      .from("story_value_items")
      .select("*")
      .order("display_order"),
  ]);

  if (valuesResult.error || itemsResult.error) {
    throw new Error("Failed to load story values.");
  }

  return (
    <ValuesForm
      initialValues={{
        id: valuesResult.data.id,

        sectionLabelEn:
          valuesResult.data.section_label_en,
        sectionLabelAr:
          valuesResult.data.section_label_ar,

        headingEn:
          valuesResult.data.heading_en,
        headingAr:
          valuesResult.data.heading_ar,

        quoteEn:
          valuesResult.data.quote_en,
        quoteAr:
          valuesResult.data.quote_ar,

        quoteSignatureEn:
          valuesResult.data.signature_en,
        quoteSignatureAr:
          valuesResult.data.signature_ar,

        items: itemsResult.data.map((item) => ({
          id: item.id,

          number: item.number,

          titleEn: item.title_en,
          titleAr: item.title_ar,

          descriptionEn:
            item.description_en,
          descriptionAr:
            item.description_ar,

          displayOrder:
            item.display_order,
        })),
      }}
    />
  );
}