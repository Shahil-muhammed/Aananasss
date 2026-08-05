"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactTopicFormData {
  id: number;

  slug: string;

  labelEn: string;
  labelAr: string;

  email: string;

  displayOrder: number;

  isActive: boolean;
}

export async function createContactTopic() {
  const supabase = await createClient();

  const slug = `topic-${Date.now()}`;

  const { error } = await supabase
    .from("contact_topics")
    .insert({
      slug,

      label_en: "New Topic",
      label_ar: "موضوع جديد",

      email: "info@ananas.com",

      display_order: 0,

      is_active: true,
    });

  if (error) throw error;
}

export async function updateContactTopic(
  topic: ContactTopicFormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_topics")
    .update({
      slug: topic.slug,

      label_en: topic.labelEn,
      label_ar: topic.labelAr,

      email: topic.email,

      display_order: topic.displayOrder,

      is_active: topic.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", topic.id);

  if (error) throw error;
}

export async function deleteContactTopic(
  id: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_topics")
    .delete()
    .eq("id", id);

  if (error) throw error;
}