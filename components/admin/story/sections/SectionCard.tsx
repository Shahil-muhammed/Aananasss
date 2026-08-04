"use client";

import Image from "next/image";

import Card from "@/components/admin/ui/Card";

interface SectionCardProps {
  image: string;

  chapterEn: string;

  titleEn: string;

  isActive: boolean;
}

export default function SectionCard({
  image,
  chapterEn,
  titleEn,
  isActive,
}: SectionCardProps) {
  return (
    <Card>
      <div className="space-y-4">

        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border">

          {image ? (
            <Image
              src={image}
              alt={titleEn}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No Image
            </div>
          )}

        </div>

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {chapterEn}
          </p>

          <h3 className="mt-2 text-lg font-semibold">
            {titleEn}
          </h3>

          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>

        </div>

      </div>
    </Card>
  );
}