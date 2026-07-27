import HeroForm from "@/components/admin/hero/HeroForm";
import { getHero } from "@/lib/hero/hero";

export default async function HeroPage() {
  const heroData = await getHero();

  return <HeroForm data={heroData} />;
}