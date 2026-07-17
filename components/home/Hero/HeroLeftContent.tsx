"use client";

import { HeroProps } from "./hero.types";

interface HeroLeftContentProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroLeftContent({
  data,
  locale,
}: HeroLeftContentProps) {
  const isArabic = locale === "ar";

  // Left content is only for English.
  // Arabic content will be rendered by HeroRightContent.
  if (isArabic) return null;

  return (
    <div className="relative mb-6 max-w-full lg:absolute lg:bottom-16 lg:left-14 lg:max-w-3xl">
      <h1
        className="
          font-serif
          italic
          text-white
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-[90px]
          leading-[0.95]
          tracking-[-0.03em]
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        "
      >
        {data.titleEn}
      </h1>

      <h2
        className="
          font-serif
          italic
          text-[#DCE56C]
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-[90px]
          leading-[0.95]
          tracking-[-0.03em]
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        "
      >
        {data.titleHighlightEn}
      </h2>
    </div>
  );
}