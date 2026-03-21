import { caseStudies, services } from "@/lib/content";

type Objection = {
  title: string;
  triggers: string[];
  answer: string;
};

type QualificationPlay = {
  scenario: string;
  triggers: string[];
  questions: string[];
};

const commercialFaqs = services.flatMap((service) =>
  service.faq.map((item) => ({
    service: service.title,
    question: item.question,
    answer: item.answer,
    keywords: [service.slug, service.shortTitle, ...service.keywords]
  }))
);

const objections: Objection[] = [
  {
    title: "Preco",
    triggers: ["preco", "valor", "custo", "caro", "orcamento", "quanto custa"],
    answer:
      "O investimento depende do escopo, dos sistemas envolvidos e do nivel de automacao. Em vez de vender pacote generico, a ZK prioriza o que gera ROI mais rapido e monta uma proposta proporcional ao impacto esperado."
  },
  {
    title: "Prazo",
    triggers: ["prazo", "tempo", "demora", "quando fica pronto", "implantacao"],
    answer:
      "Projetos mais enxutos podem entrar em producao em poucas semanas. Em cenarios com muitas integrações, regras complexas ou legado, o cronograma cresce por fases para reduzir risco e acelerar entregas de valor."
  },
  {
    title: "Legado e complexidade",
    triggers: ["legado", "sistema antigo", "erp antigo", "complexo", "integrar tudo"],
    answer:
      "A ZK trabalha justamente em ambientes com sistemas diferentes, regras espalhadas e processos manuais. O foco e criar uma camada confiavel de integracao e evoluir sem travar a operacao."
  },
  {
    title: "Equipe e substituicao",
    triggers: ["substituir equipe", "demitir", "time", "pessoas", "substitui"],
    answer:
      "A proposta nao e substituir o time, e sim retirar tarefas repetitivas, reduzir erro e liberar capacidade para atividades de venda, analise e decisao."
  },
  {
    title: "Seguranca e confianca",
    triggers: ["seguranca", "confiavel", "erro", "falha", "risco", "dados"],
    answer:
      "A ZK projeta fluxos com logs, monitoramento, retentativa e regras claras de negocio. Isso reduz o risco operacional e evita que a automacao vire uma caixa-preta."
  }
];

const qualificationPlays: QualificationPlay[] = [
  {
    scenario: "Automacao de processos",
    triggers: ["automatizar", "manual", "retrabalho", "processo", "operacao"],
    questions: [
      "Hoje quais tarefas mais consomem tempo do seu time?",
      "Esse gargalo afeta mais atendimento, financeiro, comercial ou operacao?"
    ]
  },
  {
    scenario: "Integracao de sistemas",
    triggers: ["integrar", "api", "erp", "crm", "fornecedor", "marketplace"],
    questions: [
      "Quais sistemas precisam conversar hoje e onde os dados quebram?",
      "O maior impacto esta em atraso operacional, erro de dados ou perda de venda?"
    ]
  },
  {
    scenario: "Bots e IA",
    triggers: ["chatbot", "ia", "bot", "atendimento", "qualificar lead"],
    questions: [
      "Voce quer usar IA mais para atendimento, triagem comercial ou suporte interno?",
      "A IA vai precisar acessar dados do CRM, ERP ou base de conhecimento?"
    ]
  },
  {
    scenario: "E-commerce",
    triggers: ["estoque", "ecommerce", "iphone", "pedido", "catalogo"],
    questions: [
      "Hoje o gargalo principal e estoque, pedido, precificacao ou integracao com fornecedor?",
      "Voce opera em quantos canais e onde acontece a maior ruptura?"
    ]
  }
];

function scoreByTriggers(text: string, triggers: string[]) {
  return triggers.reduce((score, trigger) => {
    return text.includes(trigger.toLowerCase()) ? score + 1 : score;
  }, 0);
}

export function buildChatContext(lastUserMessage: string) {
  const normalized = lastUserMessage.toLowerCase();

  const relevantFaqs = commercialFaqs
    .map((item) => ({
      ...item,
      score: scoreByTriggers(normalized, item.keywords.map((keyword) => keyword.toLowerCase()))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const relevantCases = caseStudies
    .map((item) => ({
      ...item,
      score: scoreByTriggers(normalized, [
        item.segment.toLowerCase(),
        item.slug.toLowerCase(),
        item.title.toLowerCase(),
        ...item.summary.toLowerCase().split(" ")
      ])
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const relevantObjections = objections
    .map((item) => ({
      ...item,
      score: scoreByTriggers(normalized, item.triggers)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  const qualification = qualificationPlays
    .map((item) => ({
      ...item,
      score: scoreByTriggers(normalized, item.triggers)
    }))
    .sort((a, b) => b.score - a.score)[0];

  return {
    faqs: relevantFaqs,
    cases: relevantCases,
    objections: relevantObjections,
    qualification
  };
}
