"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { MenuIntroData } from "./menuIntro.types";

interface MenuIntroProps {
  locale?: string;
  data: MenuIntroData;
}

export default function MenuIntro({
  locale = "en",
  data,
}: MenuIntroProps) {
  const isArabic = locale === "ar";

  const [active, setActive] = useState(data.items[0]);

  return (
    <section
      className="relative overflow-hidden bg-[#435334] text-[#F8F4EC] py-12 lg:py-16"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* BACKGROUND MICRO-GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 0.5px, transparent 0.5px),
            linear-gradient(to bottom, #000 0.5px, transparent 0.5px)
          `,
          backgroundSize: "6px 6px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:grid lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:h-[75vh] lg:max-h-[700px] items-stretch gap-8">

          {/* Mobile Header */}
          <div className="lg:hidden flex-shrink-0">
            <div
              className={`flex items-center gap-4 mb-3 text-[10px] uppercase tracking-[3px] opacity-75 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <span className="text-[#C7D442] font-mono">
                {data.sectionNumber}
              </span>
              <span className="text-white/60">
                {isArabic ? data.sectionTitleAr : data.sectionTitleEn}
              </span>
            </div>

            <h2
              className={`font-serif italic text-3xl sm:text-4xl leading-[1.15] tracking-[-0.01em] text-white ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {isArabic ? data.headingLine1Ar : data.headingLine1En}
              <br />
              <span className="text-[#C7D442]">
                {isArabic ? data.headingLine2Ar : data.headingLine2En}
              </span>
            </h2>
          </div>

          {/* Image */}
          <div className="w-full lg:h-full lg:max-h-[420px] flex flex-col justify-center items-center lg:items-stretch lg:order-2">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-[1.2] sm:aspect-[1.5] lg:aspect-auto lg:h-full overflow-hidden shadow-xl rounded-sm"
            >
              <Image
                src={active.image}
                alt={isArabic ? active.titleAr : active.titleEn}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>

            <div
              className={`mt-3 text-[10px] tracking-wide w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <span className="text-[#C7D442] font-mono uppercase block text-[9px] opacity-75">
                {isArabic ? `طبق ${active.number}` : `PLATE ${active.number}`}
              </span>

              <span className="text-white/80 font-serif italic text-sm mt-0.5 block">
                {isArabic ? active.captionAr : active.captionEn}
              </span>
            </div>
          </div>

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full min-h-0 lg:order-1"
          >
            <div className="hidden lg:block flex-shrink-0">
              <div
                className={`flex items-center gap-4 mb-4 text-[10px] uppercase tracking-[3px] opacity-75 ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                <span className="text-[#C7D442] font-mono">
                  {data.sectionNumber}
                </span>

                <span className="text-white/60">
                  {isArabic ? data.sectionTitleAr : data.sectionTitleEn}
                </span>
              </div>

              <h2
                className={`font-serif italic lg:text-[46px] leading-[1.15] tracking-[-0.01em] text-white ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {isArabic ? data.headingLine1Ar : data.headingLine1En}
                <br />

                <span className="text-[#C7D442]">
                  {isArabic ? data.headingLine2Ar : data.headingLine2En}
                </span>
              </h2>
            </div>

            <div className="flex-1 min-h-0 mt-2 lg:mt-8 overflow-y-auto max-h-[320px] lg:max-h-none pr-1 pl-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="border-t border-white/10 divide-y divide-white/10">
                {data.items.map((item) => {
                  const isCurrentActive = active.id === item.id;

                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setActive(item)}
                      onClick={() => setActive(item)}
                      className="flex w-full items-center justify-between py-3.5 transition group"
                      style={{ textAlign: isArabic ? "right" : "left" }}
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-[9px] font-mono opacity-40 w-4">
                          {item.number}
                        </span>

                        <span
                          className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                          style={{
                            backgroundColor:
                              item.dotColor ?? "#C7D442",
                            transform: isCurrentActive
                              ? "scale(1.3)"
                              : "scale(1)",
                          }}
                        />

                        <div className="flex flex-col">
                          <span
                            className={`font-serif text-base sm:text-lg transition-colors ${
                              isCurrentActive
                                ? "text-[#C7D442]"
                                : "text-white/90 group-hover:text-[#C7D442]"
                            }`}
                          >
                            {isArabic ? item.titleAr : item.titleEn}
                          </span>

                          {item.descriptionEn && (
                            <span className="text-[10px] text-white/50 font-sans tracking-wide mt-0.5 max-w-[320px] line-clamp-1">
                              {isArabic
                                ? item.descriptionAr
                                : item.descriptionEn}
                            </span>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-xs font-mono transition-all duration-300 ${
                          isCurrentActive
                            ? "text-[#C7D442] opacity-100 translate-x-1"
                            : "text-white/30 opacity-40"
                        }`}
                      >
                        →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className={`mt-6 pt-2 flex-shrink-0 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <Link
                href="/menu"
                className="inline-flex w-full sm:w-auto justify-center items-center border border-[#C7D442] px-6 py-3 text-[10px] uppercase tracking-[4px] text-[#C7D442] transition-all duration-300 hover:bg-[#C7D442] hover:text-black"
              >
                {isArabic ? data.buttonAr : data.buttonEn}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}