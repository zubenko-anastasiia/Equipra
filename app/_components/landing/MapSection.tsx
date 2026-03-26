import { readFile } from "node:fs/promises";
import path from "node:path";
import MapSectionClient from "./MapSectionClient";

type GeographyData = Record<string, unknown>;

async function getGeographyData(): Promise<GeographyData> {
  const filePath = path.join(process.cwd(), "public", "countries-110m.json");
  const fileContents = await readFile(filePath, "utf8");

  return JSON.parse(fileContents) as GeographyData;
}

export default async function MapSection() {
  const geographyData = await getGeographyData();

  return <MapSectionClient geographyData={geographyData} />;
}
