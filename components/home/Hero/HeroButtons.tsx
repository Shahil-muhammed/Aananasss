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
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:flex-row lg:justify-end lg:gap-3">
      {isArabic ? (
        <>
          {data.secondaryButton.isVisible && (
            <Link
              href={data.secondaryButton.href}
              className="w-full rounded-md border border-white/40 bg-transparent px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:w-auto"
            >
              {data.secondaryButton.labelAr}
            </Link>
          )}

          {data.primaryButton.isVisible && (
            <Link
              href={data.primaryButton.href}
              className="w-full rounded-md bg-[#D89A43] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 sm:w-auto"
            >
              {data.primaryButton.labelAr}
            </Link>
          )}
        </>
      ) : (
        <>
          {data.primaryButton.isVisible && (
            <Link
              href={data.primaryButton.href}
              className="w-full rounded-md bg-[#D89A43] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:opacity-90 sm:w-auto"
            >
              {data.primaryButton.labelEn}
            </Link>
          )}

          {data.secondaryButton.isVisible && (
            <Link
              href={data.secondaryButton.href}
              className="w-full rounded-md border border-white/40 bg-transparent px-4 py-3 text-sm font-medium uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black sm:w-auto"
            >
              {data.secondaryButton.labelEn}
            </Link>
          )}
        </>
      )}
    </div>
  );
}