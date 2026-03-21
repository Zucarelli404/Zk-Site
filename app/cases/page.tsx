import Image from "next/image";
import Link from "next/link";
import { CtaBanner, PageHero } from "@/components/sections";
import { caseStudies } from "@/lib/content";
import { buildMetadata, caseStudiesJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cases de automacao, IA e integracoes | ZK Solutions",
  description:
    "Veja cases reais: reducao de custos, ganho de velocidade operacional e crescimento sustentado por tecnologia. Automacao, integracao e IA.",
  path: "/cases",
  keywords: [
    "cases automacao",
    "resultados integracao de sistemas",
    "case bot ia",
    "casos de sucesso automacao empresarial"
  ]
});

export default function CasesPage() {
  const schema = caseStudiesJsonLd();

  return (
    <>
      <PageHero
        eyebrow="Cases e resultados"
        title="Resultados operacionais que viram argumento comercial."
        description="Cada case mostra como tecnologia aplicada com criterio reduz atrito, aumenta eficiencia e gera vantagem competitiva."
        primaryCta={{ href: "/contato", label: "Quero resultado parecido" }}
      />
      <section className="section">
        <div className="container cases-layout">
          <aside className="cases-sidebar" aria-label="Lista de cases">
            <nav className="cases-sidebar-list">
              {caseStudies.map((item, index) => (
                <a
                  key={item.slug}
                  href={`#case-${item.slug}`}
                  className="cases-sidebar-item"
                >
                  <div className="cases-sidebar-thumb">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt=""
                        width={240}
                        height={150}
                        sizes="240px"
                      />
                    )}
                  </div>
                  <span className="cases-sidebar-title">{item.title}</span>
                  <span className="cases-sidebar-segment">{item.segment}</span>
                </a>
              ))}
            </nav>
          </aside>
          <div className="cases-content">
            {caseStudies.map((item) => (
              <article
                key={item.slug}
                id={`case-${item.slug}`}
                className="case-frame card glass"
                style={{ scrollMarginTop: "6rem" }}
              >
                {item.image && (
                  <div className="case-image-wrapper">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={450}
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="case-image"
                    />
                  </div>
                )}
                <p
                  className="small muted"
                  style={{ marginTop: item.image ? "1rem" : 0 }}
                >
                  {item.segment}
                </p>
                <h2>{item.title}</h2>
                <p className="muted">{item.summary}</p>
                <h3>Desafio</h3>
                <p className="muted">{item.challenge}</p>
                <h3>Solucao</h3>
                <p className="muted">{item.solution}</p>
                <h3>Resultados</h3>
                <ul className="checklist">
                  {item.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
