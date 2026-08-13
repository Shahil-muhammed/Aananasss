import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F4EC]">
      <div className="flex flex-col items-center gap-6">
        <div className="animate-pulse">
          <Image
            src="/icons/pineapple-marker.png"
            alt="loading"
            width={56}
            height={56}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}