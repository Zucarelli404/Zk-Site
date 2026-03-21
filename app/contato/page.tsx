import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contato ZK Solutions | Diagnostico e proposta",
  description:
    "Fale com a ZK Solutions e receba um diagnostico inicial para automacao, IA, integracoes e sistemas personalizados.",
  path: "/contato",
  keywords: ["contato zk solutions", "proposta automacao", "diagnostico integracao sistemas"]
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com quem transforma operacao manual em crescimento previsivel."
        description="Preencha o formulario com seu desafio. Nossa equipe retorna com um direcionamento inicial, prioridades e proximos passos."
      />
      <section className="section">
        <div className="container grid-2">
          <div className="card glass">
            <h2>Solicite um diagnostico</h2>
            <p className="muted">
              Ideal para empresas que querem reduzir custo operacional, integrar sistemas
              ou destravar produtividade com automacao e IA.
            </p>
            <ContactForm />
          </div>
          <div className="card glass">
            <h2>Informacoes de contato</h2>
            <ul className="checklist">
              <li>E-mail: {siteConfig.email}</li>
              <li>Telefone: {siteConfig.phone}</li>
              <li>Atendimento nacional para projetos digitais e integracoes</li>
            </ul>
            <h3>Quando a ZK faz sentido</h3>
            <ul className="checklist">
              <li>Seu time esta afogado em tarefas repetitivas</li>
              <li>Seus sistemas nao conversam entre si</li>
              <li>O crescimento esta aumentando o caos operacional</li>
              <li>Voce quer estruturar tecnologia com foco em ROI</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
