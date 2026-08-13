"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";

export default function DesktopNavbar() {
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const brandName = locale === "ar" ? t("brand") : "Ananas";
  const logoSrc = locale === "ar" ? "/icons/newarabiclogo.png" : "/icons/wordmark-green.png";

  return (
    <div className="hidden lg:flex mx-auto h-[84px] max-w-[1400px] items-center justify-between px-8">

      {/* Logo */}
      <Link href="/" className="shrink-0">
        <Image
          src={logoSrc}
          alt={brandName}
          width={210}
          height={60}
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-10">
        <NavLinks />
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <Link
          href="/menu"
          className="rounded-md bg-[#F69234] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:opacity-90"
        >
          {t("viewMenu")} →
        </Link>
      </div>

    </div>
  );
}