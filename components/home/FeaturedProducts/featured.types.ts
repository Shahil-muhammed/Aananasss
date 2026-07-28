export interface FeaturedProduct {
  id: number;

  titleEn: string;
  titleAr: string;

  categoryEn: string;
  categoryAr: string;

  imagePath: string;
  imageUrl: string;

  href: string;

  displayOrder: number;
  isActive: boolean;
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