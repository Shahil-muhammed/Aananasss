"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

interface HeroProps {
  hero: {
    id: number;

    sectionLabelEn: string;
    sectionLabelAr: string;

    titleEn: string;
    titleHighlightEn: string;

    titleAr: string;
    titleHighlightAr: string;

    subtitleEn: string;
    subtitleAr: string;

    backgroundImage: string;

    overlayOpacity: number;

    stats: {
      id: number;

      labelEn: string;
      labelAr: string;

      valueEn: string;
      valueAr: string;
    }[];
  };
}

export default function Hero({
  hero,
}: HeroProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="relative w-full overflow-hidden font-sans">
      {/* ================= HERO ================= */}
      <div className="rich-ground relative overflow-hidden bg-[#3F4B26] text-[#F8F3E7]">

        {/* Background Image */}
        <Image
          src={hero.backgroundImage}
          alt="Our Story"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dynamic Dark Overlay */}
        <div
          className="absolute inset-0 bg-[#3F4B26]"
          style={{
            opacity: hero.overlayOpacity,
          }}
        />

        {/* Decorative Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#3F4B26]/40" />

        {/* Content Container */}
        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-14 md:min-h-[80vh] md:px-12 lg:px-16">
          <div
            className={`w-full max-w-3xl ${
              isArabic
                ? "text-center md:text-right"
                : "text-center md:text-left"
            }`}
          >
            {/* Heading */}
            <h1 className="font-serif text-2xl italic leading-[1.12] tracking-tight text-[#F8F3E7] sm:text-4xl md:text-5xl lg:text-[72px] lg:leading-[1.05]">
              {isArabic ? hero.titleAr : hero.titleEn}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-[#F8F3E7]/90 sm:mt-5 sm:text-sm md:mx-0 md:text-base md:leading-7">
              {isArabic
                ? hero.subtitleAr
                : hero.subtitleEn}
            </p>
          </div>
        </div>

        {/* ================= WAVE ================= */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 overflow-hidden sm:h-14 md:h-20">
          {/* Layer 1 */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundColor: "#DCD5C4",
              clipPath:
                "polygon(0.00% 40.00%, 4.17% 43.80%, 8.33% 45.76%, 12.50% 46.17%, 16.67% 45.35%, 20.83% 43.59%, 25.00% 41.18%, 29.17% 38.44%, 33.33% 35.66%, 37.50% 33.14%, 41.67% 31.18%, 45.83% 30.09%, 50.00% 30.16%, 54.17% 31.70%, 58.33% 35.00%, 62.38% 38.55%, 66.18% 40.77%, 69.77% 41.85%, 73.15% 42.00%, 76.36% 41.40%, 79.40% 40.25%, 82.29% 38.75%, 85.06% 37.10%, 87.72% 35.49%, 90.28% 34.13%, 92.78% 33.20%, 95.21% 32.90%, 97.62% 33.44%, 100.00% 35.00%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Layer 2 */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundColor: "#E4DDD0",
              clipPath:
                "polygon(0.00% 50.00%, 4.76% 45.05%, 9.52% 41.80%, 14.29% 39.95%, 19.05% 39.20%, 23.81% 39.26%, 28.57% 39.83%, 33.33% 40.62%, 38.10% 41.34%, 42.86% 41.69%, 47.62% 41.36%, 52.38% 40.08%, 57.14% 37.54%, 61.90% 33.44%, 66.67% 27.50%, 70.15% 22.95%, 73.47% 19.88%, 76.62% 18.07%, 79.59% 17.33%, 82.40% 17.43%, 85.03% 18.19%, 87.50% 19.38%, 89.80% 20.79%, 91.92% 22.24%, 93.88% 23.49%, 95.66% 24.35%, 97.28% 24.61%, 98.72% 24.07%, 100.00% 22.50%, 100% 100%, 0% 100%)",
            }}
          />

          {/* Layer 3 */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "#EBE5D8",
              clipPath:
                "polygon(0.00% 60.00%, 3.57% 55.45%, 7.14% 52.35%, 10.71% 50.50%, 14.29% 49.65%, 17.86% 49.59%, 21.43% 50.09%, 25.00% 50.94%, 28.57% 51.90%, 32.14% 52.74%, 35.71% 53.26%, 39.29% 53.22%, 42.86% 52.39%, 46.43% 50.56%, 50.00% 47.50%, 53.57% 44.33%, 57.14% 42.23%, 60.71% 41.02%, 64.29% 40.55%, 67.86% 40.64%, 71.43% 41.14%, 75.00% 41.88%, 78.57% 42.69%, 82.14% 43.42%, 85.71% 43.89%, 89.29% 43.95%, 92.86% 43.43%, 96.43% 42.17%, 100.00% 40.00%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="muted-ground bg-[#EBE5D8] px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-14 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:text-left md:grid-cols-3 md:gap-10 rtl:sm:text-right">
            {hero.stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col gap-1 border-b border-[#3F4B26]/10 pb-4 last:border-b-0 sm:border-b-0 sm:pb-0"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3F4B26]/60 sm:text-[11px] sm:tracking-[0.25em]">
                  {isArabic ? stat.labelAr : stat.labelEn}
                </p>

                <h3 className="font-serif text-2xl italic leading-none text-[#C68A4C] sm:text-3xl lg:text-[38px]">
                  {isArabic ? stat.valueAr : stat.valueEn}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}