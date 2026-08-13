"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

import { ContactFormValues, ContactTopic } from "./contact.types";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFormProps {
  contactTopics: ContactTopic[];
}

export default function ContactForm({ contactTopics }: ContactFormProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const defaultTopic = contactTopics[0]?.id || "general";

  const [form, setForm] = useState<ContactFormValues>({
    name: "",
    email: "",
    phone: "",
    topic: defaultTopic,
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedTopic =
    contactTopics.find((t) => t.id === form.topic) || contactTopics[0];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = isArabic ? "الاسم مطلوب" : "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = isArabic ? "البريد مطلوب" : "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = isArabic
        ? "عنوان بريد غير صالح"
        : "Invalid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = isArabic ? "الرسالة مطلوبة" : "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = isArabic
        ? "يجب أن تكون الرسالة 10 أحرف على الأقل"
        : "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getEmailContent = () => {
    const recipient = selectedTopic?.email || "info@ananas.com";
    const topicLabel = isArabic
      ? selectedTopic?.labelAr
      : selectedTopic?.labelEn;

    const subject = `[Contact Form] ${topicLabel}`;
    const rawBody = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${
      form.phone || "N/A"
    }\nTopic: ${topicLabel}\n\nMessage:\n${form.message}`;

    return { recipient, subject, rawBody };
  };

  // --- Open native mail client ---
  const openMailClient = () => {
    const { recipient, subject, rawBody } = getEmailContent();
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(rawBody);

    window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  // --- Open Webmail directly in browser tab ---
  const openWebmail = (provider: "gmail" | "outlook" | "yahoo") => {
    const { recipient, subject, rawBody } = getEmailContent();
    const encRecipient = encodeURIComponent(recipient);
    const encSubject = encodeURIComponent(subject);
    const encBody = encodeURIComponent(rawBody);

    let url = "";

    switch (provider) {
      case "gmail":
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encRecipient}&su=${encSubject}&body=${encBody}`;
        break;
      case "outlook":
        url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encRecipient}&subject=${encSubject}&body=${encBody}`;
        break;
      case "yahoo":
        url = `https://compose.mail.yahoo.com/?to=${encRecipient}&subject=${encSubject}&body=${encBody}`;
        break;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // First attempt native client
    openMailClient();
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    if (!validateForm()) return;

    const { recipient, subject, rawBody } = getEmailContent();
    const fullDraft = `To: ${recipient}\nSubject: ${subject}\n\n${rawBody}`;

    navigator.clipboard.writeText(fullDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      topic: defaultTopic,
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className="muted-ground relative w-full bg-[#EBE5CD] py-10 sm:py-16 md:py-20 text-[#292723]">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8 w-full z-10">
        {submitted ? (
          /* --- SUCCESS / WEBMAIL CHOICE SCREEN --- */
          <div className="py-12 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl italic text-[#334121]">
              {isArabic ? "اختر طريقة الإرسال" : "Choose how to send your message"}
            </h2>
            <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#292723]/70">
              {isArabic
                ? "إذا لم يفتح تطبيق البريد الإلكتروني، يمكنك فتح الخدمة في المتصفح مباشرة:"
                : "If a desktop mail app didn't open, send via browser:"}
            </p>

            {/* Webmail Quick Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openWebmail("gmail")}
                className="rounded-[4px] bg-[#EA4335] px-5 py-2.5 font-mono text-xs text-white uppercase tracking-wider hover:opacity-90"
              >
                {isArabic ? "فتح في Gmail" : "Open in Gmail"}
              </button>
              <button
                type="button"
                onClick={() => openWebmail("outlook")}
                className="rounded-[4px] bg-[#0078D4] px-5 py-2.5 font-mono text-xs text-white uppercase tracking-wider hover:opacity-90"
              >
                {isArabic ? "فتح في Outlook" : "Open in Outlook Web"}
              </button>
              <button
                type="button"
                onClick={() => openWebmail("yahoo")}
                className="rounded-[4px] bg-[#6001D2] px-5 py-2.5 font-mono text-xs text-white uppercase tracking-wider hover:opacity-90"
              >
                {isArabic ? "فتح في Yahoo" : "Open in Yahoo"}
              </button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#292723]/10 pt-6">
              <button
                type="button"
                onClick={openMailClient}
                className="font-mono text-xs uppercase tracking-[0.15em] text-[#292723]/80 underline hover:text-[#292723]"
              >
                {isArabic ? "إعادة محاولة فتح تطبيق البريد" : "Re-try Default Mail App"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-[4px] border border-[#292723]/30 px-6 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition hover:border-[#292723]/70"
              >
                {isArabic ? "إرسال رسالة أخرى" : "SEND ANOTHER MESSAGE"}
              </button>
            </div>
          </div>
        ) : (
          /* --- FORM --- */
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
            {/* Name */}
            <div>
              <label className="mb-2 block font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#292723]/70">
                {isArabic ? "الاسم" : "NAME"}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-[4px] border bg-transparent px-3.5 py-2.5 sm:py-3 font-mono text-xs sm:text-sm outline-none transition ${
                  errors.name
                    ? "border-red-600 focus:border-red-600"
                    : "border-[#292723]/20 focus:border-[#292723]/50"
                }`}
              />
              {errors.name && (
                <p className="mt-1 font-mono text-[10px] text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#292723]/70">
                {isArabic ? "البريد الإلكتروني" : "EMAIL"}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-[4px] border bg-transparent px-3.5 py-2.5 sm:py-3 font-mono text-xs sm:text-sm outline-none transition ${
                  errors.email
                    ? "border-red-600 focus:border-red-600"
                    : "border-[#292723]/20 focus:border-[#292723]/50"
                }`}
              />
              {errors.email && (
                <p className="mt-1 font-mono text-[10px] text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#292723]/70">
                {isArabic ? "الهاتف — اختياري" : "PHONE — OPTIONAL"}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-[4px] border border-[#292723]/20 bg-transparent px-3.5 py-2.5 sm:py-3 font-mono text-xs sm:text-sm outline-none transition focus:border-[#292723]/50"
              />
            </div>

            {/* Topic Selection */}
            <div>
              <label className="mb-3 block font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#292723]/70">
                {isArabic ? "الموضوع" : "TOPIC"}
              </label>

              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {contactTopics.map((topic) => {
                  const isActive = form.topic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, topic: topic.id }))
                      }
                      className={`rounded-full border px-4 sm:px-5 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] transition-all ${
                        isActive
                          ? "border-[#1F2710] bg-[#334121] text-[#E7F19E] font-semibold shadow-sm"
                          : "border-[#292723]/30 bg-transparent text-[#292723] hover:border-[#292723]/60"
                      }`}
                    >
                      {isArabic ? topic.labelAr : topic.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#292723]/70">
                {isArabic ? "الرسالة" : "MESSAGE"}
              </label>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                className={`w-full rounded-[4px] border bg-transparent p-3.5 font-mono text-xs sm:text-sm outline-none transition resize-y ${
                  errors.message
                    ? "border-red-600 focus:border-red-600"
                    : "border-[#292723]/20 focus:border-[#292723]/50"
                }`}
              />
              {errors.message && (
                <p className="mt-1 font-mono text-[10px] text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Direct Open Options */}
            <div className="space-y-3">
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-[4px] bg-[#334121] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#E7F19E] transition hover:bg-[#1F2710] active:scale-[0.99]"
                >
                  <span>{isArabic ? "إرسال الرسالة" : "SEND MESSAGE"}</span>
                  <span className="text-sm font-normal">→</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#292723]/60 hover:text-[#292723] text-center underline"
                >
                  {copied
                    ? isArabic
                      ? "تم نسخ مسودة البريد!"
                      : "EMAIL DRAFT COPIED!"
                    : isArabic
                    ? "نسخ مسودة البريد الكاملة"
                    : "COPY COMPLETE DRAFT"}
                </button>
              </div>

              {/* Direct Webmail Links under main button */}
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-[#292723]/60">
                <span>{isArabic ? "أو افتح في المتصفح:" : "Or open in browser:"}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (validateForm()) openWebmail("gmail");
                  }}
                  className="underline hover:text-[#292723]"
                >
                  Gmail
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    if (validateForm()) openWebmail("outlook");
                  }}
                  className="underline hover:text-[#292723]"
                >
                  Outlook
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    if (validateForm()) openWebmail("yahoo");
                  }}
                  className="underline hover:text-[#292723]"
                >
                  Yahoo
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}