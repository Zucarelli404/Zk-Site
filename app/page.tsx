import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/sections";
import { getAllBlogPosts } from "@/lib/blog-store";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, services } from "@/lib/content";

export const metadata = buildMetadata({
  title: "ZK Solutions | Automacao Empresarial, IA e Integracao de Sistemas",
  description:
    "Automatize processos, integre ERPs e reduza custos com IA. Automacao empresarial, integracao de sistemas e bots inteligentes. Solicite diagnostico gratuito.",
  path: "/",
  keywords: [
    "automacao empresarial",
    "integracao de sistemas",
    "desenvolvimento de sistemas personalizados",
    "bots e IA",
    "automacao ecommerce",
    "integrador ERP"
  ]
});

export default async function HomePage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <section className="section hero-section">
        <div className="hero-shell hero-full">
          <div className="container">
            <div className="spotlight">
              <span className="eyebrow">Tecnologia para eficiencia e crescimento</span>
              <h1 className="hero-title">Elimine gargalos com automacao, IA e integracoes que colocam sua empresa em movimento.</h1>
              <p className="hero-copy">
                Automatizamos aprovacoes, follow-ups, estoque, atendimento e rotinas
                operacionais. Unificamos dados e criamos uma operacao mais rapida, clara e
                preparada para escalar com margem.
              </p>
              <div className="btn-row">
                <Link href="/contato" className="btn">
                  Agendar diagnostico
                </Link>
                <Link href="/cases" className="btn-outline">
                  Ver resultados reais
                </Link>
              </div>
              <div className="hero-divider" aria-hidden="true" />
              <div className="kpis">
                <span className="pill">IA para atendimento, suporte e operacao</span>
                <span className="pill">Integracoes entre CRM, ERP e fornecedores</span>
                <span className="pill">Sites e sistemas com SEO e alta conversao</span>
              </div>
              <div className="hero-divider" aria-hidden="true" />
              <div className="hero-badges">
                <span className="floating-badge">Deploy rapido e estrutura escalavel</span>
                <span className="floating-badge">Fluxos monitorados e auditaveis</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-section-divider" aria-hidden="true" />
        <div className="container hero-panel-wrap">
          <div className="card glass hero-panel">
            <span className="eyebrow">Mais receita, menos manual</span>
            <div className="hero-panel-inner">
              <div className="stats">
                <div className="card">
                  <span className="stat-number">-61%</span>
                  <p className="muted">de horas operacionais em processos financeiros.</p>
                </div>
                <div className="card">
                  <span className="stat-number">+42%</span>
                  <p className="muted">de velocidade no faturamento via automacao.</p>
                </div>
                <div className="card">
                  <span className="stat-number">24/7</span>
                  <p className="muted">de resposta com bots e fluxos inteligentes.</p>
                </div>
              </div>
              <div className="signal-board">
                <div className="signal-row">
                  <div className="signal-label">
                    <strong>Lead qualificado entrou</strong>
                    <span className="small muted">Origem: site + WhatsApp + CRM</span>
                  </div>
                  <span className="signal-dot" />
                </div>
                <div className="signal-row">
                  <div className="signal-label">
                    <strong>IA definiu proxima acao</strong>
                    <span className="small muted">Triagem, prioridade e handoff automatico</span>
                  </div>
                  <span className="signal-dot" />
                </div>
                <div className="signal-row">
                  <div className="signal-label">
                    <strong>Operacao executando sem atraso</strong>
                    <span className="small muted">Tarefas, alerts e KPIs em tempo real</span>
                  </div>
                  <span className="signal-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="card glass">
            <span className="eyebrow">Entradas em um so fluxo</span>
            <h2>Leads, pedidos, mensagens e dados dispersos deixam de travar a operacao.</h2>
            <ul className="checklist">
              <li>WhatsApp, site, e-mail e formularios centralizados</li>
              <li>CRM, ERP, fornecedores e planilhas conectados</li>
              <li>Regras, aprovacoes e SLAs modelados com rastreabilidade</li>
            </ul>
          </article>
          <article className="card glass">
            <span className="eyebrow">Saidas que aceleram receita</span>
            <h2>Automacao com proxima acao clara em cada etapa do funil e da operacao.</h2>
            <ul className="checklist">
              <li>Follow-ups automaticos e distribuicao entre times</li>
              <li>Paineis com indicadores e alertas em tempo real</li>
              <li>Acionamentos sem atrito para comercial, financeiro e suporte</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">O que a ZK entrega</span>
            <h2>Uma pilha de solucoes para capturar dados, processar contexto e gerar acao.</h2>
          </div>
          <div className="service-stack">
            {services.map((service, index) => (
              <article key={service.slug} className="card glass service-feature">
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{service.title}</h3>
                  <p className="muted">{service.description}</p>
                  <Link href={`/servicos/${service.slug}`} className="btn-outline">
                    Ver detalhes
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <span className="eyebrow">Como funciona</span>
            <h2>Conectamos ferramentas, processamos com inteligencia e transformamos isso em execucao.</h2>
            <ul className="checklist">
              <li>Mapeamento de dados, gargalos e regras operacionais</li>
              <li>Integracoes com logs, gatilhos por evento e automacoes acionaveis</li>
              <li>IA para atendimento, roteamento, triagem e produtividade</li>
              <li>Operacao guiada por dashboards e proximas acoes recomendadas</li>
            </ul>
            <Link href="/como-funciona" className="btn">
              Ver processo completo
            </Link>
          </div>
          <div className="card glass">
            <h3>Hub central para dados, times e processos</h3>
            <p className="muted">
              Em vez de operar em sistemas soltos, a empresa passa a executar em uma
              arquitetura conectada, com contexto compartilhado e menos retrabalho.
            </p>
            <div className="logo-cloud">
              {["WhatsApp", "ERP", "CRM", "Fornecedores", "Sheets", "E-mail", "API", "Marketplace"].map((item) => (
                <span key={item} className="logo-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Integracoes</span>
          <h2>Chega de copiar e colar entre sistemas. O fluxo certo faz os dados trabalharem por voce.</h2>
          <div className="integration-grid">
            <div className="card glass">
              <p className="hero-copy">
                Conectamos CRM, ERP, e-commerce, fornecedores, atendimento e planilhas
                em uma unica malha operacional. Menos atrito, mais velocidade e mais
                controle de ponta a ponta.
              </p>
              <div className="logo-cloud" style={{ marginTop: "1rem" }}>
                {["HubSpot", "Pipedrive", "RD Station", "Shopify", "Bling", "Tiny", "Google Sheets", "WhatsApp"].map(
                  (item) => (
                    <span key={item} className="logo-chip">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="card glass">
              <h3>O que muda na pratica</h3>
              <ul className="checklist">
                <li>Dados limpos, normalizados e sem duplicidade</li>
                <li>Eventos que disparam tarefas e aprovacoes automaticamente</li>
                <li>Historico unico para comercial, financeiro e operacao</li>
                <li>Base pronta para BI, IA e crescimento de volume</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Prova social</span>
          <h2>Resultados que sustentam autoridade e decisao de compra.</h2>
          <div className="grid-3">
            {caseStudies.map((item) => (
              <article key={item.slug} className="card glass">
                {item.image && (
                  <div className="case-image-wrapper">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={250}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="case-image"
                    />
                  </div>
                )}
                <p className="small muted" style={{ marginTop: item.image ? "1rem" : 0 }}>{item.segment}</p>
                <h2>{item.title}</h2>
                <p className="muted">{item.summary}</p>
                <div className="case-metrics">
                  {item.results.map((result) => (
                    <div key={result} className="case-metric">
                      <strong>{result.split(" ")[0]}</strong>
                      <span className="small muted">{result.replace(`${result.split(" ")[0]} `, "")}</span>
                    </div>
                  ))}
                </div>
                <Link href={`/cases#case-${item.slug}`} className="btn-outline" style={{ marginTop: "1rem" }}>
                  Ver case completo
                </Link>
              </article>
            ))}
          </div>
          <div className="metric-strip" style={{ marginTop: "1.25rem" }}>
            <div className="metric-box">
              <strong>Operacao</strong>
              <p className="muted">Fluxos mais rapidos e menos retrabalho manual.</p>
            </div>
            <div className="metric-box">
              <strong>Comercial</strong>
              <p className="muted">Leads e follow-ups com contexto e prioridade.</p>
            </div>
            <div className="metric-box">
              <strong>Gestao</strong>
              <p className="muted">Indicadores acionaveis para decidir com clareza.</p>
            </div>
          </div>
          <div className="card glass" style={{ marginTop: "1.25rem" }}>
            <p className="quote">
              “Depois da automacao, paramos de perder tempo no manual. Os dados fluem, o
              time responde mais rapido e a operacao deixou de crescer no caos.”
            </p>
            <p className="small muted">Diretoria de operacoes, cliente ZK Solutions</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Blog estrategico</span>
          <h2>Conteudo para rankear, ganhar backlinks e educar o mercado.</h2>
          <div className="grid-2">
            {blogPosts.slice(0, 4).map((post) => (
              <article key={post.slug} className="card glass blog-card">
                <p className="small muted">
                  {post.category} • {post.readingTime}
                </p>
                <h3>{post.title}</h3>
                <p className="muted">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="btn-outline">
                  Ler artigo
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
