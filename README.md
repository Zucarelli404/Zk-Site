# ZK Solutions - Automação, IA e Integração de Sistemas

![ZK Solutions Banner](./public/banner.png) <!-- Adicione um banner aqui, se desejar -->

## 🚀 Sobre o Projeto
O **ZK Solutions** é o portal oficial focado em transformar operações empresariais por meio de automação avançada, inteligência artificial e integração sistêmica. Desenvolvido para apresentar nossa expertise em ajudar empresas a eliminar gargalos operacionais, reduzir trabalhos manuais e escalar com previsibilidade e margem.

## 🎯 Verticais de Atuação
- **🤖 Inteligência Artificial**: Bots para atendimento 24/7, triagem, roteamento, dicas de próxima ação e suporte em tempo real.
- **🔌 Integração Hub**: Conexão entre CRMs (HubSpot, Pipedrive, RD Station), ERPs (Bling, Tiny), E-commerces (Shopify), WhatsApp e planilhas, criando uma malha operacional unificada.
- **⚙️ Automação Empresarial**: Eliminação de cópia e cola, fluxos de aprovação automáticos, disparo de follow-ups comerciais sem atrito.
- **🌐 Sistemas de Alta Conversão**: Sites performáticos com arquitetura otimizada para SEO, gerando leads qualificados no piloto automático.

## 💻 Tech Stack
- **[Next.js 15](https://nextjs.org/)** (App Router) - Framework React
- **[React 19](https://react.dev/)** - Biblioteca base
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática severa para maior segurança

## 📂 Estrutura do Projeto
- `/app`: Roteamento da aplicação e páginas principais.
- `/components`: Componentes visuais e de interface (UI, modais, seções modulares).
- `/content`: Estrutura de conteúdo estático.
- `/lib`: Lógica de negócios, utilitários, SEO e provedores de conteúdo (blog).
- `/public`: Arquivos públicos e assets estáticos.

## 🛠️ Como Executar Localmente

Certifique-se de ter o **Node.js** instalado na sua máquina. Siga as instruções:

1. **Clone este repositório**
   ```bash
   git clone https://github.com/Zucarelli404/Zk-Site.git
   ```

2. **Acesse o diretório**
   ```bash
   cd Zk-Site
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Configuração de Ambiente**
   Copie o arquivo de exemplo para gerar suas variáveis locais.
   ```bash
   cp .env.example .env.local
   ```
   *Abra `.env.local` e preencha as chaves necessárias (ex: tokens de CMS, se houver).*

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador. O servidor atualizará a página sempre que você salvar arquivos.

## 📄 Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev`: Roda a aplicação no modo de desenvolvimento.
- `npm run build`: Gera o build estático e otimizado da aplicação para a pasta `.next`.
- `npm run start`: Inicia o servidor Node com a versão built para produção.
- `npm run lint`: Analisa e valida a formatação de código no Next.js (ESLint).
- `npm run typecheck`: Checa todos os erros de tipagem com TypeScript sem compilar os arquivos (`tsc --noEmit`).

---
Feito com ⚡ para escalar por **ZK Solutions**
