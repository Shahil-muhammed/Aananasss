"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { MenuItem, MenuSectionData } from "./MenuSection/menuSection.types";

type ItemModalProps = {
  item: MenuItem | null;
  section: (MenuSectionData & { isDark?: boolean }) | null;
  onClose: () => void;
};

export default function ItemModal({
  item,
  section,
  onClose,
}: ItemModalProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const previousScrollY = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!item || !section) {
      return;
    }

    previousScrollY.current = window.scrollY;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;

      if (previousScrollY.current !== null) {
        window.scrollTo({
          top: previousScrollY.current,
          behavior: "auto",
        });
      }
    };
  }, [item, section]);

  if (!item || !section) return null;

  // Rule of thumb from spec: dark fills take muted-ground-dark, light/default takes muted-ground
  const textureClass = section.isDark ? "muted-ground-dark" : "muted-ground";

  const categoryLabel = (
    isArabic ? section.titleAr : section.titleEn
  ).toUpperCase();

  const itemTitle = isArabic ? item.titleAr : item.titleEn;

  const itemDesc = isArabic
    ? item.descriptionAr
    : item.descriptionEn;

  const itemCaption = isArabic
    ? item.captionAr
    : item.captionEn;

  const itemOrigin = isArabic
    ? item.originAr ?? ""
    : item.originEn ?? "";

  const itemDisclaimer = isArabic
    ? item.disclaimerAr ?? ""
    : item.disclaimerEn ?? "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`${textureClass} relative w-full max-w-5xl rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] overflow-y-auto`}
        style={{
          backgroundColor: section.backgroundColor,
          color: section.accentColor, // Injects accent color as default text color
        }}
        onClick={(e) => e.stopPropagation()}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <button
          onClick={onClose}
          type="button"
          className={`absolute top-6 ${
            isArabic ? "left-6" : "right-6"
          } z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-xl hover:bg-black/10 transition-colors`}
          style={{ color: section.accentColor }}
          aria-label={isArabic ? "إغلاق النافذة" : "Close modal"}
        >
          ✕
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 items-center">

          {/* Image */}

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#3E4A23] shadow-inner flex items-end">
            {item.image ? (
              <Image
                src={item.image}
                alt={itemTitle}
                fill
                className="object-cover"
              />
            ) : (
              <span
                className="p-4 text-[10px] font-mono uppercase tracking-widest opacity-80"
                style={{ color: section.accentColor }}
              >
                {isArabic ? "الصورة قريباً" : "PHOTO COMING"}
              </span>
            )}
          </div>

          {/* Content */}

          <div
            className={`space-y-6 ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase opacity-70">
              {categoryLabel}
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic leading-tight">
              {itemTitle}
            </h2>

            {itemCaption && (
              <div
                className="inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  backgroundColor: section.accentColor,
                  color: section.backgroundColor, // High contrast contrast using background
                }}
              >
                {itemCaption}
              </div>
            )}

            <p className="text-sm sm:text-base leading-relaxed font-light opacity-90">
              {itemDesc}
            </p>

            <hr className="border-current opacity-20 my-6" />

            {/* Nutrition */}

            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 mb-3">
                {isArabic ? "لكل وجبة" : "PER SERVING"}
              </p>

              <div className="grid grid-cols-4 gap-2">

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic">
                    {item.kcal}
                    <span className="text-xs font-sans not-italic opacity-70">
                      {" "}
                      {isArabic ? "سعرة" : "kcal"}
                    </span>
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                    {isArabic ? "سعرات" : "CALORIES"}
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic">
                    {item.carbs}
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                    {isArabic ? "كربوهيدرات" : "CARBS"}
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic">
                    {item.protein}
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                    {isArabic ? "بروتين" : "PROTEIN"}
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic">
                    {item.fat}
                  </div>

                  <div className="text-[9px] font-mono uppercase tracking-wider opacity-60 mt-1">
                    {isArabic ? "دهون" : "FAT"}
                  </div>
                </div>

              </div>
            </div>

            <hr className="border-current opacity-20 my-6" />

            {/* Dynamic Origin & Allergens */}

            <div className="space-y-4">

              {itemOrigin && (
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 mb-1">
                    {isArabic ? "المصدر" : "ORIGIN"}
                  </p>

                  <p className="text-lg font-serif italic">
                    {itemOrigin}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 mb-2">
                  {isArabic ? "مسببات الحساسية" : "ALLERGENS"}
                </p>

                {item.allergens.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {item.allergens.map((allergen) => (
                      <div
                        key={allergen.code}
                        className="flex items-center gap-1.5"
                      >
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-current opacity-80 rounded uppercase">
                          {allergen.code}
                        </span>

                        <span className="text-xs font-medium opacity-90">
                          {isArabic
                            ? allergen.nameAr
                            : allergen.nameEn}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs italic opacity-70">
                    {isArabic ? "لا يوجد" : "None"}
                  </span>
                )}
              </div>

              {/* Dynamic Disclaimer Notice */}
              {itemDisclaimer && (
                <p className="text-[9px] font-mono uppercase tracking-widest opacity-50 pt-2">
                  {itemDisclaimer}
                </p>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}