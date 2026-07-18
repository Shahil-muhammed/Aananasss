"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function ProductTicker() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Content directly matching your reference design layout
  const items = isArabic
    ? [
        "كولد برو",
        "سبانيش لاتيه",
        "تشيزكيك المانجو",
        "جينجر شوت",
        "إسبرسو مثلج",
        "بيكان سوفت سيرف",
        "ماتشا لوش",
      ]
    : [
        "Cold brew",
        "Spanish latte",
        "Mango cheesecake",
        "Ginger shot",
        "Iced espresso",
        "Pecan soft serve",
        "Matcha lush",
      ];

  return (
    <section className="overflow-hidden border-y border-black/10 bg-[#F8ECA3] py-5">
      <div className="flex w-max" dir={isArabic ? "rtl" : "ltr"}>
        <motion.div
          className="flex gap-16 whitespace-nowrap px-8 text-[#222E18]"
          // In Arabic (RTL), moving positive 50% shifts it perfectly along the reversed axis
          animate={{ x: isArabic ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Render two exact identical sets to achieve a perfect seamless continuous wrap */}
          {[...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-16 font-serif text-2xl italic tracking-wide">
              <span>✦</span>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}