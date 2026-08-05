"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { FeaturedProductsData } from "./featured.types";

interface Props {
  data: FeaturedProductsData;
}

export default function FeaturedProducts({ data }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      className="relative overflow-hidden bg-[#F3ECD8] py-12 sm:py-20 lg:py-32"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* IDENTICAL BACKGROUND MICRO-GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.12]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 0.5px, transparent 0.5px),
            linear-gradient(to bottom, #000 0.5px, transparent 0.5px)
          `,
          backgroundSize: "6px 6px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1900px] px-4 sm:px-8 lg:px-9">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`mb-8 sm:mb-10 lg:mb-16 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <p className="mb-2 sm:mb-4 text-[9px] sm:text-[10px] uppercase tracking-[4px] sm:tracking-[6px] text-[#C77C3E]">
            {isArabic ? data.sectionLabelAr : data.sectionLabelEn}
          </p>

          <h2
            className="
              max-w-[720px]
              font-serif
              leading-[0.95]
              text-[#202020]
              text-3xl
              sm:text-5xl
              lg:text-7xl
            "
          >
            {isArabic ? data.headingAr : data.headingEn}
          </h2>
        </motion.div>

        {/* Product Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            sm:gap-6
            md:gap-8
          "
        >
          {data.products.map((product) => (
            <Link
              href={product.href}
              key={product.id}
              className="group overflow-hidden"
            >
              <div className="relative h-[220px] sm:h-[340px] lg:h-[400px] w-full overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={isArabic ? product.titleAr : product.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div
                  className={`absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  <p className="mb-1 text-[8px] sm:text-[11px] uppercase tracking-[2px] sm:tracking-[4px] opacity-80 truncate">
                    {isArabic ? product.categoryAr : product.categoryEn}
                  </p>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[42px] leading-tight sm:leading-none">
                    {isArabic ? product.titleAr : product.titleEn}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}