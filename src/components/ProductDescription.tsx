import { useState, type ComponentType, type ReactNode } from 'react';
import {
  Infinity as InfinityIcon,
  KeyRound,
  ListChecks,
  Mail,
  CloudDownload,
  PlayCircle,
  MessageCircle,
  Settings2,
  BookOpen,
  Layers,
  Laptop,
  PackageCheck,
  CircleHelp,
  Check,
  ChevronDown,
} from 'lucide-react';
import type { Product } from '../data/products';
import { useText } from '../hooks/useText';
import { useLanguage } from '../context/LanguageContext';

/* "**bold**" inside a translated sentence becomes <strong>. */
function Rich({ value }: { value: string }) {
  const parts = value.split('**');
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i} className="font-semibold text-slate-900">{p}</strong> : <span key={i}>{p}</span>))}</>;
}

type Section = { title: string; intro?: string; items: string[] };

/* ---------------- Product-specific content ---------------- */

const ABOUT: Record<string, Section> = {
  autocad_2027_win: {
    title: 'A diferença entre o nosso AutoCAD completo e o AutoCAD LT',
    intro: 'Na C2Tech você recebe a edição **AutoCAD completa**, não a versão limitada LT:',
    items: [
      '**Desenho 2D e modelagem 3D:** documentação técnica, modelagem 3D, renderização, nuvem de pontos, rotinas **AutoLISP** e bibliotecas de arquitetura, mecânica e elétrica.',
      '**Arquivos DWG e DXF nativos:** crie, edite e exporte com precisão, compatível com os projetos de qualquer escritório ou cliente.',
    ],
  },
  sketchup_2026_win: {
    title: 'Por que o SketchUp Pro Desktop vai além da versão Web / Go',
    intro: 'Você recebe a suíte **SketchUp Pro Desktop completa**, com **LayOut** e **Style Builder**, para arquitetos, designers de interiores, marceneiros e engenheiros:',
    items: [
      '**Plugins e renderizadores:** aceita plugins Ruby (.rbz) e funciona com **V-Ray, Enscape, Lumion e D5 Render**, além de componentes dinâmicos.',
      '**LayOut para pranchas 2D:** transforme o modelo 3D em pranchas executivas com cotas, escalas, cortes e plantas, exportando para DWG, DXF e PDF.',
    ],
  },
  cype_2026: {
    title: 'O que está incluso no CYPE Completo',
    intro: 'Nas três versões (**2027.a, 2026.a e 2025.d**) você recebe a suíte **CYPE completa**, com todos os módulos ativos:',
    items: [
      '**Programas inclusos:** **CYPECAD** (concreto armado, protendido, lajes, vigas, pilares e fundações), **CYPE 3D** (estruturas metálicas, de madeira e alumínio), **CYPETHERM** (análise térmica e energética), **Arquimedes** (orçamentos), Gerador de Preços e módulos de instalações prediais, muros de arrimo, entre outros.',
      '**Suporte por máquina:** em todas as versões, o suporte técnico atende uma máquina por vez, dentro do período de suporte.',
    ],
  },
  coreldraw_2026: {
    title: 'O que está incluso no CorelDRAW Graphics Suite',
    intro: 'A suíte **CorelDRAW Graphics Suite completa**, para uso local sem assinatura mensal. Ideal para gráficas, agências, sublimação, corte a laser e comunicação visual:',
    items: [
      '**Aplicativos:** **CorelDRAW** (ilustração vetorial e diagramação), **Corel PHOTO-PAINT** (edição e retoque de imagens), **PowerTRACE** (vetorização de bitmaps) e **Corel Font Manager**.',
      '**Pronto para produção:** cores CMYK e Pantone, com abertura e exportação de CDR, PDF, EPS, SVG, AI e PSD.',
    ],
  },
};

const EDITIONS: Record<string, Section> = {
  autocad_2027_win: {
    title: 'Como escolher a edição do AutoCAD',
    intro: 'Considere o computador em que você vai instalar:',
    items: [
      '**AutoCAD 2019 (Windows):** para computadores mais antigos, com 8 GB de RAM ou vídeo integrado. Leve, rápido e abre arquivos DWG normalmente.',
      '**AutoCAD 2024 e 2025 (Windows e macOS):** equilíbrio entre estabilidade e recursos modernos, como a contagem automática de blocos (Count) e janelas flutuantes.',
      '**AutoCAD 2026 e 2027 (Windows e macOS):** para computadores atuais, com desempenho gráfico melhorado e suporte otimizado para Windows 11 e Apple Silicon (M1 a M5).',
    ],
  },
  sketchup_2026_win: {
    title: 'Como escolher a edição do SketchUp Pro',
    intro: 'Considere o seu computador e os plugins que você usa:',
    items: [
      '**SketchUp Pro 2021 (Windows):** para computadores mais modestos (8 GB de RAM ou vídeo integrado) e para quem usa plugins clássicos. Leve e estável.',
      '**SketchUp Pro 2024 e 2025 (Windows e macOS):** novo motor gráfico, mais rápido em cenas pesadas, com oclusão ambiental e materiais PBR.',
      '**SketchUp Pro 2026 e 2027 (Windows e macOS):** as edições mais recentes, otimizadas para Windows 11 e Apple Silicon (M1 a M5), com melhorias em IFC e no LayOut.',
    ],
  },
  cype_2026: {
    title: 'Como escolher a versão do CYPE',
    intro: 'Todas incluem CYPECAD, CYPE 3D, CYPETHERM, Arquimedes e os demais módulos:',
    items: [
      '**CYPE 2027.a (todos os idiomas):** a edição mais avançada da nossa oferta. Instalação em **apenas uma máquina**.',
      '**CYPE 2026.a (Português Brasil):** disponível somente em PT-BR, com instalação permitida em várias máquinas.',
      '**CYPE 2025.d (todos os idiomas):** português, espanhol, inglês, francês e outros, com instalação permitida em várias máquinas.',
    ],
  },
  coreldraw_2026: {
    title: 'Como escolher a edição do CorelDRAW',
    intro: 'Escolha pela sua rotina de trabalho e pelo seu computador:',
    items: [
      '**CorelDRAW X7 (Windows):** o clássico de gráficas rápidas, estamparia, sublimação e máquinas de corte. Muito leve, roda até em notebooks com 4 GB de RAM.',
      '**CorelDRAW 2022, 2023 e 2024 (Windows e macOS):** equilíbrio entre leveza e recursos modernos, como exportação multipágina e visualização de páginas lado a lado.',
      '**CorelDRAW 2025 e 2026 (Windows e macOS):** as edições mais recentes, com PowerTRACE aprimorado, catálogo Pantone atualizado e otimização para Windows 11 e Apple Silicon (M1 a M5).',
    ],
  },
};

const MAC_COMPAT = [
  'A edição para macOS roda nativamente em Macs com **Apple Silicon M1, M2, M3, M4 e M5**.',
  '**Modelos compatíveis:** MacBook Air, MacBook Pro, MacBook Neo, iMac, Mac mini e Mac Studio.',
  '**Macs com M6:** suporte em breve.',
];

/* ---------------- Shared blocks by product kind ---------------- */

type Kind = 'download' | 'key' | 'account';
const kindOf = (p: Product): Kind => (p.id === 'autodesk_all_apps' ? 'account' : p.id.startsWith('windows_') ? 'key' : 'download');

const NOTE: Record<Kind, string> = {
  download: 'Esta é a versão **completa e vitalícia** do {name}: todos os recursos profissionais, sem mensalidades ou taxas ocultas. Assim que o pagamento é confirmado, o **link de download chega no seu e-mail**, com **instruções em vídeo passo a passo** para instalar e ativar.',
  key: 'Você recebe uma **chave de ativação original de 25 dígitos** do {name}, com licença permanente. A chave é **enviada pelo WhatsApp** logo após a confirmação do pagamento e a ativação é feita online, direto na Microsoft.',
  account: 'Você recebe **login e senha de uma conta privada Autodesk** para entrar no portal oficial **manage.autodesk.com** e baixar os instaladores oficiais dos aplicativos do pacote, durante o período do plano escolhido.',
};

const STEPS: Record<Kind, { icon: ComponentType<{ className?: string }>; text: string }[]> = {
  download: [
    { icon: Mail, text: 'Após a compra, receba o **link de download** no seu **e-mail**' },
    { icon: CloudDownload, text: 'Baixe o instalador completo com as **instruções em vídeo**' },
    { icon: PlayCircle, text: 'Siga o vídeo e **ative de forma vitalícia** no seu computador' },
  ],
  key: [
    { icon: MessageCircle, text: 'Após a compra, receba a **chave de 25 dígitos** pelo **WhatsApp**' },
    { icon: Settings2, text: 'Abra **Configurações > Sistema > Ativação** no Windows' },
    { icon: KeyRound, text: 'Digite a chave e **ative online** com a Microsoft' },
  ],
  account: [
    { icon: Mail, text: 'Após a compra, receba o **login e a senha** no seu **e-mail e WhatsApp**' },
    { icon: CloudDownload, text: 'Entre no portal oficial **manage.autodesk.com**' },
    { icon: PlayCircle, text: 'Baixe e use os **mais de 86 aplicativos** do pacote' },
  ],
};

const INCLUDED: Record<Kind, string[]> = {
  download: [
    '**Licença vitalícia:** você paga uma única vez e usa a versão adquirida sem mensalidades ou anuidades.',
    '**Tutorial em vídeo:** o passo a passo da instalação, do início ao fim. Não precisa ser técnico em informática.',
    '**Entrega automática:** com o pagamento confirmado, o link de download chega direto no seu e-mail.',
    '**30 dias de suporte técnico:** ajuda pelo WhatsApp, inclusive com acesso remoto, para instalar e ativar.',
    '**Reinstalação:** o link continua no seu e-mail caso você precise formatar o computador, conforme as condições de cada produto.',
  ],
  key: [
    '**Chave original de 25 dígitos:** ativação online oficial da Microsoft.',
    '**Licença permanente:** sem mensalidades ou renovações.',
    '**Envio pelo WhatsApp:** a chave chega logo após a confirmação do pagamento.',
  ],
  account: [
    '**Acesso pelo período escolhido:** use os aplicativos durante os 30 dias, 1 ano, 2 anos ou 3 anos do plano.',
    '**Conta privada para seu uso:** login e senha de uma conta Autodesk, com orientações para entrar no portal oficial.',
    '**Aplicativos originais em um só pacote:** mais de 86 aplicativos, incluindo AutoCAD, Revit, Inventor, Fusion, Maya, 3ds Max e Navisworks.',
    '**Suporte para começar:** orientações de acesso à conta e de instalação dos aplicativos, conforme as condições de suporte do produto.',
  ],
};

function faqFor(p: Product, kind: Kind): { q: string; a: string }[] {
  const list: { q: string; a: string }[] = [];
  if (kind === 'account') {
    list.push(
      { q: 'Como recebo minha conta privada?', a: 'Após a confirmação do pagamento, enviamos login e senha de uma conta privada para você entrar no portal oficial da Autodesk e baixar os aplicativos disponíveis no plano.' },
      { q: 'Por quanto tempo posso usar os aplicativos?', a: 'Durante todo o período do plano escolhido: 30 dias, 1 ano, 2 anos ou 3 anos.' },
    );
  } else if (kind === 'key') {
    list.push(
      { q: 'Como recebo minha chave?', a: 'A chave de 25 dígitos é enviada pelo WhatsApp logo após a aprovação do pagamento, junto com as orientações de ativação.' },
      { q: 'A licença é permanente?', a: 'Sim. Depois de ativada, a licença não tem mensalidade nem data de expiração.' },
    );
  } else {
    list.push(
      { q: 'Como recebo meu software após a compra?', a: 'Assim que o pagamento é aprovado (na hora no Pix ou no cartão de crédito), você recebe um e-mail com o link de download no Google Drive, com o instalador completo e o vídeo de instruções.' },
      { q: 'O software é mesmo vitalício? Vou pagar mensalidade depois?', a: 'É vitalício. Você paga uma única vez e usa a versão adquirida por tempo indeterminado, sem mensalidades ou anuidades. Atualizações para versões lançadas no futuro não estão inclusas.' },
    );
  }
  list.push(kind === 'key'
    ? { q: 'E se eu tiver dificuldade para ativar?', a: 'Fale com a equipe pelo WhatsApp. Ajudamos você a concluir a ativação.' }
    : { q: 'E se eu tiver dificuldade para instalar ou ativar?', a: 'Além das instruções, você tem 30 dias de suporte técnico gratuito pelo WhatsApp. A equipe acompanha você até o programa estar instalado e funcionando.' });
  if (['autocad_2027_win', 'sketchup_2026_win', 'coreldraw_2026'].includes(p.id)) {
    list.push({ q: 'Funciona em Mac (Apple M1 a M5) e no Windows?', a: 'Sim. Escolha a plataforma (Windows ou macOS) e o ano da versão no topo da página antes de comprar. Você recebe a edição compatível com o seu sistema.' });
  }
  return list;
}

/* ---------------- Accordion block ---------------- */

function Block({ id, icon: Icon, title, open, onToggle, children }: {
  id: string; icon: ComponentType<{ className?: string }>; title: ReactNode; open: boolean; onToggle: () => void; children: ReactNode;
}) {
  return (
    <div className="pd-block t-acc rounded-xl border border-slate-200 bg-white transition-colors hover:border-slate-300" data-open={open ? 'true' : 'false'}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`pd-${id}`}
        className="t-acc-head flex w-full items-center gap-3.5 px-4 sm:px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-action-primary rounded-xl"
      >
        <span className="pd-icon"><Icon className="w-[18px] h-[18px]" /></span>
        <span className="flex-1 font-display font-bold text-[15px] sm:text-base text-slate-900">{title}</span>
        <ChevronDown className="t-acc-chevron w-5 h-5 shrink-0 text-slate-500" aria-hidden="true" />
      </button>
      <div className="t-acc-panel" id={`pd-${id}`} aria-hidden={!open}>
        <div className="t-acc-panel-inner">
          <div className="border-t border-slate-100 px-4 sm:px-5 pt-4 pb-5 sm:pl-[68px] text-sm sm:text-[15px] leading-relaxed text-slate-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  const localize = useText();
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5">
          <Check className="w-4 h-4 mt-[3px] shrink-0 text-action-primary" strokeWidth={3} aria-hidden="true" />
          <span><Rich value={localize(it)} /></span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Main ---------------- */

export function ProductDescription({ product }: { product: Product }) {
  const localize = useText();
  const { t } = useLanguage();
  const kind = kindOf(product);
  const about = ABOUT[product.id];
  const editions = EDITIONS[product.id];
  const faq = faqFor(product, kind);
  const [open, setOpen] = useState<Record<string, boolean>>({ about: true });
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const name = localize(product.name);
  const fill = (s: string) => localize(s).split('{name}').join(name);

  return (
    <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
      {/* Highlight note */}
      <div className="pd-note flex items-start gap-3.5 rounded-xl border border-blue-100 bg-white p-4 sm:p-5">
        <span className="pd-icon pd-icon--solid">{kind === 'key' ? <KeyRound className="w-5 h-5" /> : <InfinityIcon className="w-5 h-5" />}</span>
        <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed"><Rich value={fill(NOTE[kind])} /></p>
      </div>

      {/* Details + delivery steps, side by side on desktop */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="flex items-center gap-2.5 font-display font-extrabold text-[15px] sm:text-base text-slate-900">
            <span className="pd-icon pd-icon--sm"><ListChecks className="w-4 h-4" /></span>
            {localize(t('product_details_heading'))}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm sm:text-[15px]">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 mt-[3px] shrink-0 text-feedback-success" strokeWidth={3} aria-hidden="true" />
                <span>{localize(feat)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <h3 className="font-display font-extrabold text-[15px] sm:text-base text-slate-900">
            {kind === 'account' ? localize('Acesse sua conta em 3 passos') : `${localize('Receba seu')} ${name} ${localize('em 3 passos')}`}
          </h3>
          <ol className="pd-steps mt-4">
            {STEPS[kind].map(({ icon: Icon, text }, i) => (
              <li key={i} className="pd-step">
                <span className="pd-step-icon"><Icon className="w-[18px] h-[18px]" /><span className="pd-step-n">{i + 1}</span></span>
                <p className="text-sm text-slate-700 leading-snug pt-1"><Rich value={localize(text)} /></p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Openable blocks */}
      <div className="space-y-3">
        <Block id="about" icon={BookOpen} title={about ? localize(about.title) : `${localize('Sobre o')} ${name}`} open={!!open.about} onToggle={() => toggle('about')}>
          {about ? (
            <div className="space-y-3">
              {about.intro && <p><Rich value={localize(about.intro)} /></p>}
              <CheckList items={about.items} />
            </div>
          ) : (
            <p className="whitespace-pre-line">{localize(product.longDescription)}</p>
          )}
        </Block>

        {editions && (
          <Block id="editions" icon={Layers} title={localize(editions.title)} open={!!open.editions} onToggle={() => toggle('editions')}>
            <div className="space-y-3">
              {editions.intro && <p className="font-medium text-slate-800">{localize(editions.intro)}</p>}
              <CheckList items={editions.items} />
            </div>
          </Block>
        )}

        {product.compatibility !== 'Windows' && kind === 'download' && (
          <Block id="mac" icon={Laptop} title={localize('Compatibilidade com Mac')} open={!!open.mac} onToggle={() => toggle('mac')}>
            <CheckList items={MAC_COMPAT} />
          </Block>
        )}

        <Block id="included" icon={PackageCheck} title={localize('O que está incluso na sua compra')} open={!!open.included} onToggle={() => toggle('included')}>
          <CheckList items={INCLUDED[kind]} />
        </Block>

        <Block id="faq" icon={CircleHelp} title={localize('Perguntas frequentes')} open={!!open.faq} onToggle={() => toggle('faq')}>
          <dl className="divide-y divide-slate-100">
            {faq.map(({ q, a }) => (
              <div key={q} className="py-3 first:pt-0 last:pb-0">
                <dt className="font-semibold text-slate-900">{localize(q)}</dt>
                <dd className="mt-1 text-slate-600">{localize(a)}</dd>
              </div>
            ))}
          </dl>
        </Block>
      </div>
    </div>
  );
}
