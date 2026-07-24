"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { heroData } from "./hero.data";

export default function Hero() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px] overflow-hidden">
      {/* Background Image - Full Bleed */}
      <Image
        src={heroData.backgroundImage}
        alt="Locations Hero"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ opacity: heroData.overlayOpacity || 0.35 }}
      />

      {/* Content Container (Matches max-w-7xl alignment of cards grid below) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-12">
        <div className="max-w-4xl">
          {/* Label */}
          <p className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#E5E56D]">
            {isArabic
              ? heroData.sectionLabelAr
              : heroData.sectionLabelEn}
          </p>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[90px] italic leading-[0.92] tracking-tight text-white">
            {isArabic ? (
              <>
                {heroData.titleAr}{" "}
                <span className="text-[#E5E56D]">
                  {heroData.titleHighlightAr}
                </span>
              </>
            ) : (
              <>
                {heroData.titleEn}
                <br />
                <span className="text-[#E5E56D]">
                  {heroData.titleHighlightEn}
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-light text-white/80">
            {isArabic
              ? heroData.subtitleAr
              : heroData.subtitleEn}
          </p>
        </div>
      </div>
    </section>
  );
}