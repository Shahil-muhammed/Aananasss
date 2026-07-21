export interface MenuItem {
  id: string;

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  image: string;

  protein: string;
  carbs: string;
  fat: string;

  kcal: number;

  price: number;

  available: boolean;
}

export interface MenuSectionData {
  id: string;

  number: string;

  titleEn: string;
  titleAr: string;

  image: string;

  backgroundColor: string;
  accentColor: string;

  items: MenuItem[];
}