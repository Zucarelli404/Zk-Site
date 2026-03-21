import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="hero-copy">{description}</p>
        {(primaryCta || secondaryCta) && (
          <div className="btn-row">
            {primaryCta ? (
              <Link href={primaryCta.href} className="btn">
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn-outline">
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <span className="eyebrow">Pronto para crescer</span>
          <h2>Transforme operacao travada em uma maquina de escala.</h2>
          <p className="hero-copy">
            Diagnostico estrategico, plano de automacao e implementacao com foco em
            resultado real.
          </p>
          <div className="btn-row">
            <Link href="/contato" className="btn">
              Solicitar diagnostico
            </Link>
            <Link href="/cases" className="btn-outline">
              Ver resultados
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
