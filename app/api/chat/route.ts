import { buildChatContext } from "@/lib/chat-knowledge";

const systemInstruction = `
Voce e um assistente comercial da ZK Solutions.
Seu papel e qualificar leads, explicar servicos e conduzir para conversao.

Regras:
- Responda em portugues do Brasil.
- Seja objetivo, consultivo e persuasivo.
- Priorize automacao de processos, integracoes, sistemas personalizados, bots com IA e e-commerce.
- Sempre que fizer sentido, faca 1 ou 2 perguntas de qualificacao.
- Quando identificar interesse real, convide para diagnostico pelo formulario do site ou WhatsApp.
- Nao invente preco fechado. Diga que depende do escopo.
- Nao mencione politicas internas ou detalhes tecnicos da API.
- Use a base de FAQ, cases e objecoes recebida no contexto para responder com mais precisao.
- Quando houver case relevante, cite o ganho de negocio de forma curta.
- Quando houver objecao explicita, responda a objecao antes de seguir a conversa.
- Sempre que possivel, conecte a resposta ao impacto operacional ou comercial.

Contexto da empresa:
- A ZK Solutions atende empresas que querem reduzir custos, eliminar tarefas manuais e ganhar eficiencia.
- Telefone/WhatsApp: +55 12 98861-7088
- Servicos principais: automacao de processos, integracao de APIs/ERPs/fornecedores, sistemas personalizados, bots e IA, solucoes para e-commerce e estoque.
- Diferenciais: foco em ROI, integracoes confiaveis, UX boa, SEO tecnico e arquitetura escalavel.
`;

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const FALLBACK_REPLY =
  "Posso te ajudar a mapear automacao, integracoes e oportunidades de ganho operacional. Qual e hoje o maior gargalo da sua empresa? Para uma resposta imediata, fale conosco no WhatsApp: (12) 98861-7088.";

async function callGemini(
  apiKey: string,
  contents: Array<{ role: string; parts: Array<{ text: string }> }>,
  knowledgeContext: string
): Promise<string> {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            contents: [
              {
                role: "user",
                parts: [{ text: `Base comercial ativa:\n${knowledgeContext}` }]
              },
              ...contents
            ],
            generationConfig: {
              temperature: 0.6,
              topP: 0.9,
              maxOutputTokens: 512
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        if (model === models[0]) continue;
        throw new Error(errText);
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
        }>;
      };

      const reply =
        data.candidates?.[0]?.content?.parts
          ?.map((part) => part.text ?? "")
          .join("")
          .trim();

      if (reply) return reply;
    } catch {
      if (model === models[models.length - 1]) throw new Error("API error");
    }
  }

  return FALLBACK_REPLY;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Servico temporariamente indisponivel.", reply: FALLBACK_REPLY },
      { status: 200 }
    );
  }

  try {
    const body = (await request.json()) as { messages?: IncomingMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];

    if (!messages.length) {
      return Response.json({ error: "Mensagens nao fornecidas" }, { status: 400 });
    }

    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const knowledge = buildChatContext(lastUserMessage);

    const knowledgeContext = `
FAQ relevante:
${knowledge.faqs
  .map(
    (item) =>
      `- [${item.service}] Pergunta: ${item.question} | Resposta: ${item.answer}`
  )
  .join("\n")}

Cases relevantes:
${knowledge.cases
  .map(
    (item) =>
      `- ${item.title}: desafio ${item.challenge} | solucao ${item.solution} | resultados ${item.results.join(", ")}`
  )
  .join("\n")}

Objecoes relevantes:
${knowledge.objections.map((item) => `- ${item.title}: ${item.answer}`).join("\n")}

Perguntas de qualificacao sugeridas:
${knowledge.qualification?.questions?.map((q) => `- ${q}`).join("\n") ?? "- Descobrir principal gargalo, sistemas envolvidos e objetivo de negocio."}
`;

    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const reply = await callGemini(apiKey, contents, knowledgeContext);
    return Response.json({ reply });
  } catch {
    return Response.json(
      { reply: FALLBACK_REPLY },
      { status: 200 }
    );
  }
}
