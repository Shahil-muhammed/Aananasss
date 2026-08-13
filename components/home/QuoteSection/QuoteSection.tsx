"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { QuoteSectionData } from "./quote.types";

interface Props {
  data: QuoteSectionData;
}

export default function QuoteSection({ data }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      className="muted-ground relative overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: "#F3ECD8" }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 lg:px-16">
        <div className="grid items-start gap-12 lg:grid-cols-[180px_1fr]">

          {/* Side Notes */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-2 lg:pt-3"
          >
            <p className="whitespace-pre-line text-[10px] uppercase leading-[1.8] tracking-[3px] text-[#505050]">
              {isArabic ? data.labelAr : data.labelEn}
            </p>

            <p className="mt-2 text-[10px] uppercase tracking-[2px] text-[#DD9948]">
              {isArabic ? data.dateAr : data.dateEn}
            </p>
          </motion.div>

          {/* Quote Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full flex flex-col items-start"
          >
            {/* Quote Text */}
            <h2
              className="
                w-full
                font-serif
                italic
                text-[#1F1F1F]
                whitespace-pre-line
                leading-[1.4]
                tracking-[-0.01em]
                text-[26px]
                sm:text-[42px]
                lg:text-[54px]
              "
            >
              <span
                className={`text-[#DD9948] font-serif inline-block select-none ${
                  isArabic ? "ml-3" : "mr-2"
                }`}
              >
                {isArabic ? "«" : "“"}
              </span>

              {isArabic ? data.quoteAr : data.quoteEn}

              <span
                className={`text-[#DD9948] font-serif inline-block select-none ${
                  isArabic ? "mr-3" : "ml-2"
                }`}
              >
                {isArabic ? "»" : "”"}
              </span>
            </h2>

            {/* Footer */}
            <p
              className="
                mt-8
                lg:mt-10
                text-[10px]
                uppercase
                tracking-[3px]
                text-[#666]
                opacity-80
              "
            >
              {isArabic ? data.footerAr : data.footerEn}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}