"use client";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <>
      {/* Top Announcement Bar (Desktop Only) */}
      <div className="hidden lg:block border-b border-black/5 bg-[#E5E56D]">
        <div className="mx-auto flex h-8 max-w-[1400px] items-center justify-between px-6 xl:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[3px] text-[#31451B]">
            Independent • Kuwaiti • Since 2017
          </p>

          <p className="text-[10px] font-medium uppercase tracking-[3px] text-[#31451B]">
            Open Daily • Morning Till Late
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#EFE4D0] shadow-sm">
        <DesktopNavbar />
        <MobileNavbar />
      </header>
    </>
  );
}