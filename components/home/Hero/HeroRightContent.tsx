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

  const highContrastSerif =
    'var(--font-playfair), "Instrument Serif", Georgia, serif';

  if (isArabic) {
    return (
      <div className="w-full max-w-full text-right lg:max-w-[380px]">
        <p
          className="
            text-right
            text-sm
            text-white/95
            xs:text-base
            sm:text-lg
            lg:text-[1.25rem]
            leading-snug
            drop-shadow-md
          "
        >
          {data.subtitleAr}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full lg:max-w-[360px]">
      <p
        style={{
          fontFamily: highContrastSerif,
          fontStyle: "italic",
          fontWeight: 400,
          letterSpacing: "0.01em",
          lineHeight: 1.2,
        }}
        className="
          text-left
          text-xs
          text-white/95
          xs:text-sm
          sm:text-base
          md:text-lg
          lg:text-right
          lg:text-[1.25rem]
          drop-shadow-md
        "
      >
        {data.subtitleEn}
      </p>
    </div>
  );
}