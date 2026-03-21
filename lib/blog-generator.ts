import type { BlogPost } from "@/lib/content";

type GeneratePostInput = {
  topic: string;
  primaryKeyword: string;
  targetAudience: string;
};

type GeneratedPayload = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  keywords: string[];
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  conclusion: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function extractJsonBlock(text: string) {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);

  if (fenced?.[1]) {
    return fenced[1];
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start >= 0 && end > start) {
    return text.slice(start, end + 1);
  }

  return text;
}

export async function generateBlogPost(input: GeneratePostInput): Promise<BlogPost> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const prompt = `
Gere um artigo SEO em portugues do Brasil para o site da ZK Solutions.

Objetivo:
- atrair trafego organico qualificado
- responder intencao de busca com clareza
- posicionar a ZK Solutions como autoridade
- incluir CTA consultivo para diagnostico no final

Contexto da empresa:
- tecnologia, automacao, integracoes, sistemas personalizados, bots e IA
- publico: empresas que querem reduzir custos, eliminar tarefas manuais e ganhar eficiencia

Tema do artigo: ${input.topic}
Palavra-chave principal: ${input.primaryKeyword}
Publico-alvo: ${input.targetAudience}

Regras:
- retorne apenas JSON valido
- article com mais de 1000 palavras
- title com foco SEO
- description com ate 160 caracteres
- 5 a 8 secoes
- cada secao deve ter heading e 2 ou 3 paragraphs
- bullets opcionais quando ajudarem escaneabilidade
- writingTime em formato "10 min"
- keywords com 4 a 6 termos
- intro e conclusion fortes
- sem markdown fora do JSON

Formato:
{
  "title": "string",
  "description": "string",
  "category": "string",
  "readingTime": "string",
  "keywords": ["string"],
  "intro": "string",
  "sections": [
    {
      "heading": "string",
      "paragraphs": ["string", "string"],
      "bullets": ["string"]
    }
  ],
  "conclusion": "string"
}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 4096,
          responseMimeType: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const raw =
    data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() ?? "";

  const parsed = JSON.parse(extractJsonBlock(raw)) as GeneratedPayload;

  return {
    slug: slugify(parsed.title || input.primaryKeyword || input.topic),
    title: parsed.title,
    description: parsed.description,
    category: parsed.category,
    readingTime: parsed.readingTime,
    keywords: parsed.keywords,
    intro: parsed.intro,
    sections: parsed.sections,
    conclusion: parsed.conclusion
  };
}
