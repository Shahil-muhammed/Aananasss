"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function FooterColumns() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const visit = [
    { label: t("home"), href: "/" },
    { label: t("menu"), href: "/menu" },
    { label: t("story"), href: "/our-story" },
    { label: t("locations"), href: "/locations" },
    { label: t("contact"), href: "/contact" },
  ];

  const branches = [
    t("branches.kuwaitCity"),
    t("branches.jabriya"),
    t("branches.alQurain"),
    t("branches.aswaqQurain"),
    t("branches.adailiya"),
  ];

  const socials = [
    t("social.instagram"),
    t("social.tiktok"),
    t("social.whatsapp"),
  ];

  const heading =
    "mb-2 border-t border-[#56692F] pt-2 text-[10px] font-medium uppercase tracking-[3px] text-[#D8D58B]";

  const item =
    "py-0.5 text-[14px] leading-6 text-[#EFE4D0] transition-colors duration-200 hover:text-[#E6DE69]";

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {/* Visit */}
      <div className={locale === "ar" ? "text-right" : "text-left"}>
        <h3 className={heading}>{t("visit")}</h3>

        <nav className="flex flex-col">
          {visit.map((link) => (
            <Link key={link.href} href={link.href} className={item}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Find Us */}
      <div className={locale === "ar" ? "text-right" : "text-left"}>
        <h3 className={heading}>{t("findUs")}</h3>

        <div className="flex flex-col">
          {branches.map((branch) => (
            <p key={branch} className={item}>
              {branch}
            </p>
          ))}

          <Link
            href="/locations"
            className="mt-2 text-[10px] font-semibold uppercase tracking-[3px] text-[#DCDD6D] hover:underline"
          >
            {t("allBranches")} →
          </Link>
        </div>
      </div>

      {/* Follow */}
      <div className={locale === "ar" ? "text-right" : "text-left"}>
        <h3 className={heading}>{t("follow")}</h3>

        <div className="flex flex-col">
          {socials.map((social) => (
            <a
              key={social}
              href="#"
              className={item}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}