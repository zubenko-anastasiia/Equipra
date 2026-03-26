"use client";

import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  Line,
  createCoordinates,
} from "@vnedyalk0v/react19-simple-maps";

type GeographyData = Record<string, unknown>;

const projectSites = [
  {
    name: "Meura",
    city: "Louvain-la-Neuve",
    countryName: "Belgium",
    yearLabel: "2024",
    coordinates: createCoordinates(4.6144, 50.6683),
  },
  {
    name: "Vandemoortele Polska",
    city: "Kutno",
    countryName: "Poland",
    yearLabel: "2024",
    coordinates: createCoordinates(19.3641, 52.2306),
  },
  {
    name: "Paname Brewing Company",
    city: "Paris",
    countryName: "France",
    yearLabel: "2024",
    coordinates: createCoordinates(2.3522, 48.8566),
  },
  {
    name: "TZF Polfa",
    city: "Warsaw",
    countryName: "Poland",
    yearLabel: "2024-2025",
    coordinates: createCoordinates(21.0122, 52.2297),
  },
  {
    name: "Ciments Calcia",
    city: "Airvault",
    countryName: "France",
    yearLabel: "2024",
    coordinates: createCoordinates(-0.1364, 46.8259),
  },
  {
    name: "Industrial Steel",
    city: "Radomsko",
    countryName: "Poland",
    yearLabel: "2024",
    coordinates: createCoordinates(19.4514, 51.0674),
  },
  {
    name: "Steico",
    city: "Osla",
    countryName: "Poland",
    yearLabel: "2024",
    coordinates: createCoordinates(15.7167, 51.3167),
  },
  {
    name: "BV Gulpener Bierbrouwerij",
    city: "Gulpen",
    countryName: "Netherlands",
    yearLabel: "2022-2025",
    coordinates: createCoordinates(5.8889, 50.8158),
  },
  {
    name: "Repsol",
    city: "Sines",
    countryName: "Portugal",
    yearLabel: "2026",
    coordinates: createCoordinates(-8.8698, 37.9561),
  },
];

const centralHub = {
  name: "Poland Hub",
  coordinates: createCoordinates(19.1451, 51.9194),
};

const borderColor = "#1CC14B";
const baseFill = "#E9F8EC";
const polandFill = "rgba(28, 193, 75, 0.5)";
const hoverFill = "#DDF3E2";
const polandHoverFill = "rgba(28, 193, 75, 0.58)";

export default function MapSectionClient({
  geographyData,
}: {
  geographyData: GeographyData;
}) {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const highlightedCountries = useMemo(
    () => new Set(projectSites.map((project) => project.countryName)),
    []
  );
  const visibleProjects = useMemo(() => {
    if (!activeCountry) return projectSites;
    return projectSites.filter((project) => project.countryName === activeCountry);
  }, [activeCountry]);

  return (
    <section
      className="relative overflow-hidden bg-background pb-12 pt-16 lg:pb-16 lg:pt-20"
      style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
    >
      <div className="w-full">
        <div
          className="relative w-full"
          style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
        >
          <div className="h-[600px] overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 940,
                center: createCoordinates(2.5, 50.2),
              }}
              style={{
                width: "100%",
                height: "600px",
                background: "transparent",
              }}
              viewBox="0 0 1000 600"
            >
              <Graticule
                stroke="rgba(28, 193, 75, 0.1)"
                strokeWidth={0.6}
              />

              <Geographies geography={geographyData as never}>
                {({ geographies }) =>
                  geographies.map((geo, index) => {
                    const countryName =
                      geo.properties.name || geo.properties.NAME || "";
                    const isHighlightedCountry =
                      highlightedCountries.has(countryName);
                    const isPoland = countryName === "Poland";
                    const geographyKey =
                      String((geo.id ?? countryName) || `geo-${index}`) +
                      `-${index}`;

                    return (
                      <Geography
                        key={geographyKey}
                        geography={geo}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="cursor-pointer"
                        fill={isPoland ? polandFill : baseFill}
                        stroke={borderColor}
                        strokeWidth={isPoland ? 1.9 : 1.1}
                        onMouseEnter={() => {
                          setActiveCountry(countryName);
                        }}
                        onMouseLeave={() => {
                          setActiveCountry(null);
                        }}
                        style={{
                          default: {
                            fill: isPoland ? polandFill : baseFill,
                            stroke: borderColor,
                            strokeWidth: isPoland ? 1.9 : 1.1,
                            outline: "none",
                            vectorEffect: "non-scaling-stroke",
                            opacity: 1,
                          },
                          hover: {
                            fill: isPoland ? polandHoverFill : hoverFill,
                            stroke: borderColor,
                            strokeWidth: isPoland ? 2 : 1.2,
                            outline: "none",
                            vectorEffect: "non-scaling-stroke",
                            opacity: 1,
                          },
                          pressed: {
                            fill: isPoland ? polandHoverFill : hoverFill,
                            stroke: borderColor,
                            strokeWidth: isPoland ? 2 : 1.2,
                            outline: "none",
                            vectorEffect: "non-scaling-stroke",
                            opacity: 1,
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {projectSites.map((project) => (
                <Line
                  key={`line-${project.name}`}
                  from={centralHub.coordinates}
                  to={project.coordinates}
                  stroke="rgba(28, 193, 75, 0.4)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="3 6"
                />
              ))}

              {projectSites.map((project) => (
                <Marker
                  key={project.name}
                  coordinates={project.coordinates}
                >
                  <>
                    <circle r={7} fill="rgba(28, 193, 75, 0.12)" />
                    <circle r={4.5} fill="rgba(28, 193, 75, 0.95)" />
                  </>
                </Marker>
              ))}

              <Marker
                coordinates={centralHub.coordinates}
              >
                <>
                  <circle r={14} fill="rgba(28, 193, 75, 0.12)" />
                  <circle r={9} fill="rgba(28, 193, 75, 0.22)" />
                  <circle r={5.5} fill="rgba(28, 193, 75, 1)" />
                </>
              </Marker>
            </ComposableMap>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-4  sm:px-8 md:px-[60px]">
            <div className="inline-flex max-w-[634px] justify-center bg-white">
              <div className="text-4xl font-medium leading-10 text-neutral-950">
                From Europe to beyond, Equipra transforms complex challenges
                into solutions.
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 sm:px-8 md:px-[60px]">
            <div className="w-[320px] max-w-full overflow-hidden rounded-[6px] border border-[#1CC14B] bg-[#fafafa] p-3 shadow-[0_18px_40px_rgba(12,32,21,0.1)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                    Project locations
                  </p>
                  <p className="mt-2 max-w-[220px] text-sm font-normal leading-5 text-[#0a0a0a]">
                    {activeCountry
                      ? `Showing projects in ${activeCountry}`
                      : "Hover a highlighted country to filter the list."}
                  </p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-[6px] bg-[#f5f5f5] text-sm font-medium leading-none text-[#737373]">
                  {visibleProjects.length}
                </div>
              </div>

              <div className="mt-4 max-h-[240px] overflow-y-auto pr-1">
                {visibleProjects.length > 0 ? (
                  <div className="space-y-2">
                    {visibleProjects.map((project) => (
                      <div
                        key={`${project.name}-${project.city}`}
                        className="bg-white px-3 py-3 transition-colors hover:bg-[#f0f0f0]"
                      >
                        <p className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                          {project.countryName}
                        </p>
                        <p className="mt-[14px] text-[22px] font-semibold leading-none text-[#0a0a0a]">
                          {project.name}
                        </p>
                        <p className="mt-3 text-sm font-normal leading-5 text-[#0a0a0a]">
                          {project.city}
                        </p>
                        <p className="mt-1 text-sm font-normal leading-5 text-[#737373]">
                          {project.yearLabel}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white px-3 py-4">
                    <p className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                      {activeCountry ?? "No country selected"}
                    </p>
                    <p className="mt-3 text-sm font-normal leading-5 text-[#0a0a0a]">
                      No projects yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
