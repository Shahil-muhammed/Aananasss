"use client";

import { useLocale } from "next-intl";
import Image from "next/image";

import { MenuSectionData } from "./menuSection.types";

type Props = {
  section: MenuSectionData;
};

export default function MenuSection({ section }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      id={section.id}
      style={{ backgroundColor: section.backgroundColor }}
      className="relative py-20 overflow-hidden"
    >
      {/* Micro-Grid Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 items-start">

          {/* Left Column (Image) */}
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

          {/* Right Column (Header & Items) */}
          <div className="order-1 lg:order-2 space-y-8">
            
            {/* Section Header */}
            <div className="flex items-baseline gap-4 border-b border-black/10 pb-6">
              <span
                className="text-6xl font-serif italic font-light"
                style={{ color: section.accentColor }}
              >
                {section.number}
              </span>
              <h2
                className="text-5xl font-serif italic font-normal tracking-tight"
                style={{ color: section.accentColor }}
              >
                {isArabic ? section.titleAr : section.titleEn}
              </h2>
            </div>

            {/* Menu Items List */}
            <div className="space-y-8">
              {section.items.map((item) => (
                <article
                  key={item.id}
                  className="border-b border-black/10 pb-6"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className="text-2xl font-serif italic font-medium"
                        style={{ color: section.accentColor }}
                      >
                        {isArabic ? item.titleAr : item.titleEn}
                      </h3>

                      <p className="mt-1 text-sm text-black/70 max-w-md">
                        {isArabic ? item.descriptionAr : item.descriptionEn}
                      </p>

                      <div className="mt-4 flex gap-5 text-[11px] font-mono tracking-widest text-black/60 uppercase">
                        <span>P {item.protein}G</span>
                        <span>C {item.carbs}G</span>
                        <span>F {item.fat}G</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono tracking-wider text-black/70 uppercase">
                        {item.kcal} KCAL
                      </span>
                      {item.price && (
                        <div
                          className="mt-1 text-lg font-semibold"
                          style={{ color: section.accentColor }}
                        >
                          KD {item.price.toFixed(3)}
                        </div>
                      )}
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