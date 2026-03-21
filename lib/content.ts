export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  hero: string;
  problem: string;
  solution: string;
  outcomes: string[];
  deliverables: string[];
  faq: { question: string; answer: string }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  segment: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  keywords: string[];
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  conclusion: string;
};

export const services: Service[] = [
  {
    slug: "automacao-processos",
    title: "Automacao de Processos Empresariais",
    shortTitle: "Automacao de processos",
    description:
      "Mapeamos gargalos, desenhamos fluxos inteligentes e implantamos automacao para eliminar tarefas manuais, erros e atrasos operacionais.",
    seoTitle: "Automacao empresarial para reduzir custos",
    seoDescription:
      "Automatize operacoes, reduza retrabalho e escale com processos inteligentes, integrados e mensuraveis.",
    keywords: ["automacao empresarial", "automacao de processos", "reduzir custos operacionais"],
    hero:
      "Empresas que dependem de planilhas, processos manuais e retrabalho perdem margem, velocidade e previsibilidade. A ZK Solutions transforma essas operacoes em fluxos digitais conectados.",
    problem:
      "Times sobrecarregados, dados duplicados e processos invisiveis fazem a operacao crescer em custo antes de crescer em receita.",
    solution:
      "Criamos automacoes ponta a ponta para financeiro, comercial, atendimento, supply e backoffice, com integracao entre ferramentas e rastreabilidade total.",
    outcomes: ["Mais velocidade operacional", "Menos erros humanos", "Escala sem aumentar headcount", "Indicadores em tempo real"],
    deliverables: ["Diagnostico do processo", "Desenho do fluxo futuro", "Implementacao da automacao", "Painel de acompanhamento"],
    faq: [
      {
        question: "Quanto tempo leva um projeto de automacao?",
        answer: "Projetos enxutos podem entrar em producao em 2 a 4 semanas. Operacoes mais complexas exigem fases adicionais."
      },
      {
        question: "A automacao substitui o time?",
        answer: "Nao. Ela retira tarefas repetitivas para que o time atue onde existe valor estrategico."
      }
    ]
  },
  {
    slug: "integracao-sistemas",
    title: "Integracao de Sistemas, APIs e ERPs",
    shortTitle: "Integracoes",
    description:
      "Conectamos ERPs, CRMs, gateways, marketplaces e fornecedores para unificar dados e acelerar a operacao sem friccao.",
    seoTitle: "Integracao de sistemas e APIs para empresas",
    seoDescription:
      "Integre ERPs, CRMs, fornecedores e plataformas com seguranca, sincronizacao e menos operacao manual.",
    keywords: ["integracao de sistemas", "integracao api", "integracao ERP"],
    hero:
      "Quando cada sistema fala uma lingua diferente, a empresa perde controle e velocidade. A ZK Solutions cria a camada de integracao que unifica dados e processos.",
    problem:
      "Dados quebrados entre sistemas geram pedido parado, estoque inconsistente, financeiro desalinhado e decisoes lentas.",
    solution:
      "Projetamos integracoes resilientes com filas, logs, regras de negocio e observabilidade para garantir sincronizacao confiavel.",
    outcomes: ["Dados consistentes", "Menos falhas operacionais", "Tempo real entre plataformas", "Base preparada para crescer"],
    deliverables: ["Arquitetura de integracao", "Conectores e webhooks", "Monitoramento", "Documentacao tecnica"],
    faq: [
      {
        question: "Vocês integram sistemas legados?",
        answer: "Sim. Adaptamos conectores, middlewares e processos para incluir ambientes legados com seguranca."
      },
      {
        question: "As integracoes sao monitoradas?",
        answer: "Sim. Entregamos logs, alertas e mecanismos de retentativa para reduzir interrupcoes."
      }
    ]
  },
  {
    slug: "sistemas-personalizados",
    title: "Desenvolvimento de Sistemas Personalizados",
    shortTitle: "Sistemas sob medida",
    description:
      "Criamos plataformas, paineis, portais e operacoes digitais sob medida para sua regra de negocio e meta de crescimento.",
    seoTitle: "Desenvolvimento de sistemas personalizados",
    seoDescription:
      "Desenvolva software sob medida para ganhar produtividade, controle e diferencial competitivo real.",
    keywords: ["sistema personalizado", "software sob medida", "desenvolvimento de sistemas"],
    hero:
      "Softwares genericos limitam processos, criam dependencias e travam a evolucao do negocio. Construimos sistemas pensados para a operacao que voce quer ter.",
    problem:
      "Quando o negocio depende de gambiarra entre ferramentas, a operacao perde confianca, escala e governanca.",
    solution:
      "Projetamos e desenvolvemos sistemas com foco em UX, performance, seguranca, arquitetura escalavel e evolucao continua.",
    outcomes: ["Processo alinhado ao negocio", "Mais controle de dados", "Experiencia superior ao usuario", "Roadmap evolutivo"],
    deliverables: ["Discovery e requisitos", "UX e prototipo", "Desenvolvimento full-stack", "Suporte evolutivo"],
    faq: [
      {
        question: "Vale a pena desenvolver do zero?",
        answer: "Quando o processo gera vantagem competitiva ou exige regras muito especificas, sim. O retorno aparece em eficiencia e independencia."
      },
      {
        question: "O sistema pode integrar com outras plataformas?",
        answer: "Sim. Estruturamos APIs e integrações desde a arquitetura inicial."
      }
    ]
  },
  {
    slug: "bots-ia",
    title: "Bots e IA para Operacoes e Atendimento",
    shortTitle: "Bots e IA",
    description:
      "Implementamos bots, assistentes inteligentes e fluxos com IA para atendimento, triagem, vendas e automacao operacional.",
    seoTitle: "Bots e IA para atendimento e operacao",
    seoDescription:
      "Use bots e IA para atender melhor, escalar operacoes e gerar produtividade com respostas e fluxos inteligentes.",
    keywords: ["bots com IA", "automacao com inteligencia artificial", "chatbot empresarial"],
    hero:
      "IA nao deve ser apenas tendencia. Ela precisa gerar tempo, contexto e produtividade. Criamos bots e assistentes que automatizam tarefas e aceleram decisoes.",
    problem:
      "Atendimento lento, triagem manual e excesso de tarefas repetitivas drenam o time e prejudicam conversao.",
    solution:
      "Construimos agentes, bots de atendimento e automacoes orientadas por IA conectadas aos sistemas da empresa para agir com contexto real.",
    outcomes: ["Resposta mais rapida", "Atendimento 24/7", "Qualificacao automatica", "Operacao mais enxuta"],
    deliverables: ["Definicao de casos de uso", "Fluxos conversacionais", "Integracao com base de dados", "Monitoramento de qualidade"],
    faq: [
      {
        question: "A IA pode responder com dados da empresa?",
        answer: "Sim, com a arquitetura certa, conectamos o bot a fontes autorizadas e controladas."
      },
      {
        question: "Como evitar respostas erradas?",
        answer: "Definimos guardrails, contexto validado, logs e ciclos de melhoria continua."
      }
    ]
  },
  {
    slug: "ecommerce-automation",
    title: "Solucoes para E-commerce e Estoque Inteligente",
    shortTitle: "E-commerce",
    description:
      "Automatizamos estoque, pedidos, precificacao, catalogo e operacoes de marketplaces para e-commerces com alto volume.",
    seoTitle: "Automacao para e-commerce e estoque",
    seoDescription:
      "Sincronize estoque, pedidos e integracoes para vender mais e evitar rupturas em operacoes de e-commerce.",
    keywords: ["automacao ecommerce", "controle de estoque iphone", "integracao marketplace"],
    hero:
      "Operacoes de e-commerce perdem faturamento quando estoque, catalogo e pedidos nao acompanham o ritmo do negocio. A ZK Solutions entrega automacao para vender com previsibilidade.",
    problem:
      "Ruptura de estoque, pedidos presos e divergencia de preco corroem margem e reputacao rapidamente.",
    solution:
      "Integramos canais, automatizamos reconciliacao de estoque e criamos regras para reposicao, alertas e operacao em tempo real.",
    outcomes: ["Menos ruptura", "Mais previsibilidade de estoque", "Processamento agil de pedidos", "Melhor experiencia de compra"],
    deliverables: ["Integracao com marketplaces", "Motor de sincronizacao", "Alertas e dashboards", "Regras de estoque inteligente"],
    faq: [
      {
        question: "Vocês atendem nichos com alto giro, como iPhones?",
        answer: "Sim. Projetamos regras de estoque e sincronizacao para operacoes sensiveis a ruptura e variacao de margem."
      },
      {
        question: "Dá para integrar fornecedores?",
        answer: "Sim. Podemos automatizar a entrada e conciliacao de dados vindos de distribuidores e parceiros."
      }
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "estoque-iphone-em-tempo-real",
    title: "Estoque de iPhone em tempo real para operacao multicanal",
    segment: "E-commerce",
    summary:
      "Automacao de estoque e pedidos entre ERP, marketplace e fornecedores para reduzir ruptura e acelerar faturamento.",
    challenge:
      "A empresa operava com atualizacao manual de estoque e atraso entre canais, o que gerava vendas sem saldo real e cancelamentos frequentes.",
    solution:
      "Criamos uma malha de integracao em tempo real com regras de reserva, conciliacao automatica e alertas operacionais.",
    results: ["-78% em cancelamentos por falta de estoque", "+42% de velocidade no faturamento", "Visao unica do inventario em todos os canais"],
    image: "/images/case-iphone.png"
  },
  {
    slug: "backoffice-financeiro-automatizado",
    title: "Backoffice financeiro automatizado para reduzir retrabalho",
    segment: "Servicos B2B",
    summary:
      "Fluxo automatico entre CRM, emissao, cobranca e ERP, com eliminacao de tarefas repetitivas e melhora de caixa.",
    challenge:
      "Financeiro dependia de exportacoes manuais, conferencias por planilha e validacoes descentralizadas.",
    solution:
      "Mapeamos o processo e implantamos automacoes de faturamento, conciliacao e notificacoes por status.",
    results: ["-61% de horas operacionais no fechamento", "+29% de agilidade no ciclo de cobranca", "Menos erros e mais previsibilidade de caixa"],
    image: "/images/case-financeiro.png"
  },
  {
    slug: "atendimento-com-bot-e-ia",
    title: "Atendimento com bot e IA conectado ao CRM",
    segment: "Operacao comercial",
    summary:
      "Bot com IA para qualificar leads, responder duvidas frequentes e acionar o time comercial com contexto.",
    challenge:
      "O time perdia leads por demora no primeiro contato e gastava hours repetindo respostas basicas.",
    solution:
      "Implementamos um bot conectado ao CRM, base de conhecimento e regras de distribuicao por perfil.",
    results: ["Resposta imediata para 100% dos contatos", "+33% de ganho em leads qualificados", "Time comercial focado em negociacao"],
    image: "/images/case-ai.png"
  }
];

export const landingPages = [
  {
    slug: "automacao-empresarial",
    title: "Automacao empresarial para escalar com margem",
    description:
      "Diagnostico gratuito para identificar gargalos, reduzir custos operacionais e implantar automacao com ROI claro.",
    audience: "Operacoes, financeiro, comercial e backoffice de empresas em crescimento"
  },
  {
    slug: "integracao-de-sistemas",
    title: "Integre seus sistemas sem perder dados ou vendas",
    description:
      "Projeto de integracao com APIs, ERP, CRM e fornecedores para eliminar retrabalho e sincronizar sua operacao.",
    audience: "Empresas que operam com multiplas plataformas e querem base de dados unica"
  }
];
