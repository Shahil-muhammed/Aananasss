export interface FeaturedProduct {
  id: number;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  image: string;
  href: string;
}

export interface FeaturedProductsData {
  sectionLabelEn: string;
  sectionLabelAr: string;

  headingEn: string;
  headingAr: string;

  quoteEn: string;
  quoteAr: string;

  products: FeaturedProduct[];
}