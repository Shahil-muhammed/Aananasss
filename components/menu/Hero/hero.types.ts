export type HeroMediaType = "image" | "video";
export type HeroDisplayType = "background" | "inline";

export interface MenuHeroData {
  labelEn: string;
  labelAr: string;

  titleLine1En: string;
  titleLine2En: string;

  titleLine1Ar: string;
  titleLine2Ar: string;

  display: HeroDisplayType;

  mediaType: HeroMediaType;

  mediaUrl: string;
  mediaAlt: string;
}