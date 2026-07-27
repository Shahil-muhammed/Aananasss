"use client";

import { usePathname } from "next/navigation";

function getPageTitle(pathname: string) {
  if (pathname === "/admin/dashboard") return "Dashboard";

  if (pathname.includes("/homepage/hero")) return "Hero";

  if (pathname.includes("/homepage/featured-products"))
    return "Featured Products";

  if (pathname.includes("/homepage/product-ticker"))
    return "Product Ticker";

  if (pathname.includes("/homepage/quote"))
    return "Quote Section";

  if (pathname.includes("/homepage/menu-intro"))
    return "Menu Intro";

  if (pathname.includes("/homepage/branches"))
    return "Branches";

  if (pathname.includes("/restaurant/menu"))
    return "Menu";

  if (pathname.includes("/restaurant/categories"))
    return "Categories";

  if (pathname.includes("/restaurant/story"))
    return "Our Story";

  if (pathname.includes("/restaurant/locations"))
    return "Locations";

  if (pathname.includes("/restaurant/contact"))
    return "Contact";

  if (pathname.includes("/settings"))
    return "Settings";

  return "Admin";
}

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getPageTitle(pathname)}
        </h1>

        <p className="text-sm text-gray-500">
          Restaurant Management Panel
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold">
            Admin
          </p>

          <p className="text-xs text-gray-500">
            Logged In
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}