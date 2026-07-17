import Image from "next/image";
import { HeroProps } from "./hero.types";

interface HeroBackgroundProps {
  data: HeroProps;
}

export default function HeroBackground({
  data,
}: HeroBackgroundProps) {
  return (
    <>
      {data.mediaType === "image" ? (
        <Image
          src={data.mediaUrl}
          alt={data.mediaAlt || "Hero Background"}
          fill
          priority
          className="object-cover"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={data.mediaUrl} />
          Your browser does not support the video tag.
        </video>
      )}

      {data.overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{
            opacity: data.overlayOpacity ?? 0.4,
          }}
        />
      )}
    </>
  );
}

/** Error check  */