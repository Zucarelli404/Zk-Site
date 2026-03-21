import { BlogGeneratorForm } from "@/components/blog-generator-form";
import { PageHero } from "@/components/sections";
import { getAllBlogPosts } from "@/lib/blog-store";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Studio de blog com IA para ZK Solutions",
  description:
    "Gere artigos de blog com IA, salve no projeto e publique conteudo SEO para a ZK Solutions.",
  path: "/studio/blog",
  keywords: ["gerador de blog ia", "automacao de conteudo", "seo blog zk solutions"]
});

export const dynamic = "force-dynamic";

export default async function BlogStudioPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Studio de Blog"
        title="Gere posts com IA e alimente o blog sem depender de edicao manual."
        description="Esse fluxo cria artigos estruturados para SEO, salva no projeto e disponibiliza automaticamente no blog."
      />
      <section className="section">
        <div className="container grid-2">
          <div className="card glass">
            <h2>Gerar novo artigo</h2>
            <p className="muted">
              Use um tema claro, uma palavra-chave principal e o publico-alvo. O sistema
              gera o artigo e salva em `content/generated-posts.json`.
            </p>
            <BlogGeneratorForm />
          </div>
          <div className="card glass">
            <h2>Ultimos posts disponiveis</h2>
            <div className="inline-list">
              {posts.slice(0, 8).map((post) => (
                <div key={post.slug} className="card-soft">
                  <strong>{post.title}</strong>
                  <p className="small muted" style={{ marginBottom: 0 }}>
                    /blog/{post.slug}
                    {" • "}
                    {post.generated ? "gerado por IA" : "base fixa"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
