"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      event.currentTarget.reset();
      setStatus("success");
      setMessage("Recebemos seus dados. Vamos retornar com um plano inicial.");
      return;
    }

    setStatus("error");
    setMessage("Nao foi possivel enviar agora. Tente novamente em instantes.");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid-2">
        <label>
          Nome
          <input name="name" required placeholder="Seu nome" />
        </label>
        <label>
          Empresa
          <input name="company" required placeholder="Nome da empresa" />
        </label>
      </div>
      <div className="grid-2">
        <label>
          E-mail
          <input name="email" type="email" required placeholder="voce@empresa.com" />
        </label>
        <label>
          Telefone
          <input name="phone" required placeholder="(11) 99999-0000" />
        </label>
      </div>
      <label>
        Principal interesse
        <select name="interest" defaultValue="Automacao de processos">
          <option>Automacao de processos</option>
          <option>Integracao de sistemas</option>
          <option>Sistemas personalizados</option>
          <option>Bots e IA</option>
          <option>E-commerce e estoque</option>
        </select>
      </label>
      <label>
        Descreva o desafio
        <textarea
          name="message"
          required
          placeholder="Explique gargalos, sistemas envolvidos, volume e objetivo de negocio."
        />
      </label>
      <button className="btn" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Automatize seu negocio agora"}
      </button>
      {message ? <p className="small muted">{message}</p> : null}
    </form>
  );
}
