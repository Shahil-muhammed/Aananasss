import Hero from "@/components/home/Hero";
import { heroData } from "@/data/hero";

interface HomePageProps {
  params: Promise<{
    locale: "en" | "ar";
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      <Hero
        data={heroData}
        locale={locale}
      />
    </>
  );
}