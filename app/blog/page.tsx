import Link from "next/link";
import { PageHero } from "@/components/sections";
import { getAllBlogPosts } from "@/lib/blog-store";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog de automacao, IA e integracao de sistemas",
  description:
    "Conteudo SEO para empresas que querem automatizar operacoes, reduzir custos e escalar com tecnologia.",
  path: "/blog",
  keywords: ["blog automacao empresarial", "integracao de sistemas", "escala com tecnologia"]
});

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Conteudo estrategico para atrair trafego organico e demanda qualificada."
        description="Artigos longos, escaneaveis e preparados para responder buscas humanas e consultas em mecanismos de IA."
        primaryCta={{ href: "/contato", label: "Transformar conteudo em vendas" }}
      />
      <section className="section">
        <div className="container grid-2">
          {blogPosts.map((post) => (
            <article key={post.slug} className="card glass">
              <p className="small muted">
                {post.category} • {post.readingTime}
              </p>
              <h2>{post.title}</h2>
              <p className="muted">{post.description}</p>
              <div className="kpis">
                {post.keywords.map((keyword) => (
                  <span key={keyword} className="pill">
                    {keyword}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Link href={`/blog/${post.slug}`} className="btn">
                  Ler artigo completo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
