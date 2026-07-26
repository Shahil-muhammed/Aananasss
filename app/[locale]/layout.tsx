import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="flex min-h-screen flex-col overflow-x-hidden bg-white"
      >
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}