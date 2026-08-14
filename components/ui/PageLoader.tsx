"use client";

import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#3B4519]">
      <div className="flex items-center justify-center rounded-full bg-[#3B4519] p-4">
        <div className="h-32 w-32 animate-pulse md:h-36 md:w-36">
          <Image
            src="/icons/ananas_pineapple.png"
            alt="loading"
            width={144}
            height={144}
            priority
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}