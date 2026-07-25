"use client";

import { useLocale } from "next-intl";
import { heroData } from "./hero.data";

export default function Hero() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="bg-[#EFE7D6] border-b border-black/10 min-h-[50vh] flex flex-col justify-center py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="max-w-4xl">
          {/* Section Label */}
          <p className="mb-3 sm:mb-4 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-black/70 flex items-center gap-1.5">
            <span className="text-black/50">§</span>
            <span>
              {isArabic ? heroData.sectionLabelAr : heroData.sectionLabelEn}
            </span>
          </p>

          {/* Title */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic leading-[1.08] sm:leading-[1.05] tracking-tight text-[#1A2E12]">
            {isArabic ? heroData.titleAr : heroData.titleEn}
          </h1>

          {/* Subtitle */}
          {(heroData.subtitleEn || heroData.subtitleAr) && (
            <p className="mt-4 sm:mt-6 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-black/70">
              {isArabic ? heroData.subtitleAr : heroData.subtitleEn}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}