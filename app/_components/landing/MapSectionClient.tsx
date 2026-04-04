'use client';

import QuoteRequestModal from '@/app/_components/QuoteRequestModal';
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  type GeographyData,
  type GeographyProps,
  Geography,
  Marker,
  Graticule,
  createCoordinates,
} from "@vnedyalk0v/react19-simple-maps";

type ProjectSite = {
  name: string;
  city: string;
  countryName: string;
  countryLabel?: string;
  yearLabel: string;
  coordinates: ReturnType<typeof createCoordinates>;
};

const projectSites: ProjectSite[] = [
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
  {
    name: "Brauerei Zötler",
    city: "Rettenberg",
    countryName: "Germany",
    yearLabel: "2022",
    coordinates: createCoordinates(10.3081, 47.5573),
  },
  {
    name: "Cervecería La Zaragozana",
    city: "Zaragoza",
    countryName: "Spain",
    yearLabel: "2024",
    coordinates: createCoordinates(-0.8891, 41.6488),
  },
  {
    name: "Aqua Carpatica",
    city: "Vatra Dornei",
    countryName: "Romania",
    yearLabel: "2023",
    coordinates: createCoordinates(25.3523, 47.3491),
  },
  {
    name: "Käserei Vorarlberg",
    city: "Dornbirn",
    countryName: "Austria",
    yearLabel: "2025",
    coordinates: createCoordinates(9.7423, 47.4149),
  },
  {
    name: "Birrificio Angelo Poretti",
    city: "Induno Olona",
    countryName: "Italy",
    yearLabel: "2025",
    coordinates: createCoordinates(8.8406, 45.8514),
  },
  {
    name: "Fyne Ales",
    city: "Cairndow, Scotland",
    countryName: "United Kingdom",
    yearLabel: "2025",
    coordinates: createCoordinates(-5.1661, 56.2099),
  },
  {
    name: "Bell's Brewery",
    city: "Kalamazoo, Michigan",
    countryName: "United States of America",
    countryLabel: "USA",
    yearLabel: "2026",
    coordinates: createCoordinates(-85.5872, 42.2917),
  },
  {
    name: "Käserei Champignon",
    city: "Lauben",
    countryName: "Germany",
    yearLabel: "2022",
    coordinates: createCoordinates(10.2822, 47.7796),
  },
  {
    name: "Gefleortens Mejeri",
    city: "Gävle",
    countryName: "Sweden",
    yearLabel: "2025",
    coordinates: createCoordinates(17.1413, 60.6749),
  },
  {
    name: "Harrogate Spring Water",
    city: "Harrogate",
    countryName: "United Kingdom",
    yearLabel: "2025",
    coordinates: createCoordinates(-1.5418, 53.9921),
  },
  {
    name: "NDA",
    city: "Groningen",
    countryName: "Netherlands",
    yearLabel: "2023",
    coordinates: createCoordinates(6.5665, 53.2194),
  },
  {
    name: "Blije Bronnen",
    city: "Eindhoven",
    countryName: "Netherlands",
    yearLabel: "2025",
    coordinates: createCoordinates(5.4697, 51.4416),
  },
];

const borderColor = "#1CC14B";
const baseFill = "#E9F8EC";
const highlightedFill = "#D7F3DF";
const polandFill = "rgba(28, 193, 75, 0.5)";
const hoverFill = "#DDF3E2";
const polandHoverFill = "rgba(28, 193, 75, 0.58)";
const selectedStroke = "#16A34A";
const selectedPolandStroke = "#15803D";
const defaultCountryPriority = "Poland";
const blockedCountries = new Set(["Russia", "Belarus"]);
const blockedCountryMessage =
  "Equipra does not operate in Russia or Belarus — a conscious choice aligned with our values.";
const defaultProjectionConfig = {
  center: createCoordinates(-28, 31),
  scale: 182,
};
const geographyPath = "/countries-110m.json";
const defaultMapZoom = 1;
const minMapZoom = 1;
const maxMapZoom = 6;
const zoomStep = 0.7;
const mapViewport = {
  width: 1000,
  height: 600,
};
const mapViewportCenter = {
  x: mapViewport.width / 2,
  y: mapViewport.height / 2,
};
type GeographyInteractionStyle = NonNullable<GeographyProps["style"]>;

const defaultCountryStyle = {
  outline: "none",
  vectorEffect: "non-scaling-stroke",
  opacity: 1,
  transition:
    "fill 180ms ease, stroke 180ms ease, stroke-width 180ms ease, opacity 180ms ease",
  cursor: "pointer",
} satisfies CSSProperties;
const baseGeographyStyle = {
  default: defaultCountryStyle,
  hover: defaultCountryStyle,
  pressed: defaultCountryStyle,
} satisfies GeographyInteractionStyle;

type CountryVisualState = {
  fill: string;
  stroke: string;
  strokeWidth: number;
};

type MapView = {
  x: number;
  y: number;
  zoom: number;
};

const defaultCountryVisualState: CountryVisualState = {
  fill: baseFill,
  stroke: borderColor,
  strokeWidth: 1.1,
};

const highlightedCountryVisualState: CountryVisualState = {
  fill: highlightedFill,
  stroke: borderColor,
  strokeWidth: 1.1,
};

const polandCountryVisualState: CountryVisualState = {
  fill: polandFill,
  stroke: borderColor,
  strokeWidth: 1.9,
};

const polandActiveCountryVisualState: CountryVisualState = {
  fill: polandHoverFill,
  stroke: borderColor,
  strokeWidth: 2,
};

function getCountryVisualState({
  countryName,
  activeCountry,
  selectedCountry,
  highlightedCountries,
}: {
  countryName: string;
  activeCountry: string | null;
  selectedCountry: string | null;
  highlightedCountries: Set<string>;
}): CountryVisualState {
  const isPoland = countryName === "Poland";
  const isHighlightedCountry = highlightedCountries.has(countryName);
  const isActiveCountry = activeCountry === countryName;
  const isSelectedCountry = selectedCountry === countryName;

  if (isSelectedCountry) {
    return {
      fill: isPoland
        ? isActiveCountry
          ? polandHoverFill
          : polandFill
        : isActiveCountry
          ? hoverFill
          : isHighlightedCountry
            ? highlightedFill
            : baseFill,
      stroke: isPoland ? selectedPolandStroke : selectedStroke,
      strokeWidth: isPoland ? 2.2 : 1.8,
    };
  }

  if (isPoland) {
    return isActiveCountry
      ? polandActiveCountryVisualState
      : polandCountryVisualState;
  }

  if (isActiveCountry) {
    return {
      fill: hoverFill,
      stroke: borderColor,
      strokeWidth: 1.25,
    };
  }

  return isHighlightedCountry
    ? highlightedCountryVisualState
    : defaultCountryVisualState;
}

function clampZoom(zoom: number) {
  return Math.min(maxMapZoom, Math.max(minMapZoom, zoom));
}

function clampPanCoordinate(coordinate: number, zoom: number, axisSize: number) {
  const overflow = ((zoom - 1) * axisSize) / 2;

  if (overflow <= 0) {
    return 0;
  }

  return Math.max(-overflow, Math.min(overflow, coordinate));
}

function clampMapView(view: MapView): MapView {
  const zoom = clampZoom(view.zoom);

  return {
    zoom,
    x: clampPanCoordinate(view.x, zoom, mapViewport.width),
    y: clampPanCoordinate(view.y, zoom, mapViewport.height),
  };
}

function createDefaultMapView(): MapView {
  return {
    x: 0,
    y: 0,
    zoom: defaultMapZoom,
  };
}

function createMapTransform({ x, y, zoom }: MapView) {
  return [
    `translate(${mapViewportCenter.x + x} ${mapViewportCenter.y + y})`,
    `scale(${zoom})`,
    `translate(${-mapViewportCenter.x} ${-mapViewportCenter.y})`,
  ].join(" ");
}

function getPointerDistance(first: PointerEventState, second: PointerEventState) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function getPointerMidpoint(first: PointerEventState, second: PointerEventState) {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  };
}

function zoomAroundPoint(view: MapView, nextZoom: number, point: { x: number; y: number }) {
  const zoom = clampZoom(nextZoom);

  if (zoom === view.zoom) {
    return clampMapView(view);
  }

  const contentX =
    (point.x - mapViewportCenter.x - view.x) / view.zoom + mapViewportCenter.x;
  const contentY =
    (point.y - mapViewportCenter.y - view.y) / view.zoom + mapViewportCenter.y;
  const nextX = point.x - mapViewportCenter.x - (contentX - mapViewportCenter.x) * zoom;
  const nextY = point.y - mapViewportCenter.y - (contentY - mapViewportCenter.y) * zoom;

  return clampMapView({
    x: nextX,
    y: nextY,
    zoom,
  });
}

type PointerEventState = {
  x: number;
  y: number;
};

type PointerGestureState =
  | {
      type: "pan";
      pointerId: number;
      startPointer: PointerEventState;
      startView: MapView;
    }
  | {
      type: "pinch";
      pointerIds: [number, number];
      startDistance: number;
      startMidpoint: PointerEventState;
      startView: MapView;
    };

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

export default function MapSectionClient() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mapInteractionRef = useRef<HTMLDivElement | null>(null);
  const mapLayerRef = useRef<SVGGElement | null>(null);
  const mapViewRef = useRef<MapView>(createDefaultMapView());
  const activePointersRef = useRef(new Map<number, PointerEventState>());
  const gestureRef = useRef<PointerGestureState | null>(null);
  const didDragRef = useRef(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [geographyData, setGeographyData] = useState<GeographyData | null>(null);
  const [mapView, setMapView] = useState<MapView>(createDefaultMapView);

  const highlightedCountries = useMemo(
    () => new Set(projectSites.map((project) => project.countryName)),
    []
  );
  const activeCountry = selectedCountry ?? hoveredCountry;
  const activeCountryMessage = useMemo(() => {
    if (activeCountry && blockedCountries.has(activeCountry)) {
      return blockedCountryMessage;
    }

    return "No projects yet";
  }, [activeCountry]);
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
    const controller = new AbortController();

    async function loadGeography() {
      const response = await fetch(geographyPath, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`Failed to load geography data: ${response.status}`);
      }

      const data = (await response.json()) as GeographyData;

      setGeographyData(data);
    }

    loadGeography().catch((error: unknown) => {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(error);
    });

    return () => controller.abort();
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

  const resetMapView = () => {
    const nextView = createDefaultMapView();

    mapViewRef.current = nextView;
    setMapView(nextView);
  };

  useEffect(() => {
    mapViewRef.current = mapView;
    mapLayerRef.current?.setAttribute("transform", createMapTransform(mapView));
  }, [mapView]);

  const updateMapViewPreview = (nextView: MapView) => {
    const clampedView = clampMapView(nextView);

    mapViewRef.current = clampedView;
    mapLayerRef.current?.setAttribute("transform", createMapTransform(clampedView));
  };

  const commitMapView = () => {
    setMapView(mapViewRef.current);
  };

  const beginPanGesture = (pointerId: number, pointer: PointerEventState) => {
    gestureRef.current = {
      type: "pan",
      pointerId,
      startPointer: pointer,
      startView: mapViewRef.current,
    };
  };

  const beginPinchGesture = () => {
    const pointers = [...activePointersRef.current.entries()];

    if (pointers.length < 2) {
      return;
    }

    const [firstId, firstPointer] = pointers[0];
    const [secondId, secondPointer] = pointers[1];

    gestureRef.current = {
      type: "pinch",
      pointerIds: [firstId, secondId],
      startDistance: getPointerDistance(firstPointer, secondPointer),
      startMidpoint: getPointerMidpoint(firstPointer, secondPointer),
      startView: mapViewRef.current,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const pointer = { x: event.clientX, y: event.clientY };
    activePointersRef.current.set(event.pointerId, pointer);
    event.currentTarget.setPointerCapture(event.pointerId);

    if (activePointersRef.current.size >= 2) {
      beginPinchGesture();
      return;
    }

    didDragRef.current = false;
    beginPanGesture(event.pointerId, pointer);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const pointer = activePointersRef.current.get(event.pointerId);

    if (!pointer) {
      return;
    }

    const nextPointer = { x: event.clientX, y: event.clientY };
    activePointersRef.current.set(event.pointerId, nextPointer);

    const gesture = gestureRef.current;

    if (!gesture) {
      return;
    }

    if (gesture.type === "pinch") {
      const firstPointer = activePointersRef.current.get(gesture.pointerIds[0]);
      const secondPointer = activePointersRef.current.get(gesture.pointerIds[1]);

      if (!firstPointer || !secondPointer) {
        return;
      }

      const distance = getPointerDistance(firstPointer, secondPointer);

      if (!distance || !gesture.startDistance) {
        return;
      }

      const midpoint = getPointerMidpoint(firstPointer, secondPointer);
      const zoomRatio = distance / gesture.startDistance;
      const zoomedView = zoomAroundPoint(
        gesture.startView,
        gesture.startView.zoom * zoomRatio,
        midpoint
      );

      didDragRef.current = true;
      updateMapViewPreview({
        ...zoomedView,
        x: zoomedView.x + (midpoint.x - gesture.startMidpoint.x),
        y: zoomedView.y + (midpoint.y - gesture.startMidpoint.y),
      });
      return;
    }

    if (gesture.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = nextPointer.x - gesture.startPointer.x;
    const deltaY = nextPointer.y - gesture.startPointer.y;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      didDragRef.current = true;
    }

    updateMapViewPreview({
      ...gesture.startView,
      x: gesture.startView.x + deltaX,
      y: gesture.startView.y + deltaY,
    });
  };

  const finishPointerInteraction = (pointerId: number) => {
    activePointersRef.current.delete(pointerId);

    if (activePointersRef.current.size >= 2) {
      beginPinchGesture();
    } else if (activePointersRef.current.size === 1) {
      const [nextPointerId, nextPointer] = [...activePointersRef.current.entries()][0];
      beginPanGesture(nextPointerId, nextPointer);
    } else {
      gestureRef.current = null;
      commitMapView();

      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishPointerInteraction(event.pointerId);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    finishPointerInteraction(event.pointerId);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();

    const container = mapInteractionRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const point = {
      x: ((event.clientX - rect.left) / rect.width) * mapViewport.width,
      y: ((event.clientY - rect.top) / rect.height) * mapViewport.height,
    };
    const zoomDelta = event.deltaY > 0 ? -0.24 : 0.24;
    const nextView = zoomAroundPoint(
      mapViewRef.current,
      mapViewRef.current.zoom + zoomDelta,
      point
    );

    updateMapViewPreview(nextView);
    commitMapView();
  };

  const changeZoom = (zoomDelta: number) => {
    const nextView = zoomAroundPoint(
      mapViewRef.current,
      mapViewRef.current.zoom + zoomDelta,
      mapViewportCenter
    );

    mapViewRef.current = nextView;
    setMapView(nextView);
  };

  const countryVisualStates = useMemo(() => {
    const states = new Map<string, CountryVisualState>();

    for (const countryName of highlightedCountries) {
      states.set(
        countryName,
        getCountryVisualState({
          countryName,
          activeCountry,
          selectedCountry,
          highlightedCountries,
        })
      );
    }

    states.set(
      defaultCountryPriority,
      getCountryVisualState({
        countryName: defaultCountryPriority,
        activeCountry,
        selectedCountry,
        highlightedCountries,
      })
    );

    if (activeCountry) {
      states.set(
        activeCountry,
        getCountryVisualState({
          countryName: activeCountry,
          activeCountry,
          selectedCountry,
          highlightedCountries,
        })
      );
    }

    if (selectedCountry) {
      states.set(
        selectedCountry,
        getCountryVisualState({
          countryName: selectedCountry,
          activeCountry,
          selectedCountry,
          highlightedCountries,
        })
      );
    }

    return states;
  }, [activeCountry, highlightedCountries, selectedCountry]);

  return (
    <>
    <section
      id="projects"
      data-nav-section
      ref={sectionRef}
      className="relative h-[calc(100dvh-65px)] overflow-hidden bg-background"
      style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
    >
      <div
        className="relative h-full w-full"
        style={{ backgroundColor: "rgba(28, 193, 75, 0.01)" }}
      >
        <div className="h-full overflow-hidden">
          <div
            ref={mapInteractionRef}
            className="h-full w-full touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onWheel={handleWheel}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={defaultProjectionConfig}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
              viewBox={`0 0 ${mapViewport.width} ${mapViewport.height}`}
            >
              <g ref={mapLayerRef} transform={createMapTransform(mapView)}>
                <Graticule
                  stroke="rgba(28, 193, 75, 0.1)"
                  strokeWidth={0.6}
                  pointerEvents="none"
                />

                {geographyData ? (
                  <Geographies geography={geographyData}>
                  {({ geographies }) =>
                    geographies.map((geo, index) => {
                      const countryName =
                        geo.properties.name || geo.properties.NAME || "";
                      const geographyKey =
                        String((geo.id ?? countryName) || `geo-${index}`) +
                        `-${index}`;
                      const currentVisualState =
                        countryVisualStates.get(countryName) ??
                        defaultCountryVisualState;

                      return (
                        <Geography
                          key={geographyKey}
                          geography={geo}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          className="cursor-pointer"
                          fill={currentVisualState.fill}
                          stroke={currentVisualState.stroke}
                          strokeWidth={currentVisualState.strokeWidth}
                          onMouseEnter={() => {
                            if (!selectedCountry) {
                              setHoveredCountry(countryName);
                            }
                          }}
                          onFocus={() => {
                            if (!selectedCountry) {
                              setHoveredCountry(countryName);
                            }
                          }}
                          onClick={() => {
                            if (didDragRef.current) {
                              return;
                            }

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
                          onBlur={() => {
                            if (!selectedCountry) {
                              setHoveredCountry((currentCountry) =>
                                currentCountry === countryName ? null : currentCountry
                              );
                            }
                          }}
                          style={baseGeographyStyle}
                        />
                      );
                    })
                  }
                  </Geographies>
                ) : null}

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
              </g>
            </ComposableMap>
          </div>
        </div>

        <div className="pointer-events-none absolute right-4 top-20 z-20 flex flex-col items-end gap-3 sm:right-8 md:right-[3.75rem]">
          <div className="pointer-events-auto inline-flex flex-col overflow-hidden rounded-[2px] border border-[#1CC14B] bg-white shadow-[0_18px_40px_rgba(12,32,21,0.1)]">
            <button
              type="button"
              onClick={() => changeZoom(zoomStep)}
              className="flex h-11 w-11 items-center justify-center border-b border-[#d9eadf] text-2xl leading-none text-[#0a0a0a] transition-colors hover:bg-[#f4fbf6]"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => changeZoom(-zoomStep)}
              className="flex h-11 w-11 items-center justify-center text-2xl leading-none text-[#0a0a0a] transition-colors hover:bg-[#f4fbf6]"
              aria-label="Zoom out"
            >
              -
            </button>
          </div>

          <button
            type="button"
            onClick={resetMapView}
            className="pointer-events-auto inline-flex h-10 items-center justify-center rounded-[2px] border border-[#d9eadf] bg-white px-3 text-[0.72rem] font-mono uppercase tracking-[1.8px] text-[#0a0a0a] shadow-[0_18px_40px_rgba(12,32,21,0.08)] transition-colors hover:bg-[#f4fbf6]"
          >
            Reset view
          </button>

          {/* <div className="hidden opacity-50 text-right max-w-[220px] rounded-[2px] border border-[#d9eadf] bg-white/92 px-3 py-2  text-[0.72rem] font-mono uppercase tracking-[1.8px] text-[#737373] shadow-[0_18px_40px_rgba(12,32,21,0.08)] backdrop-blur-sm lg:block">
            Pinch to zoom <br/>Drag to move
          </div> */}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className="mx-auto w-full max-w-[1800px] px-4  sm:px-8 md:px-[3.75rem]">
            <div className="inline-flex w-full justify-center bg-white p-0 sm:w-auto sm:max-w-[634px]">
              <div className="w-full pr-4 text-2xl font-medium leading-8 text-neutral-950 sm:w-auto sm:pl-0 sm:pr-0 sm:text-4xl sm:leading-10">
                From Europe to beyond, Equipra transforms complex challenges
                into solutions.
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-8 md:px-[3.75rem]">
            <div className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="pointer-events-auto flex justify-start lg:hidden">
                <div className="w-full max-w-full overflow-hidden rounded-[2px] border border-[#1CC14B] bg-[#fafafa] p-3 shadow-[0_18px_40px_rgba(12,32,21,0.1)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
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
                          className="bg-white px-3 py-2.5"
                        >
                          <p className="text-lg font-semibold leading-tight text-[#0a0a0a]">
                            {project.name}
                          </p>
                          <p className="mt-2 text-sm font-normal leading-5 text-[#737373]">
                            {project.countryLabel ?? project.countryName}, {project.city}
                            <span
                              aria-hidden="true"
                              className="mx-2 inline-block text-base leading-none text-[#737373]"
                            >
                              ·
                            </span>
                            {project.yearLabel}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-auto flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:order-1">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex cursor-pointer h-11 shrink-0 items-center justify-center gap-1 rounded-[2px] border border-[#1cc14b] bg-[#1cc14b] px-[20px] no-underline transition-colors hover:bg-[#18ad43] sm:h-9 sm:justify-start"
                >
                 <span className="relative flex h-4 w-6 shrink-0 items-center justify-center text-white">
                    <FileIcon />
                  </span>

                  <span
                    className="whitespace-nowrap text-center leading-6 text-white"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    Request a Quote
                  </span>
                </button>

                {/* <a
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
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                   View our catalog
                  </span>
                </a> */}
              </div>

              <div className="hidden justify-start lg:order-2 lg:flex lg:justify-end">
                <div className="pointer-events-auto w-[320px] max-w-full overflow-hidden rounded-[2px] border border-[#1CC14B] bg-[#fafafa] p-3 shadow-[0_18px_40px_rgba(12,32,21,0.1)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-[0.6875rem] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
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
                            className="bg-white px-3 py-2.5 transition-colors hover:bg-[#f0f0f0]"
                          >
                            <p className="text-xl font-semibold leading-tight text-[#0a0a0a]">
                              {project.name}
                            </p>
                            <p className="mt-2 text-sm font-normal leading-5 text-[#737373]">
                              {project.countryLabel ?? project.countryName}, {project.city}
                              <span
                                aria-hidden="true"
                                className="mx-2 inline-block text-base leading-none text-[#737373]"
                              >
                                ·
                              </span>
                              {project.yearLabel}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white px-3 py-4">
                        <p className="font-mono text-[0.6875rem] font-normal uppercase leading-4 tracking-[1.8px] text-[#737373]">
                          {activeCountry ?? "No country selected"}
                        </p>
                        <p className="mt-3 text-sm font-normal leading-5 text-[#0a0a0a]">
                          {activeCountryMessage}
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
    <QuoteRequestModal
      isOpen={isQuoteModalOpen}
      onClose={() => setIsQuoteModalOpen(false)}
    />
    </>
  );
}
