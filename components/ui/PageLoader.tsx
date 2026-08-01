"use client";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F4EC]/80 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#435334] border-t-transparent" />
    </div>
  );
}