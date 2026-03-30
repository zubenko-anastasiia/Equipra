"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
const highlightedFill = "#D7F3DF";
const polandFill = "rgba(28, 193, 75, 0.5)";
const hoverFill = "#DDF3E2";
const polandHoverFill = "rgba(28, 193, 75, 0.58)";
const selectedStroke = "#16A34A";
const selectedPolandStroke = "#15803D";
const defaultCountryPriority = "Poland";

function FileIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M5 1.5h4.6L12.5 4.4V14a.5.5 0 0 1-.5.5H5A1.5 1.5 0 0 1 3.5 13V3A1.5 1.5 0 0 1 5 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 1.5V4a.5.5 0 0 0 .5.5h2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M5.8 7.2h4.4M5.8 9.5h4.4M5.8 11.8h3.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MapSectionClient({
  geographyData,
}: {
  geographyData: GeographyData;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const highlightedCountries = useMemo(
    () => new Set(projectSites.map((project) => project.countryName)),
    []
  );
  const activeCountry = selectedCountry ?? hoveredCountry;
  const sortedProjects = useMemo(() => {
    return [...projectSites].sort((leftProject, rightProject) => {
      const leftPriority =
        leftProject.countryName === defaultCountryPriority ? 0 : 1;
      const rightPriority =
        rightProject.countryName === defaultCountryPriority ? 0 : 1;

      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }

      const countryComparison = leftProject.countryName.localeCompare(
        rightProject.countryName
      );

      if (countryComparison !== 0) {
        return countryComparison;
      }

      const cityComparison = leftProject.city.localeCompare(rightProject.city);

      if (cityComparison !== 0) {
        return cityComparison;
      }

      return leftProject.name.localeCompare(rightProject.name);
    });
  }, []);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          setSelectedCountry(null);
          setHoveredCountry(null);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const visibleProjects = useMemo(() => {
    if (!activeCountry) {
      return sortedProjects;
    }

    return sortedProjects.filter(
      (project) => project.countryName === activeCountry
    );
  }, [activeCountry, sortedProjects]);

  return (
    <section
      id="projects"
      data-nav-section
      ref={sectionRef}
      className="relative overflow-hidden bg-background pb-8 pt-8 sm:pb-12 sm:pt-16 lg:pb-16 lg:pt-20"
      style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
    >
      <div
        className="relative w-full"
        style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
      >
        <div className="h-[760px] overflow-hidden sm:h-[600px]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 940,
                center: createCoordinates(2.5, 50.2),
              }}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              viewBox="0 0 1000 600"
            >
              <Graticule
                stroke="rgba(28, 193, 75, 0.1)"
                strokeWidth={0.6}
                pointerEvents="none"
              />

              <Geographies geography={geographyData as never}>
                {({ geographies }) =>
                  geographies.map((geo, index) => {
                    const countryName =
                      geo.properties.name || geo.properties.NAME || "";
                    const isHighlightedCountry =
                      highlightedCountries.has(countryName);
                    const isPoland = countryName === "Poland";
                    const isSelectedCountry = selectedCountry === countryName;
                    const isActiveCountry = activeCountry === countryName;
                    const geographyKey =
                      String((geo.id ?? countryName) || `geo-${index}`) +
                      `-${index}`;
                    const currentFill = isPoland
                      ? isActiveCountry
                        ? polandHoverFill
                        : polandFill
                      : isActiveCountry
                        ? hoverFill
                        : isHighlightedCountry
                          ? highlightedFill
                          : baseFill;
                    const currentStroke = isSelectedCountry
                      ? isPoland
                        ? selectedPolandStroke
                        : selectedStroke
                      : borderColor;
                    const currentStrokeWidth = isSelectedCountry
                      ? isPoland
                        ? 2.2
                        : 1.8
                      : isPoland
                        ? isActiveCountry
                          ? 2
                          : 1.9
                        : isActiveCountry
                          ? 1.25
                          : 1.1;

                    return (
                      <Geography
                        key={geographyKey}
                        geography={geo}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="cursor-pointer"
                        fill={currentFill}
                        stroke={currentStroke}
                        strokeWidth={currentStrokeWidth}
                        onMouseEnter={() => {
                          if (!selectedCountry) {
                            setHoveredCountry(countryName);
                          }
                        }}
                        onMouseMove={() => {
                          if (!selectedCountry && hoveredCountry !== countryName) {
                            setHoveredCountry(countryName);
                          }
                        }}
                        onFocus={() => {
                          if (!selectedCountry) {
                            setHoveredCountry(countryName);
                          }
                        }}
                        onClick={() => {
                          setSelectedCountry(countryName);
                          setHoveredCountry(countryName);
                        }}
                        onMouseLeave={() => {
                          if (!selectedCountry) {
                            setHoveredCountry((currentCountry) =>
                              currentCountry === countryName ? null : currentCountry
                            );
                          }
                        }}
                        style={{
                          default: {
                            fill: currentFill,
                            stroke: currentStroke,
                            strokeWidth: currentStrokeWidth,
                            outline: "none",
                            vectorEffect: "non-scaling-stroke",
                            opacity: 1,
                            transition:
                              "fill 180ms ease, stroke 180ms ease, stroke-width 180ms ease, opacity 180ms ease",
                            cursor: "pointer",
                          },
                          hover: {
                            fill: currentFill,
                            stroke: currentStroke,
                            strokeWidth: currentStrokeWidth,
                            outline: "none",
                            vectorEffect: "non-scaling-stroke",
                            opacity: 1,
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: currentFill,
                            stroke: currentStroke,
                            strokeWidth: currentStrokeWidth,
                            outline: "none",
                            vectorEffect: "non-scaling-stroke",
                            opacity: 1,
                            cursor: "pointer",
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
                  pointerEvents="none"
                />
              ))}

              {projectSites.map((project) => (
                <Marker
                  key={project.name}
                  coordinates={project.coordinates}
                  pointerEvents="none"
                >
                  <>
                    <circle r={7} fill="rgba(28, 193, 75, 0.12)" />
                    <circle r={4.5} fill="rgba(28, 193, 75, 0.95)" />
                  </>
                </Marker>
              ))}

              <Marker
                coordinates={centralHub.coordinates}
                pointerEvents="none"
              >
                <>
                  <circle r={14} fill="rgba(28, 193, 75, 0.12)" />
                  <circle r={9} fill="rgba(28, 193, 75, 0.22)" />
                  <circle r={5.5} fill="rgba(28, 193, 75, 1)" />
                </>
              </Marker>
            </ComposableMap>
          </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
            <div className="inline-flex w-full justify-center bg-white p-0 sm:w-auto sm:max-w-[634px]">
              <div className="w-full  pr-4 text-[24px] font-medium leading-8 text-neutral-950 sm:w-auto sm:pl-0 sm:pr-0 sm:text-4xl sm:leading-10">
                From Europe to beyond, Equipra transforms complex challenges
                into solutions.
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 md:px-[60px]">
            <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="pointer-events-auto flex justify-start lg:hidden">
                <div className="w-full max-w-full overflow-hidden rounded-[2px] border border-[#1CC14B] bg-[#fafafa] p-3 shadow-[0_18px_40px_rgba(12,32,21,0.1)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[12px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                        Project locations
                      </p>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-[6px] bg-[#f5f5f5] text-sm font-medium leading-none text-[#737373]">
                      {sortedProjects.length}
                    </div>
                  </div>

                  <div className="mt-4 max-h-[220px] overflow-y-auto pr-1">
                    <div className="space-y-2">
                      {sortedProjects.map((project) => (
                        <div
                          key={`${project.name}-${project.city}-mobile`}
                          className="bg-white px-3 py-3"
                        >
                          <p className="font-mono text-[12px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                            {project.countryName}
                          </p>
                          <p className="mt-[14px] text-[20px] font-semibold leading-none text-[#0a0a0a]">
                            {project.name}
                          </p>
                          <p className="mt-3 text-[14px] font-normal leading-5 text-[#0a0a0a]">
                            {project.city}
                          </p>
                          <p className="mt-1 text-[14px] font-normal leading-5 text-[#737373]">
                            {project.yearLabel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-auto flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:order-1">
                <a
                  href="#contact"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-1 rounded-[2px] border border-[#1cc14b] bg-[#1cc14b] px-[20px] no-underline transition-colors hover:bg-[#18ad43] sm:h-9 sm:justify-start"
                >
                 

                  <span
                    className="whitespace-nowrap text-center leading-6 text-white"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Request a Quote
                  </span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-1 rounded-[2px] border border-[#e5e5e5] bg-white px-[9px] no-underline transition-colors hover:bg-neutral-100 sm:h-9 sm:w-[177px] sm:justify-start"
                >
                  <span className="relative flex h-4 w-6 shrink-0 items-center justify-center text-black">
                    <FileIcon />
                  </span>

                  <span
                    className="whitespace-nowrap text-center leading-6 text-black"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                   View our catalog
                  </span>
                </a>
              </div>

              <div className="hidden justify-start lg:order-2 lg:flex lg:justify-end">
                <div className="pointer-events-auto w-[320px] max-w-full overflow-hidden rounded-[2px] border border-[#1CC14B] bg-[#fafafa] p-3 shadow-[0_18px_40px_rgba(12,32,21,0.1)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                        Project locations
                      </p>
                      {/* <p className="mt-2 max-w-[220px] text-sm font-normal leading-5 text-[#0a0a0a]">
                      {selectedCountry
                        ? `Showing projects in ${selectedCountry}. Select another country or scroll away to reset.`
                        : activeCountry
                          ? `Previewing projects in ${activeCountry}. Click a country to keep it selected.`
                          : "Hover any country, then click to keep that country selected."}
                    </p> */}
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
        </div>
      </div>
    </section>
  );
}
