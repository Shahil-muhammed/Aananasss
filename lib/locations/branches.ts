import { createClient } from "@/lib/supabase/server";

export async function getLocations() {
  const supabase = await createClient();

  // 1. Fetch all five tables using Promise.all()
  const [
    { data: locations, error: locationsError },
    { data: locationFeatures, error: locFeatError },
    { data: branchFeatures, error: branchFeatError },
    { data: deliveryPlatforms, error: platformsError },
    { data: branchPlatforms, error: branchPlatformsError },
  ] = await Promise.all([
    supabase
      .from("locations")
      .select("*")
      .eq("is_active", true)
      .order("display_order"),
    supabase.from("location_features").select("*"),
    supabase.from("branch_features").select("*"),
    supabase.from("delivery_platforms").select("*"),
    supabase.from("branch_delivery_platforms").select("*"),
  ]);

  if (
    locationsError ||
    locFeatError ||
    branchFeatError ||
    platformsError ||
    branchPlatformsError ||
    !locations
  ) {
    console.error("Supabase fetch error:", {
      locationsError,
      locFeatError,
      branchFeatError,
      platformsError,
      branchPlatformsError,
    });
    throw new Error("Failed to fetch location details.");
  }

  // 4. Build efficient lookup maps with both English & Arabic values
  const featureMap = new Map(
    (locationFeatures || []).map((f) => [
      f.id,
      { en: f.name_en, ar: f.name_ar || f.name_en },
    ])
  );

  const platformMap = new Map(
    (deliveryPlatforms || []).map((p) => [
      p.id,
      { en: p.name, ar: p.name_ar || p.name },
    ])
  );

  return locations.map((location) => {
    // 2 & 3. Storage public URL generation with updated_at cache busting
    let image = "";

    if (location.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(location.image);

      const cacheKey = location.updated_at
        ? new Date(location.updated_at).getTime()
        : Date.now();

      image = `${publicUrl}?v=${cacheKey}`;
    }

    // 6. Map features as { en: string; ar: string }[]
    const features = (branchFeatures || [])
      .filter((bf) => bf.location_id === location.id)
      .map((bf) => featureMap.get(bf.feature_id))
      .filter((item): item is { en: string; ar: string } => Boolean(item));

    // 7. Map delivery platforms as { en: string; ar: string }[]
    const deliveryPlatformsList = (branchPlatforms || [])
      .filter((bp) => bp.location_id === location.id)
      .map((bp) => platformMap.get(bp.platform_id))
      .filter((item): item is { en: string; ar: string } => Boolean(item));

    // 5. Return exact required object structure matching Location interface
    return {
      id: location.slug,

      name: location.name_en,
      name_ar: location.name_ar,

      addr: location.address_en,
      addr_ar: location.address_ar,

      hours: location.working_hours_en,
      hours_ar: location.working_hours_ar,

      tag: {
        en: location.tag_en,
        ar: location.tag_ar,
      },

      img: image,

      features,
      deliveryPlatforms: deliveryPlatformsList,

      note: {
        en: location.note_en,
        ar: location.note_ar,
      },

      coords: {
        lat: location.latitude,
        lng: location.longitude,
      },

      googleMaps: location.google_maps_url,
    };
  });
}