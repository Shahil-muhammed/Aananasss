import { createClient } from "@/lib/supabase/server";

import BranchesForm from "@/components/admin/branches/BranchesForm";

export default async function BranchesPage() {
  const supabase = await createClient();

  // Fetch section
  const { data: section, error: sectionError } = await supabase
    .from("branches_section")
    .select("*")
    .single();

  if (sectionError || !section) {
    throw new Error("Failed to fetch branches section.");
  }

  // Fetch branches
  const { data: branches, error: branchesError } = await supabase
    .from("branches")
    .select("*")
    .order("display_order", { ascending: true });

  if (branchesError || !branches) {
    throw new Error("Failed to fetch branches.");
  }

  const branchData = branches.map((branch) => {
    let imageUrl = "";

    if (branch.image) {
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("website-assets")
        .getPublicUrl(branch.image);

      imageUrl = `${publicUrl}?v=${branch.updated_at}`;
    }

    return {
      id: branch.id,

      titleEn: branch.title_en,
      titleAr: branch.title_ar,

      locationEn: branch.location_en,
      locationAr: branch.location_ar,

      imagePath: branch.image,
      imageUrl,

      href: branch.href,

      displayOrder: branch.display_order,

      isActive: branch.is_active,
    };
  });

  return (
    <BranchesForm
      section={{
        id: section.id,

        sectionNumber: section.section_number,

        sectionTitleEn: section.section_title_en,
        sectionTitleAr: section.section_title_ar,

        headingLine1En: section.heading_line1_en,
        headingLine2En: section.heading_line2_en,

        headingLine1Ar: section.heading_line1_ar,
        headingLine2Ar: section.heading_line2_ar,
      }}
      branches={branchData}
    />
  );
}