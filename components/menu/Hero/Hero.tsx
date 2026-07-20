"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { heroData } from "./hero.data";

export default function Hero() {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const hasMedia = heroData.mediaUrl && heroData.mediaUrl.length > 0;

  return (
    <section className="relative overflow-hidden bg-[#F3ECD8] pt-20 pb-20 lg:pt-24 lg:pb-22 antialiased">
      {/* 1. Full-bleed Background Media */}
      {hasMedia && (
        <div className="absolute inset-0 z-0">
          {heroData.mediaType === "image" ? (
            <Image
              src={heroData.mediaUrl}
              alt={heroData.mediaAlt || "Hero Background"}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={heroData.mediaUrl} />
            </video>
          )}
          
          {/* Made the dark linear overlay thicker to guarantee complete text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45 mix-blend-multiply" />
        </div>
      )}

      {/* 2. Paper Grain Overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          opacity-[0.03]
          [background-image:radial-gradient(#000_0.7px,transparent_0.7px)]
          [background-size:12px_12px]
        "
      />

      {/* 3. Content Container */}
      <div className="relative z-20 mx-auto flex max-w-[1800px] flex-col gap-6 px-8 lg:px-10">
        
        {/* Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-[10px] uppercase tracking-[5px] text-white/95 font-semibold ${
            isArabic ? "text-right" : "text-left"
          }`}
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4)"
          }}
        >
          {isArabic ? heroData.labelAr : heroData.labelEn}
        </motion.p>

        {/* Heading with robust text shadows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`max-w-[1400px] ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          <h1
            className="font-serif leading-[1.02] tracking-[-0.02em]"
            style={{
              // Deepened shadow layers to ensure text pops off the screen perfectly
              textShadow: "0 12px 36px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.25)"
            }}
          >
            {/* Line 1 */}
            <span className="block text-white text-[48px] sm:text-[72px] md:text-[95px] lg:text-[120px] xl:text-[135px]">
              {isArabic ? heroData.titleLine1Ar : heroData.titleLine1En}
            </span>

            {/* Line 2 */}
            <span className="block italic text-[#ECE85D] text-[48px] sm:text-[72px] md:text-[95px] lg:text-[120px] xl:text-[135px]">
              {isArabic ? heroData.titleLine2Ar : heroData.titleLine2En}
            </span>
          </h1>
        </motion.div>
      </div>

      {/* 4. Bottom Utility Text Label — Only shows if background media is absent */}
      {!hasMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`absolute bottom-4 z-20 px-8 lg:px-12 w-full left-0 flex ${
            isArabic ? "justify-end" : "justify-start"
          }`}
        >
          <span 
            className="text-[9px] uppercase tracking-[1.5px] text-[#A8A08A] font-semibold"
            style={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
            }}
          >
            {heroData.mediaAlt || "PHOTO COMING"}
          </span>
        </motion.div>
      )}
    </section>
  );
}