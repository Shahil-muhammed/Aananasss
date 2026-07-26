"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { ProductTickerData } from "./product-ticker.types";

interface Props {
  data: ProductTickerData;
}

export default function ProductTicker({ data }: Props) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const items = data.items.map((item) =>
    isArabic ? item.textAr : item.textEn
  );

  return (
    <section className="overflow-hidden border-y border-black/10 bg-[#F8ECA3] py-5">
      <div className="flex w-max" dir={isArabic ? "rtl" : "ltr"}>
        <motion.div
          className="flex gap-16 whitespace-nowrap px-8 text-[#222E18]"
          animate={{ x: isArabic ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-16 font-serif text-2xl italic tracking-wide"
            >
              <span>✦</span>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}