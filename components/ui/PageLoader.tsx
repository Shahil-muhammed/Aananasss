"use client";

import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F4EC]/80 backdrop-blur-sm">
      <div className="flex items-center justify-center">
        <div className="h-12 w-12 animate-pulse">
          <Image
            src="/icons/pineapple-marker.png"
            alt="loading"
            width={48}
            height={48}
            priority
          />
        </div>
      </div>
    </div>
  );
}