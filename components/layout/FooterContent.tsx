"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FooterColumns from "./FooterColumns";

export default function FooterContent() {
  const t = useTranslations("Footer");

  return (
    <section className="overflow-hidden bg-[#31451B] text-[#EFE4D0]">
      <div className="mx-auto max-w-[1400px] px-5 py-5 sm:px-6 lg:px-8 lg:py-6">

        <div className="grid items-center gap-5 lg:grid-cols-[1fr_300px] lg:gap-6">

          {/* Left */}
          <div className="order-2 lg:order-1">

            <h2
              className="leading-[0.88] tracking-[-0.04em]"
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(42px,6vw,88px)",
              }}
            >
              <span className="block italic text-[#F3E8D4]">
                {t("headlineLine1")}
              </span>

              <span className="block italic text-[#DCDD6D]">
                {t("headlineLine2")}
              </span>
            </h2>

            <div className="mt-4 lg:mt-5">
              <FooterColumns />
            </div>

          </div>

          {/* Right */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <Image
              src="/icons/footer-parrot.png"
              alt="Footer Artwork"
              width={320}
              height={320}
              priority
              className="h-auto w-[140px] max-w-full select-none sm:w-[170px] md:w-[200px] lg:w-[250px]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}