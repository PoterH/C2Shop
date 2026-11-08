import { useText } from '../hooks/useText';
import React from 'react';

export const PrivacyPage: React.FC = () => {
  const localize = useText();
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen text-left">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Card wrapper */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 space-y-6">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 border-b border-slate-100 pb-4">
            {localize("Política de Privacidade C2Tech")}</h1>

          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4">
            <p>
              A <strong>C2Tech</strong> {localize(" valoriza a sua privacidade e segurança. Esta Política de Privacidade descreve de que forma coletamos, utilizamos e protegemos as informações fornecidas por você durante a navegação em nosso site e ao efetuar compras em nosso checkout seguro.")}</p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">{localize("1. Coleta de Informações")}</h3>
            <p>
              {localize("Coletamos as seguintes informações para processar seu pedido e garantir a entrega automática do software:")}</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>{localize("Dados de identificação:")}</strong> {localize(" Nome completo, CPF (exigido para emissão e segurança do faturamento) e telefone de contato.")}</li>
              <li><strong>{localize("Dados de Entrega:")}</strong> {localize(" Endereço de e-mail (fundamental para a entrega dos arquivos de instalação e suporte).")}</li>
              <li><strong>{localize("Dados de Pagamento:")}</strong> {localize(" Informações de cartão de crédito ou transações Pix coletadas e processadas diretamente por gateways de pagamento criptografados, sem armazenamento em nossos servidores locais.")}</li>
            </ul>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">{localize("2. Uso das Informações")}</h3>
            <p>
              {localize("Os dados coletados são utilizados exclusivamente para:")}</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>{localize("Processar transações e enviar os links de download e ativação de forma imediata por e-mail.")}</li>
              <li>{localize("Prestar suporte remoto e atendimento de instalação assistida via WhatsApp quando solicitado por você.")}</li>
              <li>{localize("Enviar notificações sobre status do pedido ou comunicações importantes de suporte pós-venda.")}</li>
            </ul>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">{localize("3. Compartilhamento de Dados com Terceiros")}</h3>
            <p>
              {localize("A C2Tech ")}<strong>{localize("não vende, aluga ou compartilha")}</strong> {localize(" suas informações pessoais com terceiros para fins publicitários ou promocionais. Seus dados são compartilhados apenas com parceiros essenciais para a operação do e-commerce, como processadores de pagamento e ferramentas de envio de e-mails transacionais automáticos.")}</p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">{localize("4. Segurança da Informação")}</h3>
            <p>
              {localize("Adotamos medidas rígidas de segurança técnica e organizacional para proteger seus dados contra perda, roubo, acesso não autorizado e alteração. Nosso site conta com certificação de criptografia SSL de ponta a ponta, garantindo a integridade dos dados durante toda a navegação e checkout.")}</p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">{localize("5. Direitos do Usuário")}</h3>
            <p>
              {localize("Em conformidade com a legislação vigente de proteção de dados, você tem o direito de solicitar a confirmação da existência de tratamento de seus dados, retificação de dados incompletos ou inexatos, e a exclusão definitiva de seus dados de nossa lista de contatos, desde que não haja obrigações legais para a manutenção dos registros fiscais.")}</p>

            <h3 className="font-display font-bold text-slate-950 text-base mt-6">{localize("6. Alterações desta Política")}</h3>
            <p>
              {localize("Reservamos o direito de atualizar esta Política de Privacidade periodicamente. Alterações significativas serão destacadas no site. Aconselhamos a revisão regular desta página para manter-se informado sobre como protegemos seus dados.")}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
