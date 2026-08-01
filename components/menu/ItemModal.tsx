"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { MenuItem, MenuSectionData } from "./MenuSection/menuSection.types";

type ItemModalProps = {
  item: MenuItem | null;
  section: MenuSectionData | null;
  onClose: () => void;
};

export default function ItemModal({ item, section, onClose }: ItemModalProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  if (!item || !section) return null;

  const categoryLabel = (isArabic ? section.titleAr : section.titleEn).toUpperCase();
  const itemTitle = isArabic ? item.titleAr : item.titleEn;
  const itemDesc = isArabic ? item.descriptionAr : item.descriptionEn;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden transition-all duration-300 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: section.backgroundColor }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-xl text-black/70 hover:bg-black/10 transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14 items-center">
          {/* Image Box */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#3E4A23] shadow-inner flex items-end">
            {item.image ? (
              <Image
                src={item.image}
                alt={itemTitle}
                fill
                className="object-cover"
              />
            ) : (
              <span className="p-4 text-[10px] font-mono uppercase tracking-widest text-[#98A366]">
                PHOTO COMING
              </span>
            )}
          </div>

          {/* Details */}
          <div className={`space-y-6 ${isArabic ? "text-right" : "text-left"}`}>
            <p className="text-[11px] font-mono tracking-[0.2em] text-black/60 uppercase">
              {categoryLabel}
            </p>

            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-serif italic leading-tight"
              style={{ color: section.accentColor }}
            >
              {itemTitle}
            </h2>

            <p className="text-sm sm:text-base text-black/75 leading-relaxed font-light">
              {itemDesc}
            </p>

            <hr className="border-black/10 my-6" />

            {/* Per Serving Macros */}
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50 mb-3">
                PER SERVING
              </p>
              <div className="grid grid-cols-4 gap-2 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic text-[#C68032]">
                    {item.kcal} <span className="text-xs font-sans not-italic text-black/60">kcal</span>
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-black/50 mt-1">
                    CALORIES
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic text-[#C68032]">
                    {item.protein}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-black/50 mt-1">
                    PROTEIN
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic text-[#C68032]">
                    {item.carbs}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-black/50 mt-1">
                    CARBS
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-serif italic text-[#C68032]">
                    {item.fat}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-black/50 mt-1">
                    FAT
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-black/10 my-6" />

            {/* Origin & Dynamic Allergens */}
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50 mb-1">
                  ORIGIN
                </p>
                <p className="text-lg font-serif italic" style={{ color: section.accentColor }}>
                  Crafted in-house
                </p>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50 mb-2">
                  ALLERGENS
                </p>

                {item.allergens && item.allergens.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {item.allergens.map((allergen) => (
                      <div key={allergen.code} className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-black/30 rounded uppercase text-black/80">
                          {allergen.code}
                        </span>
                        <span className="text-xs text-black/80 font-medium">
                          {isArabic && allergen.nameAr ? allergen.nameAr : allergen.nameEn}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-black/60 italic">None</span>
                )}
              </div>

              <p className="text-[9px] font-mono uppercase tracking-widest text-black/40 pt-2">
                INDICATIVE ONLY – CONFIRM WITH THE BAR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}