"use client";

import { useLocale, useTranslations } from "next-intl";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const isArabic = locale === "ar";

  return (
    <>
      {/* Top Announcement Bar (fixed) */}
      <div className="fixed top-0 left-0 w-full z-50 border-b border-black/5 bg-[#E5E56D]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-1 px-6 py-2 lg:flex-row lg:items-center lg:justify-between xl:px-8">
          {
            // Mobile: stacked. Desktop (lg+): row with space-between
          }
          <p
            className={`text-[10px] font-medium uppercase tracking-[3px] text-[#31451B] ${
              isArabic ? "text-right" : "text-left"
            } lg:text-left w-full lg:w-auto`}
          >
            {t("announcementIndependent")}
          </p>

          <p
            className={`text-[10px] font-medium uppercase tracking-[3px] text-[#31451B] ${
              isArabic ? "text-right" : "text-left"
            } lg:text-right w-full lg:w-auto`}
          >
            {t("announcementOpenDaily")}
          </p>
        </div>
      </div>

      {/* Main Navbar (fixed below announcement) */}
      <header className="fixed top-12 left-0 w-full z-40 border-b border-black/10 bg-[#EFE4D0] shadow-sm lg:top-8">
        <DesktopNavbar />
        <MobileNavbar />
      </header>

      {/* Spacer to offset fixed header + announcement so page content isn't hidden */}
      <div className="h-[128px] lg:h-[116px]" aria-hidden="true" />
    </>
  );
}