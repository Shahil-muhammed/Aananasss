import { createClient } from "@/lib/supabase/server";
import { BranchesData } from "@/components/home/Branches/branches.types";

export async function getBranches(): Promise<BranchesData> {
  const supabase = await createClient();

  const { data: section, error: sectionError } = await supabase
    .from("branches_section")
    .select("*")
    .single();

  if (sectionError || !section) {
    throw new Error("Failed to fetch branches section.");
  }

  const { data: branches, error: branchesError } = await supabase
    .from("branches")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (branchesError || !branches) {
    throw new Error("Failed to fetch branches.");
  }

  return {
    sectionNumber: section.section_number,

    sectionTitleEn: section.section_title_en,
    sectionTitleAr: section.section_title_ar,

    headingLine1En: section.heading_line1_en,
    headingLine2En: section.heading_line2_en,

    headingLine1Ar: section.heading_line1_ar,
    headingLine2Ar: section.heading_line2_ar,

    branches: branches.map((branch) => {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(branch.image);

      return {
        id: branch.id,

        titleEn: branch.title_en,
        titleAr: branch.title_ar,

        locationEn: branch.location_en,
        locationAr: branch.location_ar,

        image: `${publicUrl}?v=${branch.updated_at}`,

        href: branch.href,
      };
    }),
  };
}