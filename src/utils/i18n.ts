import type { LanguageCode } from '../context/LanguageContext';

export function translateCategory(category: string, lang: LanguageCode): string {
  if (lang === 'pt-BR') return category;

  if (lang === 'es') {
    switch (category) {
      case 'Todos':
        return 'Todos los Softwares';
      case 'Engenharia e Arquitetura':
        return 'Ingeniería y Arquitectura';
      case 'Design e Criatividade':
        return 'Diseño y Creatividad';
      case 'Escritório e Produtividade':
        return 'Oficina y Productividad';
      case 'Marcenaria e Móveis Planejados':
        return 'Carpintería y Muebles';
      case 'Projetos Elétricos e Eletrônicos':
        return 'Proyectos Eléctricos y Electrónicos';
      case 'Odontologia e CAD Dental':
        return 'Odontología y CAD Dental';
      default:
        return category;
    }
  }

  if (lang === 'pt-PT') {
    switch (category) {
      case 'Todos':
        return 'Todos os Softwares';
      case 'Engenharia e Arquitetura':
        return 'Engenharia & Arquitetura';
      case 'Design e Criatividade':
        return 'Design & Criatividade';
      case 'Escritório e Produtividade':
        return 'Escritório & Produtividade';
      case 'Marcenaria e Móveis Planejados':
        return 'Marcenaria & Mobiliário';
      case 'Projetos Elétricos e Eletrônicos':
        return 'Projetos Elétricos e Eletrónicos';
      case 'Odontologia e CAD Dental':
        return 'Medicina Dentária e CAD Dental';
      default:
        return category;
    }
  }

  return category;
}

export function translateCompatibility(comp: string, lang: LanguageCode): string {
  if (lang === 'es') {
    return comp.replace(/ e /g, ' y ');
  }
  return comp;
}

export function translateFeature(feat: string, lang: LanguageCode): string {
  if (lang === 'pt-BR') return feat;

  if (lang === 'es') {
    let f = feat;
    f = f.replace(/Versão completa e funcional/gi, 'Versión completa y funcional');
    f = f.replace(/Versão completa/gi, 'Versión completa');
    f = f.replace(/Ativação permanente \(vitalícia sem mensalidades\)/gi, 'Activación permanente (de por vida sin mensualidades)');
    f = f.replace(/Ativação permanente/gi, 'Activación permanente');
    f = f.replace(/Ativação vitalícia/gi, 'Activación de por vida');
    f = f.replace(/sem mensalidades ou assinaturas/gi, 'sin mensualidades ni suscripciones');
    f = f.replace(/sem mensalidades/gi, 'sin mensualidades');
    f = f.replace(/Acesso vitalício para uso ilimitado/gi, 'Acceso de por vida para uso ilimitado');
    f = f.replace(/Acesso vitalício/gi, 'Acceso de por vida');
    f = f.replace(/Uso vitalício/gi, 'Uso de por vida');
    f = f.replace(/vitalícia/gi, 'de por vida');
    f = f.replace(/vitalício/gi, 'de por vida');
    f = f.replace(/Vídeo tutorial passo a passo de instalação incluso/gi, 'Video tutorial de instalación paso a paso incluido');
    f = f.replace(/Vídeo passo a passo de instalação incluso/gi, 'Video paso a paso de instalación incluido');
    f = f.replace(/Acompanha vídeo tutorial passo a passo de instalação/gi, 'Incluye video tutorial paso a paso de instalación');
    f = f.replace(/Acompanha vídeo tutorial/gi, 'Incluye video tutorial');
    f = f.replace(/Entrega 100% automática no e-mail e WhatsApp logo após a compra/gi, 'Entrega 100% automática por correo y WhatsApp tras la compra');
    f = f.replace(/Entrega 100% automática no e-mail e WhatsApp logo após a confirmação/gi, 'Entrega 100% automática por correo y WhatsApp tras la confirmación');
    f = f.replace(/Entrega automática no e-mail após o pagamento/gi, 'Entrega automática por correo electrónico tras el pago');
    f = f.replace(/Entrega imediata no e-mail e WhatsApp após a confirmação/gi, 'Entrega inmediata por correo y WhatsApp tras la confirmación');
    f = f.replace(/Entrega digital imediata via e-mail e WhatsApp/gi, 'Entrega digital inmediata por correo y WhatsApp');
    f = f.replace(/Entrega digital imediata/gi, 'Entrega digital inmediata');
    f = f.replace(/Suporte técnico garantido por 30 dias/gi, 'Soporte técnico garantizado por 30 días');
    f = f.replace(/Suporte técnico remoto incluso/gi, 'Soporte técnico remoto incluido');
    f = f.replace(/Suporte técnico e garantia de funcionamento inclusos/gi, 'Soporte técnico y garantía de funcionamiento incluidos');
    f = f.replace(/Garantia de 30 dias e suporte técnico com acesso remoto incluso/gi, 'Garantía de 30 días y soporte técnico con acceso remoto incluido');
    f = f.replace(/Suporte remoto quando necessário/gi, 'Soporte remoto cuando sea necesario');
    f = f.replace(/Pronto para uso imediato/gi, 'Listo para usar de inmediato');
    f = f.replace(/Edições disponíveis para Windows e macOS/gi, 'Ediciones disponibles para Windows y macOS');
    f = f.replace(/para Windows e macOS/gi, 'para Windows y macOS');
    f = f.replace(/para Windows/gi, 'para Windows');
    f = f.replace(/para macOS/gi, 'para macOS');
    return f;
  }

  if (lang === 'pt-PT') {
    let f = feat;
    f = f.replace(/Suporte técnico/gi, 'Apoio técnico');
    f = f.replace(/Suporte remoto/gi, 'Apoio remoto');
    f = f.replace(/Receba no seu e-mail/gi, 'Receba no seu e-mail');
    return f;
  }

  return feat;
}

export function translateDate(dateStr: string, lang: LanguageCode): string {
  if (lang === 'es') {
    return dateStr
      .replace(/Há (\d+) dias?/gi, 'Hace $1 días')
      .replace(/Há (\d+) semanas?/gi, 'Hace $1 semanas')
      .replace(/Há 1 semana/gi, 'Hace 1 semana')
      .replace(/Há (\d+) meses?/gi, 'Hace $1 meses')
      .replace(/Há 1 mês/gi, 'Hace 1 mes')
      .replace(/(\d+) dias? atrás/gi, 'Hace $1 días')
      .replace(/(\d+) semanas? atrás/gi, 'Hace $1 semanas')
      .replace(/1 semana atrás/gi, 'Hace 1 semana')
      .replace(/1 mês atrás/gi, 'Hace 1 mes');
  }
  return dateStr;
}
