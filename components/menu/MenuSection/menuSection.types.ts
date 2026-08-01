export type Allergen = {
  code: string;
  nameEn: string;
  nameAr?: string;
};

export type MenuItem = {
  id: string;

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  captionEn: string;
  captionAr: string;

  image: string;

  protein: string;
  carbs: string;
  fat: string;

  kcal: number;

  price?: number;

  available?: boolean;

  allergens: Allergen[];
};

export type MenuSectionData = {
  id: string;

  number: string;

  titleEn: string;
  titleAr: string;

  backgroundColor: string;

  accentColor: string;

  image: string;

  items: MenuItem[];
};