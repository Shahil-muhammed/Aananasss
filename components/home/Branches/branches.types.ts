export interface Branch {
  id: number;

  titleEn: string;
  titleAr: string;

  locationEn: string;
  locationAr: string;

  image: string;

  href: string;
}

export interface BranchesData {
  sectionNumber: string;

  sectionTitleEn: string;
  sectionTitleAr: string;

  headingLine1En: string;
  headingLine2En: string;

  headingLine1Ar: string;
  headingLine2Ar: string;

  branches: Branch[];
}