export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
  country?: 'BR' | 'US' | 'ES' | 'PT' | 'MX' | 'AR' | 'CO' | 'CL';
}

export const reviewsData: Record<string, Review[]> = {
  geo5_2024_win: [
    {
      author: "Eng. Mateo G.",
      rating: 5,
      date: "3 days ago",
      country: "US",
      comment: "All geotechnical modules work flawlessly on Windows 11. Very clean installation."
    },
    {
      author: "Eng. Marcelo",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Todos os módulos liberados conforme anunciado. Já estou usando nos projetos de contenção do escritório. Sensacional."
    },
    {
      author: "Ricardo Silva",
      rating: 5,
      date: "12 dias atrás",
      country: "BR",
      comment: "O suporte remoto deles é nota 10. Tive uma dúvida na instalação e resolveram em 5 minutos."
    },
    {
      author: "Eng. Roberto Vasconcelos",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Módulos de estabilidade de taludes e estacas rodando 100%. Vale cada centavo economizado em anuidade."
    },
    {
      author: "Claudio Nogueira",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Excelente pacote geotécnico. Envio no e-mail automático em menos de 1 minuto."
    },
  ],
  autocad_2027_win: [
    {
      author: "David Harrison",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Fast activation, tools loaded instantly. Very satisfied with the remote support."
    },
    {
      author: "Rodrigo S. Lima",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Instalou de primeira, meu note antigo rodo muito bem. Vendedor ajudou por video na hr da instalacao"
    },
    {
      author: "Javier Morales",
      rating: 5,
      date: "hace 5 días",
      country: "ES",
      comment: "Excelente software. Llegó al correo de inmediato y la guía es muy clara."
    },
    {
      author: "Lucas Menezes",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "muito bom, veio certinho no email e a intalacao foi bem rapida. recomendo mt"
    },
    {
      author: "Marcos A. Fonseca",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "uso no escritorio td dia, funcioando 100% ate agora. so tive q desativar o antivirus antes mas deu td certo."
    },
    {
      author: "Julio Cesar",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Melhor compra q ja fiz, ajuda mt no dia a dia da faculdade de civil"
    },
    {
      author: "Ana Carolina V.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Veio completo, sem frescura de assinatura. Vale cada centavo"
    },
    {
      author: "Eng. Pedro M.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "suporte de vcs é nota mil! me ligaram pelo whatsapp e resolveram uma pendencia de dll aq. mto grato"
    },
    {
      author: "Marcelo A.",
      rating: 4,
      date: "2 meses atrás",
      country: "BR",
      comment: "o programa é otimo, so achei a instalação um pouco demorada pela minha internet, mas rodou perfeito."
    },
    {
      author: "Felipe G. Dias",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "caramba rodou liso dmais no meu macbook m2. tava com medo de n dar certo por causa do m2 mas fico top"
    },
    {
      author: "Juliana Costa",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Mto bom msm! O suporte e super atencioso e responde rapido no whatsapp. salvou meu TCC"
    },
    {
      author: "Thiago Ramos",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Otimo custo beneficio, roda nativo no mac e nao precisa de nenhuma gambiarra"
    },
    {
      author: "Mariana S.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Gostei muito. Roda direto sem precisar de emulador nem nada. Recomendo mto."
    },
    {
      author: "Arq. Camila Fontes",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Peguei a versão 2019 pro notebook de obra e a 2026 pro PC do escritório. Ambas ativaram de primeira com o vídeo!"
    },
    {
      author: "Rafael Mendonça",
      rating: 5,
      date: "2 meses atrás",
      country: "BR",
      comment: "Funciona todas as rotinas LISP que uso no trabalho. Preço justo e entrega realmente imediata no email."
    },
    {
      author: "Vitor Hugo B.",
      rating: 5,
      date: "2 meses atrás",
      country: "BR",
      comment: "Tava pagando caro antes, aqui foi pagamento único e nunca mais deu aviso de licença. Recomendo de olhos fechados."
    },
    {
      author: "Fernanda T. Azevedo",
      rating: 4,
      date: "2 meses atrás",
      country: "BR",
      comment: "Download veio rapidinho pelo Google Drive e o passo a passo em vídeo facilita demais pra quem não manja muito."
    },
    {
      author: "Daniel C. Peixoto",
      rating: 5,
      date: "3 meses atrás",
      country: "BR",
      comment: "Excelente atendimento no WhatsApp, tiraram minha dúvida antes da compra e o AutoCAD 2027 tá voando."
    },
  ],
  revit_2027: [
    {
      author: "Sarah Jenkins",
      rating: 5,
      date: "4 days ago",
      country: "US",
      comment: "BIM families and rendering engine working perfectly without subscription hassle."
    },
    {
      author: "Eng. Pedro Alencar",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "rapaz, o revit ta muito bom. a versao 2027 ta mais leve q as anteriores, curti dmais"
    },
    {
      author: "Arq. Tiago Rocha",
      rating: 5,
      date: "1 semana atrás",
      country: "PT",
      comment: "Entrega rápida e licença vitalícia impecável. Funciona perfeitamente."
    },
    {
      author: "Beatriz Nogueira",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "entrega foi na hora, o email chegou com o link e o tutorial bem detalhado. recomendo"
    },
    {
      author: "Carlos E. Souza",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "suporte me ajudou a instalar remoto pq sou meio lerdo com essas coisa kkkkk nota 10"
    },
    {
      author: "Ricardo F. Cruz",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Muito bom msm o BIM dele ta funcionando 100%, todos os templates abrindo certin"
    },
    {
      author: "Daniela V.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Excelente, comprei pra usar no estagio e foi mt facil configurar"
    },
    {
      author: "Matheus N.",
      rating: 4,
      date: "2 meses atrás",
      country: "BR",
      comment: "Tudo certo, apenas o tutorial q podia ser um pouco mais curto mas fora isso o programa ta perfeito"
    },
  ],
  '3ds_max_2027': [
    {
      author: "Alexander Wright",
      rating: 5,
      date: "3 days ago",
      country: "US",
      comment: "Installed on Windows 11, viewport performance and Arnold renderer run great."
    },
    {
      author: "Lucas Andrade",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Top demais, versão 2027 rodando liso com V-Ray e Corona Renderer. O tutorial em vídeo ajudou muito na ativação."
    },
    {
      author: "Diego F. Martins",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Comprei com receio mas me surpreendi. Entrega imediata no email e WhatsApp. Já estou renderizando projetos do escritório."
    },
    {
      author: "Gabriel Sampaio",
      rating: 4,
      date: "12 dias atrás",
      country: "BR",
      comment: "Muito estável, sem travamentos no Windows 11. Suporte tirou uma dúvida rápida sobre o instalador. Vale cada centavo."
    },
  ],
  inventor_pro_2027: [
    {
      author: "Alejandro Domínguez",
      rating: 5,
      date: "hace 4 días",
      country: "MX",
      comment: "Modelado paramétrico y ensambles funcionando al 100%. Muy recomendado."
    },
    {
      author: "Mateus Ribeiro",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Muito bom o software, pra quem trabalha com projetos mecanicos nao tem melhor. Ativou vitalicio certin"
    },
    {
      author: "André G. Silva",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "tudo certo, recomendo a todos do ML e do site. Roda liso na minha rtx"
    },
    {
      author: "Renato Oliveira",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "demorou uns 5 minutinhos pra chegar o e-mail mas deu tudo certo e ta funcionando perfeito."
    },
  ],
  civil3d_2027: [
    {
      author: "Brandon Cooper",
      rating: 5,
      date: "5 days ago",
      country: "US",
      comment: "Topography and surface modeling tools running smooth. Fast delivery."
    },
    {
      author: "José A. Santos",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "comprei pro meu pai q e engenheiro de estradas, ele adorou, instalou facinho e ta usando td dia"
    },
    {
      author: "Esteban Cárdenas",
      rating: 5,
      date: "hace 1 semana",
      country: "CO",
      comment: "Herramientas de loteo y carreteras completas. Gran soporte técnico."
    },
    {
      author: "Luiz Fernando",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Mt bom msm, versao 2027 rodando sem travar com os arquivos pesados de topografia."
    },
    {
      author: "Mariana K.",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito facil o passo a passo, qualquer um consegue. Recomendo dmais a loja"
    },
    {
      author: "Gustavo Mendes",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Tudo otimo, ja fiz 3 loteamento nele essa semana e nao deu nenhum crash."
    },
  ],
  navisworks_2027: [
    {
      author: "Liam Patterson",
      rating: 5,
      date: "1 week ago",
      country: "US",
      comment: "Seamless BIM coordination file checks. Activated without any complications."
    },
    {
      author: "Fernando A. Rocha",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "essencial pra ver compatibilizacao de projeto aki na empresa, funcionou perfeito"
    },
    {
      author: "Priscila M.",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "o clash detector rodando liso aq. Preço otimo e entrega super rapida"
    },
    {
      author: "Gustavo B.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Muto bom, recomendo msm, o suporte me atendeu no zap rapidao pra tirar uma duvida."
    },
    {
      author: "Eng. Fábio Meirelles",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Detecção de interferências Clash Detective muito rápida. Valeu a pena."
    },
  ],
  sketchup_2026_win: [
    {
      author: "Gonzalo Fernández",
      rating: 5,
      date: "hace 6 días",
      country: "AR",
      comment: "Excelente programa y muy buen precio. La activación permanente es lo mejor."
    },
    {
      author: "Ana Julia M.",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Uso pra fazer meus design de interiores, melhor compra q fiz esse ano. Super leve e facil"
    },
    {
      author: "Marcus Cole",
      rating: 5,
      date: "2 weeks ago",
      country: "US",
      comment: "Instant download link. Worked right away on my desktop."
    },
    {
      author: "Bruno F. Silveira",
      rating: 5,
      date: "6 dias atrás",
      country: "BR",
      comment: "Recomendo dmais, veio com todos os passos bem explicados e instalei em 5 minutos"
    },
    {
      author: "Diego Barbosa",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Otimo preço e funciona perfeitamente no windows 11. Tudo certinho."
    },
    {
      author: "Carolina Reis",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito top, ja to usando com varios blocos pesados aq e nao travou nenhuma vez"
    },
    {
      author: "Mauricio L.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "comprei e o link veio na hora. Suporte atencioso dms tirou duvida de plugin"
    },
    {
      author: "Gabriel K.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Instalou no meu macbook m1 de primeira, rodando super fluido. Nota 10"
    },
    {
      author: "Carla R. Pontes",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "muito dificil achar coisa boa pra mac, esse deu super certo e e vitalicio mesmo"
    },
    {
      author: "Vinicius Lopes",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Gostei bastante, suporte deu assistencia pelo zap pra configurar o LayOut."
    },
    {
      author: "Tiago M.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Muito bom, rodou tranquilo no Sonoma e o Layout funciona normal."
    },
  ],
  eberick_builder_2025: [
    {
      author: "Rui Miguel Ribeiro",
      rating: 5,
      date: "2 semanas atrás",
      country: "PT",
      comment: "Excelente conjunto para cálculo estrutural e instalações. Muito confiável."
    },
    {
      author: "Eng. Ricardo M.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Melhor combo pra calculo estrutural e eletrico, comprei pra economizar e nao me arrependo"
    },
    {
      author: "Julio C. Prado",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "suporte remoto deles e sensacional, me ajudaram a configurar o eberick q tava dando erro de dll"
    },
    {
      author: "Patricia G.",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Muito bom os programas, estao funcionando sem travar. O preco e otimo pelo q entrega"
    },
    {
      author: "Henrique Silva",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Combo excelente pra quem quer fazer projetos complementares completos sem falha de compatibilidade"
    },
    {
      author: "Roberto D.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Tudo certo no download, os arquivos sao meio grandes mas o tutorial explica bem direitinho"
    },
  ],
  altoqi_visus_2026: [
    {
      author: "Gonçalo Tavares",
      rating: 4,
      date: "1 semana atrás",
      country: "PT",
      comment: "Boa integração com modelos BIM. Apoio técnico muito atencioso no WhatsApp."
    },
    {
      author: "Eng. Matheus Guimarães",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Excelente para orçamentação e quantitativos BIM. Conectou perfeitamente com os projetos do Eberick 2026 e acelerou muito a elaboração das nossas planilhas de obra."
    },
    {
      author: "Thiago Silveira",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Instalação rápida com o tutorial em vídeo, tudo funcionando 100%. O suporte no WhatsApp tirou uma dúvida sobre a exportação IFC na mesma hora."
    },
    {
      author: "Renato Barcellos",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Software muito completo para planejamento 4D/5D. Programa roda muito fluido com os modelos da AltoQi. Recomendo."
    },
    {
      author: "Eng. André F. Costa",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Extração de quantitativos precisa e ágil. Economizou dias de trabalho manual na engenharia de custos."
    },
  ],
  archicad_30: [
    {
      author: "Arq. Inês Matos",
      rating: 5,
      date: "3 dias atrás",
      country: "PT",
      comment: "Versão em português do Brasil impecável, renderização rápida e ótima estabilidade."
    },
    {
      author: "Rodrigo M. Pires",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "archicad 30 fico show de bola!! bem mais leve q o 29 na hr de subir os 3d pesados. vlw pelo suporte na instalaçao"
    },
    {
      author: "Sebastián Navarro",
      rating: 5,
      date: "hace 2 semanas",
      country: "CL",
      comment: "Gran versión para arquitectura BIM. Funciona sin suscripciones."
    },
    {
      author: "Amanda V. Lopes",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Peguei a versão 29 em português rodando lisinho aqui. A interface tá muito rápida, curti demais"
    },
    {
      author: "Gabriela S. Arquiteta",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "consegui instalar de boa pelo tutorial, veio tudo certinho no email na msm hora. programa perfeito e em portugues"
    },
    {
      author: "Eduardo Santos",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Melhor q o autocad pra arquitetura, recomendo o site, entregou em segundos"
    },
    {
      author: "Marcos Vinicius B.",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Comprei o 28 pro meu notebook mais antigo e rodou liso demais no win 11. Atendimento nota 10 no whats obrigado"
    },
    {
      author: "Roberto Farias",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "tudo certo, instalei e ja to fazendo meu primeiro projeto no BIM. Muito bom."
    },
    {
      author: "Camila Duarte",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Muito bom, só demorou um pouco pra baixar por causa da minha net lerdinha kkk mas o software em si é sensacional"
    },
    {
      author: "Larissa M.",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Roda liso e o bimmx funciona perfeitamente tb, recomendo a compra"
    },
  ],
  cype_2026: [
    {
      author: "Alfonso Reyes",
      rating: 5,
      date: "hace 3 días",
      country: "ES",
      comment: "CYPECAD y CYPE 3D operativos al 100%. Generación de memorias perfecta."
    },
    {
      author: "Eng. Sergio N.",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Cypecad completo com todos os modulos ativos, perfeito pra calcular as sapatas, vigas e pilares nas normas da NBR."
    },
    {
      author: "Ignacio Benítez",
      rating: 5,
      date: "hace 2 semanas",
      country: "AR",
      comment: "Excelente paquete, todo el módulo estructural listo para usar."
    },
    {
      author: "Kleber Lima",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Estava com duvida se vinha com o Cype 3D e o Arquimedes juntos, e vem tudo completo mesmo! Otimo atendimento."
    },
    {
      author: "Alexandre S.",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Muito bom, peguei a 2025.d por ter todos os idiomas e rodou tranquilo no Windows 11. Vale super a pena."
    },
    {
      author: "Jeferson O.",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "O modulo de escadas, lajes e fundacoes funcionando certinho na versao 2026 em portugues, otimo preco."
    },
    {
      author: "Eng. Marcos Tadeu",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Calculo galpao metalico toda semana no Cype 3D e ta rodando liso, gerando as pranchas e memorial sem erro nenhum."
    },
    {
      author: "Leandro F. Barros",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Entrega imediata no e-mail e o vídeo de instalação explica cada detalhe. Em 15 minutos já estava com o CypeCAD aberto."
    },
    {
      author: "Renata C. Vasconcelos",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Uso bastante o CypeTherm e o Arquimedes pros laudos e orcamentos aqui do escritorio, veio tudo desbloqueado."
    },
    {
      author: "Gustavo H. Mendes",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Programa pesado pq vem a suite inteira, mas depois que instala funciona perfeitamente e não pede mensalidade."
    },
    {
      author: "Dr. Paulo Roberto",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Excelente custo-benefício. Peguei o 2026.a em português Brasil e todas as normas NBR 6118 estão certinhas."
    },
    {
      author: "Fabiano Costa",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Suporte pelo WhatsApp muito prestativo, me ajudaram a configurar na hora. Recomendo a C2Tech."
    },
    {
      author: "Danilo Moraes",
      rating: 5,
      date: "2 meses atrás",
      country: "BR",
      comment: "Melhor investimento pra quem tá começando a projetar estruturas por conta própria. CypeCAD e Cype 3D 100% funcionais."
    },
    {
      author: "Henrique A. Pires",
      rating: 5,
      date: "2 meses atrás",
      country: "BR",
      comment: "Tudo conforme anunciado, link direto no Google Drive e ativação vitalícia funcionando redondo."
    },
  ],
  solidworks_2026: [
    {
      author: "Tyler Bennett",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Simulation and Sheet Metal work great on Windows 11. Lifetime activation verified."
    },
    {
      author: "Marcelo T. P.",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Solidworks premium rodando no talo, faco montagem gigante e n trava. Mto estavel"
    },
    {
      author: "Mauricio Garza",
      rating: 5,
      date: "hace 1 semana",
      country: "MX",
      comment: "Muy buen trato por WhatsApp y el instalador funciona a la primera."
    },
    {
      author: "Wellington G.",
      rating: 5,
      date: "6 dias atrás",
      country: "BR",
      comment: "Chegou na hora no email, tutorial e bem didatico e funciona mesmo"
    },
    {
      author: "Felipe Moreira",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "comprei pra faculdade e me atendeu super bem, melhor do q pagar assinatura cara"
    },
    {
      author: "Claudio J.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "As ferramentas de chapas metalicas e simulacao estao perfeitas. Recomendo"
    },
    {
      author: "Otavio Ramos",
      rating: 4,
      date: "1 mês atrás",
      country: "BR",
      comment: "Muito bom, ativacao permanente. So achei pesado pra baixar mas compensa dms"
    },
    {
      author: "Alexandre D.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Tudo certo! Suporte me respondeu de madrugada pra me mandar o link q eu perdi kkkkk nota 10"
    },
  ],
  sisdea_2025: [
    {
      author: "Ing. Gonzalo Valenzuela",
      rating: 5,
      date: "4 days ago",
      country: "ES",
      comment: "Excelente para tasaciones inmobiliarias y modelos de regresión lineal múltiple. Muy estable."
    },
    {
      author: "Paula R. Silveira",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Perfeito para engenharia de avaliacoes, usei pra fazer tres laudos semana passada. 100% confiavel"
    },
    {
      author: "Fabricio Souza",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "tudo funcionando certinho no windows 11. entrega foi imediata."
    },
    {
      author: "Renato D. Reis",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Recomendo mto, programa essencial pra perito judicial e ta com o preco mto bom"
    },
  ],
  rhinoceros_8: [
    {
      author: "Oliver Smith",
      rating: 5,
      date: "3 days ago",
      country: "US",
      comment: "SubD tools and Grasshopper are super fast. Running smoothly on Mac."
    },
    {
      author: "Guilherme B.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Rhino 8 com Grasshopper ativo rodando perfeitamente. Otimo pra modelagem organica"
    },
    {
      author: "Diego Salgado",
      rating: 5,
      date: "hace 6 días",
      country: "ES",
      comment: "Excelente para diseño industrial y joyería 3D. Activación inmediata."
    },
    {
      author: "Leticia Andrade",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "comprei e instalei em 10 minutos, muito facil o processo e o suporte responde na hora"
    },
    {
      author: "Daniel Ferreira",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito satisfeito, o software e muito potente e a ativacao e permanente de vdd"
    },
    {
      author: "Renan T.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Excelente para desenho industrial, compatibilidade com outros cads ta otima"
    },
  ],
  zwcad_2026: [
    {
      author: "Facundo Rossi",
      rating: 5,
      date: "hace 4 días",
      country: "AR",
      comment: "Muy ligero, abre archivos DWG pesados al instante en mi portátil."
    },
    {
      author: "Carlos P. Neto",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Bem mais leve que o autocad, roda liso no meu notebook de escritorio mais antigo."
    },
    {
      author: "Juliano Borges",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Tive um probleminha no download pq minha net caiu mas o suporte me mandou outro link super rapido. Nota 10"
    },
    {
      author: "Arthur Martins",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "100% compativel com dwg, abri todos os meus projetos antigos sem erro nenhum"
    },
    {
      author: "Ricardo L.",
      rating: 4,
      date: "1 mês atrás",
      country: "BR",
      comment: "Interface identica, nao tive dificuldade nenhuma em me adaptar. Gostei do preco"
    },
  ],
  tekla_2026: [
    {
      author: "Nathan Davies",
      rating: 5,
      date: "5 days ago",
      country: "US",
      comment: "Structural steel detailing tools and NC export work like a charm."
    },
    {
      author: "Eng. Maurício G.",
      rating: 5,
      date: "6 dias atrás",
      country: "BR",
      comment: "Melhor software para detalhamento de estrutura metalica do mercado. Funcionando 100%"
    },
    {
      author: "Kevin Brooks",
      rating: 5,
      date: "4 days ago",
      country: "US",
      comment: "Steel structure detailing and drawing generation run smooth. Excellent customer support."
    },
    {
      author: "Vagner S. Castro",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Processo de instalacao bem direto e rapido, recomendo para os colegas de engenharia"
    },
    {
      author: "Ing. Carlos Mendoza",
      rating: 5,
      date: "hace 1 semana",
      country: "ES",
      comment: "Modelado y planos de taller metálico perfectos. La entrega fue inmediata."
    },
    {
      author: "Lucas P. Santos",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Muito bom o programa, entrega automatica mesmo, chegou na hora no meu gmail"
    },
  ],
  office_25_win: [
    {
      author: "Christopher Bell",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Word, Excel and Outlook activated instantly with full lifetime access."
    },
    {
      author: "Mauricio F.",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Chega de pagar assinatura mensal pra microsoft, esse office e vitalicio e tem tudo q preciso"
    },
    {
      author: "Andrés Morales",
      rating: 5,
      date: "hace 1 semana",
      country: "ES",
      comment: "Activación limpia y permanente. Excelente servicio."
    },
    {
      author: "Camila Rocha",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Instalou o word excel e powerpoint certinho no meu win11. Recomendo dmais"
    },
    {
      author: "Sandro M. G.",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "otimo, veio com um guia facil de instalar. ja to usando pra trabalhar"
    },
    {
      author: "Fabio D. Neto",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Mto rapido o envio no email, recomendo msm, economizei bastante ja q nao tem mensalidade"
    },
    {
      author: "Gisele Barbosa",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Funciona muito bem, todos os programas ativados certinho. 10 de 10"
    },
    {
      author: "Luciano M.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "excelente, abriu os arquivos pesados de planilhas do trampo de boa"
    },
    {
      author: "Juliana Reis",
      rating: 4,
      date: "1 mês atrás",
      country: "BR",
      comment: "Excelente custo beneficio. Recomendo a todos da area administrativa"
    },
  ],
  vray_7: [
    {
      author: "Eric Schneider",
      rating: 5,
      date: "3 days ago",
      country: "US",
      comment: "GPU rendering speed in V-Ray 7 is remarkable. Great setup guide."
    },
    {
      author: "Ronaldo F. Silva",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Renders maravilhosos no sketchup, a versao 7 ta mto rapida pra renderizar externa"
    },
    {
      author: "Valeria Guzmán",
      rating: 4,
      date: "hace 2 semanas",
      country: "MX",
      comment: "Muy buen renderizador, la instalación fue guiada y todo quedó listo."
    },
    {
      author: "Juliana P. Reis",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "tudo certinho, comprei e em menos de 1 minuto o email ja tava na caixa de entrada"
    },
    {
      author: "Claudio G. Moreira",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito bom, recomendo msm, o preco e muito em conta comparado ao oficial"
    },
    {
      author: "Breno Lima",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "o vray 7 ta bruto dms, os materiais ficam mto realistas. Comprei e instalei facil"
    },
    {
      author: "Aline Fonseca",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Roda bem na rtx e nao deu tela azul nenhuma vez ate agora. Indico pra td mundo"
    },
  ],
  enscape: [
    {
      author: "Ethan Taylor",
      rating: 5,
      date: "1 week ago",
      country: "US",
      comment: "Real-time walkthroughs for clients are flawless. Instant license."
    },
    {
      author: "Alessandra C.",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Enscape e vida pra quem e arquiteto, renderiza na hora enquanto mexe no sketchup. Roda liso"
    },
    {
      author: "Tiago Nogueira",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "O melhor renderizador em tempo real, facil de instalar e ativou vitalicio mesmo"
    },
    {
      author: "Luiz P. Santos",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Entrega imediata e funciona mto bem com minha rtx 3060. Muito bom"
    },
    {
      author: "Jessica R.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Caramba, os renders de interiores saem em 5 segundos, agilizou mto meu trabalho aq"
    },
    {
      author: "Matheus Ramos",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Tudo funcionando, recomendo dmais pra quem faz projetos comerciais"
    },
  ],
  promob_professional_2025: [
    {
      author: "Manuel Ferreira",
      rating: 5,
      date: "5 dias atrás",
      country: "PT",
      comment: "Excelente para desenho de cozinhas e móveis à medida. Muito satisfeito."
    },
    {
      author: "Marceneiro Adelson",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Promob 2025 completo com cut pro funcionando perfeito. Catalogo atualizado e rodando liso"
    },
    {
      author: "Marcenaria Silva",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Peguei a versão 2024 Enterprise pro notebook da oficina e está rodando muito bem, excelente custo benefício."
    },
    {
      author: "Claudio P. Rosa",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "suporte me ajudou a instalar por acesso remoto pq deu erro de permissao no meu windows. Excelente pos venda"
    },
    {
      author: "Jeferson Costa",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "O cut pro ajuda mto a economizar chapa de mdf, funciona perfeitamente o plano de corte"
    },
    {
      author: "Bruna A. Freitas",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Gostei muito, essencial pra minha marcenaria. Entrega super rapida no email"
    },
    {
      author: "Valter M. Ramos",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Excelente programa, plano de corte ta gerando certinho e economizando mdf"
    },
    {
      author: "Alexandre G.",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "tudo certo com a instalacao, recomendo a loja para todos"
    },
    {
      author: "Cesar D.",
      rating: 4,
      date: "1 mês atrás",
      country: "BR",
      comment: "Tudo ok, ativação funcionando bem. Fiquei surpreso com a velocidade de envio."
    },
    {
      author: "Diego Pereira",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Recomendo msm a loja, suporte resolveu tudo pelo WhatsApp rapidinho."
    },
    {
      author: "Sandro B.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Muito bom, ativou facil e ta ajudando bastante nos projetos de móveis planejados aq"
    },
  ],
  vectric_aspire_12_5: [
    {
      author: "Dustin Miller",
      rating: 5,
      date: "4 days ago",
      country: "US",
      comment: "CNC toolpath generation and 3D relief carving are super accurate."
    },
    {
      author: "Rodrigo M. (Oficina & CNC)",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Aspire 12.5 Pro perfeito para a minha router CNC. Geração de percurso e simulação de entalhe 3D funcionando 100%. Recomendo demais!"
    },
    {
      author: "Carlos E. Marceneiro",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Instalação super tranquila seguindo o vídeo tutorial. Reconheceu todos os pós-processadores de primeira na minha máquina."
    },
    {
      author: "Ateliê Madeira & Arte",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "A versão 12.5 está muito mais rápida no cálculo de usinagem e nesting de chapas. Entrega no e-mail foi instantânea."
    },
    {
      author: "Marcos Vinicius B.",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito bom software, ativado vitalício sem problemas. Suporte tirou uma dúvida rápida sobre o Mach3."
    },
  ],
  coreldraw_2026: [
    {
      author: "Joaquim Esteves",
      rating: 5,
      date: "5 dias atrás",
      country: "PT",
      comment: "Instalação rápida e suporte impecável. Ferramentas vectoriais 5 estrelas."
    },
    {
      author: "Douglas Arte",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "CorelDraw rodando sem travar com arquivos pesados de comunicacao visual. Recomendo dmais"
    },
    {
      author: "Claudia Mendoza",
      rating: 4,
      date: "hace 1 semana",
      country: "ES",
      comment: "Muy completo y estable. Excelente relación calidad y precio."
    },
    {
      author: "Gisele T. Andrade",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Nossa muito bom! Roda direto no macOS sem precisar de emular nada e veio super bem explicado a instalacao. Amei!"
    },
    {
      author: "Rodrigo P. Martins",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "tudo certo no meu macbook m2 pro. o corel roda nativo e as ferramentas de vetor estao super rapidas"
    },
    {
      author: "Fabio R. Ramos",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Uso pra fazer artes pra sublimacao, funciona tudo e nao fica dando erro de licenca nem modo visitante."
    },
    {
      author: "Luan Gráfica Rápida",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Peguei o X7 pro PC da plotter de recorte e o 2025 pro computador de criação. Ambos funcionando 100% e salvando normal."
    },
    {
      author: "Matheus N. Costa",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito bom o software, chegou super rapido no email com os links certinho e o video passo a passo"
    },
    {
      author: "Fabiola S. Nogueira",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "comprei pra fazer artes e estampas no Mac e ate agora esta perfeito. o suporte me ajudou a instalar por chat no whatsapp, recomendo."
    },
    {
      author: "Vivian L.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Sempre usei Corel e essa versao 2026 ta mt estavel. Instalou sem dor de cabeca seguindo o video"
    },
    {
      author: "Carlos Henrique S.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Estava sofrendo com programa fechando sozinho antes, comprei esse da C2Tech e nunca mais tive problema. Salva e exporta PDF certinho."
    },
    {
      author: "Priscila Fontes",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Comprei a versão 2022 que eu já era acostumada a usar na agência e rodou liso demais no meu notebook."
    },
    {
      author: "Alexandre Rocha",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "entrega na hora e suporte tirou minhas duvidas rapidinho. Nota dez"
    },
    {
      author: "Gráfica Expressa JM",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Preço excelente pela qualidade. O PowerTrace e o Photo-Paint vieram junto funcionando perfeitamente."
    },
    {
      author: "Bruno V. Tavares",
      rating: 4,
      date: "2 meses atrás",
      country: "BR",
      comment: "Ótimo atendimento e envio imediato no e-mail após o Pix. Recomendo pra quem trabalha com serigrafia e estamparia."
    },
    {
      author: "Tatiane M. Melo",
      rating: 5,
      date: "2 meses atrás",
      country: "BR",
      comment: "Muito fácil de instalar com o vídeo tutorial que vem na pasta do Drive. Funcionando vitalício de verdade!"
    },
  ],
  photoshop_2026: [
    {
      author: "James Wilson",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Smooth performance on both Windows and Mac M3. Generative tools work fine."
    },
    {
      author: "Henrique G. P.",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Photoshop 2026 sensacional, roda super leve e tem todas as ferramentas de edicao locais"
    },
    {
      author: "Natalia Cordero",
      rating: 5,
      date: "hace 1 semana",
      country: "MX",
      comment: "Entrega rápida y todo bien explicado en el enlace que enviaron."
    },
    {
      author: "Jessica M. Rosa",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "otimo custo beneficio, suporte tirou todas as minhas duvidas no whatsapp antes de eu comprar."
    },
    {
      author: "Wanderley Silva",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "recomendo a todos, instalacao rapida e programa 100% funcional"
    },
    {
      author: "Felipe N.",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Melhor ferramenta de edição de fotos local q existe. Comprei e ativou tudo certinho"
    },
    {
      author: "Luciana G.",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Tudo funcionando liso no win 11. Uso pra trabalhar td dia e ta otimo"
    },
    {
      author: "Marcelo K.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Fácil instalação e vem com passo a passo bem explicado no e-mail."
    },
    {
      author: "Artur Ramos",
      rating: 4,
      date: "2 meses atrás",
      country: "BR",
      comment: "o programa é muito bom e roda liso. Apenas o download que demorou um pouco por ser pesado."
    },
  ],
  illustrator_2026: [
    {
      author: "Mason Brooks",
      rating: 5,
      date: "3 days ago",
      country: "US",
      comment: "Vector precision and hardware acceleration are spot on. Highly recommended."
    },
    {
      author: "Guilherme S.",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Illustrator 2026 rodando muito rápido no Windows 11. Criei várias artes vetorizadas pesadas e não travou nenhuma vez."
    },
    {
      author: "Camila Nogueira",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Excelente para trabalhar com design gráfico local. A ativação vitalícia sem assinatura mensal economiza muito no ano."
    },
    {
      author: "Fabio D.",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Gostei muito da estabilidade dessa versão. Suporte foi super atencioso e me ajudou na instalação rápida."
    },
    {
      author: "Lucas B. Martins",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Excelente alternativa de compra vitalícia local. O Illustrator é super completo e sem surpresas."
    },
  ],
  premiere_2026: [
    {
      author: "Lucas Echeverría",
      rating: 4,
      date: "hace 5 días",
      country: "ES",
      comment: "Edición de vídeo muy rápida. Tuve una duda y me ayudaron al instante."
    },
    {
      author: "Matheus V. Costa",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Muito bom! Premiere 2026 com excelente desempenho de renderização por GPU. Editei em 4K sem engasgos."
    },
    {
      author: "William Carter",
      rating: 5,
      date: "2 weeks ago",
      country: "US",
      comment: "Solid software, exports cleanly with no watermarks. 10/10 purchase."
    },
    {
      author: "Larissa Dias",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Entrega super rápida do link de download e instruções simples de instalar. Recomendo demais!"
    },
    {
      author: "Tiago Silva",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "O programa é ótimo e completo. O download é um pouco pesado, mas a velocidade de resposta do editor compensa."
    },
    {
      author: "Gabriel Nogueira",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Melhor editor do mercado. Comprei e já estou editando meus trabalhos locais."
    },
    {
      author: "Mariana Santos",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Muito fácil de ativar seguindo o tutorial enviado. Aprovou na hora por Pix."
    },
  ],
  after_effects_2026: [
    {
      author: "Jordan Reed",
      rating: 5,
      date: "4 days ago",
      country: "US",
      comment: "Motion graphics compositions render fast. Zero licensing hiccups."
    },
    {
      author: "Bruno M. Ramos",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "After Effects 2026 incrível. Renderizei animações complexas e o consumo de RAM está bem otimizado comparado à versão anterior."
    },
    {
      author: "Marina P.",
      rating: 4,
      date: "5 dias atrás",
      country: "BR",
      comment: "Comprei para o meu estúdio e ativou de primeira. Suporte por WhatsApp tirou minhas dúvidas de compatibilidade rapidamente."
    },
    {
      author: "Matheus K. Motion",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Versão 2026 voando no Windows 11 com placa RTX. Todos os plugins de terceiros compatíveis."
    },
    {
      author: "Lucas Designer VFX",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Render no Mercury Engine perfeito. Instalação limpa e suporte nota 10."
    },
  ],
  lightroom_classic_2026: [
    {
      author: "Sofia Herrera",
      rating: 5,
      date: "hace 3 días",
      country: "AR",
      comment: "Revelado rápido de fotos RAW y catálogo ordenado. Muy recomendable."
    },
    {
      author: "Rodrigo F. Lima",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Lightroom Classic 2026 perfeito para importar grandes catálogos de fotos RAW. A revelação de imagens está muito fluida."
    },
    {
      author: "Debora L. Gomes",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Sensacional! Edição profissional de fotos sem pagar mensalidades absurdas. O processo de compra foi muito seguro."
    },
    {
      author: "Vinicius Souza",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Excelente custo-benefício. Recomendo para fotógrafos profissionais que querem usar a versão local estável."
    },
  ],
  proteus_9: [
    {
      author: "Kevin Adams",
      rating: 5,
      date: "5 days ago",
      country: "US",
      comment: "Microcontroller simulation and PCB layout tools work exactly as expected."
    },
    {
      author: "Jefferson Santos",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Melhor suite de simulacao de circuitos e layout pci, instalei e rodou os projetos do arduino sem problemas"
    },
    {
      author: "Gabriel R.",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "tudo certo, simulando perfeitamente. Muito util para os meus estudos de engenharia eletrica"
    },
    {
      author: "Diego F. Melo",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "suporte ajudou no zap pq eu nao estava achando o link de download kkkkk recomendo dmais"
    },
    {
      author: "Prof. Henrique V.",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Simulação de microcontroladores PIC e ARM sem travamentos no laboratório."
    },
  ],
  exocad_31: [
    {
      author: "Dr. Fernando Ortiz",
      rating: 5,
      date: "hace 4 días",
      country: "ES",
      comment: "Modelado de prótesis y coronas dentales impecable. Ahorro sustancial."
    },
    {
      author: "Dr. Gustavo N.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Instalou com todos os modulos clinicos ativos, perfeito pro meu laboratorio de protese. Recomendo"
    },
    {
      author: "Protetico Valter",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "estava desconfiado pelo preco mas veio tudo certinho e funcionando perfeito. Otimo atendimento"
    },
    {
      author: "Dra. Aline Souza",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "muito bom, exocad rodando liso com meu scanner intraoral. Economizei um dinheirao"
    },
  ],
  parallels_desktop_26: [
    {
      author: "Sean Murphy",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Running Windows 11 seamlessly on MacBook Pro M3. Fantastic utility."
    },
    {
      author: "Renan Castilho",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "cara mt bom, rodou o windows 11 no meu macbook air m1 super rapido. nem parece q e emulador, parece nativo!"
    },
    {
      author: "Tiago Fontes",
      rating: 5,
      date: "5 dias atrás",
      country: "PT",
      comment: "Excelente desempenho no Mac. Não perde nada em velocidade. 5 estrelas."
    },
    {
      author: "Thiago M. Albuquerque",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Tinha algums programas de engenharia q nao rodava no mac, com o parallels funcionou td certinho. ativou vitalicio de primeira"
    },
    {
      author: "Patricia V. Lima",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "otimo custo beneficio! a instalacao tem bastantes passos mas o tutorial em video q eles mandam ajuda muito."
    },
  ],
  camtasia_2026: [
    {
      author: "Connor Walsh",
      rating: 5,
      date: "4 days ago",
      country: "US",
      comment: "Screen recording and video tutorials in crisp 60fps. Easy setup."
    },
    {
      author: "Julio C. Ramos",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Gravo minhas videoaulas com ele td dia, o editor ta super completo e leve no win 11. Recomendo dmais!"
    },
    {
      author: "Mariana T. Albuquerque",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Melhor gravador de tela q ja usei. Chegou na hora no e-mail e ativou vitalicio certinho. Nota 10!"
    },
    {
      author: "Priscila M. Cursos",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Gravo minhas videoaulas todos os dias nele. Renderização rápida e sem marcas d'água. 10/10."
    },
    {
      author: "Danilo Castro",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Instalação rápida e suporte impecável pelo WhatsApp. Super recomendo a C2."
    },
  ],
  pdfelement_12: [
    {
      author: "Mateo Valencia",
      rating: 5,
      date: "hace 3 días",
      country: "CO",
      comment: "Edición y conversión de PDF súper rápida. Gran alternativa a Acrobat."
    },
    {
      author: "Renato G. Vieira",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Ótimo programa, muito mais leve e rápido que o acrobat. Consigo editar e converter qualquer pdf em word em segundos."
    },
    {
      author: "Claudia F. Lins",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "O OCR dele funcionou perfeitamente para digitalizar uns documentos antigos escaneados que eu tinha. Recomendo demais!"
    },
    {
      author: "Dra. Letícia Ramos",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Muito mais leve que o Acrobat para assinar e preencher petições e contratos no escritório."
    },
    {
      author: "Guilherme B. Prado",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "O OCR para documentos escaneados funciona com precisão absurda. Recomendo."
    },
  ],
  wondershare_recoverit_13: [
    {
      author: "Jason McAllister",
      rating: 5,
      date: "3 days ago",
      country: "US",
      comment: "Recovered all my lost RAW camera footage from an SD card. Lifetime license works perfectly."
    },
    {
      author: "Felipe S. Pires",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Salvou minha vida! Consegui recuperar mais de 200GB de fotos e vídeos de um HD externo que tinha sido formatado por engano. Funcionou perfeito!"
    },
    {
      author: "Juliana Ferreira M.",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Salvou minha vida! Consegui recuperar mais de 80GB de fotos do casamento de um HD corrompido. Excelente."
    },
    {
      author: "Bruno Alcantara",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Programa muito direto ao ponto e ativado sem erro. Reconheceu o pendrive formatado de primeira."
    },
    {
      author: "Renato D. Santos",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "A varredura profunda demorou algumas horas, mas recuperou arquivos que nenhum outro software achou."
    },
  ],
  autodesk_all_apps: [
    {
      author: "Anthony Reed",
      rating: 5,
      date: "1 week ago",
      country: "US",
      comment: "Awesome package deal for complete AEC design suite. Very pleased."
    },
    {
      author: "Ricardo Albuquerque",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Sensacional! Liberação foi muito rápida no meu e-mail. Entrei em contato com o suporte pelo WhatsApp, me passaram o login e senha privados e já estou usando o AutoCAD e o Revit originais. Vale muito a pena!"
    },
    {
      author: "Sofia Helena M.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Uso no meu escritório de arquitetura e me economizou um dinheirão. Todos os 86 programas da Autodesk estão inclusos na conta. Atualizações oficiais acontecem direto nas ferramentas. O plano recorrente no Pix é super prático."
    },
    {
      author: "Eng. Daniel Farias",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Trabalho com projetos complexos no Inventor e Civil 3D, e o acesso original é fundamental. A conta é 100% privada e o suporte deles é sensacional, tirou minhas dúvidas de login pelo zap muito rápido. Excelente!"
    },
    {
      author: "Gabriela Vasconcelos",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito bom ter todas as ferramentas em uma só assinatura. O processo de pegar o login com o suporte foi tranquilo. Recomendo para engenheiros e arquitetos."
    },
  ],
  windows_11_pro: [
    {
      author: "Zachary Moore",
      rating: 5,
      date: "1 day ago",
      country: "US",
      comment: "Genuine digital activation key worked on first try in system settings."
    },
    {
      author: "João Batista",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Chave enviada na hora pelo WhatsApp, ativei meu PC novo sem nenhum problema. Recomendo muito!"
    },
    {
      author: "Jorge Luis R.",
      rating: 5,
      date: "hace 6 días",
      country: "ES",
      comment: "Clave original inmediata al correo. Totalmente fiable."
    },
    {
      author: "Marcos P.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Ativação vinculada na minha conta Microsoft certinho, agora não perco mais se precisar formatar."
    },
    {
      author: "Letícia Costa",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Atendimento nota 10! Tive uma dúvida na hora de validar no sistema e me ajudaram passo a passo."
    },
    {
      author: "Felipe S.",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Muito bom preço, a chave original é outra vida, o sistema fica sem frescura de ativador."
    },
    {
      author: "Augusto S.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "Tudo perfeito, a licença é permanente mesmo e o Windows Update funciona normal."
    },
  ],
  windows_10_pro: [
    {
      author: "Martín Paredes",
      rating: 5,
      date: "hace 1 semana",
      country: "AR",
      comment: "Funcionó de maravilla en una máquina de oficina."
    },
    {
      author: "Thiago Almeida",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Rápido e prático, chegou a chave no whats em 2 minutos. Meu Windows 10 já tá ativadão."
    },
    {
      author: "Roberto Oliveira",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Tava cansado daquela marca d'água de ativar o Windows. Comprei aqui e sumiu na hora com a chave original."
    },
    {
      author: "Sérgio Pinheiro",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Chave oficial permanente, ativou direto nas configurações do Windows. Perfeito."
    },
    {
      author: "Patrícia L. Gomes",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Ativação instantânea e sem complicações. Comprei pro computador do consultório."
    },
  ],
  adobe_acrobat_pro_2026: [
    {
      author: "Ryan Gallagher",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Editing and signing PDFs with ease. Clean install on Windows and macOS."
    },
    {
      author: "Julio C. Ramos",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Excelente! Editando e assinando meus contratos em PDF sem complicação. Licença vitalícia compensa muito."
    },
    {
      author: "Emilio Salazar",
      rating: 5,
      date: "hace 4 días",
      country: "ES",
      comment: "Excelente herramienta para la oficina. Todo funciona a la perfección."
    },
    {
      author: "Amanda Freitas",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Instalação super rápida e o software roda liso no Windows 11. Cansada de pagar mensalidade pra Adobe!"
    },
    {
      author: "Carlos P. Neto",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Recomendo a todos, entrega super rápida e o Acrobat tá funcionando perfeitamente."
    },
  ],
  fl_studio_2025: [
    {
      author: "Dylan Hughes",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "All plugins unlocked, ASIO audio drivers running super low latency."
    },
    {
      author: "DJ Marcos",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Versão completassa, veio com todos os plugins que eu precisava. Beatmaking subiu de nível."
    },
    {
      author: "Carlos E. Santana",
      rating: 5,
      date: "hace 1 semana",
      country: "MX",
      comment: "Increíble para producción musical, viene completo y sin fallos."
    },
    {
      author: "Lucas Beats",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Muito bom, link direto do Drive sem enrolação."
    },
    {
      author: "Ana Prod",
      rating: 5,
      date: "20 dias atrás",
      country: "BR",
      comment: "Melhor investimento, funcionando 100%. Recomendo."
    },
    {
      author: "Pedro Henrique",
      rating: 4,
      date: "25 dias atrás",
      country: "BR",
      comment: "Instalação tranquila. Obrigado C2Tech."
    },
  ],
  filmora_15: [
    {
      author: "Esteban Morales",
      rating: 5,
      date: "hace 3 días",
      country: "CO",
      comment: "Efectos y transiciones con IA funcionando sin marca de agua. Genial."
    },
    {
      author: "Carlos Eduardo",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Excelente programa para edição, uso no meu canal do YouTube e os novos recursos de IA economizam muito tempo. Recomendo demais!"
    },
    {
      author: "Fernanda Lima",
      rating: 5,
      date: "10 dias atrás",
      country: "BR",
      comment: "A instalação foi super fácil. Recebi o link logo após o pagamento via Pix. Tudo funcionando perfeitamente."
    },
    {
      author: "Roberto Santos",
      rating: 4,
      date: "15 dias atrás",
      country: "BR",
      comment: "Software muito bom e leve. Chegou tudo certinho no email."
    },
  ],
  office_25_mac: [
    {
      author: "Christopher Bell",
      rating: 5,
      date: "2 days ago",
      country: "US",
      comment: "Word, Excel and Outlook activated instantly with full lifetime access."
    },
    {
      author: "Mauricio F.",
      rating: 5,
      date: "Ontem",
      country: "BR",
      comment: "Chega de pagar assinatura mensal pra microsoft, esse office e vitalicio e tem tudo q preciso"
    },
    {
      author: "Andrés Morales",
      rating: 5,
      date: "hace 1 semana",
      country: "ES",
      comment: "Activación limpia y permanente. Excelente servicio."
    },
    {
      author: "Camila Rocha",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Instalou o word excel e powerpoint certinho no meu win11. Recomendo dmais"
    },
    {
      author: "Sandro M. G.",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "otimo, veio com um guia facil de instalar. ja to usando pra trabalhar"
    },
    {
      author: "Fabio D. Neto",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Mto rapido o envio no email, recomendo msm, economizei bastante ja q nao tem mensalidade"
    },
    {
      author: "Gisele Barbosa",
      rating: 5,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Funciona muito bem, todos os programas ativados certinho. 10 de 10"
    },
    {
      author: "Luciano M.",
      rating: 5,
      date: "1 mês atrás",
      country: "BR",
      comment: "excelente, abriu os arquivos pesados de planilhas do trampo de boa"
    },
    {
      author: "Juliana Reis",
      rating: 4,
      date: "1 mês atrás",
      country: "BR",
      comment: "Excelente custo beneficio. Recomendo a todos da area administrativa"
    },
  ],
  tekla_2025: [
    {
      author: "Nathan Davies",
      rating: 5,
      date: "5 days ago",
      country: "US",
      comment: "Structural steel detailing tools and NC export work like a charm."
    },
    {
      author: "Eng. Maurício G.",
      rating: 5,
      date: "6 dias atrás",
      country: "BR",
      comment: "Melhor software para detalhamento de estrutura metalica do mercado. Funcionando 100%"
    },
    {
      author: "Kevin Brooks",
      rating: 5,
      date: "4 days ago",
      country: "US",
      comment: "Steel structure detailing and drawing generation run smooth. Excellent customer support."
    },
    {
      author: "Vagner S. Castro",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Processo de instalacao bem direto e rapido, recomendo para os colegas de engenharia"
    },
    {
      author: "Ing. Carlos Mendoza",
      rating: 5,
      date: "hace 1 semana",
      country: "ES",
      comment: "Modelado y planos de taller metálico perfectos. La entrega fue inmediata."
    },
    {
      author: "Lucas P. Santos",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Muito bom o programa, entrega automatica mesmo, chegou na hora no meu gmail"
    },
  ],
};
