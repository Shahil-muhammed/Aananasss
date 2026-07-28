"use client";

import { useState } from "react";

import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";

import BranchCard from "./BranchCard";

import {
  createBranch,
  updateBranchesSection,
  deleteBranch,
} from "@/lib/admin/branches";

interface Section {
  id: number;

  sectionNumber: string;

  sectionTitleEn: string;
  sectionTitleAr: string;

  headingLine1En: string;
  headingLine2En: string;

  headingLine1Ar: string;
  headingLine2Ar: string;
}

interface Branch {
  id: number;

  titleEn: string;
  titleAr: string;

  locationEn: string;
  locationAr: string;

  imagePath: string;
  imageUrl: string;

  href: string;

  displayOrder: number;

  isActive: boolean;
}

interface Props {
  section: Section;
  branches: Branch[];
}

export default function BranchesForm({
  section,
  branches,
}: Props) {
  const [sectionForm, setSectionForm] = useState(section);
  const [branchList, setBranchList] = useState(branches);

  const [loadingSection, setLoadingSection] = useState(false);
  const [loadingAddBranch, setLoadingAddBranch] = useState(false);

  const handleBranchChange = (
    id: number,
    updated: Branch
  ) => {
    setBranchList((prev) =>
      prev.map((item) => (item.id === id ? updated : item))
    );
  };

  const handleDelete = async (branch: Branch) => {
    try {
      await deleteBranch(branch.id, branch.imagePath);

      setBranchList((prev) =>
        prev.filter((item) => item.id !== branch.id)
      );

      alert("Branch deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete branch.");
    }
  };

  const handleAddBranch = async () => {
    try {
      setLoadingAddBranch(true);

      const newBranch = await createBranch();

      const branch: Branch = {
        id: newBranch.id,

        titleEn: newBranch.title_en,
        titleAr: newBranch.title_ar,

        locationEn: newBranch.location_en,
        locationAr: newBranch.location_ar,

        imagePath: newBranch.image || "",

        imageUrl: newBranch.image
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/website-assets/${newBranch.image}?t=${Date.now()}`
          : "",

        href: newBranch.href,

        displayOrder: newBranch.display_order,

        isActive: newBranch.is_active,
      };

      setBranchList((prev) =>
        [...prev, branch].sort(
          (a, b) => a.displayOrder - b.displayOrder
        )
      );

      alert("Branch created successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to create branch.");
    } finally {
      setLoadingAddBranch(false);
    }
  };

  const handleSaveSection = async () => {
    try {
      setLoadingSection(true);

      await updateBranchesSection(sectionForm);

      alert("Section updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update section.");
    } finally {
      setLoadingSection(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <SectionTitle title="Branches Section" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Section Number"
            value={sectionForm.sectionNumber}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionNumber: e.target.value,
              })
            }
          />

          <div />

          <Input
            label="Section Title EN"
            value={sectionForm.sectionTitleEn}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionTitleEn: e.target.value,
              })
            }
          />

          <Input
            label="Section Title AR"
            value={sectionForm.sectionTitleAr}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                sectionTitleAr: e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 1 EN"
            value={sectionForm.headingLine1En}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine1En: e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 1 AR"
            value={sectionForm.headingLine1Ar}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine1Ar: e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 2 EN"
            value={sectionForm.headingLine2En}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine2En: e.target.value,
              })
            }
          />

          <Input
            label="Heading Line 2 AR"
            value={sectionForm.headingLine2Ar}
            onChange={(e) =>
              setSectionForm({
                ...sectionForm,
                headingLine2Ar: e.target.value,
              })
            }
          />
        </div>

        <div className="mt-6">
          <Button
            onClick={handleSaveSection}
            disabled={loadingSection}
          >
            {loadingSection
              ? "Saving Section..."
              : "Save Section"}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle title="Branches" />

          <Button
            onClick={handleAddBranch}
            disabled={loadingAddBranch}
          >
            {loadingAddBranch
              ? "Adding..."
              : "+ Add Branch"}
          </Button>
        </div>

        <div className="space-y-8">
          {branchList.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No branches available. Click "+ Add Branch" to
              create one.
            </div>
          ) : (
            branchList.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onChange={(updated) =>
                  handleBranchChange(branch.id, updated)
                }
                onDelete={() => handleDelete(branch)}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}