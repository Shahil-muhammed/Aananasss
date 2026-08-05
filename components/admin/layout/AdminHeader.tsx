"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

  if (pathname.includes("/menu/hero")) return "Menu Hero";

  if (pathname.includes("/menu/categories")) return "Menu Categories";

  if (pathname.includes("/menu/items")) return "Menu Items";

  if (pathname.includes("/menu/allergens")) return "Menu Allergens";

  if (pathname.includes("/menu")) return "Menu";

  if (pathname.includes("/story/hero")) return "Story Hero";

  if (pathname.includes("/story/values")) return "Story Values";

  if (pathname.includes("/story/sections")) return "Story Sections";

  if (pathname.includes("/story/stats")) return "Story Stats";

  if (pathname.includes("/story")) return "Our Story";

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
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/admin/login");
      router.refresh();
    }

    setLoggingOut(false);
  };

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
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>

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