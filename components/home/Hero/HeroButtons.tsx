"use client";

import { Link } from "@/i18n/navigation";
import { HeroProps } from "./hero.types";

interface HeroButtonsProps {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function HeroButtons({
  data,
  locale,
}: HeroButtonsProps) {
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex w-full flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto ${
        isArabic ? "justify-start lg:justify-start" : "justify-start lg:justify-end"
      }`}
    >
      {isArabic ? (
        <>
          {data.primaryButton.isVisible && (
            <Link
              href={data.primaryButton.href}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm bg-[#D89A43] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c48937] sm:w-auto"
            >
              <span>{data.primaryButton.labelAr}</span>
              <span className="text-xs">←</span>
            </Link>
          )}

          {data.secondaryButton.isVisible && (
            <Link
              href={data.secondaryButton.href}
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/30 bg-black/20 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:w-auto"
            >
              {data.secondaryButton.labelAr}
            </Link>
          )}
        </>
      ) : (
        <>
          {data.primaryButton.isVisible && (
            <Link
              href={data.primaryButton.href}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm bg-[#D89A43] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c48937] sm:w-auto"
            >
              <span>{data.primaryButton.labelEn}</span>
              <span className="text-xs">→</span>
            </Link>
          )}

          {data.secondaryButton.isVisible && (
            <Link
              href={data.secondaryButton.href}
              className="inline-flex w-full items-center justify-center rounded-sm border border-white/30 bg-black/20 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:w-auto"
            >
              {data.secondaryButton.labelEn}
            </Link>
          )}
        </>
      )}
    </div>
  );
}