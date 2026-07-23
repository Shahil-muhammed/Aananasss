export interface StatItem {
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface StoryHeroData {
  titleEn: string;
  titleAr: string;

  descriptionEn: string;
  descriptionAr: string;

  backgroundImage: string;

  stats: StatItem[];
}