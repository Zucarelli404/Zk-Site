import Link from "next/link";
import { CtaBanner, PageHero } from "@/components/sections";
import { services } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicos de automacao, IA e sistemas sob medida",
  description:
    "Conheca os servicos da ZK Solutions: automacao, integracoes, sistemas personalizados, bots com IA e solucoes para e-commerce.",
  path: "/servicos",
  keywords: ["servicos de automacao", "integracao api", "sistema sob medida", "bots com ia"]
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicos"
        title="Cada servico foi desenhado para resolver um gargalo real de crescimento."
        description="Da automacao de processos ao desenvolvimento de sistemas personalizados, a ZK Solutions cria operacoes mais eficientes, integradas e escalaveis."
        primaryCta={{ href: "/contato", label: "Solicitar proposta" }}
      />
      <section className="section">
        <div className="container grid-2">
          {services.map((service) => (
            <article key={service.slug} className="card glass">
              <h2>{service.title}</h2>
              <p className="muted">{service.description}</p>
              <ul className="checklist">
                {service.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={`/servicos/${service.slug}`} className="btn">
                Ver pagina do servico
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
