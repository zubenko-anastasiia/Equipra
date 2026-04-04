"use client";

import dynamic from "next/dynamic";

const MapSectionClient = dynamic(() => import("./MapSectionClient"), {
  ssr: false,
  loading: () => (
    <section
      id="projects"
      data-nav-section
      className="relative h-[calc(100dvh-65px)] overflow-hidden bg-background"
      style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
    />
  ),
});

export default function MapSection() {
  return <MapSectionClient />;
}
