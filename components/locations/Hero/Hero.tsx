"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { HeroData } from "./hero.types";

interface Props {
  hero: HeroData;
}

export default function Hero({
  hero,
}: Props) {
  const locale = useLocale();

  const isArabic = locale === "ar";

  return (
    <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={hero.backgroundImage}
        alt="Locations Hero"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          opacity: hero.overlayOpacity || 0.35,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-12">
        <div className="max-w-4xl">

          <p className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#E5E56D]">
            {isArabic
              ? hero.sectionLabelAr
              : hero.sectionLabelEn}
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[90px] italic leading-[0.92] tracking-tight text-white">
            {isArabic ? (
              <>
                {hero.titleAr}{" "}
                <span className="text-[#E5E56D]">
                  {hero.titleHighlightAr}
                </span>
              </>
            ) : (
              <>
                {hero.titleEn}
                <br />
                <span className="text-[#E5E56D]">
                  {hero.titleHighlightEn}
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-light text-white/80">
            {isArabic
              ? hero.subtitleAr
              : hero.subtitleEn}
          </p>

        </div>
      </div>
    </section>
  );
}