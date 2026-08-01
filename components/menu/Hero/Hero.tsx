"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { MenuHeroData } from "./hero.types";

interface HeroProps {
  data: MenuHeroData;
}

export default function Hero({ data }: HeroProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const hasMedia = !!data.mediaUrl;
  const isBackground = data.display === "background";
  const isInline = data.display === "inline";

  return (
    <section className="relative overflow-hidden bg-[#F3ECD8] pt-20 pb-20 lg:pt-24 lg:pb-22 antialiased">
      {/* Background Media */}
      {hasMedia && isBackground && (
        <div className="absolute inset-0 z-0">
          {data.mediaType === "image" ? (
            <Image
              src={data.mediaUrl}
              alt={data.mediaAlt}
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
              <source src={data.mediaUrl} />
            </video>
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45 mix-blend-multiply" />
        </div>
      )}

      {/* Paper Texture */}
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

      <div
        className={`relative z-20 mx-auto flex max-w-[1800px] gap-12 px-8 lg:px-10 ${
          isInline
            ? "flex-col lg:flex-row items-center"
            : "flex-col justify-center"
        }`}
      >
        {/* Text */}
        <div className={isInline ? "flex-1" : ""}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-[10px] uppercase tracking-[5px] font-semibold ${
              isBackground ? "text-white/95" : "text-[#31451B]"
            } ${isArabic ? "text-right" : "text-left"}`}
          >
            {isArabic ? data.labelAr : data.labelEn}
          </motion.p>

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
              style={
                isBackground
                  ? {
                      textShadow:
                        "0 12px 36px rgba(0,0,0,.45),0 4px 16px rgba(0,0,0,.3)",
                    }
                  : undefined
              }
            >
              <span
                className={`block text-[48px] sm:text-[72px] md:text-[95px] lg:text-[120px] xl:text-[135px] ${
                  isBackground ? "text-white" : "text-[#31451B]"
                }`}
              >
                {isArabic ? data.titleLine1Ar : data.titleLine1En}
              </span>

              <span className="block italic text-[#ECE85D] text-[48px] sm:text-[72px] md:text-[95px] lg:text-[120px] xl:text-[135px]">
                {isArabic ? data.titleLine2Ar : data.titleLine2En}
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Inline Media */}
        {hasMedia && isInline && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex-1 h-[350px] lg:h-[550px] rounded-3xl overflow-hidden"
          >
            {data.mediaType === "image" ? (
              <Image
                src={data.mediaUrl}
                alt={data.mediaAlt}
                fill
                className="object-cover"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src={data.mediaUrl} />
              </video>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Label */}
      {!hasMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`absolute bottom-4 left-0 z-20 flex w-full px-8 lg:px-12 ${
            isArabic ? "justify-end" : "justify-start"
          }`}
        >
          <span className="text-[9px] uppercase tracking-[1.5px] text-[#A8A08A] font-semibold">
            {data.mediaAlt || "PHOTO COMING"}
          </span>
        </motion.div>
      )}
    </section>
  );
}