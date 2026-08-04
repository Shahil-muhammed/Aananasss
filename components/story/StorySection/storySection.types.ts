export interface StorySectionData {
  id: string;

  chapter: {
    en: string;
    ar: string;
  };

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  image: string;

  backgroundColor: string;

  titleColor: string;

  reverse?: boolean;
}