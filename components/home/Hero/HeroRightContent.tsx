"use client";

import { HeroProps } from "./hero.types";

interface HeroRightContentProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroRightContent({
  data,
  locale,
}: HeroRightContentProps) {
  const isArabic = locale === "ar";

  if (isArabic) {
    return (
      <div className="relative mb-6 max-w-full text-right lg:absolute lg:bottom-16 lg:right-14 lg:max-w-3xl">
        <h1
          className="
            text-white
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[88px]
            font-bold
            leading-[1]
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
          "
        >
          {data.titleAr}
        </h1>

        <h2
          className="
            mt-2
            text-[#DCE56C]
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-[88px]
            font-bold
            leading-[1]
            drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
          "
        >
          {data.titleHighlightAr}
        </h2>
      </div>
    );
  }

  return (
    <div className="relative mb-6 max-w-full lg:absolute lg:bottom-28 lg:right-10 lg:max-w-sm">
      <p
        className="
          font-serif
          italic
          text-left
          text-sm
          leading-relaxed
          text-white/95
          sm:text-base
          md:text-lg
          lg:text-right
          lg:text-[24px]
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        "
      >
        {data.subtitleEn}
      </p>
    </div>
  );
}