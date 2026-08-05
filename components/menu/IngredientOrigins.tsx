import { IngredientOrigin } from "@/lib/menu/ingredientOrigins";

interface Props {
  items: IngredientOrigin[];
}

export default function IngredientOrigins({ items }: Props) {
  return (
    <section 
      id="ingredient-origins"
      className="relative text-[#1E1D1B] py-14 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
      style={{
        backgroundColor: "#EBE8DB",
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: "6px 6px",
      }}
    >
      {/* Decorative fine dot pattern overlay (bottom right) */}
      <div 
        className="pointer-events-none absolute right-4 bottom-4 w-96 h-96 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Category Tag */}
        <div className="mb-4">
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#76746A] uppercase">
            SOURCING
          </span>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-7xl font-light text-[#191817] tracking-tight leading-none">
            Ingredient origins.
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#5C5B53] font-normal leading-relaxed max-w-xs">
            Origin and halal certification details for the ingredients listed below.
          </p>
        </div>

        {/* Hero Divider */}
        <div className="h-[1px] bg-[#CFCAC0] mb-10 w-full" />

        {/* Content Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 mb-14">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col">
              
              {/* Category Title */}
              <h3 className="font-serif italic text-2xl font-light text-[#191817] mb-1.5">
                {item.titleEn}
              </h3>
              
              {/* Subtitle */}
              <p className="font-sans text-xs text-[#5C5B53] font-normal leading-relaxed mb-6 min-h-[2.5rem]">
                {item.subtitleEn}
              </p>

              {/* Monospace Row: Origin */}
              <div className="border-t border-[#CFCAC0] py-2">
                <p className="font-mono text-[10px] tracking-[0.15em] text-[#191817] flex items-center gap-1.5">
                  <span className="text-[#878479]">ORIGIN</span>
                  <span className="text-[#878479]">—</span>
                  <span className="font-medium">{item.originEn}</span>
                </p>
              </div>

              {/* Monospace Row: Halal Certification */}
              {item.halalEn && (
                <div className="border-t border-[#CFCAC0] py-2">
                  <p className="font-mono text-[10px] tracking-[0.15em] text-[#191817] flex items-center gap-1.5">
                    <span className="text-[#878479]">HALAL CERTIFICATION</span>
                    <span className="text-[#878479]">—</span>
                    <span className="font-medium">{item.halalEn}</span>
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="font-mono text-[10px] tracking-[0.22em] text-[#76746A] uppercase">
          ALLERGEN INFORMATION IS AVAILABLE ON EACH ITEM PAGE.
        </p>

      </div>
    </section>
  );
}