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
  const isArabic = locale === "ar";

  return (
    <section className="relative min-h-[500px] overflow-hidden sm:min-h-[580px] lg:min-h-[680px]">
      <HeroBackground data={data} />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

      <div className="absolute inset-0 z-20 px-4 py-4 sm:px-8 sm:py-6 lg:px-12">
        <div className="relative flex h-full w-full flex-col justify-end lg:block">
          <HeroLeftContent data={data} locale={locale} />

          <div
            className={`relative z-30 flex max-w-full flex-col gap-2.5 lg:absolute lg:bottom-6 ${
              isArabic
                ? "lg:left-6 xl:left-10 items-start lg:items-start"
                : "lg:right-6 xl:right-10 items-start lg:items-end"
            }`}
          >
            <HeroRightContent data={data} locale={locale} />
            <HeroButtons data={data} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}