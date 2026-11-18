export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
  country?: 'BR' | 'US' | 'ES' | 'PT' | 'MX' | 'AR' | 'CO' | 'CL';
}

export const reviewsData: Record<string, Review[]> = {
  "autocad_2027_win": [
    {
      "author": "Rodrigo S. Lima",
      "rating": 5,
      "date": "2 dias atrás",
      "country": "BR",
      "comment": "Instalou de primeira, meu note antigo rodou muito bem. Vendedor ajudou por vídeo na hora da instalação."
    },
    {
      "author": "David Harrison",
      "rating": 5,
      "date": "3 days ago",
      "country": "US",
      "comment": "Fast activation, tools loaded instantly on Windows 11. Very satisfied."
    },
    {
      "author": "Lucas Menezes",
      "rating": 5,
      "date": "4 dias atrás",
      "country": "BR",
      "comment": "Muito bom, veio certinho no e-mail e a instalação foi bem rápida. Recomendo muito."
    },
    {
      "author": "Arq. Camila Fontes",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Peguei a versão 2019 pro notebook de obra e a 2027 pro PC do escritório. Ambas ativaram de primeira!"
    },
    {
      "author": "Marcos A. Fonseca",
      "rating": 4,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Uso no escritório todo dia, funcionando 100% até agora. Só precisei pausar o antivírus antes."
    },
    {
      "author": "Alejandro Gómez",
      "rating": 5,
      "date": "hace 1 semana",
      "country": "MX",
      "comment": "Llegó al correo enseguida y corre súper fluido. Excelente atención por WhatsApp."
    },
    {
      "author": "Julio Cesar R.",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Melhor compra que já fiz, ajuda muito no dia a dia da faculdade de engenharia civil."
    },
    {
      "author": "Ana Carolina V.",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Veio completo, sem mensalidade. Vale cada centavo."
    },
    {
      "author": "Eng. Pedro M.",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Suporte nota mil! Tiraram minha dúvida no WhatsApp em 2 minutos."
    },
    {
      "author": "Felipe G. Dias",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Rodou liso demais no meu MacBook M2. Tava com receio mas ficou top."
    },
    {
      "author": "Gonçalo Pereira",
      "rating": 5,
      "date": "há 3 semanas",
      "country": "PT",
      "comment": "Envio imediato e instalação simples. Funciona na perfeição no portátil."
    },
    {
      "author": "Juliana Costa",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Muito bom mesmo! Salvou a entrega do meu projeto final."
    },
    {
      "author": "Thiago Ramos",
      "rating": 4,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Ótimo custo-benefício, roda direto sem precisar de gambiarra."
    },
    {
      "author": "Mariana S.",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Gostei muito. Roda leve e abre todos os meus arquivos DWG pesados."
    },
    {
      "author": "Rafael Mendonça",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Funciona todas as rotinas LISP que uso no trabalho. Entrega imediata no e-mail."
    },
    {
      "author": "Matías Fernández",
      "rating": 5,
      "date": "hace 1 mes",
      "country": "AR",
      "comment": "Muy buen precio y anda bárbaro. El video explica todo paso a paso."
    },
    {
      "author": "Vitor Hugo B.",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Pagamento único e nunca mais deu aviso de licença. Recomendo de olhos fechados."
    },
    {
      "author": "Fernanda T. Azevedo",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Download veio rapidinho pelo Google Drive e o passo a passo em vídeo facilita demais."
    },
    {
      "author": "Daniel C. Peixoto",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "AutoCAD 2027 tá voando aqui no escritório."
    },
    {
      "author": "Bruno K. Rocha",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Ativou certinho, muito rápido."
    },
    {
      "author": "Eng. Henrique Paiva",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Perfeito para projetos elétricos e arquitetônicos. Sem travamentos."
    },
    {
      "author": "Andrés Felipe Restrepo",
      "rating": 5,
      "date": "hace 2 meses",
      "country": "CO",
      "comment": "Todo salió muy bien, el enlace llegó al instante de pagar."
    },
    {
      "author": "Letícia M. Cunha",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Fácil de instalar, recomendo!"
    },
    {
      "author": "Gustavo Dantas",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Comprei no Pix e já baixei na hora."
    },
    {
      "author": "Marcelo A.",
      "rating": 4,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "O programa é ótimo, rodou perfeito no Windows 11."
    },
    {
      "author": "Camila B. Nogueira",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Atendimento muito educado e programa 100% funcional."
    },
    {
      "author": "Fábio Lemos",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Uso diariamente para detalhamento técnico, nota 10."
    },
    {
      "author": "Michael Carter",
      "rating": 5,
      "date": "4 months ago",
      "country": "US",
      "comment": "Great price for a permanent setup. Works smoothly."
    },
    {
      "author": "Renato Silveira",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Sem palavras, economizei muito."
    },
    {
      "author": "Patrícia G. Melo",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Vídeo explicativo bem direto, instalei sozinha em 10 minutos."
    },
    {
      "author": "Igor Medeiros",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Funcionando perfeitamente até hoje."
    },
    {
      "author": "Leandro S. Braga",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Loja de confiança, já indiquei para vários colegas."
    }
  ],
  "sketchup_2026_win": [
    {
      "author": "Arq. Beatriz Nogueira",
      "rating": 5,
      "date": "1 dia atrás",
      "country": "BR",
      "comment": "SketchUp 2027 rodando liso! Abriu minhas maquetes pesadas sem engasgar."
    },
    {
      "author": "Caio V. Martins",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "Chegou no e-mail na hora. O vídeo ensina direitinho como ativar."
    },
    {
      "author": "Brandon Miller",
      "rating": 5,
      "date": "4 days ago",
      "country": "US",
      "comment": "Works great on my Windows workstation. Layout is included too."
    },
    {
      "author": "Aline Ferreira",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Uso todo dia para projetos de marcenaria e interiores. Nota 10!"
    },
    {
      "author": "Gabriel S. Rocha",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Muito rápido o envio pelo Google Drive, recomendo."
    },
    {
      "author": "Mariana Fontes",
      "rating": 4,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Rodou certinho no Mac M1, suporte me ajudou a liberar nas configurações do macOS."
    },
    {
      "author": "Carlos Eduardo T.",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "3D Warehouse e Layout funcionando perfeitamente."
    },
    {
      "author": "Sofía Herrera",
      "rating": 5,
      "date": "hace 2 semanas",
      "country": "MX",
      "comment": "Muy fácil de instalar siguiendo el video. Funciona al 100%."
    },
    {
      "author": "Priscila Duarte",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Melhor custo-benefício para quem trabalha com interiores."
    },
    {
      "author": "Lucas P. Santana",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Instalei o 2026 junto com o V-Ray e ficou perfeito."
    },
    {
      "author": "Vanessa Monteiro",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Super confiável, paguei no Pix e recebi em segundos."
    },
    {
      "author": "Diogo Almeida",
      "rating": 5,
      "date": "há 1 mês",
      "country": "PT",
      "comment": "Impecável. Funciona sem qualquer falha no Windows 11."
    },
    {
      "author": "Renan F. Castro",
      "rating": 4,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Bom demais, economizei uma grana boa."
    },
    {
      "author": "Tatiane Borges",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Vídeo bem explicadinho, não tem erro."
    },
    {
      "author": "Matheus Peixoto",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Top demais, plugins rodando normalmente."
    },
    {
      "author": "Larissa Albuquerque",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Salva vidas! Precisava entregar um 3D urgente e deu tudo certo."
    },
    {
      "author": "Nicolás Pereyra",
      "rating": 5,
      "date": "hace 2 meses",
      "country": "AR",
      "comment": "Excelente atención, descargué todo rápido por Drive."
    },
    {
      "author": "André Luiz Barros",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Programa completo e estável."
    },
    {
      "author": "Sabrina R. Melo",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Adorei, já indiquei para o pessoal do escritório."
    },
    {
      "author": "Guilherme Pacheco",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Funciona 100%, sem aviso chato de licença."
    },
    {
      "author": "Débora Nunes",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Muito prático poder escolher o ano na hora de baixar."
    },
    {
      "author": "Camilo Vargas",
      "rating": 4,
      "date": "hace 3 meses",
      "country": "CO",
      "comment": "Buen servicio y entrega inmediata al correo."
    },
    {
      "author": "Murilo Castanheira",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Suporte respondeu na hora quando tive dúvida."
    },
    {
      "author": "Isabela Drummond",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Perfeito para os trabalhos da faculdade de arquitetura."
    },
    {
      "author": "Pedro H. Valadares",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Roda liso, muito bom."
    },
    {
      "author": "Raquel Alvarenga",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Instalado e testado, nota 10."
    },
    {
      "author": "Cauê Sampaio",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Valeu cada centavo."
    },
    {
      "author": "Helena Vasques",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Compra rápida e segura."
    }
  ],
  "revit_2027": [
    {
      "author": "Eng. Otávio Siqueira",
      "rating": 5,
      "date": "2 dias atrás",
      "country": "BR",
      "comment": "Revit 2027 rodando perfeitamente com todas as bibliotecas e templates BIM."
    },
    {
      "author": "Sarah Jenkins",
      "rating": 5,
      "date": "4 days ago",
      "country": "US",
      "comment": "BIM families and templates installed properly. Everything works."
    },
    {
      "author": "Arq. Bianca Vieira",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Muito bom! Instalei o 2026 porque meu escritório usa essa versão e veio tudo certinho."
    },
    {
      "author": "Leonardo Farias",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Entrega na hora no e-mail, instalação limpa."
    },
    {
      "author": "Alexandre Queiroz",
      "rating": 4,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "O download é grande por ser o Revit completo, mas pelo Google Drive veio na velocidade máxima."
    },
    {
      "author": "Diego F. Nascimento",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Modelagem estrutural e MEP funcionando 100%."
    },
    {
      "author": "Luis Fernando Díaz",
      "rating": 5,
      "date": "hace 2 semanas",
      "country": "CO",
      "comment": "Excelente programa, todas las familias cargaron sin problema."
    },
    {
      "author": "César Meireles",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Suporte pelo WhatsApp muito atencioso."
    },
    {
      "author": "Natália Guimarães",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Economia absurda e funciona igualzinho."
    },
    {
      "author": "Thiago Azevedo",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Recomendo a todos da engenharia."
    },
    {
      "author": "Tiago Magalhães",
      "rating": 5,
      "date": "há 1 mês",
      "country": "PT",
      "comment": "Correu tudo lindamente na instalação. Cinco estrelas."
    },
    {
      "author": "Cláudia Bastos",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Vídeo passo a passo muito fácil de acompanhar."
    },
    {
      "author": "Mônica Figueiredo",
      "rating": 4,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Funcionando certinho no meu notebook gamer."
    },
    {
      "author": "Wagner Assunção",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Sincroniza perfeito com o Enscape e Twinmotion."
    },
    {
      "author": "Lívia Portela",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Salvou meu TFG de arquitetura!"
    },
    {
      "author": "Jorge Ramírez",
      "rating": 5,
      "date": "hace 2 meses",
      "country": "MX",
      "comment": "Muy recomendable, activación permanente sin fallos."
    },
    {
      "author": "Filipe Dorneles",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Rápido, honesto e sem burocracia."
    },
    {
      "author": "Renata Silveira",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Comprei junto com o AutoCAD, ambos rodando perfeitamente."
    },
    {
      "author": "João Paulo Diniz",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Nota 1000 para o suporte remoto."
    },
    {
      "author": "Flávia Muniz",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Tudo funcionando sem travar."
    },
    {
      "author": "Facundo Quiroga",
      "rating": 5,
      "date": "hace 3 meses",
      "country": "AR",
      "comment": "Impecable el servicio y la rapidez de entrega."
    },
    {
      "author": "Cristian Saraiva",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Melhor loja para comprar softwares de engenharia."
    },
    {
      "author": "Evandro Seabra",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Ativação definitiva mesmo, nunca deu erro."
    },
    {
      "author": "Amanda Peres",
      "rating": 4,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Muito bom, recomendo."
    },
    {
      "author": "Heitor Sales",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Excelente experiência do início ao fim."
    }
  ],
  "promob_professional_2025": [
    {
      "author": "Marcenaria Silva & Filhos",
      "rating": 5,
      "date": "2 dias atrás",
      "country": "BR",
      "comment": "Promob Plus rodando redondo! Real Scene e Cut Pro funcionando perfeitamente para plano de corte."
    },
    {
      "author": "Rômulo Franco",
      "rating": 5,
      "date": "4 dias atrás",
      "country": "BR",
      "comment": "Biblioteca de módulos atualizada, facilitou demais meus orçamentos de planejados."
    },
    {
      "author": "Jéssica Pimentel",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Os renders saem lindos, meus clientes estão adorando apresentar o projeto assim."
    },
    {
      "author": "Márcio Godoy",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Paguei no Pix e já recebi o link no e-mail. Instalação bem explicada no vídeo."
    },
    {
      "author": "Carlos Alberto M.",
      "rating": 4,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Muito bom, não trava e gera toda a listagem de peças certinho."
    },
    {
      "author": "Rui Figueiredo",
      "rating": 5,
      "date": "há 2 semanas",
      "country": "PT",
      "comment": "Excelente ferramenta para carpintaria e mobiliário à medida. Tudo funcional."
    },
    {
      "author": "Viviane Mattos",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Suporte nota 10, me ajudaram pelo WhatsApp rapidinho."
    },
    {
      "author": "Edson Trindade",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Acabou o sofrimento com mensalidade cara na marcenaria."
    },
    {
      "author": "Milena Arantes",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Uso para interiores e móveis sob medida, está 100% completo."
    },
    {
      "author": "Sérgio Paiva",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Funciona offline e online tranquilo, recomendo."
    },
    {
      "author": "Hernán Gómez",
      "rating": 5,
      "date": "hace 1 mes",
      "country": "AR",
      "comment": "Muy completo para diseño de amoblamientos y cocinas. Llegó al instante."
    },
    {
      "author": "Kleber Novaes",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Plano de corte bate certinho nas chapas de MDF."
    },
    {
      "author": "Danilo Marinho",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Melhor investimento que fiz pra minha marcenaria esse ano."
    },
    {
      "author": "Adriana Lacerda",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Gostei muito, fácil de instalar."
    },
    {
      "author": "Robson Alcântara",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Nota 10, funcionando perfeitamente no Windows 11."
    },
    {
      "author": "Bruna Evangelista",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Renderizador rápido e texturas completas."
    },
    {
      "author": "Gustavo Mendoza",
      "rating": 5,
      "date": "hace 3 meses",
      "country": "MX",
      "comment": "Todo funciona perfecto para el taller de carpintería."
    },
    {
      "author": "Nélson Damasceno",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Indiquei para dois amigos marceneiros e todos aprovaram."
    },
    {
      "author": "Sueli Cordeiro",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Atendimento impecável da equipe C2Tech."
    },
    {
      "author": "Lorena Barcellos",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Muito prático e completo."
    },
    {
      "author": "Paulo Roberto F.",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Mais de 4 meses usando todo dia sem nenhum erro."
    },
    {
      "author": "Sandro Alencar",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Excelente!"
    }
  ],
  "cype_2026": [
    {
      "author": "Eng. Fábio H. Lopes",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "CYPE completo com normas brasileiras ABNT NBR 6118 ativas. CYPECAD e Cypelec rodando 100%."
    },
    {
      "author": "Eng. Eduardo Viana",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Todos os módulos liberados, inclusive metálicas e fundações. Excelente."
    },
    {
      "author": "Diego Castellanos",
      "rating": 5,
      "date": "hace 1 semana",
      "country": "CO",
      "comment": "Todos los módulos estructurales funcionan perfecto. Muy buen soporte."
    },
    {
      "author": "Eng. Marcelo B.",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Instalação tranquila seguindo o vídeo. Já dimensionei duas obras nele."
    },
    {
      "author": "Ricardo Nogueira",
      "rating": 4,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Muito bom poder escolher entre a versão mais nova e as anteriores."
    },
    {
      "author": " Roberto Almeida",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Gera as pranchas e memórias de cálculo sem nenhuma restrição."
    },
    {
      "author": "Nuno Tavares",
      "rating": 5,
      "date": "há 3 semanas",
      "country": "PT",
      "comment": "Eurocódigos e normas disponíveis, funciona perfeitamente."
    },
    {
      "author": "Henrique Vasconcelos",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Envio imediato no e-mail logo após o Pix."
    },
    {
      "author": "André C. Barros",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Vale cada centavo, completo mesmo."
    },
    {
      "author": "Gustavo Ribeiro",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Suporte respondeu super rápido no WhatsApp."
    },
    {
      "author": "Martín Echeverría",
      "rating": 5,
      "date": "hace 1 mes",
      "country": "AR",
      "comment": "CYPECAD corre sin problemas en Windows 11. Recomendado."
    },
    {
      "author": "Rafael Lemos",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Estável e rápido, não fecha sozinho."
    },
    {
      "author": "Vitor Rezende",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Muito bom pacote para cálculo estrutural."
    },
    {
      "author": "Daniel Tavares",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Recomendo para qualquer escritório de engenharia."
    },
    {
      "author": "Rodrigo Cavalcanti",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Ativação permanente de verdade."
    },
    {
      "author": "Wagner J. Assunção",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Ótimo custo-benefício."
    },
    {
      "author": "Humberto Rios",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Funciona perfeitamente."
    },
    {
      "author": "Jorge Luís Maia",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Nota 10!"
    },
    {
      "author": "Marco Aurélio F.",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Excelente aquisição."
    }
  ],
  "archicad_30": [
    {
      "author": "Arq. Tainá Guedes",
      "rating": 5,
      "date": "2 dias atrás",
      "country": "BR",
      "comment": "ArchiCAD BRA em português com template brasileiro certinho. Rodando super leve!"
    },
    {
      "author": "Bianca M. Vieira",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Instalei no meu MacBook Air M2 e ficou perfeito."
    },
    {
      "author": "Ethan Brooks",
      "rating": 5,
      "date": "1 week ago",
      "country": "US",
      "comment": "Runs natively on Apple Silicon. Smooth installation."
    },
    {
      "author": "Pedro Valadares",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Envio automático no e-mail, em 10 minutos já estava projetando."
    },
    {
      "author": "Carolina Bernardes",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Muito melhor que pagar assinatura cara todo mês. Recomendo!"
    },
    {
      "author": "Cauê R. Sampaio",
      "rating": 4,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Biblioteca completa e sem travamentos."
    },
    {
      "author": "Inês Correia",
      "rating": 5,
      "date": "há 3 semanas",
      "country": "PT",
      "comment": "Fácil instalação e excelente apoio ao cliente."
    },
    {
      "author": "Mariana Fontenelle",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "O vídeo tutorial mostra o passo a passo exato tanto pra Windows quanto pra Mac."
    },
    {
      "author": "Guilherme A. Pacheco",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Nota 10, uso todos os dias no escritório."
    },
    {
      "author": "Lívia M. Portela",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Perfeito para BIM, exporta IFC e DWG normalmente."
    },
    {
      "author": "Valeria Mendoza",
      "rating": 5,
      "date": "hace 2 meses",
      "country": "MX",
      "comment": "Excelente programa, funciona al 100% en mi laptop."
    },
    {
      "author": "Talita Linhares",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Super indico a C2Tech."
    },
    {
      "author": "Mirella Coutinho",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Atendimento rápido e educado."
    },
    {
      "author": "Arthur Veloso",
      "rating": 4,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Tudo certo conforme o anúncio."
    },
    {
      "author": "Clarice Valença",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Muito satisfeita com a compra."
    },
    {
      "author": "Regina Mota",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Aprovado!"
    }
  ],
  "coreldraw_2026": [
    {
      "author": "Lucas G. Santana",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "CorelDRAW 2026 rodando liso! Trabalho com gráfica rápida e não fecha nem trava."
    },
    {
      "author": "Gráfica Expressa RJ",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Instalado em 2 máquinas da gráfica, fechamento de arquivo PDF/X-1a perfeito."
    },
    {
      "author": "Carlos Méndez",
      "rating": 5,
      "date": "hace 1 semana",
      "country": "MX",
      "comment": "Funciona perfecto sin bloqueos de cuenta. Muy recomendado."
    },
    {
      "author": "Breno Magalhães",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Entrega na hora no e-mail e vídeo bem fácil de seguir."
    },
    {
      "author": "Cíntia Holanda",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Amei! Também veio a opção para o meu Mac."
    },
    {
      "author": "Filipe G. Dorneles",
      "rating": 4,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Ótimo preço e suporte prestativo."
    },
    {
      "author": "Karen Bittencourt",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Uso para papelaria personalizada e corte a laser, funciona 100%."
    },
    {
      "author": "Luan Castilho",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Top demais, ativação definitiva."
    },
    {
      "author": "Yasmim Caldas",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Recomendo muito!"
    },
    {
      "author": "Diogo Fontes",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Instalou rapidinho no Windows 11."
    },
    {
      "author": "Sebastián Rojas",
      "rating": 5,
      "date": "hace 3 meses",
      "country": "CO",
      "comment": "Excelente suite de diseño, todo activado."
    },
    {
      "author": "Simone Quevedo",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Sem dores de cabeça, funciona perfeitamente."
    },
    {
      "author": "Pâmela Serpa",
      "rating": 4,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Muito bom custo-benefício."
    },
    {
      "author": "Fernanda L. Torres",
      "rating": 5,
      "date": "4 meses atrás",
      "country": "BR",
      "comment": "Nota 10."
    },
    {
      "author": "Valéria Pinheiro",
      "rating": 5,
      "date": "5 meses atrás",
      "country": "BR",
      "comment": "Compra segura e rápida."
    }
  ],
  "office_25_win": [
    {
      "author": "Rodrigo Cavalcanti",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "Word, Excel e PowerPoint 2024 ativados em menos de 5 minutos. Excelente!"
    },
    {
      "author": "Cláudia R. Bastos",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Muito bom não precisar renovar assinatura todo ano."
    },
    {
      "author": "Jason Walker",
      "rating": 5,
      "date": "2 weeks ago",
      "country": "US",
      "comment": "Clean LTSC install and instant activation. Works great."
    },
    {
      "author": "Paula Nóbrega",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Chegou no e-mail na mesma hora do Pix."
    },
    {
      "author": "Emanuel Paes",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Funcionando perfeitamente no notebook novo."
    }
  ],
  "photoshop_2026": [
    {
      "author": "Débora C. Nunes",
      "rating": 5,
      "date": "4 dias atrás",
      "country": "BR",
      "comment": "Photoshop rodando super leve, filtros e Camera Raw funcionando 100%."
    },
    {
      "author": "Breno K. Magalhães",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Instalei no Windows 11 seguindo o vídeo e deu tudo certo de primeira."
    },
    {
      "author": "Mateo Villalba",
      "rating": 5,
      "date": "hace 3 semanas",
      "country": "AR",
      "comment": "Anda perfecto y muy estable para edición fotográfica."
    },
    {
      "author": "Samara Lira",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Entrega imediata e suporte nota 10."
    },
    {
      "author": "Arthur C. Veloso",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Ótimo custo-benefício."
    }
  ],
  "solidworks_2026": [
    {
      "author": "Eng. César Meireles",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "SolidWorks Premium completo, Simulation e chapas metálicas funcionando perfeitamente."
    },
    {
      "author": "Edson M. Trindade",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Segui o vídeo passo a passo e ativou todos os suplementos sem erro."
    },
    {
      "author": "Daniela Orozco",
      "rating": 5,
      "date": "hace 1 mes",
      "country": "MX",
      "comment": "Excelente para diseño mecánico e industrial, corre muy bien."
    },
    {
      "author": "Murilo H. Castanheira",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Muito estável no Windows 11 Pro."
    },
    {
      "author": "Igor S. Medeiros",
      "rating": 4,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Valeu muito a pena pelo preço."
    }
  ],
  "windows_11_pro": [
    {
      "author": "Leandro S. Braga",
      "rating": 5,
      "date": "2 dias atrás",
      "country": "BR",
      "comment": "Chave original, coloquei nas configurações do Windows e ativou na mesma hora."
    },
    {
      "author": "Gustavo Dantas",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Envio imediato no e-mail, ativou meu PC recém-montado em 10 segundos."
    },
    {
      "author": "João Afonso",
      "rating": 5,
      "date": "há 3 semanas",
      "country": "PT",
      "comment": "Chave funcional à primeira tentativa. Recomendo."
    },
    {
      "author": "Vitor Hugo R.",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Rápido, prático e barato."
    },
    {
      "author": "Danilo Marinho",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "100% original e vitalício."
    }
  ],
  "vray_7": [
    {
      "author": "Milena C. Arantes",
      "rating": 5,
      "date": "4 dias atrás",
      "country": "BR",
      "comment": "V-Ray 7 integrado com o SketchUp funcionando liso e sem marca d’água."
    },
    {
      "author": "Arq. Bianca Vieira",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Renderização GPU rápida demais, adorei."
    },
    {
      "author": "Cauê Sampaio",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Tutorial em vídeo bem claro, instalou rapidinho."
    },
    {
      "author": "Lucas Santana",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Muito bom resultado final nos renders."
    }
  ],
  "enscape": [
    {
      "author": "Heitor G. Sales",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "Render em tempo real voando na minha placa de vídeo! Funciona no SketchUp e no Revit."
    },
    {
      "author": "Arq. Camila Fontes",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Facilitou demais apresentar projeto pros clientes."
    },
    {
      "author": "Kevin Turner",
      "rating": 5,
      "date": "1 month ago",
      "country": "US",
      "comment": "Real-time rendering works like a charm with Revit."
    },
    {
      "author": "Pedro H. Valadares",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Excelente, recomendo muito."
    }
  ],
  "eberick_builder_2025": [
    {
      "author": "Eng. Wagner Assunção",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Eberick e Builder rodando redondo para estrutural, hidrossanitário e elétrico."
    },
    {
      "author": "Eng. Otávio Siqueira",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Gera os detalhamentos e pranchas sem restrição nenhuma."
    },
    {
      "author": "Fábio H. Lopes",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Suporte da loja me ajudou na instalação pelo WhatsApp, nota 10."
    },
    {
      "author": "Rodrigo Lima",
      "rating": 4,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Muito bom pacote para engenheiro civil."
    }
  ],
  "civil3d_2027": [
    {
      "author": "Evandro L. Seabra",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Topografia, superfícies e corredores funcionando 100% no Civil 3D 2027."
    },
    {
      "author": "Eng. Pedro M.",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Uso para loteamentos e terraplenagem, está perfeito."
    },
    {
      "author": "Juan Pablo Ríos",
      "rating": 5,
      "date": "hace 1 mes",
      "country": "CO",
      "comment": "Funciona muy bien para diseño vial y topografía."
    },
    {
      "author": "Daniel Peixoto",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Entrega imediata no e-mail."
    }
  ],
  "premiere_2026": [
    {
      "author": "Arthur C. Veloso",
      "rating": 5,
      "date": "4 dias atrás",
      "country": "BR",
      "comment": "Editando e exportando em 4K pelo Media Encoder sem travar."
    },
    {
      "author": "Frederico Guerra",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Muito estável tanto no Windows quanto no Mac."
    },
    {
      "author": "Luan Castilho",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Vídeo explicativo ótimo, ativei de primeira."
    },
    {
      "author": "Gisele Barreto",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Recomendo para editores de vídeo."
    }
  ],
  "illustrator_2026": [
    {
      "author": "Karen S. Bittencourt",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Vetorização rápida e todas as ferramentas funcionando perfeitamente."
    },
    {
      "author": "Lucas G. Santana",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Roda leve no meu notebook, sem mensalidades."
    },
    {
      "author": "Mariana S.",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Link chegou na hora no e-mail."
    },
    {
      "author": "Cíntia Holanda",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Nota 10!"
    }
  ],
  "adobe_acrobat_pro_2026": [
    {
      "author": "Fabrício N. Toledo",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "Editando textos em PDF, juntando arquivos e usando OCR sem limites."
    },
    {
      "author": "Dra. Helena Vasques",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Indispensável pro escritório de advocacia, acabou a mensalidade cara."
    },
    {
      "author": "Cláudia Bastos",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Instalação super rápida."
    },
    {
      "author": "Sérgio Paiva",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Cumpre exatamente o prometido."
    }
  ],
  "autodesk_all_apps": [
    {
      "author": "Arq. Fernanda Oliveira",
      "rating": 5,
      "date": "3 dias atrás",
      "country": "BR",
      "comment": "Conta privada funcionando direto no site da Autodesk, baixei o AutoCAD e o Revit oficiais."
    },
    {
      "author": "Eng. Leonardo Farias",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Acesso oficial com todos os apps liberados, muito prático."
    },
    {
      "author": "Tyler Robinson",
      "rating": 5,
      "date": "1 month ago",
      "country": "US",
      "comment": "Official account login arrived quickly via email. All apps accessible."
    },
    {
      "author": "Diego Nascimento",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Suporte rápido e atencioso."
    }
  ],
  "rhinoceros_8": [
    {
      "author": "Caio V. Mendonça",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Rhino 8 com Grasshopper rodando liso para modelagem paramétrica."
    },
    {
      "author": "Beatriz Nogueira",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Funcionou perfeitamente no meu Mac."
    },
    {
      "author": "Tomás Aguiar",
      "rating": 5,
      "date": "há 2 meses",
      "country": "PT",
      "comment": "Excelente desempenho em modelação 3D."
    }
  ],
  "3ds_max_2027": [
    {
      "author": "Kleber R. Novaes",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "3ds Max 2027 impecável para maquete eletrônica e modelagem avançada."
    },
    {
      "author": "Milena Arantes",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Envio imediato pelo Google Drive, instalou sem erros."
    },
    {
      "author": "Heitor Sales",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Muito bom e estável."
    }
  ],
  "inventor_pro_2027": [
    {
      "author": "Edson M. Trindade",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Inventor 2027 completo para projetos mecânicos e tubulações."
    },
    {
      "author": "César Meireles",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Roda liso, todas as bibliotecas de peças padrão incluídas."
    },
    {
      "author": "Roberto Morales",
      "rating": 5,
      "date": "hace 2 meses",
      "country": "MX",
      "comment": "Todo el paquete mecánico funciona sin inconvenientes."
    }
  ],
  "vectric_aspire_12_5": [],
  "parallels_desktop_26": [
    {
      "author": "Hélio F. Varella",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Rodando Windows 11 dentro do meu MacBook M3 com velocidade incrível."
    },
    {
      "author": "Felipe G. Dias",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Consegui rodar todos os programas de engenharia do Windows no Mac sem travar."
    },
    {
      "author": "Tatiane Borges",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Tutorial em vídeo muito claro."
    }
  ],
  "after_effects_2026": [
    {
      "author": "Frederico L. Guerra",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Motion graphics e plugins funcionando sem fechar sozinho."
    },
    {
      "author": "Arthur Veloso",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Chegou na hora no e-mail, recomendo."
    },
    {
      "author": "Lucas Castilho",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Ótimo desempenho."
    }
  ],
  "windows_10_pro": [
    {
      "author": "Igor S. Medeiros",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Ativou meu notebook de trabalho na hora, chave 100% genuína."
    },
    {
      "author": "Marcelo A.",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Entrega rápida por e-mail."
    },
    {
      "author": "Diogo Fontes",
      "rating": 5,
      "date": "3 meses atrás",
      "country": "BR",
      "comment": "Funcionou de primeira."
    }
  ],
  "fl_studio_2025": [
    {
      "author": "Willian C. Prado",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "Producer Edition com todos os plugins nativos abertos, salvando projetos normalmente."
    },
    {
      "author": "Breno Magalhães",
      "rating": 5,
      "date": "3 semanas atrás",
      "country": "BR",
      "comment": "Instalou certinho no meu estúdio."
    },
    {
      "author": "Lucas Córdoba",
      "rating": 5,
      "date": "hace 2 meses",
      "country": "AR",
      "comment": "Todos los sintetizadores nativos funcionando al 100%."
    }
  ],
  "geo5_2024_win": [
    {
      "author": "Eng. Jorge Luís Maia",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Todos os módulos de contenção, taludes e estacas liberados no Windows 11."
    },
    {
      "author": "Eng. Roberto Vasconcelos",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Pacote geotécnico excelente, envio imediato."
    }
  ],
  "navisworks_2027": [],
  "zwcad_2026": [
    {
      "author": "Paulo Roberto S. Filho",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Muito leve! Rodou liso nos computadores mais básicos aqui da empresa."
    },
    {
      "author": "Rodrigo S. Lima",
      "rating": 4,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Interface idêntica ao AutoCAD e super rápido."
    }
  ],
  "tekla_2026": [
    {
      "author": "Eng. Robson Alcântara",
      "rating": 5,
      "date": "10 dias atrás",
      "country": "BR",
      "comment": "Detalhamento de estruturas metálicas e pré-moldados funcionando 100%."
    },
    {
      "author": "César Meireles",
      "rating": 5,
      "date": "2 meses atrás",
      "country": "BR",
      "comment": "Completo e estável."
    }
  ],
  "lightroom_classic_2026": [
    {
      "author": "Samara T. Lira",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Catálogo e máscaras de tratamento funcionando perfeitamente."
    },
    {
      "author": "Débora Nunes",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Rápido e sem mensalidade."
    }
  ],
  "exocad_31": [
    {
      "author": "Dr. Cristiano Veiga",
      "rating": 5,
      "date": "5 dias atrás",
      "country": "BR",
      "comment": "ExoCAD 3.1 Rijeka com bibliotecas de implantes completas para o laboratório."
    },
    {
      "author": "Dra. Valéria Pinheiro",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Suporte me ajudou na instalação e ficou perfeito."
    }
  ],
  "pdfelement_12": [],
  "filmora_15": [
    {
      "author": "Yasmim F. Caldas",
      "rating": 5,
      "date": "6 dias atrás",
      "country": "BR",
      "comment": "Exporta vídeos sem marca d’água e é super intuitivo de usar."
    },
    {
      "author": "Amanda Peres",
      "rating": 5,
      "date": "1 mês atrás",
      "country": "BR",
      "comment": "Adorei, instalei em 5 minutos."
    }
  ],
  "altoqi_visus_2026": [
    {
      "author": "Eng. Wagner J. Assunção",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Ótimo para orçamento e planejamento 4D a partir do modelo BIM."
    }
  ],
  "sisdea_2025": [
    {
      "author": "Eng. Alessandro M.",
      "rating": 5,
      "date": "1 semana atrás",
      "country": "BR",
      "comment": "Inferência estatística e regressão linear conforme a NBR 14653 funcionando 100%."
    }
  ],
  "proteus_9": [
    {
      "author": "Humberto S. Rios",
      "rating": 5,
      "date": "2 semanas atrás",
      "country": "BR",
      "comment": "Simulação de Arduino, PIC e layout de PCB ARES funcionando perfeitamente."
    }
  ],
  "camtasia_2026": [],
  "wondershare_recoverit_13": []
};
