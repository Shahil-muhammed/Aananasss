"use client";

import { useTranslations } from "next-intl";

export default function FooterBottom() {
  const t = useTranslations("Footer");

  return (
    <div className="border-t border-[#556738] bg-[#31451B]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 text-center text-sm text-[#D8D59B] lg:flex-row lg:px-8 lg:text-left">

        <p>{t("copyright")}</p>

        <p>{t("slogan")}</p>

      </div>
    </div>
  );
}