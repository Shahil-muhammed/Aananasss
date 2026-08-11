"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

import { Location } from "./locations.types";

interface Props {
  locations: Location[];
}

const normalizeLocationValue = (value?: string | null) =>
  value
    ?.normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") ?? "";

const findMatchingLocationId = (
  list: Location[],
  branchQuery: string | null
) => {
  const normalizedBranchQuery = normalizeLocationValue(branchQuery);

  if (!normalizedBranchQuery) {
    return null;
  }

  const directMatch = list.find(
    (location) => normalizeLocationValue(location.id) === normalizedBranchQuery
  );

  if (directMatch) {
    return directMatch.id;
  }

  const nameMatch = list.find(
    (location) =>
      normalizeLocationValue(location.name) === normalizedBranchQuery ||
      normalizeLocationValue(location.name_ar) === normalizedBranchQuery
  );

  if (nameMatch) {
    return nameMatch.id;
  }

  const addressMatch = list.find(
    (location) =>
      normalizeLocationValue(location.addr) === normalizedBranchQuery ||
      normalizeLocationValue(location.addr_ar) === normalizedBranchQuery
  );

  if (addressMatch) {
    return addressMatch.id;
  }

  return null;
};

export default function Locations({ locations }: Props) {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const isArabic = locale === "ar";
  const branchQuery = searchParams.get("branch");

  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    locations[0]?.id || null
  );

  const [cardsPerRow, setCardsPerRow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerRow(4);
      } else {
        setCardsPerRow(2);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!branchQuery) {
      setSelectedLocationId(locations[0]?.id || null);
      return;
    }

    const matchedLocationId = findMatchingLocationId(locations, branchQuery);

    setSelectedLocationId(matchedLocationId ?? null);
  }, [branchQuery, locations]);

  useEffect(() => {
    if (!branchQuery || !selectedLocationId) {
      return;
    }

    const detailsPanel = document.getElementById(
      `location-details-${selectedLocationId}`
    );

    if (detailsPanel) {
      detailsPanel.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [branchQuery, selectedLocationId]);

  /**
   * Helper function to safely parse text containing literal "<br>" or "<br/>" strings
   * and convert them into React <br /> components.
   */
  const renderFormattedText = (text?: string) => {
    if (!text) return null;

    // Split string by <br>, <br/>, or <br /> case-insensitively
    const parts = text.split(/<br\s*\/?>/gi);

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const rows = [];

  for (let i = 0; i < locations.length; i += cardsPerRow) {
    rows.push(locations.slice(i, i + cardsPerRow));
  }

  const selectedLocation = locations.find(
    (loc) => loc.id === selectedLocationId
  );

  return (
    <section
      className="bg-[#EFE7D6] py-10 md:py-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "8px 8px",
      }}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 space-y-4 md:space-y-6">
        {rows.map((row, rowIndex) => {
          const isSelectedInThisRow = row.some(
            (loc) => loc.id === selectedLocationId
          );

          return (
            <div key={rowIndex} className="space-y-4 md:space-y-6">
              {/* Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {row.map((location) => {
                  const isSelected = selectedLocationId === location.id;

                  return (
                    <button
                      key={location.id}
                      onClick={() =>
                        setSelectedLocationId(
                          isSelected ? null : location.id
                        )
                      }
                      className={`group relative overflow-hidden text-left transition-all duration-200 ${
                        isSelected ? "ring-2 ring-[#3B4823]" : ""
                      }`}
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={location.img}
                          alt={location.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/40 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                          {isArabic
                            ? location.tag.ar
                            : location.tag.en}
                        </span>

                        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white">
                          <h3 className="font-serif text-lg sm:text-2xl italic leading-tight">
                            {isArabic
                              ? location.name_ar
                              : location.name}
                          </h3>

                          {/* Render hours with line breaks on cards */}
                          <div className="mt-0.5 text-[9px] sm:text-xs opacity-75 line-clamp-2 leading-tight">
                            {renderFormattedText(
                              isArabic ? location.hours_ar : location.hours
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Expanded Details Panel */}
              {isSelectedInThisRow && selectedLocation && (
                <div
                  id={`location-details-${selectedLocation.id}`}
                  className="relative bg-[#3B4823] p-5 text-white sm:p-8 md:p-10 shadow-2xl transition-all"
                >
                  <button
                    onClick={() => setSelectedLocationId(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-white hover:bg-white/20 transition-colors"
                  >
                    ✕
                  </button>

                  <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                    {/* Image */}
                    <div className="overflow-hidden">
                      <img
                        src={selectedLocation.img}
                        alt={selectedLocation.name}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-[#E4E47A]">
                        {isArabic
                          ? selectedLocation.tag.ar
                          : selectedLocation.tag.en}
                      </span>

                      <h2 className="mt-1 font-serif text-2xl sm:text-4xl md:text-5xl italic">
                        {isArabic
                          ? selectedLocation.name_ar
                          : selectedLocation.name}
                      </h2>

                      {/* Delivery Platforms & Features Sections */}
                      <div className="mt-4 space-y-3">
                        {/* Section 1: Available On */}
                        {selectedLocation.deliveryPlatforms &&
                          selectedLocation.deliveryPlatforms.length > 0 && (
                            <div>
                              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                                {isArabic ? "متوفر على" : "Available On"}
                              </span>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {selectedLocation.deliveryPlatforms.map(
                                  (item, index) => {
                                    const text =
                                      typeof item === "string"
                                        ? item
                                        : isArabic
                                        ? item.ar
                                        : item.en;

                                    return (
                                      <span
                                        key={index}
                                        className="border border-white/20 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-white/90"
                                      >
                                        {text.replace("-", " ")}
                                      </span>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}

                        {/* Section 2: Features */}
                        {selectedLocation.features &&
                          selectedLocation.features.length > 0 && (
                            <div>
                              <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 mb-1.5">
                                {isArabic ? "المميزات" : "Features"}
                              </span>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {selectedLocation.features.map(
                                  (item, index) => {
                                    const text =
                                      typeof item === "string"
                                        ? item
                                        : isArabic
                                        ? item.ar
                                        : item.en;

                                    return (
                                      <span
                                        key={index}
                                        className="border border-white/20 bg-white/5 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-white/90"
                                      >
                                        {text.replace("-", " ")}
                                      </span>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                      </div>

                      <div className="mt-5 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-white/80">
                        <div>
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">
                            {isArabic ? "العنوان" : "Address"}
                          </span>

                          <div className="mt-0.5 font-light leading-relaxed">
                            {renderFormattedText(
                              isArabic
                                ? selectedLocation.addr_ar
                                : selectedLocation.addr
                            )}
                          </div>
                        </div>

                        <div>
                          <span className="block text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50">
                            {isArabic ? "أوقات العمل" : "Hours"}
                          </span>

                          <div className="mt-0.5 font-light leading-relaxed">
                            {renderFormattedText(
                              isArabic
                                ? selectedLocation.hours_ar
                                : selectedLocation.hours
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-white/70 font-light">
                        {renderFormattedText(
                          isArabic
                            ? selectedLocation.note.ar
                            : selectedLocation.note.en
                        )}
                      </div>

                      <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                        <a
                          href={
                            selectedLocation.googleMaps?.trim()
                              ? selectedLocation.googleMaps
                              : selectedLocation.coords?.lat !== 0 &&
                                selectedLocation.coords?.lng !== 0
                              ? `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.coords.lat},${selectedLocation.coords.lng}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#E4E47A] px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-black transition-colors hover:bg-white"
                        >
                          {isArabic ? "خرائط جوجل" : "Google Maps"} →
                        </a>

                        <a
                          href={
                            selectedLocation.appleMaps?.trim()
                              ? selectedLocation.appleMaps
                              : selectedLocation.coords?.lat !== 0 &&
                                selectedLocation.coords?.lng !== 0
                              ? `https://maps.apple.com/?ll=${selectedLocation.coords.lat},${selectedLocation.coords.lng}&q=${encodeURIComponent(
                                  selectedLocation.name || ""
                                )}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
                        >
                          {isArabic ? "خرائط أبل" : "Apple Maps"} →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}