import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"]
});
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { buildMetadata, localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "ZK Solutions | Automacao Empresarial, IA e Integracao de Sistemas | Sao Paulo",
  description:
    "Automatize processos, integre sistemas e reduza custos com IA. Consultoria em automacao empresarial, integracao de ERPs e desenvolvimento de bots. Diagnostico gratuito.",
  path: "/",
  keywords: [
    "automacao empresarial",
    "integracao de sistemas",
    "bots com IA",
    "automatizar processos",
    "integrador de sistemas",
    "consultoria tecnologia",
    "reduzir custos com automacao"
  ]
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = [organizationJsonLd(), localBusinessJsonLd()];

  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Pular para o conteudo
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <ChatWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.domain,
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteConfig.domain}/blog?busca={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
