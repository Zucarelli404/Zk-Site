import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog-store";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    inLanguage: "pt-BR",
    author: {
      "@type": "Organization",
      name: "ZK Solutions"
    },
    publisher: {
      "@type": "Organization",
      name: "ZK Solutions"
    },
    datePublished: post.createdAt ?? "2026-03-20",
    dateModified: post.updatedAt ?? post.createdAt ?? "2026-03-20",
    mainEntityOfPage: `${siteConfig.domain}/blog/${post.slug}`,
    keywords: post.keywords.join(", ")
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            {post.category} • {post.readingTime}
          </span>
          <h1>{post.title}</h1>
          <p className="hero-copy">{post.description}</p>
          <div className="kpis">
            {post.keywords.map((keyword) => (
              <span key={keyword} className="pill">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <article className="container blog-content">
          <section>
            <h2>Resumo objetivo</h2>
            <p className="muted">{post.intro}</p>
          </section>
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <section>
            <h2>Conclusao</h2>
            <p className="muted">{post.conclusion}</p>
          </section>
        </article>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
