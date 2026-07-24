import Hero from "@/components/locations/Hero";
import Locations from "@/components/locations/Locations";

interface LocationsPageProps {
  params: Promise<{
    locale: "en" | "ar";
  }>;
}

export default async function LocationsPage({
  params,
}: LocationsPageProps) {
  await params;

  return (
    <>
      <Hero />
      <Locations />
    </>
  );
}