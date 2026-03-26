import MapSectionClient from "./MapSectionClient";

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

type GeographyData = Record<string, unknown>;

async function getGeographyData(): Promise<GeographyData> {
  const response = await fetch(geoUrl, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to load world map data: ${response.status}`);
  }

  return response.json();
}

export default async function MapSection() {
  const geographyData = await getGeographyData();

  return <MapSectionClient geographyData={geographyData} />;
}
