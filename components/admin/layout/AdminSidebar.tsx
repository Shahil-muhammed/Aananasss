"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Overview",
        href: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Homepage",
    items: [
      {
        label: "Hero",
        href: "/admin/homepage/hero",
      },
      {
        label: "Featured Products",
        href: "/admin/homepage/featured-products",
      },
      {
        label: "Product Ticker",
        href: "/admin/homepage/product-ticker",
      },
      {
        label: "Quote",
        href: "/admin/homepage/quote",
      },
      {
        label: "Menu Intro",
        href: "/admin/homepage/menu-intro",
      },
      {
        label: "Branches",
        href: "/admin/homepage/branches",
      },
    ],
  },
  {
    title: "Restaurant",
    items: [
      {
        label: "Menu",
        href: "/admin/restaurant/menu",
      },
      {
        label: "Categories",
        href: "/admin/restaurant/categories",
      },
      {
        label: "Story",
        href: "/admin/restaurant/story",
      },
      {
        label: "Locations",
        href: "/admin/restaurant/locations",
      },
      {
        label: "Contact",
        href: "/admin/restaurant/contact",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-200">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">
          ANANAS Admin
        </h1>
      </div>

      <nav className="p-4 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-2 text-sm transition ${
                      active
                        ? "bg-black text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}