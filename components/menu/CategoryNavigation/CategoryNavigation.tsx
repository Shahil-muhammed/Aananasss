"use client";

import { useLayoutEffect, useRef } from "react";
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

  const hasScrolledOnMount = useRef(false);

  const allCategories: Category[] = [
    {
      id: "all",
      titleEn: "ALL",
      titleAr: "الكل",
    },
    ...categories,
  ];

  useLayoutEffect(() => {
    if (!hasScrolledOnMount.current) {
      hasScrolledOnMount.current = true;
      return;
    }

    if (activeCategory === "all") {
      return;
    }

    const section = document.getElementById(activeCategory);

    if (!section) {
      return;
    }

    const stickyOffset = 96;
    const top = window.scrollY + section.getBoundingClientRect().top - stickyOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  }, [activeCategory]);

  const scrollToSection = (id: string) => {
    onSelectCategory(id);
  };

  const scrollToIngredientOrigins = () => {
    const section = document.getElementById("ingredient-origins");

    if (!section) {
      return;
    }

    const stickyOffset = 96;
    const top = window.scrollY + section.getBoundingClientRect().top - stickyOffset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  };

  return (
    <section className="sticky top-0 z-40 bg-[#dbe868] py-3.5">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        <div
          className="
            flex flex-wrap items-center justify-center gap-1.5 sm:gap-2
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {allCategories.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => scrollToSection(category.id)}
                className={`
                  snap-start whitespace-nowrap px-3.5 py-1 sm:px-4 sm:py-1.5
                  rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase
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

          {/* SOURCING Button placed directly inline inside the wrapped flex flow */}
          <button
            type="button"
            onClick={scrollToIngredientOrigins}
            className="
              snap-start whitespace-nowrap px-4 py-1 sm:px-5 sm:py-1.5
              rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase
              transition-all duration-200
              shrink-0 active:scale-95 touch-manipulation
              bg-[#34401a] text-[#dbe868] border border-[#34401a]
              hover:opacity-95
            "
          >
            {isArabic ? "التوريد ↓" : "SOURCING ↓"}
          </button>
        </div>
      </div>
    </section>
  );
}