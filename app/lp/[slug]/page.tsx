import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { landingPages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const page = landingPages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/lp/${page.slug}`,
    keywords: [page.title.toLowerCase(), "landing page automacao", "geracao de leads"]
  });
}

export default async function LandingPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = landingPages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container grid-2">
        <div>
          <span className="eyebrow">Landing page de conversao</span>
          <h1>{page.title}</h1>
          <p className="hero-copy">{page.description}</p>
          <ul className="checklist">
            <li>Publico ideal: {page.audience}</li>
            <li>Diagnostico inicial para priorizar gargalos com maior ROI</li>
            <li>Roadmap de automacao, integracao e ganhos esperados</li>
          </ul>
          <div className="btn-row">
            <Link href="/cases" className="btn-outline">
              Ver provas sociais
            </Link>
          </div>
        </div>
        <div className="card glass lp-card">
          <h2>Receba um plano inicial</h2>
          <p className="muted">
            Informe seu contexto e a ZK Solutions retorna com prioridades de alto
            impacto para conversao, eficiencia e escala.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
