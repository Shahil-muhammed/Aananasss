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

  return (
    <section className="sticky top-0 z-40 bg-[#D9E273] border-y border-black/10 py-2.5">
      <div className="mx-auto max-w-[1800px]">
        <div
          className="
            flex items-center gap-2
            overflow-x-auto snap-x snap-mandatory
            px-4 scroll-px-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            touch-pan-x sm:flex-wrap
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
                  snap-start whitespace-nowrap px-4 py-2
                  sm:px-3.5 sm:py-1.5 rounded-full
                  text-xs font-medium tracking-wide
                  transition-all duration-200
                  shrink-0 active:scale-95
                  touch-manipulation
                  ${
                    isActive
                      ? "bg-[#384824] text-[#D9E273]"
                      : "bg-transparent text-[#384824] border border-[#384824]/30 hover:border-[#384824]"
                  }
                `}
              >
                {isArabic
                  ? category.titleAr
                  : category.titleEn}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}