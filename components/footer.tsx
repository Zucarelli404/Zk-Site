import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="brand">
            <span className="brand-mark">ZK</span>
            <span>ZK Solutions</span>
          </p>
          <p className="small">
            Automacao, integracoes, sistemas sob medida e IA para empresas que querem
            escalar com eficiencia.
          </p>
        </div>
        <div className="footer-links">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
