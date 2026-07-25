"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

import { contactTopics } from "./contact.data";
import { ContactFormValues } from "./contact.types";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
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

  // --- Get Active Topic Object directly from contact.data.ts ---
  const selectedTopic =
    contactTopics.find((t) => t.id === form.topic) || contactTopics[0];

  // --- Validation ---
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

  // --- Trigger Mail Client ---
  const openMailClient = () => {
    const recipient = selectedTopic?.email || "info@ananas.com";
    const topicLabel = isArabic
      ? selectedTopic?.labelAr
      : selectedTopic?.labelEn;

    const subject = encodeURIComponent(`[Contact Form] ${topicLabel}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${
        form.phone || "N/A"
      }\nTopic: ${topicLabel}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  // --- Submit Handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 1. Open the mail app with pre-filled contents
    openMailClient();

    // 2. Set the success UI state
    setSubmitted(true);
  };

  // --- Copy Email Helper ---
  const handleCopyEmail = () => {
    const recipient = selectedTopic?.email || "info@ananas.com";
    navigator.clipboard.writeText(recipient);
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
    <section className="relative w-full bg-[#EBE5CD] py-10 sm:py-16 md:py-20 text-[#292723]">
      {/* Pure Tailwind Micro-Grid Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 md:px-8 w-full">
        {submitted ? (
          /* --- SUCCESS SCREEN --- */
          <div className="py-12 text-center">
            <h2 className="font-serif text-3xl sm:text-5xl italic text-[#334121]">
              {isArabic ? "تم فتح تطبيق البريد." : "Mail client opened."}
            </h2>
            <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-[#292723]/70">
              {isArabic
                ? "إذا لم يفتح التطبيق، يمكنك نسخ البريد الإلكتروني أدناه."
                : "If your mail app didn't launch, you can copy the email directly."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-[4px] border border-[#292723]/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition hover:border-[#292723]/70"
              >
                {isArabic ? "إرسال رسالة أخرى" : "SEND ANOTHER MESSAGE"}
              </button>

              <button
                type="button"
                onClick={openMailClient}
                className="font-mono text-xs uppercase tracking-[0.15em] text-[#292723]/60 underline hover:text-[#292723]"
              >
                {isArabic ? "إعادة فتح البريد" : "Re-open Mail App"}
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
                        setForm((prev) => ({
                          ...prev,
                          topic: topic.id,
                        }))
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

            {/* Submit & Copy Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-[4px] bg-[#DF9943] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#ce8b38] active:scale-[0.99]"
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
                    ? "تم نسخ البريد!"
                    : "EMAIL COPIED!"
                  : isArabic
                  ? "نسخ البريد الإلكتروني المباشر"
                  : "COPY DIRECT EMAIL"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
