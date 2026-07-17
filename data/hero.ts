import { HeroProps } from "@/components/home/Hero/hero.types";

export const heroData: HeroProps = {
  mediaType: "image",

  mediaUrl: "/images/hero.webp",

  mediaAlt: "Hero",

  overlay: true,
  overlayOpacity: 0.35,

  titleEn: "Your tropical dreams,",
  titleHighlightEn: "served daily.",

  titleAr: "أجواء استوائية",
  titleHighlightAr: "طوال السنة",

  subtitleEn: "An all-day oasis across Kuwait.",
  subtitleAr: "واحة طوال اليوم في الكويت",

  primaryButton: {
    labelEn: "See The Menu",
    labelAr: "شاهد القائمة",
    href: "/menu",
    isVisible: true,
  },

  secondaryButton: {
    labelEn: "Find A Branch",
    labelAr: "الفروع",
    href: "/branches",
    isVisible: true,
  },
};