import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections";
import { services } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/servicos/${service.slug}`,
    keywords: service.keywords
  });
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <>
      <section className="page-hero">
        <div className="container grid-2">
          <div>
            <span className="eyebrow">{service.shortTitle}</span>
            <h1>{service.title}</h1>
            <p className="hero-copy">{service.hero}</p>
          </div>
          <div className="card glass">
            <h2>Objetivo da pagina</h2>
            <p className="muted">{service.description}</p>
            <ul className="checklist">
              {service.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="card glass">
            <h2>Problema que resolvemos</h2>
            <p className="muted">{service.problem}</p>
          </article>
          <article className="card glass">
            <h2>Como a ZK executa</h2>
            <p className="muted">{service.solution}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="card glass">
            <h2>Entregas</h2>
            <ul className="checklist">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card glass">
            <h2>Perguntas frequentes</h2>
            {service.faq.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p className="muted">{item.answer}</p>
              </div>
            ))}
          </article>
        </div>
      </section>

      <CtaBanner />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
