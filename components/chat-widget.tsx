"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Oi! Sou o assistente da ZK Solutions. Posso te ajudar a identificar gargalos, sugerir automacoes e indicar a melhor solucao para sua empresa. Como posso ajudar?"
  }
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const suggestedPrompts = useMemo(
    () => [
      "Quero automatizar atendimento e follow-up.",
      "Preciso integrar ERP, CRM e fornecedores.",
      "Tenho um e-commerce com problema de estoque."
    ],
    []
  );

  const whatsappLink = useMemo(() => {
    const userMessages = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content.trim())
      .filter(Boolean);
    const assistantSummary = messages
      .filter((m) => m.role === "assistant")
      .slice(-2)
      .map((m) => m.content.trim())
      .filter(Boolean);
    const text = [
      "Ola, vim pelo chat do site da ZK Solutions.",
      userMessages.length
        ? `Resumo do que preciso:\n- ${userMessages.join("\n- ")}`
        : "Quero entender como a ZK Solutions pode me ajudar.",
      assistantSummary.length
        ? `Contexto gerado no chat:\n- ${assistantSummary.join("\n- ")}`
        : ""
    ]
      .filter(Boolean)
      .join("\n\n");
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
  }, [messages]);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, loading, isOpen]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-10) })
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Erro ao responder");
      }

      setMessages((curr) => [
        ...curr,
        {
          role: "assistant",
          content:
            data.reply ||
            "Posso te ajudar com automacao, integracoes, sistemas personalizados ou IA. Me conte seu principal gargalo."
        }
      ]);
    } catch {
      setError("Nao consegui responder. Clique em tentar novamente ou fale pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleRetry() {
    setError("");
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) void sendMessage(lastUser.content);
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="btn chat-fab"
          aria-expanded={false}
          aria-controls="zk-chat-widget"
          aria-label="Abrir chat"
        >
          Falar com a IA da ZK
        </button>
      )}

      {isOpen && (
        <aside
          id="zk-chat-widget"
          className="chat-widget"
          role="dialog"
          aria-label="Chat ZK Solutions"
        >
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-badge">ASSISTENTE ZK</span>
              <h3>Como posso ajudar?</h3>
            </div>
            <button 
              type="button" 
              className="chat-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Fechar"
            >&times;</button>
          </div>

          <div ref={messagesRef} className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-message ${message.role}`}
              >
                <strong>{message.role === "assistant" ? "ZK IA" : "Você"}</strong>
                <p>{message.content}</p>
              </div>
            ))}
            {loading && (
              <div className="chat-message assistant chat-loading">
                <strong>ZK IA</strong>
                <p className="muted">Analisando seu contexto...</p>
              </div>
            )}
          </div>

          <div className="chat-actions">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void sendMessage(prompt)}
                className="chat-suggest"
                disabled={loading}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chat-form">
            <div className="chat-input-wrapper">
              <textarea
                id="chat-input"
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Como podemos ajudar sua empresa hoje?"
                rows={2}
                disabled={loading}
              />
            </div>
            {error && (
              <div className="chat-error">
                <span className="small muted">{error}</span>
                <button type="button" onClick={handleRetry} className="chat-retry">
                  Tentar novamente
                </button>
              </div>
            )}
            <div className="chat-submit-group">
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-outline chat-whatsapp"
              >
                Enviar conversa no WhatsApp
              </a>
            </div>
          </form>
        </aside>
      )}
    </>
  );
}
