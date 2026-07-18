import { FeaturedProductsData } from "./featured.types";

export const featuredProductsData: FeaturedProductsData = {
  sectionLabelEn: "OUR SIGNATURES",
  sectionLabelAr: "اختياراتنا",

  headingEn: "What the room orders with its eyes closed.",
  headingAr: "اختيارات لها ناسها.",

  quoteEn:
    "Ananas should feel like an oasis in the city. Step inside, and the day slows by half.",

  quoteAr:
    "من البداية، كانت الفكرة أن يكون أناناس واحة وسط المدينة، مكاناً يهدأ فيه إيقاع اليوم.",

  products: [
    {
      id: 1,
      titleEn: "Iced Espresso",
      titleAr: "إسبريسو مثلج",
      categoryEn: "Coffee",
      categoryAr: "قهوة",
      image: "/images/products/iced-espresso.webp",
      href: "/menu",
    },
    {
      id: 2,
      titleEn: "Pecan Soft Serve",
      titleAr: "برد بيكان",
      categoryEn: "Ice Cream",
      categoryAr: "آيس كريم",
      image: "/images/products/pecan.webp",
      href: "/menu",
    },
    {
      id: 3,
      titleEn: "Matcha Lush",
      titleAr: "ماتشا مثلج",
      categoryEn: "Specialty",
      categoryAr: "مختص",
      image: "/images/products/matcha.webp",
      href: "/menu",
    },
    {
      id: 4,
      titleEn: "Açaí Bowl",
      titleAr: "أساي",
      categoryEn: "Bowls",
      categoryAr: "حلويات",
      image: "/images/products/acai.webp",
      href: "/menu",
    },
  ],
};