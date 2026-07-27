import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductTicker from "@/components/home/ProductTicker";
import QuoteSection from "@/components/home/QuoteSection";
import MenuIntro from "@/components/home/MenuIntro";
import Branches from "@/components/home/Branches";

import { getHero } from "@/lib/hero/hero";
import { getFeaturedProducts } from "@/lib/hero/featured";
import { getProductTicker } from "@/lib/hero/product-ticker";
import { getQuoteSection } from "@/lib/hero/quote";
import { getMenuIntro } from "@/lib/hero/menu-intro";
import { getBranches } from "@/lib/hero/branches";

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
  const quoteData = await getQuoteSection();
  const menuIntroData = await getMenuIntro();
  const branchesData = await getBranches();

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

      <QuoteSection
        data={quoteData}
      />

      <MenuIntro
        locale={locale}
        data={menuIntroData}
      />

      <Branches
        data={branchesData}
      />
    </>
  );
}