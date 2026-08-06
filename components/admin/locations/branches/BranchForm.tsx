"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";

import Button from "@/components/admin/ui/Button";
import Card from "@/components/admin/ui/Card";
import FileUpload from "@/components/admin/ui/FileUpload";
import Input from "@/components/admin/ui/Input";
import SectionTitle from "@/components/admin/ui/SectionTitle";
import Switch from "@/components/admin/ui/Switch";
import Textarea from "@/components/admin/ui/Textarea";

import {
  BranchFormData,
  FeatureFormData,
  DeliveryPlatformFormData,
  createBranch,
  updateBranch,
  deleteBranch,
} from "@/lib/admin/locations";

interface Props {
  initialBranches: BranchFormData[];
  features: FeatureFormData[];
  deliveryPlatforms: DeliveryPlatformFormData[];
}

export default function BranchForm({
  initialBranches,
  features,
  deliveryPlatforms,
}: Props) {
  const [branches, setBranches] = useState<BranchFormData[]>(initialBranches);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [files, setFiles] = useState<Record<number, File | null>>({});
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB limit

  useEffect(() => {
    const urls: string[] = [];
    const next: Record<number, string> = {};

    Object.entries(files).forEach(([id, file]) => {
      if (!file) return;

      const url = URL.createObjectURL(file);
      urls.push(url);
      next[Number(id)] = url;
    });

    setPreviews(next);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const updateField = <K extends keyof BranchFormData>(
    id: number,
    field: K,
    value: BranchFormData[K]
  ) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === id
          ? {
              ...branch,
              [field]: value,
            }
          : branch
      )
    );
  };

  const toggleFeature = (branchId: number, featureId: number) => {
    setBranches((prev) =>
      prev.map((branch) => {
        if (branch.id !== branchId) return branch;

        const exists = (branch.features ?? []).includes(featureId);

        return {
          ...branch,
          features: exists
            ? (branch.features ?? []).filter((id) => id !== featureId)
            : [...(branch.features ?? []), featureId],
        };
      })
    );
  };

  const togglePlatform = (branchId: number, platformId: number) => {
    setBranches((prev) =>
      prev.map((branch) => {
        if (branch.id !== branchId) return branch;

        const exists = (branch.deliveryPlatforms ?? []).includes(platformId);

        return {
          ...branch,
          deliveryPlatforms: exists
            ? (branch.deliveryPlatforms ?? []).filter((id) => id !== platformId)
            : [...(branch.deliveryPlatforms ?? []), platformId],
        };
      })
    );
  };

  const handleCreate = async () => {
    try {
      setCreating(true);
      await createBranch();
      alert("Branch created successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to create branch.");
    } finally {
      setCreating(false);
    }
  };

  const handleSave = async (branch: BranchFormData) => {
    try {
      const selectedFile = files[branch.id] ?? null;

      // Double check size prior to submitting
      if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
        alert("File size more than 1 MB is not allowed.");
        return;
      }

      setLoadingId(branch.id);
      await updateBranch(branch, selectedFile);
      alert("Branch updated successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to update branch."
      );
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this branch?");
    if (!confirmed) return;

    try {
      setLoadingId(id);
      await deleteBranch(id);
      alert("Branch deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "Failed to delete branch."
      );
    } finally {
      setLoadingId(null);
    }
  };

  const filteredBranches = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return branches;

    return branches.filter((branch) => {
      const values = [
        branch.nameEn,
        branch.nameAr,
        branch.addressEn,
        branch.addressAr,
        branch.tagEn,
        branch.tagAr,
      ].filter(Boolean) as string[];

      return values.some((value) =>
        value.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [branches, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionTitle title="Branches" />

        <Button
          type="button"
          disabled={creating}
          onClick={handleCreate}
        >
          {creating ? "Creating..." : "Add Branch"}
        </Button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Search branches
        </label>
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by store name, address, or tag"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
        />
      </div>

      <div className="space-y-8">
        {filteredBranches.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-sm text-gray-500">
            No branches match the current search.
          </div>
        ) : (
          filteredBranches.map((branch) => {
            const image = previews[branch.id] || branch.imageUrl;

            return (
              <Card key={branch.id}>
                <div className="space-y-8">
                  {/* Form Fields Section 1 */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Input
                      label="Slug"
                      value={branch.slug ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "slug", e.target.value)
                      }
                    />

                    <Input
                      label="Display Order"
                      type="number"
                      value={branch.displayOrder ?? 0}
                      onChange={(e) =>
                        updateField(
                          branch.id,
                          "displayOrder",
                          Number(e.target.value)
                        )
                      }
                    />

                    <Input
                      label="English Name"
                      value={branch.nameEn ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "nameEn", e.target.value)
                      }
                    />

                    <Input
                      label="Arabic Name"
                      value={branch.nameAr ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "nameAr", e.target.value)
                      }
                    />

                    <Input
                      label="English Tag"
                      value={branch.tagEn ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "tagEn", e.target.value)
                      }
                    />

                    <Input
                      label="Arabic Tag"
                      value={branch.tagAr ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "tagAr", e.target.value)
                      }
                    />

                    <Input
                      label="Working Hours (English)"
                      value={branch.workingHoursEn ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "workingHoursEn", e.target.value)
                      }
                    />

                    <Input
                      label="Working Hours (Arabic)"
                      value={branch.workingHoursAr ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "workingHoursAr", e.target.value)
                      }
                    />

                    <Input
                      label="Customer Service Hours (English)"
                      value={branch.customerServiceHoursEn ?? ""}
                      onChange={(e) =>
                        updateField(
                          branch.id,
                          "customerServiceHoursEn",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Customer Service Hours (Arabic)"
                      value={branch.customerServiceHoursAr ?? ""}
                      onChange={(e) =>
                        updateField(
                          branch.id,
                          "customerServiceHoursAr",
                          e.target.value
                        )
                      }
                    />

                    <Input
                      label="Latitude"
                      type="number"
                      step="0.000001"
                      value={branch.latitude ?? 0}
                      onChange={(e) =>
                        updateField(
                          branch.id,
                          "latitude",
                          Number(e.target.value)
                        )
                      }
                    />

                    <Input
                      label="Longitude"
                      type="number"
                      step="0.000001"
                      value={branch.longitude ?? 0}
                      onChange={(e) =>
                        updateField(
                          branch.id,
                          "longitude",
                          Number(e.target.value)
                        )
                      }
                    />

                    <Input
                      label="Google Maps URL"
                      value={branch.googleMapsUrl ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "googleMapsUrl", e.target.value)
                      }
                    />
                  </div>

                  {/* Textarea Fields Section */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Textarea
                      label="Address (English)"
                      rows={3}
                      value={branch.addressEn ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "addressEn", e.target.value)
                      }
                    />

                    <Textarea
                      label="Address (Arabic)"
                      rows={3}
                      value={branch.addressAr ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "addressAr", e.target.value)
                      }
                    />

                    <Textarea
                      label="Note (English)"
                      rows={4}
                      value={branch.noteEn ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "noteEn", e.target.value)
                      }
                    />

                    <Textarea
                      label="Note (Arabic)"
                      rows={4}
                      value={branch.noteAr ?? ""}
                      onChange={(e) =>
                        updateField(branch.id, "noteAr", e.target.value)
                      }
                    />
                  </div>

                  {/* Active Toggle */}
                  <Switch
                    label="Active"
                    checked={branch.isActive ?? false}
                    onChange={(checked) =>
                      updateField(branch.id, "isActive", checked)
                    }
                  />

                  {/* Features & Delivery Platforms Checkboxes */}
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-3">
                      <h3 className="font-semibold">Features</h3>
                      <div className="grid gap-2">
                        {features.map((feature) => (
                          <label
                            key={feature.id}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={(branch.features ?? []).includes(feature.id)}
                              onChange={() =>
                                toggleFeature(branch.id, feature.id)
                              }
                            />
                            <span>{feature.nameEn}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">Delivery Platforms</h3>
                      <div className="grid gap-2">
                        {deliveryPlatforms.map((platform) => (
                          <label
                            key={platform.id}
                            className="flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              checked={(branch.deliveryPlatforms ?? []).includes(
                                platform.id
                              )}
                              onChange={() =>
                                togglePlatform(branch.id, platform.id)
                              }
                            />
                            <span>{platform.nameEn}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Upload & Card Action Buttons */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <FileUpload
                        label="Branch Image"
                        accept="image/*"
                        onChange={(selectedFile) => {
                          if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
                            alert("File size more than 1 MB is not allowed.");
                            // Clear out any previous file selection
                            setFiles((prev) => ({
                              ...prev,
                              [branch.id]: null,
                            }));
                            return;
                          }

                          setFiles((prev) => ({
                            ...prev,
                            [branch.id]: selectedFile,
                          }));
                        }}
                      />

                      {image && (
                        <div className="relative aspect-4/3 overflow-hidden rounded-xl border">
                          <Image
                            src={image}
                            alt={branch.nameEn ?? "Branch Image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <Button
                        type="button"
                        disabled={loadingId === branch.id}
                        onClick={() => handleDelete(branch.id)}
                      >
                        Delete
                      </Button>

                      <Button
                        type="button"
                        disabled={loadingId === branch.id}
                        onClick={() => handleSave(branch)}
                      >
                        {loadingId === branch.id ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}