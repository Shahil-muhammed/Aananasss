export interface MenuItem {
  id: number;
  number: string;
  titleEn: string;
  titleAr: string;
  image: string;

  // New design properties added here:
  dotColor?: string;         // Hex color string for the active-state bullet dot
  descriptionEn?: string;   // The inline sub-text description for English
  descriptionAr?: string;   // The inline sub-text description for Arabic
  captionEn?: string;       // Image description shown under the picture frame (English)
  captionAr?: string;       // Image description shown under the picture frame (Arabic)
}

export interface MenuIntroData {
  sectionNumber: string;
  sectionTitleEn: string;
  sectionTitleAr: string;
  headingLine1En: string;
  headingLine2En: string;
  headingLine1Ar: string;
  headingLine2Ar: string;
  buttonEn: string;
  buttonAr: string;
  items: MenuItem[];
}