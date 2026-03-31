import type { MetadataRoute } from "next";
import { getSiteUrl } from "./site";
import { getBlogPosts } from "./blog/blogData";
import { getVacancies } from "./vacancies/vacancyData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [posts, vacancies] = await Promise.all([getBlogPosts(), getVacancies()]);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/vacancies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...vacancies.map((vacancy) => ({
      url: `${siteUrl}/vacancies/${vacancy.slug}`,
      lastModified: new Date(vacancy.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
