"use client";

import { Playfair_Display, Inter } from "next/font/google";
import { useLocale } from "next-intl";
import Image from "next/image";

import { MenuItem, MenuSectionData } from "./menuSection.types";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {
  section: MenuSectionData & { isDark?: boolean };
  onSelectItem: (item: MenuItem, section: MenuSectionData) => void;
};

export default function MenuSection({ section, onSelectItem }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Rule of thumb: dark fills take muted-ground-dark, light/default takes muted-ground
  const textureClass = section.isDark ? "muted-ground-dark" : "muted-ground";
  const accentColor = section.accentColor || "#1B3622";

  return (
    <section
      id={section.id}
      style={{
        backgroundColor: section.backgroundColor || "#F7C5B8",
        color: accentColor, // Enforces the accent color on all nested text nodes
      }}
      className={`${textureClass} relative scroll-mt-24 overflow-hidden py-20 sm:scroll-mt-28`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-sm">
              <Image
                src={section.image}
                alt={section.titleEn}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 space-y-8 lg:order-2">
            <div className="flex items-baseline gap-4 border-b border-current opacity-90 pb-6">
              <span
                className={`${playfair.className} text-4xl font-normal italic md:text-5xl`}
              >
                {section.number}
              </span>

              <h2
                className={`${playfair.className} text-4xl font-normal italic md:text-5xl`}
              >
                {isArabic ? section.titleAr : section.titleEn}
              </h2>
            </div>

            <div className="space-y-8">
              {section.items.map((item) => (
                <article
                  key={item.id}
                  onClick={() => onSelectItem(item, section)}
                  className="cursor-pointer border-b border-current/20 pb-6 transition-opacity hover:opacity-80"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className={`${playfair.className} text-xl font-normal italic md:text-2xl`}
                      >
                        {isArabic ? item.titleAr : item.titleEn}
                      </h3>

                      <p
                        className={`${inter.className} mt-1 max-w-md text-xs font-normal opacity-75 md:text-sm`}
                      >
                        {isArabic ? item.descriptionAr : item.descriptionEn}
                      </p>

                      <div className="mt-4 flex gap-5 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs">
                        <span>C {item.carbs}</span>
                        <span>P {item.protein}</span>
                        <span>F {item.fat}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 md:text-xs">
                        {item.kcal} KCAL
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}