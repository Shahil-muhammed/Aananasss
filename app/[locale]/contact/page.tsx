import Hero from "@/components/contact/Hero";
import ContactForm from "@/components/contact/ContactForm";

import { getContactTopics } from "@/lib/contact/contact";

export default async function ContactPage() {
  const contactTopics = await getContactTopics();

  return (
    <main className="bg-[#EFE7D6]">
      <Hero />

      <ContactForm
        contactTopics={contactTopics}
      />
    </main>
  );
}