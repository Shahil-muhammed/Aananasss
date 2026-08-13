"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

import { BranchesData } from "./branches.types";

interface BranchesProps {
  data: BranchesData;
}

export default function Branches({ data }: BranchesProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Monitor dynamic container layout changes to update boundary indicators
  const checkScrollBounds = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      
      const absoluteScroll = Math.abs(scrollLeft);
      const tolerance = 10; 

      // 1. Check Arrow Controls Bounds
      if (isArabic) {
        setCanScrollRight(absoluteScroll > tolerance);
        setCanScrollLeft(absoluteScroll + clientWidth < scrollWidth - tolerance);
      } else {
        setCanScrollLeft(absoluteScroll > tolerance);
        setCanScrollRight(absoluteScroll + clientWidth < scrollWidth - tolerance);
      }

      // 2. Compute Mobile Active Dot Pagination Index Matcher
      const computedIndex = Math.round(absoluteScroll / clientWidth);
      setActiveIndex(computedIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollBounds);
      checkScrollBounds();
      window.addEventListener("resize", checkScrollBounds);
    }
    return () => {
      slider?.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [isArabic]);

  const normalizeBranchValue = (value?: string | null) =>
    value
      ?.normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") ?? "";

  const getBranchLocationHref = (branch: (typeof data.branches)[number]) => {
    const branchIdentifier = [
      branch.titleEn,
      branch.titleAr,
      branch.locationEn,
      branch.locationAr,
    ]
      .map(normalizeBranchValue)
      .find(Boolean);

    if (!branchIdentifier) {
      return "/locations";
    }

    return `/locations?branch=${encodeURIComponent(branchIdentifier)}`;
  };

  const handleScroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToDot = (index: number) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const targetPos = isArabic ? -index * clientWidth : index * clientWidth;
      sliderRef.current.scrollTo({
        left: targetPos,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      className="muted-ground relative overflow-hidden py-16 lg:py-24"
      style={{ backgroundColor: "#F3ECD8" }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
        
        {/* Header Block Split Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          {/* Typography Header Group */}
          <div className={`flex flex-col ${isArabic ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-3 mb-3 text-[10px] uppercase tracking-[4px] font-mono text-[#D99844]">
              <span>{data.sectionNumber}</span>
              <span className="opacity-40">/</span>
              <span className="text-[#444] opacity-80">
                {isArabic ? data.sectionTitleAr : data.sectionTitleEn}
              </span>
            </div>

            <h2 className="font-serif text-[#1F1F1F] leading-[1.1] text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-[750px]">
              {isArabic ? data.headingLine1Ar : data.headingLine1En}
              {" "}
              <span className="italic text-[#D99844] block sm:inline">
                {isArabic ? data.headingLine2Ar : data.headingLine2En}
              </span>
            </h2>
          </div>

          {/* Controls & Call to Action Container Wrapper */}
          <div className="flex items-center gap-4 flex-shrink-0">
            
            {/* Conditional Desktop Navigation Arrows */}
            {data.branches.length > 4 && (
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => handleScroll(isArabic ? "right" : "left")}
                  disabled={isArabic ? !canScrollRight : !canScrollLeft}
                  className="
                    w-10 h-10 border border-[#1F1F1F]/20 rounded-full flex items-center justify-center 
                    text-[#1F1F1F] transition-all duration-300 hover:bg-[#1F1F1F] hover:text-[#F3ECD8]
                    disabled:opacity-20 disabled:pointer-events-none
                  "
                  aria-label="Previous Slide"
                >
                  <span className="text-xs font-mono">←</span>
                </button>

                <button
                  onClick={() => handleScroll(isArabic ? "left" : "right")}
                  disabled={isArabic ? !canScrollLeft : !canScrollRight}
                  className="
                    w-10 h-10 border border-[#1F1F1F]/20 rounded-full flex items-center justify-center 
                    text-[#1F1F1F] transition-all duration-300 hover:bg-[#1F1F1F] hover:text-[#F3ECD8]
                    disabled:opacity-20 disabled:pointer-events-none
                  "
                  aria-label="Next Slide"
                >
                  <span className="text-xs font-mono">→</span>
                </button>
              </div>
            )}

            {/* Black Action View All Button */}
            <Link
              href="/locations"
              className="
                inline-flex items-center gap-3 bg-[#1F1F1F] text-[#F3ECD8] 
                px-5 py-3 text-[10px] uppercase tracking-[3px] font-sans rounded-[2px]
                transition-all duration-300 hover:bg-[#D99844] hover:text-[#1F1F1F] shadow-md
              "
            >
              <span>{isArabic ? "كل الفروع" : "All Branches"}</span>
              <span className="text-[11px] font-mono opacity-80">
                {isArabic ? "←" : "→"}
              </span>
            </Link>
          </div>
        </motion.div>

        {/* 
          Horizontal Scroll Viewport Matrix Rail
          Mobile: Force full width w-full (1 card layout inline), mandatory paging mechanics
          Desktop: Auto multi-column grid matrix
        */}
        <div 
          ref={sliderRef}
          className="
            flex overflow-x-auto gap-0 pb-6 pt-2 snap-x snap-mandatory scrollbar-none w-full
            lg:grid lg:grid-flow-col lg:auto-cols-[calc((100%-4.5rem)/4)] lg:overflow-x-auto lg:gap-6
          "
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {data.branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.08, 0.4), duration: 0.5 }}
              className="w-full lg:w-auto flex-shrink-0 snap-center lg:snap-start px-2 lg:px-0"
            >
              <Link
                href={getBranchLocationHref(branch)}
                className="group block relative overflow-hidden bg-[#e9dfc6] rounded-sm transition-transform duration-300"
              >
                {/* Image Container with Portrait Aspect Box */}
                <div className="relative h-[420px] sm:h-[480px] md:h-[450px] lg:h-[390px] xl:h-[440px] w-full overflow-hidden">
                  <Image
                    src={branch.image}
                    alt={isArabic ? branch.titleAr : branch.titleEn}
                    fill
                    sizes="(max-w: 1024px) 100vw, 400px"
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    priority={index === 0}
                  />

                  {/* Dark Vignette Overlay Blend Mode */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Dynamic Badge Info Indicator from Supabase */}
                  <div className={`absolute top-4 ${isArabic ? "left-4" : "right-4"} bg-black/20 backdrop-blur-[2px] px-2.5 py-1 rounded-[2px]`}>
                    <span className="text-[9px] text-white/70 font-sans tracking-widest uppercase block">
                      {isArabic ? branch.badgeLabelAr : branch.badgeLabelEn}
                    </span>
                  </div>

                  {/* Absolute Card Content Footer Metadata Wrapper */}
                  <div className="absolute bottom-6 left-5 right-5 flex flex-col justify-end h-1/2">
                    <h3 className="font-serif text-3xl text-white italic leading-tight tracking-wide transition-colors group-hover:text-[#F3ECD8]">
                      {isArabic ? branch.titleAr : branch.titleEn}
                    </h3>

                    <p className="mt-2 text-[10px] uppercase tracking-[3px] text-white/70 font-sans line-clamp-1">
                      {isArabic ? branch.locationAr : branch.locationEn}
                    </p>

                    {/* Bottom Dynamic Inline Border Reveal State line on hover */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 lg:group-hover:opacity-100">
                      <span className="text-[9px] font-mono tracking-[3px] text-[#F3ECD8] uppercase">
                        {isArabic ? "إكتشف الفرع ←" : "EXPLORE BRANCH →"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 
          Red Dot Pagination Container
          Only visible on Mobile viewports (hidden lg:flex)
        */}
        <div className="flex lg:hidden items-center justify-center gap-2.5 mt-4">
          {data.branches.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToDot(index)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${activeIndex === index ? "w-6 bg-[#D94444]" : "w-2 bg-[#1F1F1F]/20"}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}