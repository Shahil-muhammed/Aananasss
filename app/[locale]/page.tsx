import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductTicker from "@/components/home/ProductTicker";
import QuoteSection from "@/components/home/QuoteSection";
import MenuIntro from "@/components/home/MenuIntro";
import Branches from "@/components/home/Branches";

import { getHero } from "@/lib/hero/hero";
import { getFeaturedProducts } from "@/lib/hero/featured";
import { getProductTicker } from "@/lib/hero/product-ticker";

interface HomePageProps {
  params: Promise<{
    locale: "en" | "ar";
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const heroData = await getHero();
  const featuredProductsData = await getFeaturedProducts();
  const productTickerData = await getProductTicker();

  return (
    <>
      <Hero
        data={heroData}
        locale={locale}
      />

      <ProductTicker
        data={productTickerData}
      />

      <FeaturedProducts
        data={featuredProductsData}
      />

      <QuoteSection />
      <MenuIntro locale={locale} />
      <Branches />
    </>
  );
}