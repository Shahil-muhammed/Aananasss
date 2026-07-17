"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export default function FooterTicker() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Footer");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kuwait",
        }).format(new Date())
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    `◆ ${t("ticker.live")} • ${time}`,
    `◆ ${t("ticker.location")} • 47°C`,
    `◆ ${t("ticker.announcement")}`,
    `◆ ${t("ticker.location")} • 47°C`,
    `◆ ${t("ticker.announcement")}`,
  ];

  return (
    // We force dir="ltr" on the layout container so Framer Motion's X axis math 
    // stays consistent, but we give the text elements dir="rtl" if Arabic.
    <div className="overflow-hidden border-b border-black/10 bg-[#F8ECA3]" dir="ltr">
      <motion.div
        className="flex w-max items-center gap-16 py-3"
        animate={{ x: isRtl ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: 35,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {/* Multiplying by 4 is fine, but we only need 2 groups for a -50% loop. 
            Keeping your array multiplication logic intact. */}
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span
            key={index}
            dir={isRtl ? "rtl" : "ltr"}
            className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[3px] text-[#31451B] lg:text-xs"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}