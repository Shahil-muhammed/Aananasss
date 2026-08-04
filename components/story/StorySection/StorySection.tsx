"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { StorySectionData } from "./storySection.types";

interface StorySectionProps {
  section: StorySectionData;
}

export default function StorySection({
  section,
}: StorySectionProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Light vs Dark subtle grid overlay based on text color
  const isDarkBg = section.titleColor === "#F8F4E9";
  const gridColor = isDarkBg
    ? "rgba(248, 244, 233, 0.05)"
    : "rgba(0, 0, 0, 0.035)";

  return (
    <section
      style={{
        backgroundColor: section.backgroundColor,
      }}
      className="relative overflow-hidden py-12 sm:py-16 md:py-28"
    >
      {/* ================= BG GRID EFFECT ================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div
          className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${
            section.reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* ================= IMAGE ================= */}
          <div
            className={`${
              section.reverse ? "lg:col-start-2" : ""
            }`}
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] overflow-hidden rounded-sm">
              <Image
                src={section.image}
                alt={isArabic ? section.titleAr : section.titleEn}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 520px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div
            className={`mx-auto lg:mx-0 max-w-xl ${
              section.reverse ? "lg:col-start-1" : ""
            } ${
              isArabic
                ? "text-center lg:text-right"
                : "text-center lg:text-left"
            }`}
          >
            {/* Chapter */}
            <p
              className="mb-3 sm:mb-6 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.35em]"
              style={{
                color:
                  section.titleColor === "#F8F4E9"
                    ? "#F8F4E9CC"
                    : "#44444499",
              }}
            >
              {isArabic ? section.chapter.ar : section.chapter.en}
            </p>

            {/* Title */}
            <h2
              className="font-serif text-3xl sm:text-5xl lg:text-7xl italic leading-[1.05] sm:leading-[0.95]"
              style={{
                color: section.titleColor,
              }}
            >
              {isArabic
                ? section.titleAr
                : section.titleEn}
            </h2>

            {/* Description */}
            <p
              className="mt-6 sm:mt-10 text-sm sm:text-base leading-7 sm:leading-9"
              style={{
                color:
                  section.titleColor === "#F8F4E9"
                    ? "#F8F4E9"
                    : "#343434",
              }}
            >
              {isArabic
                ? section.descriptionAr
                : section.descriptionEn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}