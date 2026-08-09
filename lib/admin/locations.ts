"use server";

import { createClient } from "@/lib/supabase/server";

// ============================================
// LOCATIONS HERO
// ============================================

export interface LocationsHeroFormData {
  id: number;

  sectionLabelEn: string;
  sectionLabelAr: string;

  titleEn: string;
  titleHighlightEn: string;

  titleAr: string;
  titleHighlightAr: string;

  subtitleEn: string;
  subtitleAr: string;

  backgroundImage: string; // Storage path
  backgroundImageUrl: string; // Public URL for preview

  overlayOpacity: number;
}

export async function updateLocationsHero(
  hero: LocationsHeroFormData,
  file?: File | null
) {
  const supabase = await createClient();

  let backgroundImage = hero.backgroundImage;

  if (file) {
    const extension = file.name.split(".").pop();

    backgroundImage = `LocationHero/hero.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(backgroundImage, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("locations_hero")
    .update({
      section_label_en: hero.sectionLabelEn,
      section_label_ar: hero.sectionLabelAr,

      title_en: hero.titleEn,
      title_highlight_en: hero.titleHighlightEn,

      title_ar: hero.titleAr,
      title_highlight_ar: hero.titleHighlightAr,

      subtitle_en: hero.subtitleEn,
      subtitle_ar: hero.subtitleAr,

      background_image: backgroundImage,

      overlay_opacity: hero.overlayOpacity,

      updated_at: new Date().toISOString(),
    })
    .eq("id", hero.id);

  if (error) {
    throw error;
  }

  return backgroundImage;
}

// ============================================
// BRANCHES
// ============================================

export interface BranchFormData {
  id: number;

  slug: string;

  nameEn: string;
  nameAr: string;

  addressEn: string;
  addressAr: string;

  workingHoursEn: string;
  workingHoursAr: string;

  customerServiceHoursEn: string;
  customerServiceHoursAr: string;

  tagEn: string;
  tagAr: string;

  noteEn: string;
  noteAr: string;

  image: string;
  imageUrl: string;

  latitude: number;

  longitude: number;

  googleMapsUrl: string;

  appleMapsUrl: string;

  displayOrder: number;

  isActive: boolean;

  features: number[];

  deliveryPlatforms: number[];
}

export async function getAdminBranches(): Promise<BranchFormData[]> {
  const supabase = await createClient();

  const { data: locations, error: locationsError } = await supabase
    .from("locations")
    .select("*")
    .order("display_order");

  if (locationsError || !locations) {
    console.error("Error fetching admin locations:", locationsError);
    return [];
  }

  const [{ data: branchFeatures }, { data: branchPlatforms }] = await Promise.all([
    supabase.from("branch_features").select("*"),
    supabase.from("branch_delivery_platforms").select("*"),
  ]);

  return locations.map((loc) => {
    let imageUrl = "";

    if (loc.image) {
      const {
        data: { publicUrl },
      } = supabase.storage.from("website-assets").getPublicUrl(loc.image);

      const cacheKey = loc.updated_at
        ? new Date(loc.updated_at).getTime()
        : Date.now();

      imageUrl = `${publicUrl}?v=${cacheKey}`;
    }

    return {
      id: loc.id,
      slug: loc.slug ?? "",

      nameEn: loc.name_en ?? "",
      nameAr: loc.name_ar ?? "",

      addressEn: loc.address_en ?? "",
      addressAr: loc.address_ar ?? "",

      workingHoursEn: loc.working_hours_en ?? "",
      workingHoursAr: loc.working_hours_ar ?? "",

      customerServiceHoursEn: loc.customer_service_hours_en ?? "",
      customerServiceHoursAr: loc.customer_service_hours_ar ?? "",

      tagEn: loc.tag_en ?? "",
      tagAr: loc.tag_ar ?? "",

      noteEn: loc.note_en ?? "",
      noteAr: loc.note_ar ?? "",

      image: loc.image ?? "",
      imageUrl,

      latitude: loc.latitude ?? 0,
      longitude: loc.longitude ?? 0,

      googleMapsUrl: loc.google_maps_url ?? "",
      appleMapsUrl: loc.apple_maps_url ?? "",

      displayOrder: loc.display_order ?? 0,
      isActive: loc.is_active ?? true,

      features: (branchFeatures || [])
        .filter((bf) => bf.location_id === loc.id)
        .map((bf) => bf.feature_id),

      deliveryPlatforms: (branchPlatforms || [])
        .filter((bp) => bp.location_id === loc.id)
        .map((bp) => bp.platform_id),
    };
  });
}

export async function createBranch() {
  const supabase = await createClient();

  const slug = `branch-${Date.now()}`;

  const { error } = await supabase.from("locations").insert({
    slug,

    name_en: "New Branch",
    name_ar: "فرع جديد",

    address_en: "",
    address_ar: "",

    working_hours_en: "7:00 AM - 12:00 AM",
    working_hours_ar: "٧:٠0 صباحاً - ١٢:٠٠ منتصف الليل",

    customer_service_hours_en: "7:00 AM - 12:00 AM",
    customer_service_hours_ar: "٧:٠٠ صباحاً - ١٢:٠٠ منتصف الليل",

    tag_en: "",
    tag_ar: "",

    note_en: "",
    note_ar: "",

    image: "",

    latitude: 0,
    longitude: 0,

    google_maps_url: "",

    apple_maps_url: "",

    display_order: 0,

    is_active: true,
  });

  if (error) {
    throw error;
  }
}

export async function updateBranch(
  branch: BranchFormData,
  file?: File | null
) {
  const supabase = await createClient();

  let image = branch.image;

  if (file) {
    const extension = file.name.split(".").pop();

    image = `branchstore/${branch.slug}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-assets")
      .upload(image, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }
  }

  const { error } = await supabase
    .from("locations")
    .update({
      slug: branch.slug,

      name_en: branch.nameEn,
      name_ar: branch.nameAr,

      address_en: branch.addressEn,
      address_ar: branch.addressAr,

      working_hours_en: branch.workingHoursEn,
      working_hours_ar: branch.workingHoursAr,

      customer_service_hours_en: branch.customerServiceHoursEn,

      customer_service_hours_ar: branch.customerServiceHoursAr,

      tag_en: branch.tagEn,
      tag_ar: branch.tagAr,

      note_en: branch.noteEn,
      note_ar: branch.noteAr,

      image,

      latitude: branch.latitude,
      longitude: branch.longitude,

      google_maps_url: branch.googleMapsUrl,

      apple_maps_url: branch.appleMapsUrl,

      display_order: branch.displayOrder,

      is_active: branch.isActive,

      updated_at: new Date().toISOString(),
    })
    .eq("id", branch.id);

  if (error) {
    throw error;
  }

  if (branch.features) {
    await saveBranchFeatures(branch.id, branch.features);
  }

  if (branch.deliveryPlatforms) {
    await saveBranchDeliveryPlatforms(branch.id, branch.deliveryPlatforms);
  }

  return image;
}

export async function deleteBranch(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("locations").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

// ============================================
// FEATURES
// ============================================

export interface FeatureFormData {
  id: number;

  code: string;

  nameEn: string;

  nameAr: string;

  icon: string;
}

export async function createFeature() {
  const supabase = await createClient();

  const code = `FEATURE-${Date.now()}`;

  const { error } = await supabase.from("location_features").insert({
    code,

    name_en: "New Feature",

    name_ar: "ميزة جديدة",

    icon: "",
  });

  if (error) {
    throw error;
  }
}

export async function updateFeature(feature: FeatureFormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("location_features")
    .update({
      code: feature.code,

      name_en: feature.nameEn,

      name_ar: feature.nameAr,

      icon: feature.icon,

      updated_at: new Date().toISOString(),
    })
    .eq("id", feature.id);

  if (error) {
    throw error;
  }
}

export async function deleteFeature(id: number) {
  const supabase = await createClient();

  const { count } = await supabase
    .from("branch_features")
    .select("*", { count: "exact", head: true })
    .eq("feature_id", id);

  if (count && count > 0) {
    throw new Error(
      `Cannot delete this feature because it is used by ${count} branch(es).`
    );
  }

  const { error } = await supabase
    .from("location_features")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

// ============================================
// DELIVERY PLATFORMS
// ============================================

export interface DeliveryPlatformFormData {
  id: number;

  code: string;

  nameEn: string;

  nameAr: string;

  icon: string;
}

export async function createDeliveryPlatform() {
  const supabase = await createClient();

  const code = `PLATFORM-${Date.now()}`;

  const { error } = await supabase.from("delivery_platforms").insert({
    code,

    name: "New Platform",

    name_ar: "منصة جديدة",

    icon: "",
  });

  if (error) {
    throw error;
  }
}

export async function updateDeliveryPlatform(
  platform: DeliveryPlatformFormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("delivery_platforms")
    .update({
      code: platform.code,

      name: platform.nameEn,

      name_ar: platform.nameAr,

      icon: platform.icon,

      updated_at: new Date().toISOString(),
    })
    .eq("id", platform.id);

  if (error) {
    throw error;
  }
}

export async function deleteDeliveryPlatform(id: number) {
  const supabase = await createClient();

  const { count } = await supabase
    .from("branch_delivery_platforms")
    .select("*", { count: "exact", head: true })
    .eq("platform_id", id);

  if (count && count > 0) {
    throw new Error(
      `Cannot delete this delivery platform because it is used by ${count} branch(es).`
    );
  }

  const { error } = await supabase
    .from("delivery_platforms")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

// ============================================
// BRANCH FEATURES & PLATFORMS
// ============================================

export async function saveBranchFeatures(
  branchId: number,
  featureIds: number[]
) {
  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .from("branch_features")
    .delete()
    .eq("location_id", branchId);

  if (deleteError) {
    throw deleteError;
  }

  if (featureIds.length === 0) {
    return;
  }

  const rows = featureIds.map((id) => ({
    location_id: branchId,
    feature_id: id,
  }));

  const { error: insertError } = await supabase
    .from("branch_features")
    .insert(rows);

  if (insertError) {
    throw insertError;
  }
}

export async function saveBranchDeliveryPlatforms(
  branchId: number,
  platformIds: number[]
) {
  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .from("branch_delivery_platforms")
    .delete()
    .eq("location_id", branchId);

  if (deleteError) {
    throw deleteError;
  }

  if (platformIds.length === 0) {
    return;
  }

  const rows = platformIds.map((id) => ({
    location_id: branchId,
    platform_id: id,
  }));

  const { error: insertError } = await supabase
    .from("branch_delivery_platforms")
    .insert(rows);

  if (insertError) {
    throw insertError;
  }
}