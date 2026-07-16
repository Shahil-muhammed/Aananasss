"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLanguage() {
    router.replace(pathname, {
      locale: locale === "ar" ? "en" : "ar"
    });
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex h-10 w-20 items-center rounded-full border border-gray-300 bg-[#EFE4D0] p-1 transition-all hover:border-black"
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
          locale === "en"
            ? "bg-[#31451B] text-white"
            : "text-[#31451B]"
        }`}
      >
        EN
      </span>

      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
          locale === "ar"
            ? "bg-[#31451B] text-white"
            : "text-[#31451B]"
        }`}
      >
        ع
      </span>
    </button>
  );
}