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
        href: "/admin/menu",
        children: [
          {
            label: "Hero",
            href: "/admin/menu/hero",
          },
          {
            label: "Categories",
            href: "/admin/menu/categories",
          },
          {
            label: "Items",
            href: "/admin/menu/items",
          },
          {
            label: "Allergens",
            href: "/admin/menu/allergens",
          },
          {
            label: "Meat Source",
            href: "/admin/menu/ingredient-origins",
          },
        ],
      },
      {
        label: "Story",
        href: "/admin/story",
        children: [
          {
            label: "Hero",
            href: "/admin/story/hero",
          },
          {
            label: "Values",
            href: "/admin/story/values",
          },
          {
            label: "Sections",
            href: "/admin/story/sections",
          },
          {
            label: "Stats",
            href: "/admin/story/stats",
          },
        ],
      },
      {
        label: "Locations",
        href: "/admin/locations",
        children: [
          {
            label: "Hero",
            href: "/admin/locations/hero",
          },
          {
            label: "Branches",
            href: "/admin/locations/branches",
          },
          {
            label: "Features",
            href: "/admin/locations/features",
          },
          {
            label: "Settings",
            href: "/admin/locations/settings",
          },
        ],
      },
      {
        label: "Contact",
        href: "/admin/contact",
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen border-r border-gray-200 bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">ANANAS Admin</h1>
      </div>

      <nav className="space-y-8 p-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  item.children?.some(
                    (child) =>
                      pathname === child.href ||
                      pathname.startsWith(`${child.href}/`)
                  );

                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-4 py-2 text-sm transition ${
                        active
                          ? "bg-black text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="mt-1 space-y-1 pl-6">
                        {item.children.map((child) => {
                          const childActive =
                            pathname === child.href ||
                            pathname.startsWith(`${child.href}/`);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block rounded-lg px-3 py-2 text-sm transition ${
                                childActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}