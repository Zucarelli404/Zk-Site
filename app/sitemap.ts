import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog-store";
import { landingPages, services } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = ["", "/sobre", "/servicos", "/como-funciona", "/cases", "/blog", "/contato"];
  const serviceRoutes = services.map((service) => `/servicos/${service.slug}`);
  const blogPosts = await getAllBlogPosts();
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);
  const lpRoutes = landingPages.map((page) => `/lp/${page.slug}`);

  const routePriority = (route: string): number => {
    if (route === "") return 1;
    if (["/servicos", "/contato", "/blog"].includes(route)) return 0.9;
    if (route.startsWith("/servicos/") || route.startsWith("/lp/")) return 0.85;
    if (route.startsWith("/blog/")) return 0.8;
    return 0.7;
  };

  return [...baseRoutes, ...serviceRoutes, ...blogRoutes, ...lpRoutes].map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/blog") ? "weekly" : "monthly",
    priority: routePriority(route)
  }));
}
