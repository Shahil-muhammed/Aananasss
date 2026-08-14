"use client";

import {Link, usePathname} from "@/i18n/navigation";
import {useTranslations} from "next-intl";

type Props = {
  onClick?: () => void;
};

export default function NavLinks({onClick}: Props) {
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const links = [
    {label: t("home"), href: "/"},
    {label: t("menu"), href: "/menu"},
    {label: t("story"), href: "/our-story"},
    {label: t("locations"), href: "/locations"},
    {label: t("contact"), href: "/contact"}
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className={`relative pb-2 text-[9px] uppercase tracking-[3px] transition ${
            pathname === link.href
              ? "text-black"
              : "text-black/70 hover:text-black"
          }`}
        >
          {link.label}

          {pathname === link.href && (
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#F69234]" />
          )}
        </Link>
      ))}
    </>
  );
}