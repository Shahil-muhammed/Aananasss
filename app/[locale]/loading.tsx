export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F4EC]">
      <div className="flex flex-col items-center gap-6">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#31451B] border-t-transparent" />

        <h2 className="font-serif text-xl tracking-[4px] text-[#31451B]">
          ANANAS
        </h2>
      </div>
    </div>
  );
}