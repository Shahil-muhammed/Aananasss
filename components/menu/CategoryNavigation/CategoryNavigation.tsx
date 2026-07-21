"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { menuCategories } from "./categoryNavigation.data";

type CategoryNavigationProps = {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
};

export default function CategoryNavigation({
  activeCategory,
  onSelectCategory,
}: CategoryNavigationProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Ref to target individual active button for auto-centering
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const scrollToSection = (id: string) => {
    // 1. Notify parent page component about state change
    onSelectCategory(id);

    // 2. Scroll the category button into the middle of the navigation bar
    const activeBtn = buttonRefs.current[id];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // 3. Scroll page section smoothly if needed
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="sticky top-0 z-40 bg-[#D9E273] border-y border-black/10 py-2.5">
      <div className="mx-auto max-w-[1800px]">
        <div 
          className="
            flex items-center gap-2 
            overflow-x-auto snap-x snap-mandatory 
            px-4 scroll-px-4 
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 
            touch-pan-x sm:flex-wrap
          "
        >
          {menuCategories.map((category) => {
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
                  snap-start whitespace-nowrap px-4 py-2 sm:px-3.5 sm:py-1.5 rounded-full
                  text-xs font-medium tracking-wide
                  transition-all duration-200 shrink-0
                  active:scale-95 touch-manipulation
                  ${
                    isActive
                      ? "bg-[#384824] text-[#D9E273]"
                      : "bg-transparent text-[#384824] border border-[#384824]/30 hover:border-[#384824]"
                  }
                `}
              >
                {isArabic ? category.titleAr : category.titleEn}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}