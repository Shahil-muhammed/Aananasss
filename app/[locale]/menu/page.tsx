import { getMenuHero } from "@/lib/menu/hero";
import { getMenuCategories } from "@/lib/menu/categories";
import { getMenuItems } from "@/lib/menu/items";
import { transformMenuSections } from "@/lib/menu/transform";

import MenuPageClient from "@/components/menu/MenuPageClient";

export default async function MenuPage() {
  const hero = await getMenuHero();

  const categories = await getMenuCategories();

  const items = await getMenuItems();

  const sections = transformMenuSections(
    categories,
    items
  );

  return (
    <MenuPageClient
      hero={hero}
      sections={sections}
    />
  );
}