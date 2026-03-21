import { CtaBanner, PageHero } from "@/components/sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Como funciona a automacao da ZK Solutions",
  description:
    "Veja como a ZK Solutions conecta sistemas, aplica IA e transforma operacoes manuais em fluxos escalaveis.",
  path: "/como-funciona",
  keywords: ["como funciona automacao empresarial", "integracao e ia", "fluxo de automacao"]
});

const steps = [
  {
    title: "1. Diagnostico e mapeamento",
    description:
      "Levantamos gargalos, entradas de dados, regras de negocio, SLAs e sistemas envolvidos para definir prioridade e ROI."
  },
  {
    title: "2. Integracao e processamento",
    description:
      "Conectamos CRM, ERP, fornecedores, WhatsApp, e-mail e planilhas em fluxos observaveis com automacao e IA."
  },
  {
    title: "3. Acao e escala",
    description:
      "Disparamos follow-ups, aprovacoes, tickets, dashboards e rotinas operacionais com monitoramento e melhoria continua."
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Como funciona"
        title="Dados entram organizados, a automacao executa e sua equipe foca no que gera receita."
        description="A ZK Solutions transforma operacoes fragmentadas em um fluxo centralizado, auditavel e pronto para crescer."
        primaryCta={{ href: "/contato", label: "Agendar diagnostico" }}
      />

      <section className="section">
        <div className="container process-flow">
          {steps.map((step, index) => (
            <article key={step.title} className="card glass">
              <span className="step-number">0{index + 1}</span>
              <h2>{step.title}</h2>
              <p className="muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="card glass">
            <span className="eyebrow">Entradas em sync</span>
            <h2>O que conectamos</h2>
            <ul className="checklist">
              <li>Leads, pedidos e mensagens vindas do site, WhatsApp e e-mail</li>
              <li>Dados de CRM, ERP, fornecedores e planilhas legadas</li>
              <li>Aprovacoes, tarefas manuais e regras operacionais</li>
              <li>Historico comercial, atendimento e eventos de compra</li>
            </ul>
          </article>
          <article className="card glass">
            <span className="eyebrow">Saidas que viram resultado</span>
            <h2>O que a operacao passa a gerar</h2>
            <ul className="checklist">
              <li>Follow-ups automaticos e handoffs sem atrito entre times</li>
              <li>Paineis claros com funil, SLA, estoque e receita</li>
              <li>Acoes disparadas por evento com trilha de auditoria</li>
              <li>Mais velocidade operacional e menos retrabalho humano</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container card glass">
          <span className="eyebrow">Hub de integracoes</span>
          <h2>Conecte os sistemas certos e pare de operar no copiar e colar.</h2>
          <p className="hero-copy">
            Estruturamos uma camada de integracao para CRM, ERP, marketplaces,
            fornecedores, atendimento e ferramentas internas. O objetivo nao e apenas
            transportar dados, mas garantir consistencia operacional.
          </p>
          <div className="logo-cloud" style={{ marginTop: "1rem" }}>
            {["WhatsApp", "Pipedrive", "HubSpot", "Bling", "Tiny", "Shopify", "RD Station", "Google Sheets"].map(
              (item) => (
                <span key={item} className="logo-chip">
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
