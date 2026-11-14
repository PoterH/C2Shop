import { translateTechnicalText } from './technicalTranslations';
import type { TextDictionary } from './localeMessages';
import type { LanguageCode } from './locale';

const europeanPortuguese = (value: string) => value
  .replace(/usuário/gi, 'utilizador').replace(/Usuário/g, 'Utilizador')
  .replace(/celular/g, 'telemóvel').replace(/Celular/g, 'Telemóvel')
  .replace(/arquivo/g, 'ficheiro').replace(/Arquivo/g, 'Ficheiro')
  .replace(/tela/g, 'ecrã').replace(/Tela/g, 'Ecrã')
  .replace(/equipe/g, 'equipa').replace(/Equipe/g, 'Equipa')
  .replace(/compartilhe/gi, 'partilhe').replace(/Compartilhar/g, 'Partilhar')
  .replace(/senha/g, 'palavra-passe').replace(/Senha/g, 'Palavra-passe')
  .replace(/cadastro/g, 'registo').replace(/Cadastro/g, 'Registo')
  .replace(/suporte técnico/gi, 'apoio técnico');

export function localizeText(value: string, language: LanguageCode, dictionary: TextDictionary = {}): string {
  if (language === 'pt-BR') return value;
  if (language === 'pt-PT') return europeanPortuguese(value);
  const trimmed = value.trim();
  const translated = dictionary[trimmed];
  if (translated) return value.replace(trimmed, translated);
  const quantityAction = trimmed.match(/^(Diminuir quantidade de|Aumentar quantidade de|Remover) (.+)$/);
  if (quantityAction) {
    const actions = language === 'en' ? ['Decrease quantity of', 'Increase quantity of', 'Remove'] : ['Reducir cantidad de', 'Aumentar cantidad de', 'Eliminar'];
    return actions[['Diminuir quantidade de', 'Aumentar quantidade de', 'Remover'].indexOf(quantityAction[1])] + ' ' + quantityAction[2];
  }
  const receive = trimmed.match(/^Receba seu (.+) em 3 passos simples$/);
  if (receive) return language === 'en' ? 'Get your ' + receive[1] + ' in 3 simple steps' : 'Recibe tu ' + receive[1] + ' en 3 pasos sencillos';
  const devices = trimmed.match(/^(\d+) Dispositivos?$/i);
  if (devices) return devices[1] + (language === 'en' ? (devices[1] === '1' ? ' Device' : ' Devices') : (devices[1] === '1' ? ' Dispositivo' : ' Dispositivos'));
  const date = trimmed.match(/^(?:Há |há )?(\d+) (dia|dias|semana|semanas|mês|meses|hora|horas)(?: atrás)?$/);
  if (date) {
    const unit = date[2].startsWith('dia') ? ['day','día'] : date[2].startsWith('semana') ? ['week','semana'] : date[2].startsWith('hora') ? ['hour','hora'] : ['month','mes'];
    const singular = unit[language === 'en' ? 0 : 1];
    const plural = date[1] === '1' ? singular : singular === 'mes' ? 'meses' : singular + 's';
    return language === 'en' ? date[1] + ' ' + plural + ' ago' : 'Hace ' + date[1] + ' ' + plural;
  }
  const category = trimmed.match(/^Compre softwares de (.+) com ativação permanente e sem mensalidades\. Produtos originais com entrega imediata e suporte técnico especializado\.$/);
  if (category) return language === 'en' ? 'Shop ' + category[1] + ' software with permanent activation, instant delivery and technical support.' : 'Compra software de ' + category[1] + ' con activación permanente, entrega inmediata y soporte técnico.';
  const result = trimmed.match(/^Não encontramos resultados para "(.+)"\. Tente buscar por outro termo ou explore outras categorias\.$/);
  if (result) return language === 'en' ? 'No results for "' + result[1] + '". Try another search or category.' : 'No hay resultados para "' + result[1] + '". Prueba otra búsqueda o categoría.';
  const activation = trimmed.match(/^A ativação do seu plano (.+) será realizada imediatamente após a confirmação do pagamento Pix\.$/);
  if (activation) return language === 'en' ? 'Your ' + activation[1] + ' plan will be activated after Pix payment confirmation.' : 'Tu plan ' + activation[1] + ' se activará tras confirmar el pago Pix.';
  const count = trimmed.match(/^(\d+) Softwares$/);
  if (count) return count[1] + (language === 'en' ? ' Software Products' : ' Programas');
  if (trimmed.includes('/mês')) return value.replaceAll('/mês', language === 'en' ? '/month' : '/mes');
  if (language === 'en' && trimmed.startsWith('Pagar ')) return 'Pay ' + trimmed.slice(6);
  return translateTechnicalText(value, language);
}
