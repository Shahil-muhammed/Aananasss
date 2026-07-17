import { HeroProps } from "./hero.types";

export const heroData: HeroProps = {
  mediaType: "image",

  mediaUrl: "/images/hero/hero.webp",

  mediaAlt: "Hero",

  overlay: true,

  overlayOpacity: 0.45,

  titleEn: "Experience",

  titleHighlightEn: "The Difference",

  titleAr: "اكتشف",

  titleHighlightAr: "الفرق",

  subtitleEn: "Inspired by tropical flavours.",

  subtitleAr: "مستوحى من النكهات الاستوائية.",

  primaryButton: {
    labelEn: "Order Now",
    labelAr: "اطلب الآن",
    href: "/menu",
    isVisible: true,
  },

  secondaryButton: {
    labelEn: "Explore Menu",
    labelAr: "استكشف القائمة",
    href: "/menu",
    isVisible: true,
  },
};