export default function HomePage() {
  return (
    <main className="bg-[#EFE4D0]">
      <section className="mx-auto flex min-h-[80vh] max-w-[1400px] items-center px-6 py-20">
        <div className="max-w-2xl">

          <p className="mb-4 text-xs uppercase tracking-[4px] text-[#6B7740]">
            Independent • Kuwaiti • Since 2017
          </p>

          <h1
            className="text-[60px] leading-[0.9] text-[#31451B] lg:text-[110px]"
            style={{
              fontFamily: '"Instrument Serif", serif',
            }}
          >
            Crafted for
            <br />
            everyday moments.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#4F4F4F]">
            Fresh coffee, handcrafted desserts and tropical flavours served
            daily across Kuwait.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-md bg-[#F69234] px-8 py-4 font-medium text-white transition hover:opacity-90">
              View Menu
            </button>

            <button className="rounded-md border border-[#31451B] px-8 py-4 font-medium text-[#31451B] transition hover:bg-[#31451B] hover:text-white">
              Find a Branch
            </button>
          </div>

        </div>
      </section>

      {/* Temporary Sections */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            "Hero Section",
            "Featured Menu",
            "Our Story"
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-dashed border-[#31451B]/30 bg-white p-10"
            >
              <h2 className="mb-3 text-2xl font-semibold text-[#31451B]">
                {item}
              </h2>

              <p className="text-[#666]">
                Placeholder content. This section will be replaced during the
                next steps.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}