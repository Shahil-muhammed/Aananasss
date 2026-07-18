"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

// Use the updated data file defined above
import { featuredProductsData } from "./featured.data";

export default function FeaturedProducts() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const data = featuredProductsData;

  return (
    <section className="relative overflow-hidden bg-[#F3ECD8] py-16 sm:py-20 lg:py-32">
      {/* Grain Texture - matching the background of image_0.png */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.03]
          [background-image:radial-gradient(#000_0.7px,transparent_0.7px)]
          [background-size:12px_12px]
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1900px] px-8 lg:px-9">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`mb-10 lg:mb-16 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <p className="mb-4 text-[10px] uppercase tracking-[6px] text-[#C77C3E]">
            {isArabic ? data.sectionLabelAr : data.sectionLabelEn}
          </p>

          <h2
            className="
              max-w-[720px]
              font-serif
              leading-[0.95]
              text-[#202020]
              text-4xl
              sm:text-5xl
              lg:text-7xl
            "
          >
            {isArabic ? data.headingAr : data.headingEn}
          </h2>
        </motion.div>

        {/* Product Cards Grid (4 Columns) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
            md:gap-8
          "
        >
          {data.products.map((product) => (
            <Link
              href={product.href}
              key={product.id}
              className="group overflow-hidden"
            >
              {/* Card image with specific h-[560px] */}
              <div className="relative h-[280px] overflow-hidden sm:h-[340px] lg:h-[400px]">
                <Image
                  src={product.image} // <--- Loads generated images 1-4
                  alt={isArabic ? product.titleAr : product.titleEn}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text content matching image_0.png layout */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="mb-2 text-[11px] uppercase tracking-[4px] opacity-80">
                    {isArabic ? product.categoryAr : product.categoryEn}
                  </p>

                  <h3 className="font-serif text-[42px] leading-none">
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