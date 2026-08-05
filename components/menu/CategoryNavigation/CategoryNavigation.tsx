"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";

interface Category {
  id: string;
  titleEn: string;
  titleAr: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function CategoryNavigation({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryNavigationProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const allCategories: Category[] = [
    {
      id: "all",
      titleEn: "ALL",
      titleAr: "الكل",
    },
    ...categories,
  ];

  const scrollToSection = (id: string) => {
    onSelectCategory(id);

    const activeBtn = buttonRefs.current[id];

    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    if (id !== "all") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToIngredientOrigins = () => {
    document.getElementById("ingredient-origins")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="sticky top-0 z-40 bg-[#dbe868] py-4">
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div
          className="
            flex flex-wrap items-center justify-center gap-x-2 gap-y-2.5
            px-4 sm:px-16
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {allCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                ref={(el) => {
                  buttonRefs.current[category.id] = el;
                }}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToSection(category.id)}
                className={`
                  snap-start whitespace-nowrap px-4 py-1.5
                  rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase
                  transition-all duration-200
                  shrink-0 active:scale-95 touch-manipulation
                  ${
                    isActive
                      ? "bg-[#34401a] text-[#dbe868] border border-[#34401a]"
                      : "bg-transparent text-[#34401a] border border-[#34401a]/40 hover:border-[#34401a]"
                  }
                `}
              >
                {isArabic ? category.titleAr : category.titleEn}
              </button>
            );
          })}
        </div>

        {/* Floating SOURCING Button matching image position */}
        <div className="mt-2 flex justify-end sm:absolute sm:right-6 sm:bottom-0 sm:mt-0">
          <button
            type="button"
            onClick={scrollToIngredientOrigins}
            className="
              shrink-0
              rounded-full
              bg-[#34401a]
              px-5
              py-1.5
              text-[11px]
              font-semibold
              tracking-[0.18em]
              text-[#dbe868]
              transition-all
              hover:opacity-95
              active:scale-95
              border border-[#34401a]
            "
          >
            {isArabic ? "التوريد ↓" : "SOURCING ↓"}
          </button>
        </div>
      </div>
    </section>
  );
}