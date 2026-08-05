import { createClient } from "@/lib/supabase/server";

import ContactTopicsForm from "@/components/admin/contact/ContactTopicsForm";

export default async function ContactAdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_topics")
    .select("*")
    .order("display_order");

  if (error) {
    throw new Error("Failed to load contact topics.");
  }

  return (
    <ContactTopicsForm
      initialTopics={data.map((topic) => ({
        id: topic.id,

        slug: topic.slug,

        labelEn: topic.label_en,
        labelAr: topic.label_ar,

        email: topic.email,

        displayOrder: topic.display_order,

        isActive: topic.is_active,
      }))}
    />
  );
}
