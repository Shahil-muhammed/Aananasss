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

  // Normalize color format for robust matching
  const bgColor = section.backgroundColor?.toUpperCase();

  // Determine whether to use dark (muted-ground-dark) or light (muted-ground) surface texture
  const isDarkBg =
    bgColor === "#1F1F1F" ||
    bgColor === "#000000" ||
    bgColor === "#1A1A1A" ||
    bgColor === "#3D4723" || // Added Olive Green dark grounds
    bgColor === "#3F4B26" ||
    section.titleColor?.toUpperCase() === "#F8F4E9" ||
    section.titleColor?.toUpperCase() === "#F7F3E8";

  // Use muted-ground-dark for dark surfaces as specified in your globals.css
  const surfaceTextureClass = isDarkBg ? "muted-ground-dark" : "muted-ground";

  return (
    <section
      style={{
        backgroundColor: section.backgroundColor,
      }}
      className={`${surfaceTextureClass} relative overflow-hidden py-12 sm:py-16 md:py-28`}
    >
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
                  section.titleColor === "#F8F4E9" || section.titleColor === "#F7F3E8"
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
                  section.titleColor === "#F8F4E9" || section.titleColor === "#F7F3E8"
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