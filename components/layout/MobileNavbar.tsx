"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import NavLinks from "./NavLinks";
import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navbar");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile Header */}
      <div className="flex h-20 items-center justify-between px-5 lg:hidden">

        <button onClick={() => setOpen(true)} className="text-black">
          <Menu size={28} color="black" className="fill-black stroke-black" />
        </button>

        <Link href="/">
          <Image
            src="/icons/wordmark-green.png"
            alt="Ananas"
            width={150}
            height={40}
          />
        </Link>

        <LanguageSwitcher />

      </div>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[999] bg-[#EFE4D0] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">

          <Image
            src="/icons/wordmark-green.png"
            alt="Ananas"
            width={170}
            height={45}
          />

          <button onClick={() => setOpen(false)}>
            <X size={30} />
          </button>

        </div>

        <nav className="flex flex-col gap-8 p-8 text-lg">
          <NavLinks onClick={() => setOpen(false)} />

          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-lg bg-[#F69234] py-4 text-center font-semibold text-white"
          >
            {t("viewMenu")}
          </Link>
        </nav>
      </div>
    </>
  );
}