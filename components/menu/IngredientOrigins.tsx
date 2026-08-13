"use client";

import { useLocale } from "next-intl";
import { IngredientOrigin } from "@/lib/menu/ingredientOrigins";

interface Props {
  items: IngredientOrigin[];
}

export default function IngredientOrigins({ items }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section 
      id="ingredient-origins"
      dir={isArabic ? "rtl" : "ltr"}
      className="muted-ground relative text-[#1E1D1B] py-14 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
      style={{
        backgroundColor: "#EBE8DB",
      }}
    >
      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Category Tag */}
        <div className="mb-4">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#76746A] uppercase">
            {isArabic ? "التوريد والمصادر" : "SOURCING"}
          </span>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light text-[#191817] tracking-tight leading-none">
            {isArabic ? "مصدر المكونات." : "Ingredient origins."}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#5C5B53] font-normal leading-relaxed max-w-xs">
            {isArabic
              ? "تفاصيل المنشأ وشهادة الحلال للمكونات المذكورة أدناه."
              : "Origin and halal certification details for the ingredients listed below."}
          </p>
        </div>

        {/* Hero Divider */}
        <div className="h-[1px] bg-[#CFCAC0] mb-10 w-full" />

        {/* Content Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mb-14">
          {items.map((item) => {
            const title = isArabic ? (item.titleAr || item.titleEn) : item.titleEn;
            const subtitle = isArabic ? (item.subtitleAr || item.subtitleEn) : item.subtitleEn;
            const origin = isArabic ? (item.originAr || item.originEn) : item.originEn;
            const halal = isArabic ? (item.halalAr || item.halalEn) : item.halalEn;

            return (
              <div key={item.id} className="flex flex-col">
                
                {/* Category Title */}
                <h3 className="font-serif italic text-2xl font-light text-[#191817] mb-1.5">
                  {title}
                </h3>
                
                {/* Subtitle */}
                <p className="font-sans text-xs text-[#5C5B53] font-normal leading-relaxed mb-6 min-h-[2.5rem]">
                  {subtitle}
                </p>

                {/* Monospace Row: Origin */}
                <div className="border-t border-[#CFCAC0] py-2">
                  <p className="font-mono text-[10px] tracking-[0.15em] text-[#191817] flex items-center gap-1.5">
                    <span className="text-[#878479]">
                      {isArabic ? "البلد الأصلي" : "ORIGIN"}
                    </span>
                    <span className="text-[#878479]">—</span>
                    <span className="font-medium">{origin}</span>
                  </p>
                </div>

                {/* Monospace Row: Halal Certification */}
                {halal && (
                  <div className="border-t border-[#CFCAC0] py-2">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-[#191817] flex items-center gap-1.5">
                      <span className="text-[#878479]">
                        {isArabic ? "شهادة الحلال" : "HALAL CERTIFICATION"}
                      </span>
                      <span className="text-[#878479]">—</span>
                      <span className="font-medium">{halal}</span>
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#76746A] uppercase">
          {isArabic
            ? "معلومات المسببات للحساسية متوفرة في صفحة كل عنصر."
            : "ALLERGEN INFORMATION IS AVAILABLE ON EACH ITEM PAGE."}
        </p>

      </div>
    </section>
  );
}