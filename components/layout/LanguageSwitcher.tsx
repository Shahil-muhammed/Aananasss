"use client";

import { useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import PageLoader from "../ui/PageLoader";

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
      {(loading || isPending) && <PageLoader />}

      <button
        onClick={toggleLanguage}
        disabled={loading || isPending}
        className="flex h-8 w-[74px] items-center overflow-hidden rounded-full border border-[#31451B] bg-[#EFE4D0] p-0.5 transition-all disabled:opacity-70"
      >
        <span
          className={`flex h-full w-1/2 items-center justify-center rounded-full text-[8px] font-medium uppercase tracking-[0.24em] transition-all ${
            locale === "en"
              ? "bg-[#31451B] text-[#D8D17A]"
              : "text-[#31451B]"
          }`}
        >
          EN
        </span>

        <span
          className={`flex h-full w-1/2 items-center justify-center rounded-full text-[8px] font-medium uppercase tracking-[0.24em] transition-all ${
            locale === "ar"
              ? "bg-[#31451B] text-[#D8D17A]"
              : "text-[#31451B]"
          }`}
        >
          ع
        </span>
      </button>
    </>
  );
}