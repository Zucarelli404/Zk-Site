"use client";

import { FormEvent, useState } from "react";

type Result =
  | { ok: true; slug: string; title: string }
  | { ok: false; error: string }
  | null;

export function BlogGeneratorForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setLoading(true);
    setResult(null);

    const response = await fetch("/api/blog/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-blog-automation-token": String(formData.get("token") || "")
      },
      body: JSON.stringify({
        topic: formData.get("topic"),
        primaryKeyword: formData.get("primaryKeyword"),
        targetAudience: formData.get("targetAudience")
      })
    });

    const data = (await response.json()) as
      | { ok: true; slug: string; title: string }
      | { error?: string };

    if (!response.ok) {
      const errorMessage = "error" in data ? data.error || "Erro ao gerar post." : "Erro ao gerar post.";
      setResult({ ok: false, error: errorMessage });
      setLoading(false);
      return;
    }

    if ("ok" in data && data.ok) {
      setResult({ ok: true, slug: data.slug, title: data.title });
    }
    event.currentTarget.reset();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Token de administracao
        <input name="token" type="password" required placeholder="Token de seguranca" />
      </label>
      <label>
        Tema do artigo
        <input
          name="topic"
          required
          placeholder="Ex: Como integrar ERP e CRM sem perder dados"
        />
      </label>
      <div className="grid-2">
        <label>
          Palavra-chave principal
          <input
            name="primaryKeyword"
            required
            placeholder="Ex: integracao ERP e CRM"
          />
        </label>
        <label>
          Publico-alvo
          <input
            name="targetAudience"
            required
            placeholder="Ex: empresas com operacao comercial e financeira integrada"
          />
        </label>
      </div>
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Gerando post..." : "Gerar e salvar artigo"}
      </button>
      {result?.ok ? (
        <p className="small muted">
          Post salvo com sucesso: <strong>{result.title}</strong> em `/blog/{result.slug}`.
        </p>
      ) : null}
      {result && !result.ok ? <p className="small muted">{result.error}</p> : null}
    </form>
  );
}
