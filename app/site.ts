const DEFAULT_SITE_URL = "http://localhost:3000";

const normalizeSiteUrl = (value?: string) => {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
};

export const siteConfig = {
  name: "Equipra",
  title: "Equipra | Industrial Assembly, Welding, and Renovation Services",
  description:
    "Equipra delivers industrial assembly, welding, renovation, repair, and infrastructure support for manufacturing and energy projects across Europe.",
};

export const getSiteUrl = () =>
  normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      process.env.VERCEL_URL
  );
