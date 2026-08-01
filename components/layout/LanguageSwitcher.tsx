"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  function toggleLanguage() {
    const newLocale = locale === "ar" ? "en" : "ar";

    setLoading(true);

    startTransition(() => {
      router.replace(pathname, {
        locale: newLocale,
      });
    });
  }

  return (
    <>
      {(loading || isPending) && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F4EC]/80 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#31451B] border-t-transparent" />
        </div>
      )}

      <button
        onClick={toggleLanguage}
        disabled={loading || isPending}
        className="flex h-10 w-20 items-center rounded-full border border-gray-300 bg-[#EFE4D0] p-1 transition-all hover:border-black disabled:opacity-70"
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
    </>
  );
}