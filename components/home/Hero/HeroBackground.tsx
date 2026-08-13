"use client";

import Image from "next/image";
import { HeroProps } from "./hero.types";

interface HeroBackgroundProps {
  data: HeroProps;
}

export default function HeroBackground({ data }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      {data.mediaType === "image" ? (
        <Image
          src={data.mediaUrl}
          alt={data.mediaAlt || "Hero Background"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={data.mediaUrl} />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Dynamic Overlay: Gradient instead of solid black so top of image stays bright */}
      {data.overlay && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
          style={{
            opacity: data.overlayOpacity ?? 0.65,
          }}
        />
      )}
    </div>
  );
}