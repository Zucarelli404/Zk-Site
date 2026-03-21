import type { Metadata } from "next";
import { caseStudies } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({ title, description, path, keywords = [] }: SeoInput): Metadata {
  const url = new URL(path, siteConfig.domain).toString();

  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    metadataBase: new URL(siteConfig.domain),
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "pt_BR",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    })
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.domain,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: Object.values(siteConfig.social),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country
    },
    description: siteConfig.description
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: "Brasil",
    serviceType: [
      "Automacao de processos",
      "Integracao de sistemas",
      "Desenvolvimento de software sob medida",
      "Bots e IA para operacoes"
    ]
  };
}

export function caseStudiesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cases de sucesso ZK Solutions",
    description: "Resultados de automacao, integracao e IA da ZK Solutions",
    url: `${siteConfig.domain}/cases`,
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: item.title,
        description: item.summary,
        url: `${siteConfig.domain}/cases#case-${item.slug}`
      }
    }))
  };
}
