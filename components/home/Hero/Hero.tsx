import { HeroProps } from "./hero.types";
import HeroBackground from "./HeroBackground";
import HeroLeftContent from "./HeroLeftContent";
import HeroRightContent from "./HeroRightContent";
import HeroButtons from "./HeroButtons";

interface Props {
  data: HeroProps;
  locale: "en" | "ar";
}

export default function Hero({ data, locale }: Props) {
  return (
    <section className="relative min-h-[680px] overflow-hidden sm:h-[calc(100vh-116px)] sm:min-h-[700px]">
      <HeroBackground data={data} />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="relative z-20 mx-auto flex h-full flex-col justify-between px-4 py-6 sm:px-6 sm:py-8 lg:px-14">
        <div className="space-y-6 lg:space-y-0">
          <HeroLeftContent data={data} locale={locale} />
          <HeroRightContent data={data} locale={locale} />
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-6 z-30 sm:bottom-8 lg:bottom-10">
        <HeroButtons data={data} locale={locale} />
      </div>
    </section>
  );
}