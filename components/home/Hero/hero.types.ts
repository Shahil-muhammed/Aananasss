export interface HeroButton {
  labelEn: string;
  labelAr: string;
  href: string;
  isVisible: boolean;
}

export interface HeroProps {
  id: number;

  mediaType: "image" | "video";
  mediaUrl: string;
  mediaAlt?: string;

  overlay: boolean;
  overlayOpacity?: number;

  titleEn: string;
  titleHighlightEn: string;

  titleAr: string;
  titleHighlightAr: string;

  subtitleEn: string;
  subtitleAr: string;

  primaryButton: HeroButton;
  secondaryButton: HeroButton;
}