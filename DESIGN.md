---
name: C2Tech
description: Oficina digital confiável para encontrar e usar softwares profissionais.
colors:
  brand-navy: "#0a0f1d"
  action-primary: "#0066ff"
  action-primary-hover: "#0052cc"
  feedback-success: "#10b981"
  feedback-success-strong: "#047857"
  surface-page: "#ffffff"
  surface-subtle: "#f8fafc"
  border-default: "#e2e8f0"
  border-strong: "#cbd5e1"
  text-primary: "#1e293b"
  text-secondary: "#64748b"
typography:
  display:
    fontFamily: "Lato, Inter, sans-serif"
  body:
    fontFamily: "Inter, sans-serif"
  transactional-email:
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
  trustpilot:
    fontFamily: "Arial, Helvetica, sans-serif"
rounded:
  control: "12px"
  card: "12px"
spacing:
  unit: "4px"
  compact: "8px"
  base: "16px"
  section: "24px"
  wide: "32px"
components:
  button-primary:
    backgroundColor: "{colors.action-primary}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-page}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  product-card:
    backgroundColor: "{colors.surface-page}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.card}"
  input-default:
    backgroundColor: "{colors.surface-page}"
    textColor: "{colors.text-primary}"
    rounded: "8px"
    padding: "12px 14px"
---
# Design System: C2Tech

## Overview

**Creative North Star: "Oficina digital confiável"**

A interface apresenta uma loja de ferramentas profissionais com clareza e apoio humano. O sistema preserva a identidade atual: navegação branca e objetiva, títulos em Lato, leitura em Inter, azul elétrico para ações e azul-marinho para grandes superfícies de estrutura.

A composição prioriza informação escaneável, compra segura e uso simples em desktop e celular. Cartões permanecem organizados e discretos; estados de foco e hover explicam o que é interativo. O verde sinaliza sucesso e confirmações; cores próprias de marcas externas e meios de pagamento continuam separadas dos papéis da marca.

**Key Characteristics:**
- Profissional, clara e acessível.
- Azul elétrico para ações; azul-marinho para estrutura.
- Superfícies predominantemente claras, com elevação contida.
- Controles diretos, com estados visíveis.

## Colors

A paleta combina azul de ação, marinho estrutural, neutros frios e verde semântico. Os tokens abaixo são definidos em src/index.css e devem ser a fonte única dos papéis da marca.

### Primary
- **Azul elétrico de ação** (#0066ff): botões primários, links, seleções e foco sobre superfícies claras.
- **Azul elétrico de hover** (#0052cc): estado de hover para ações primárias.
- **Azul-marinho técnico** (#0a0f1d): fundo do hero e do rodapé, onde uma superfície escura sustenta a identidade.

### Secondary
- **Verde de sucesso** (#10b981): confirmações positivas, estados concluídos e indicadores de sucesso.
- **Verde de sucesso forte** (#047857): texto e ícones de sucesso que precisam de mais contraste. O verde próprio do WhatsApp continua seguindo a marca do serviço.

### Neutral
- **Branco de superfície** (#ffffff): fundo principal das páginas e dos campos.
- **Cinza névoa** (#f8fafc): superfícies sutis e trilho da barra de rolagem.
- **Borda suave** (#e2e8f0) e **Borda definida** (#cbd5e1): separação de cartões, campos e controles do navegador.
- **Texto principal** (#1e293b) e **Texto secundário** (#64748b): hierarquia de leitura.

**The Action Color Rule.** Use o azul elétrico para ações, links e seleção; use o azul escuro apenas no hover. Não misture tons arbitrários de azul no mesmo controle.

## Typography

**Display Font:** Lato (fallback Inter, sans-serif)
**Body Font:** Inter (fallback sans-serif)

**Character:** Lato traz formas humanistas, estáveis e acolhedoras aos títulos e preços sem endurecer a personalidade da loja. Inter mantém textos, campos e navegação compactos e legíveis. Páginas institucionais seguem a mesma tipografia. Apenas o widget de avaliações Trustpilot mantém Arial, seguindo a tipografia da marca externa.

### Hierarchy
- **Display** (Lato, 700–900, 30–74px responsivos): título principal da home; a faixa varia por viewport.
- **Headline** (Lato, 600–700, 30–48px): títulos de páginas e seções.
- **Title** (Lato, 600–700, 18–24px): cartões, painéis e blocos de apoio.
- **Body** (Inter, 400, 14–18px): explicações, descrição de produtos e texto de suporte.
- **Label** (Inter, 600–700, 10–14px): campos, controles, metadados e estados.

**The Two Voice Rule.** Use Lato para títulos e preços; use Inter para leitura e controles. Arial fica restrita ao widget Trustpilot.

**Transactional Email.** E-mails transacionais usam uma pilha de fontes seguras para clientes de e-mail, com Segoe UI, Tahoma, Geneva e Verdana como fallbacks do sans-serif. Essa exceção não altera a tipografia do site.

## Layout

O conteúdo costuma usar contêineres entre 64rem e 80rem, centralizados, com gutters responsivos de 16px, 24px e 32px. A escala de espaçamento parte de uma unidade de 4px, fornecida pelo Tailwind; prefira múltiplos de 4 para padding, gaps e separações.

Em desktop, a navegação ocupa uma faixa própria e a compra usa uma composição em colunas. Em telas menores, os gutters diminuem, navegação e ações passam para controles móveis fixos e os blocos empilham. Os breakpoints correntes são sm (640px), md (768px), lg (1024px), xl (1280px) e 2xl (1536px).

## Elevation & Depth

A interface usa bordas para separar superfícies e sombras suaves para indicar elevação ou resposta. O cartão de produto usa uma sombra discreta em repouso e aumenta um nível no hover; carrinho, chat e diálogos têm elevação mais forte por flutuarem sobre o conteúdo.

### Shadow Vocabulary
- **Cartão em repouso** (0 1px 2px 0 rgb(0 0 0 / 0.05)): superfície de produto.
- **Cartão em hover** (0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)): resposta ao apontar; tokens shadow-card e shadow-card-hover.

**The One Elevation Rule.** Prefira a borda no estado repouso; use sombra para separar camadas ou reforçar uma interação.

## Simplificação visual

Use cartões quando o conteúdo precisa ser selecionado, comparado ou separado de outros itens — como produtos. Para benefícios, etapas e perguntas frequentes, prefira alinhamento, espaço e divisores. Evite fundos, bordas e sombras empilhados no mesmo bloco. Gradientes e brilhos ficam restritos a usos funcionais ou a uma composição de marca que realmente precise deles; não os use como preenchimento padrão. Controles compactos podem usar raio de 8px; cartões mantêm 12px e painéis, no máximo 16px.

**The One Container Rule.** Não coloque um cartão dentro de outro cartão e não transforme cada grupo de conteúdo em uma superfície.

## Shapes

Cartões e controles recorrentes usam cantos de 12px. Campos de checkout podem usar 8px quando precisam de uma forma mais compacta. Painéis usam a escala Tailwind de 16px; chips e estados pequenos podem ser totalmente arredondados. Não aplique formato de pílula a cartões grandes.

## Components

**Botões:** linguagem direta e confiável; a cor comunica primário, secundário ou sucesso.
- **Primário:** fundo azul elétrico, texto branco, peso 600, padding habitual de 12px por 24px e raio de 12px.
- **Hover / foco:** azul escuro no hover; anel de foco visível azul com separação de 2–3px. Mantenha contraste sobre a superfície em que o botão aparece.
- **Secundário:** fundo branco, borda neutra, texto principal; hover usa superfície sutil.

**Cartão de produto:** fundo branco, borda suave e raio de 12px. Usa sombra baixa em repouso e sombra média no hover. O conteúdo interno varia conforme a densidade e a quantidade de informações.

**Campos:** fundo branco, borda neutra, texto principal. O foco troca a borda para o azul de ação e mostra um anel leve. A busca móvel pode usar forma de pílula para se distinguir dos campos de formulário.

**Navegação:** a barra desktop mantém o fundo branco e usa estados de texto, ícone e contêiner selecionado. Em telas pequenas, a navegação fica fixa na base e usa os mesmos papéis de cor e fonte.

**Seleção de catálogo:** as opções selecionadas usam borda e indicador azul; mantenha texto de estado explícito e controles fáceis de tocar.

### Movimento

O movimento confirma uma ação ou esclarece uma mudança de estado. A resposta de cor, borda, sombra e opacidade usa 140ms; mudanças visuais em imagens de cartão usam 180ms e ficam limitadas a um zoom sutil de 2% em dispositivos com hover. A entrada lateral do carrinho usa 220ms para explicar de onde o painel veio. Os movimentos usam desaceleração rápida (`cubic-bezier(0.16, 1, 0.3, 1)`).

Botões podem encolher levemente enquanto pressionados para confirmar o toque. Não use pulsos contínuos decorativos em ações persistentes. Com `prefers-reduced-motion`, deslocamentos e animações repetidas são removidos, enquanto o feedback de cor continua perceptível.

**The Useful Motion Rule.** Cada movimento deve confirmar uma ação ou tornar uma mudança mais fácil de entender.

## Do's and Don'ts

### Do:
- **Do** use os tokens action-primary e action-primary-hover nas ações principais e em seus estados.
- **Do** use brand-navy apenas em superfícies estruturais; preserve fundos claros para leitura e compra.
- **Do** mantenha a escala de espaço de 4px do Tailwind e use os raios semânticos control e card.
- **Do** preserve cores reconhecíveis de bandeiras, meios de pagamento e widgets de avaliações como identidade externa, não como novas cores de marca.

### Don't:
- **Don't** use tons azuis diferentes para representar a mesma ação.
- **Don't** transforme cores de sucesso em decoração ou em uma segunda cor de marca.
- **Don't** adicione gradiente ao texto, blur decorativo ou sombras fortes a cartões comuns.
- **Don't** misture Arial nas páginas da loja; o widget de avaliações de terceiros é uma exceção.

\n
