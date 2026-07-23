export interface ValueItem {
  number: string;

  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;
}

export interface ValuesData {
  sectionLabelEn: string;
  sectionLabelAr: string;

  headingEn: string;
  headingAr: string;

  items: ValueItem[];

  quoteEn: string;
  quoteAr: string;

  quoteSignatureEn: string;
  quoteSignatureAr: string;
}