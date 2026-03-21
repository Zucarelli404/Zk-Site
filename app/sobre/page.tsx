import { CtaBanner, PageHero } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre a ZK Solutions e nossa visao de escala",
  description:
    "Conheca a ZK Solutions, especialista em automacao, integracoes, IA e sistemas personalizados para empresas.",
  path: "/sobre",
  keywords: ["sobre zk solutions", "empresa de automacao", "consultoria tecnologia"]
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a ZK Solutions"
        title="Tecnologia aplicada para destravar eficiencia, escala e autoridade."
        description="A ZK Solutions nasce para resolver o que trava crescimento: processos manuais, sistemas desconectados e operacoes dependentes de improviso."
        primaryCta={{ href: "/contato", label: "Falar com especialistas" }}
        secondaryCta={{ href: "/cases", label: "Ver cases" }}
      />
      <section className="section">
        <div className="container grid-2">
          <div className="card glass">
            <h2>Como pensamos</h2>
            <p className="muted">
              Nao vendemos tecnologia como enfeite. Cada projeto parte de uma meta de
              negocio: reduzir custo, acelerar receita, integrar operacao ou elevar
              experiencia do cliente.
            </p>
            <ul className="checklist">
              <li>Diagnostico antes de implementar</li>
              <li>Arquitetura preparada para crescimento</li>
              <li>Execucao com foco em performance e SEO tecnico</li>
            </ul>
          </div>
          <div className="card glass">
            <h2>O que nos diferencia</h2>
            <p className="muted">
              Unimos visao de tecnologia, automacao e marketing digital. Isso permite
              criar ativos digitais que nao apenas funcionam, mas tambem posicionam sua
              marca e geram demanda qualificada.
            </p>
            <div className="grid-2">
              <div className="card">
                <strong>SEO + GEO</strong>
                <p className="muted">Conteudo e estrutura para Google e mecanismos de IA.</p>
              </div>
              <div className="card">
                <strong>UX + Conversao</strong>
                <p className="muted">Interface premium e copy orientada a acao.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
