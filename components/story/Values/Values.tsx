"use client";

import { useLocale } from "next-intl";
import { valuesData } from "./values.data";

export default function Values() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <>
      {/* ===================== VALUES SECTION (GREEN WITH DOT MATRIX) ===================== */}
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="relative bg-[#3D4723] text-[#F7F3E8] py-24 md:py-32 selection:bg-[#D8D17A] selection:text-[#3D4723]"
      >
        {/* Dot Matrix Background Pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(rgba(247, 243, 232, 0.4) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
          {/* Section Label */}
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D8D17A] md:text-[11px]">
            {isArabic ? valuesData.sectionLabelAr : valuesData.sectionLabelEn}
          </p>

          {/* Main Heading */}
          <h2 className="max-w-4xl font-serif text-5xl italic leading-[1.05] tracking-normal md:text-7xl lg:text-[76px]">
            {isArabic ? valuesData.headingAr : valuesData.headingEn}
          </h2>

          {/* List Items Grid */}
          <div className="mt-20 border-t border-[#F7F3E8]/15">
            {valuesData.items.map((item) => (
              <div
                key={item.number}
                className="grid grid-cols-1 gap-4 border-b border-[#F7F3E8]/15 py-9 md:grid-cols-[70px_300px_1fr] md:items-baseline md:gap-8 lg:grid-cols-[80px_360px_1fr]"
              >
                {/* Number Format: 01, 02, 03 */}
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D8D17A]/90 md:text-[11px]">
                  {item.number}
                </div>

                {/* Item Title */}
                <h3 className="font-serif text-3xl italic tracking-tight md:text-4xl">
                  {isArabic ? item.titleAr : item.titleEn}
                </h3>

                {/* Item Description */}
                <p className="max-w-lg font-sans text-sm leading-[1.7] text-[#F7F3E8]/85 md:text-base">
                  {isArabic ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUOTE SECTION (BEIGE WITH LINE GRID) ===================== */}
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="relative overflow-hidden bg-[#E4DFCE] py-32 md:py-48"
      >
        {/* Subtle Graph Paper Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(43, 48, 29, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(43, 48, 29, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          {/* Quote Text */}
          <h2 className="font-serif text-3xl italic leading-[1.35] tracking-wide text-[#2B301D] md:text-5xl lg:text-[52px]">
            {isArabic ? valuesData.quoteAr : valuesData.quoteEn}
          </h2>

          {/* Quote Signature */}
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.45em] text-[#2B301D]/70 md:text-[11px]">
            {isArabic
              ? valuesData.quoteSignatureAr
              : valuesData.quoteSignatureEn}
          </p>
        </div>
      </section>
    </>
  );
}
