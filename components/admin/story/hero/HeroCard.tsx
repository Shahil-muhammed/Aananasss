"use client";

import Image from "next/image";

import Card from "@/components/admin/ui/Card";

interface HeroCardProps {
  image: string;
}

export default function HeroCard({
  image,
}: HeroCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Hero Preview
        </h3>

        <div className="relative aspect-[16/8] overflow-hidden rounded-xl border">
          {image ? (
            <Image
              src={image}
              alt="Story Hero"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No image uploaded
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}