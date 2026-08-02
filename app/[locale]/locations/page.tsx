import Hero from "@/components/locations/Hero";
import Locations from "@/components/locations/Locations";

import { getLocationsHero } from "@/lib/locations/hero";
import { getLocations } from "@/lib/locations/branches";

export default async function LocationsPage() {
  const hero = await getLocationsHero();

  const locations = await getLocations();

  return (
    <>
      <Hero hero={hero} />

      <Locations locations={locations} />
    </>
  );
}