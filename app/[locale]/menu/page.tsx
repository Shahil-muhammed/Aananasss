import { getMenuHero } from "@/lib/menu/hero";
import { getMenuCategories } from "@/lib/menu/categories";
import { getMenuItems } from "@/lib/menu/items";
import { getIngredientOrigins } from "@/lib/menu/ingredientOrigins";
import { transformMenuSections } from "@/lib/menu/transform";

import MenuPageClient from "@/components/menu/MenuPageClient";

export default async function MenuPage() {
  const hero = await getMenuHero();

  const categories = await getMenuCategories();

  const items = await getMenuItems();

  const ingredientOrigins =
    await getIngredientOrigins();

  const sections = transformMenuSections(
    categories,
    items
  );

  return (
    <MenuPageClient
      hero={hero}
      sections={sections}
      ingredientOrigins={ingredientOrigins}
    />
  );
}