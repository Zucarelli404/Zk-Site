import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container card glass">
        <span className="eyebrow">404</span>
        <h1>Pagina nao encontrada.</h1>
        <p className="hero-copy">
          O conteudo que voce buscou pode ter sido movido, removido ou ainda nao foi
          publicado.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn">
            Voltar para a home
          </Link>
          <Link href="/blog" className="btn-outline">
            Ir para o blog
          </Link>
        </div>
      </div>
    </section>
  );
}
