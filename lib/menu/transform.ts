import {
  MenuSectionData,
  MenuItem,
} from "@/components/menu/MenuSection/menuSection.types";

interface Category {
  id: number;
  slug: string;

  number: string;

  titleEn: string;
  titleAr: string;

  backgroundColor: string;

  accentColor: string;

  image: string;
}

interface Item extends MenuItem {
  category_id: number;
}

export function transformMenuSections(
  categories: Category[],
  items: Item[]
): MenuSectionData[] {
  return categories.map((category) => ({
    id: category.slug,

    number: category.number,

    titleEn: category.titleEn,
    titleAr: category.titleAr,

    backgroundColor: category.backgroundColor,

    accentColor: category.accentColor,

    image: category.image,

    items: items
      .filter(
        (item) => item.category_id === category.id
      )
      .map((item) => ({
        id: item.id,

        titleEn: item.titleEn,
        titleAr: item.titleAr,

        descriptionEn: item.descriptionEn,
        descriptionAr: item.descriptionAr,

        captionEn: item.captionEn,
        captionAr: item.captionAr,

        originEn: item.originEn,
        originAr: item.originAr,

        disclaimerEn: item.disclaimerEn,
        disclaimerAr: item.disclaimerAr,

        image: item.image,

        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,

        kcal: item.kcal,

        price: item.price,

        available: item.available,

        allergens: item.allergens,
      })),
  }));
}