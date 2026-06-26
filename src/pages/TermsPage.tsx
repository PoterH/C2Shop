import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen text-left">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card wrapper */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 space-y-6">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 border-b border-slate-100 pb-4">
            Termos de Uso C2Tech
          </h1>
          
          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
            <p>
              Seja bem-vindo ao site da <strong>C2Tech</strong>. Ao acessar e adquirir qualquer produto digital em nosso portal, você concorda expressamente com os termos estabelecidos a seguir. Recomendamos a leitura atenta antes de prosseguir com qualquer transação.
            </p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">1. Modelos de Licenciamento (Vitalício vs Assinaturas)</h3>
            <p>
              Comercializamos softwares em dois formatos: <strong>Assinaturas</strong> (planos com renovação periódica) e <strong>Vitalícios</strong> (pagamento único). 
            </p>
            <p>
              Para os softwares <strong>Vitalícios</strong>, o acesso ao programa nunca expira. O funcionamento se comporta de forma vitalícia <strong>na máquina em que foi instalado</strong>, garantindo o uso permanente desde que o cliente entenda e cumpra os demais termos a seguir (como não perder os arquivos e não trocar de computador).
            </p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">2. Escopo e Entrega</h3>
            <p>
              O cliente receberá, após a confirmação da compra, todos os arquivos e informações necessárias para conseguir efetuar a instalação do software vitalício por conta própria ou entrar no seu software por assinatura.
            </p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">3. Instalação Remota</h3>
            <p>
              Caso o cliente deseje solicitar a instalação remota, a <strong>primeira é sempre gratuita</strong>. As demais instalações remotas (em caso de troca de computador ou formatação, por exemplo) possuem um valor fixo de R$ 50,00, desde que o cliente ainda possua os arquivos que recebeu na compra.
            </p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">4. Perda de Arquivos</h3>
            <p>
              É de responsabilidade do cliente guardar os arquivos. Caso o cliente perca os arquivos do programa e precise de um novo download, ele deverá pagar novamente o valor integral do software.
            </p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">5. Suporte Técnico e Reparos</h3>
            <p>
              O suporte técnico para possíveis problemas com os softwares possui garantia de <strong>30 dias</strong>. Após esse período, o suporte não cobre mais erros ou formatações, sendo necessário o cliente pagar uma taxa fixa de R$ 50,00 para efetuar reparos em seus softwares.
            </p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">6. Licenciamento por Dispositivo e Uso em Outras Máquinas</h3>
            <p>
              O nosso suporte técnico e garantia de instalação cobrem estritamente <strong>1 (uma) máquina por vez</strong>. Caso o cliente deseje instalar os arquivos vitálicios adquiridos em computadores adicionais por conta própria, a C2Tech não bloqueia nem impede essa ação. No entanto, <strong>não nos responsabilizamos</strong> nem prestamos suporte para o funcionamento em máquinas extras.
            </p>
            <p>
              Para receber suporte assistido ou garantia de funcionamento em demais dispositivos, é necessário efetuar uma nova compra e pagar novamente o valor integral. Todas as vendas e entregas digitais são definitivas.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
