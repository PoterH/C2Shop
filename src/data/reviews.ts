export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export const reviewsData: Record<string, Review[]> = {
  autocad_2027_win: [
    {
      author: "Rodrigo S. Lima",
      rating: 5,
      date: "2 dias atrás",
      comment: "Instalou de primeira, meu note antigo rodo muito bem. Vendedor ajudou por video na hr da instalacao"
    },
    {
      author: "Lucas Menezes",
      rating: 5,
      date: "1 semana atrás",
      comment: "muito bom, veio certinho no email e a intalacao foi bem rapida. recomendo mt"
    },
    {
      author: "Marcos A. Fonseca",
      rating: 4,
      date: "2 semanas atrás",
      comment: "uso no escritorio td dia, funcioando 100% ate agora. so tive q desativar o antivirus antes mas deu td certo."
    },
    {
      author: "Julio Cesar",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Melhor compra q ja fiz, ajuda mt no dia a dia da faculdade de civil"
    },
    {
      author: "Ana Carolina V.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Veio completo, sem frescura de assinatura. Vale cada centavo"
    },
    {
      author: "Eng. Pedro M.",
      rating: 5,
      date: "1 mês atrás",
      comment: "suporte de vcs é nota mil! me ligaram pelo whatsapp e resolveram uma pendencia de dll aq. mto grato"
    },
    {
      author: "Marcelo A.",
      rating: 4,
      date: "2 meses atrás",
      comment: "o programa é otimo, so achei a instalação um pouco demorada pela minha internet, mas rodou perfeito."
    },
    {
      author: "Felipe G. Dias",
      rating: 5,
      date: "3 dias atrás",
      comment: "caramba rodou liso dmais no meu macbook m2. tava com medo de n dar certo por causa do m2 mas fico top"
    },
    {
      author: "Juliana Costa",
      rating: 5,
      date: "1 semana atrás",
      comment: "Mto bom msm! O suporte e super atencioso e responde rapido no whatsapp. salvou meu TCC"
    },
    {
      author: "Thiago Ramos",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Otimo custo beneficio, roda nativo no mac e nao precisa de nenhuma gambiarra"
    },
    {
      author: "Mariana S.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Gostei muito. Roda direto sem precisar de emulador nem nada. Recomendo mto."
    },
    {
      author: "Arq. Camila Fontes",
      rating: 5,
      date: "1 mês atrás",
      comment: "Peguei a versão 2019 pro notebook de obra e a 2026 pro PC do escritório. Ambas ativaram de primeira com o vídeo!"
    },
    {
      author: "Rafael Mendonça",
      rating: 5,
      date: "2 meses atrás",
      comment: "Funciona todas as rotinas LISP que uso no trabalho. Preço justo e entrega realmente imediata no email."
    },
    {
      author: "Vitor Hugo B.",
      rating: 5,
      date: "2 meses atrás",
      comment: "Tava pagando caro antes, aqui foi pagamento único e nunca mais deu aviso de licença. Recomendo de olhos fechados."
    },
    {
      author: "Fernanda T. Azevedo",
      rating: 4,
      date: "2 meses atrás",
      comment: "Download veio rapidinho pelo Google Drive e o passo a passo em vídeo facilita demais pra quem não manja muito."
    },
    {
      author: "Daniel C. Peixoto",
      rating: 5,
      date: "3 meses atrás",
      comment: "Excelente atendimento no WhatsApp, tiraram minha dúvida antes da compra e o AutoCAD 2027 tá voando."
    }
  ],
  revit_2027: [
    {
      author: "Eng. Pedro Alencar",
      rating: 5,
      date: "Ontem",
      comment: "rapaz, o revit ta muito bom. a versao 2027 ta mais leve q as anteriores, curti dmais"
    },
    {
      author: "Beatriz Nogueira",
      rating: 5,
      date: "5 dias atrás",
      comment: "entrega foi na hora, o email chegou com o link e o tutorial bem detalhado. recomendo"
    },
    {
      author: "Carlos E. Souza",
      rating: 5,
      date: "2 semanas atrás",
      comment: "suporte me ajudou a instalar remoto pq sou meio lerdo com essas coisa kkkkk nota 10"
    },
    {
      author: "Ricardo F. Cruz",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Muito bom msm o BIM dele ta funcionando 100%, todos os templates abrindo certin"
    },
    {
      author: "Daniela V.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Excelente, comprei pra usar no estagio e foi mt facil configurar"
    },
    {
      author: "Matheus N.",
      rating: 4,
      date: "2 meses atrás",
      comment: "Tudo certo, apenas o tutorial q podia ser um pouco mais curto mas fora isso o programa ta perfeito"
    }
  ],
  inventor_pro_2027: [
    {
      author: "Mateus Ribeiro",
      rating: 5,
      date: "4 dias atrás",
      comment: "Muito bom o software, pra quem trabalha com projetos mecanicos nao tem melhor. Ativou vitalicio certin"
    },
    {
      author: "André G. Silva",
      rating: 5,
      date: "1 semana atrás",
      comment: "tudo certo, recomendo a todos do ML e do site. Roda liso na minha rtx"
    },
    {
      author: "Renato Oliveira",
      rating: 4,
      date: "2 semanas atrás",
      comment: "demorou uns 5 minutinhos pra chegar o e-mail mas deu tudo certo e ta funcionando perfeito."
    }
  ],
  civil3d_2027: [
    {
      author: "José A. Santos",
      rating: 5,
      date: "3 dias atrás",
      comment: "comprei pro meu pai q e engenheiro de estradas, ele adorou, instalou facinho e ta usando td dia"
    },
    {
      author: "Luiz Fernando",
      rating: 5,
      date: "1 semana atrás",
      comment: "Mt bom msm, versao 2027 rodando sem travar com os arquivos pesados de topografia."
    },
    {
      author: "Mariana K.",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Muito facil o passo a passo, qualquer um consegue. Recomendo dmais a loja"
    },
    {
      author: "Gustavo Mendes",
      rating: 5,
      date: "1 mês atrás",
      comment: "Tudo otimo, ja fiz 3 loteamento nele essa semana e nao deu nenhum crash."
    }
  ],
  navisworks_2027: [
    {
      author: "Fernando A. Rocha",
      rating: 5,
      date: "5 dias atrás",
      comment: "essencial pra ver compatibilizacao de projeto aki na empresa, funcionou perfeito"
    },
    {
      author: "Priscila M.",
      rating: 5,
      date: "1 semana atrás",
      comment: "o clash detector rodando liso aq. Preço otimo e entrega super rapida"
    },
    {
      author: "Gustavo B.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Muto bom, recomendo msm, o suporte me atendeu no zap rapidao pra tirar uma duvida."
    }
  ],
  sketchup_2026_win: [
    {
      author: "Ana Julia M.",
      rating: 5,
      date: "2 dias atrás",
      comment: "Uso pra fazer meus design de interiores, melhor compra q fiz esse ano. Super leve e facil"
    },
    {
      author: "Bruno F. Silveira",
      rating: 5,
      date: "6 dias atrás",
      comment: "Recomendo dmais, veio com todos os passos bem explicados e instalei em 5 minutos"
    },
    {
      author: "Diego Barbosa",
      rating: 4,
      date: "1 semana atrás",
      comment: "Otimo preço e funciona perfeitamente no windows 11. Tudo certinho."
    },
    {
      author: "Carolina Reis",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Muito top, ja to usando com varios blocos pesados aq e nao travou nenhuma vez"
    },
    {
      author: "Mauricio L.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "comprei e o link veio na hora. Suporte atencioso dms tirou duvida de plugin"
    },
    {
      author: "Gabriel K.",
      rating: 5,
      date: "3 dias atrás",
      comment: "Instalou no meu macbook m1 de primeira, rodando super fluido. Nota 10"
    },
    {
      author: "Carla R. Pontes",
      rating: 5,
      date: "1 semana atrás",
      comment: "muito dificil achar coisa boa pra mac, esse deu super certo e e vitalicio mesmo"
    },
    {
      author: "Vinicius Lopes",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Gostei bastante, suporte deu assistencia pelo zap pra configurar o LayOut."
    },
    {
      author: "Tiago M.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Muito bom, rodou tranquilo no Sonoma e o Layout funciona normal."
    }
  ],
  eberick_builder_2025: [
    {
      author: "Eng. Ricardo M.",
      rating: 5,
      date: "3 dias atrás",
      comment: "Melhor combo pra calculo estrutural e eletrico, comprei pra economizar e nao me arrependo"
    },
    {
      author: "Julio C. Prado",
      rating: 5,
      date: "1 semana atrás",
      comment: "suporte remoto deles e sensacional, me ajudaram a configurar o eberick q tava dando erro de dll"
    },
    {
      author: "Patricia G.",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Muito bom os programas, estao funcionando sem travar. O preco e otimo pelo q entrega"
    },
    {
      author: "Henrique Silva",
      rating: 5,
      date: "1 mês atrás",
      comment: "Combo excelente pra quem quer fazer projetos complementares completos sem falha de compatibilidade"
    },
    {
      author: "Roberto D.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Tudo certo no download, os arquivos sao meio grandes mas o tutorial explica bem direitinho"
    }
  ],
  archicad_30: [
    {
      author: "Rodrigo M. Pires",
      rating: 5,
      date: "Ontem",
      comment: "archicad 30 fico show de bola!! bem mais leve q o 29 na hr de subir os 3d pesados. vlw pelo suporte na instalaçao"
    },
    {
      author: "Amanda V. Lopes",
      rating: 5,
      date: "Ontem",
      comment: "Peguei a versão 29 em português rodando lisinho aqui. A interface tá muito rápida, curti demais"
    },
    {
      author: "Gabriela S. Arquiteta",
      rating: 5,
      date: "3 dias atrás",
      comment: "consegui instalar de boa pelo tutorial, veio tudo certinho no email na msm hora. programa perfeito e em portugues"
    },
    {
      author: "Eduardo Santos",
      rating: 5,
      date: "4 dias atrás",
      comment: "Melhor q o autocad pra arquitetura, recomendo o site, entregou em segundos"
    },
    {
      author: "Marcos Vinicius B.",
      rating: 5,
      date: "5 dias atrás",
      comment: "Comprei o 28 pro meu notebook mais antigo e rodou liso demais no win 11. Atendimento nota 10 no whats obrigado"
    },
    {
      author: "Roberto Farias",
      rating: 5,
      date: "1 semana atrás",
      comment: "tudo certo, instalei e ja to fazendo meu primeiro projeto no BIM. Muito bom."
    },
    {
      author: "Camila Duarte",
      rating: 4,
      date: "1 semana atrás",
      comment: "Muito bom, só demorou um pouco pra baixar por causa da minha net lerdinha kkk mas o software em si é sensacional"
    },
    {
      author: "Larissa M.",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Roda liso e o bimmx funciona perfeitamente tb, recomendo a compra"
    }
  ],
  cype_2026: [
    {
      author: "Eng. Sergio N.",
      rating: 5,
      date: "2 dias atrás",
      comment: "Cypecad completo com todos os modulos ativos, perfeito pra calcular as sapatas, vigas e pilares nas normas da NBR."
    },
    {
      author: "Kleber Lima",
      rating: 5,
      date: "5 dias atrás",
      comment: "Estava com duvida se vinha com o Cype 3D e o Arquimedes juntos, e vem tudo completo mesmo! Otimo atendimento."
    },
    {
      author: "Alexandre S.",
      rating: 4,
      date: "1 semana atrás",
      comment: "Muito bom, peguei a 2025.d por ter todos os idiomas e rodou tranquilo no Windows 11. Vale super a pena."
    },
    {
      author: "Jeferson O.",
      rating: 5,
      date: "1 semana atrás",
      comment: "O modulo de escadas, lajes e fundacoes funcionando certinho na versao 2026 em portugues, otimo preco."
    },
    {
      author: "Eng. Marcos Tadeu",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Calculo galpao metalico toda semana no Cype 3D e ta rodando liso, gerando as pranchas e memorial sem erro nenhum."
    },
    {
      author: "Leandro F. Barros",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Entrega imediata no e-mail e o vídeo de instalação explica cada detalhe. Em 15 minutos já estava com o CypeCAD aberto."
    },
    {
      author: "Renata C. Vasconcelos",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Uso bastante o CypeTherm e o Arquimedes pros laudos e orcamentos aqui do escritorio, veio tudo desbloqueado."
    },
    {
      author: "Gustavo H. Mendes",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Programa pesado pq vem a suite inteira, mas depois que instala funciona perfeitamente e não pede mensalidade."
    },
    {
      author: "Dr. Paulo Roberto",
      rating: 5,
      date: "1 mês atrás",
      comment: "Excelente custo-benefício. Peguei o 2026.a em português Brasil e todas as normas NBR 6118 estão certinhas."
    },
    {
      author: "Fabiano Costa",
      rating: 5,
      date: "1 mês atrás",
      comment: "Suporte pelo WhatsApp muito prestativo, me ajudaram a configurar na hora. Recomendo a C2Tech."
    },
    {
      author: "Danilo Moraes",
      rating: 5,
      date: "2 meses atrás",
      comment: "Melhor investimento pra quem tá começando a projetar estruturas por conta própria. CypeCAD e Cype 3D 100% funcionais."
    },
    {
      author: "Henrique A. Pires",
      rating: 5,
      date: "2 meses atrás",
      comment: "Tudo conforme anunciado, link direto no Google Drive e ativação vitalícia funcionando redondo."
    }
  ],
  solidworks_2026: [
    {
      author: "Marcelo T. P.",
      rating: 5,
      date: "2 dias atrás",
      comment: "Solidworks premium rodando no talo, faco montagem gigante e n trava. Mto estavel"
    },
    {
      author: "Wellington G.",
      rating: 5,
      date: "6 dias atrás",
      comment: "Chegou na hora no email, tutorial e bem didatico e funciona mesmo"
    },
    {
      author: "Felipe Moreira",
      rating: 5,
      date: "2 semanas atrás",
      comment: "comprei pra faculdade e me atendeu super bem, melhor do q pagar assinatura cara"
    },
    {
      author: "Claudio J.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "As ferramentas de chapas metalicas e simulacao estao perfeitas. Recomendo"
    },
    {
      author: "Otavio Ramos",
      rating: 4,
      date: "1 mês atrás",
      comment: "Muito bom, ativacao permanente. So achei pesado pra baixar mas compensa dms"
    },
    {
      author: "Alexandre D.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Tudo certo! Suporte me respondeu de madrugada pra me mandar o link q eu perdi kkkkk nota 10"
    }
  ],
  sisdea_2025: [
    {
      author: "Paula R. Silveira",
      rating: 5,
      date: "5 dias atrás",
      comment: "Perfeito para engenharia de avaliacoes, usei pra fazer tres laudos semana passada. 100% confiavel"
    },
    {
      author: "Fabricio Souza",
      rating: 5,
      date: "1 semana atrás",
      comment: "tudo funcionando certinho no windows 11. entrega foi imediata."
    },
    {
      author: "Renato D. Reis",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Recomendo mto, programa essencial pra perito judicial e ta com o preco mto bom"
    }
  ],
  rhinoceros_8: [
    {
      author: "Guilherme B.",
      rating: 5,
      date: "3 dias atrás",
      comment: "Rhino 8 com Grasshopper ativo rodando perfeitamente. Otimo pra modelagem organica"
    },
    {
      author: "Leticia Andrade",
      rating: 5,
      date: "1 semana atrás",
      comment: "comprei e instalei em 10 minutos, muito facil o processo e o suporte responde na hora"
    },
    {
      author: "Daniel Ferreira",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Muito satisfeito, o software e muito potente e a ativacao e permanente de vdd"
    },
    {
      author: "Renan T.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Excelente para desenho industrial, compatibilidade com outros cads ta otima"
    }
  ],
  zwcad_2026: [
    {
      author: "Carlos P. Neto",
      rating: 5,
      date: "4 dias atrás",
      comment: "Bem mais leve que o autocad, roda liso no meu notebook de escritorio mais antigo."
    },
    {
      author: "Juliano Borges",
      rating: 5,
      date: "1 semana atrás",
      comment: "Tive um probleminha no download pq minha net caiu mas o suporte me mandou outro link super rapido. Nota 10"
    },
    {
      author: "Arthur Martins",
      rating: 5,
      date: "2 semanas atrás",
      comment: "100% compativel com dwg, abri todos os meus projetos antigos sem erro nenhum"
    },
    {
      author: "Ricardo L.",
      rating: 4,
      date: "1 mês atrás",
      comment: "Interface identica, nao tive dificuldade nenhuma em me adaptar. Gostei do preco"
    }
  ],
  tekla_2025: [
    {
      author: "Eng. Maurício G.",
      rating: 5,
      date: "6 dias atrás",
      comment: "Melhor software para detalhamento de estrutura metalica do mercado. Funcionando 100%"
    },
    {
      author: "Vagner S. Castro",
      rating: 5,
      date: "1 semana atrás",
      comment: "Processo de instalacao bem direto e rapido, recomendo para os colegas de engenharia"
    },
    {
      author: "Lucas P. Santos",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Muito bom o programa, entrega automatica mesmo, chegou na hora no meu gmail"
    }
  ],
  office_25_win: [
    {
      author: "Mauricio F.",
      rating: 5,
      date: "Ontem",
      comment: "Chega de pagar assinatura mensal pra microsoft, esse office e vitalicio e tem tudo q preciso"
    },
    {
      author: "Camila Rocha",
      rating: 5,
      date: "3 dias atrás",
      comment: "Instalou o word excel e powerpoint certinho no meu win11. Recomendo dmais"
    },
    {
      author: "Sandro M. G.",
      rating: 4,
      date: "1 semana atrás",
      comment: "otimo, veio com um guia facil de instalar. ja to usando pra trabalhar"
    },
    {
      author: "Fabio D. Neto",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Mto rapido o envio no email, recomendo msm, economizei bastante ja q nao tem mensalidade"
    },
    {
      author: "Gisele Barbosa",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Funciona muito bem, todos os programas ativados certinho. 10 de 10"
    },
    {
      author: "Luciano M.",
      rating: 5,
      date: "1 mês atrás",
      comment: "excelente, abriu os arquivos pesados de planilhas do trampo de boa"
    },
    {
      author: "Juliana Reis",
      rating: 4,
      date: "1 mês atrás",
      comment: "Excelente custo beneficio. Recomendo a todos da area administrativa"
    }
  ],
  office_25_mac: [
    {
      author: "Patricia H. M.",
      rating: 5,
      date: "2 dias atrás",
      comment: "Deu super certo no meu mac mini m2. Todos os apps rodando nativos e rapidos"
    },
    {
      author: "Otavio P. Santos",
      rating: 5,
      date: "5 dias atrás",
      comment: "Muito bom nao precisar mais assinar o 365, recomendo muito o site. Entrega rapida"
    },
    {
      author: "Marcela L. Dias",
      rating: 5,
      date: "2 semanas atrás",
      comment: "funciona perfeitamente, o excel abre super rapido. so elogios!"
    },
    {
      author: "Wanderson Silva",
      rating: 4,
      date: "3 semanas atrás",
      comment: "Instalação super tranquila no mac, as macros estao funcionando de boa no excel"
    },
    {
      author: "Rafaela K.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Tudo certo! Suporte me tirou umas duvidas sobre o outlook e deu td certo"
    }
  ],
  vray_7: [
    {
      author: "Ronaldo F. Silva",
      rating: 5,
      date: "3 dias atrás",
      comment: "Renders maravilhosos no sketchup, a versao 7 ta mto rapida pra renderizar externa"
    },
    {
      author: "Juliana P. Reis",
      rating: 5,
      date: "1 semana atrás",
      comment: "tudo certinho, comprei e em menos de 1 minuto o email ja tava na caixa de entrada"
    },
    {
      author: "Claudio G. Moreira",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Muito bom, recomendo msm, o preco e muito em conta comparado ao oficial"
    },
    {
      author: "Breno Lima",
      rating: 5,
      date: "1 mês atrás",
      comment: "o vray 7 ta bruto dms, os materiais ficam mto realistas. Comprei e instalei facil"
    },
    {
      author: "Aline Fonseca",
      rating: 5,
      date: "1 mês atrás",
      comment: "Roda bem na rtx e nao deu tela azul nenhuma vez ate agora. Indico pra td mundo"
    }
  ],
  enscape: [
    {
      author: "Alessandra C.",
      rating: 5,
      date: "Ontem",
      comment: "Enscape e vida pra quem e arquiteto, renderiza na hora enquanto mexe no sketchup. Roda liso"
    },
    {
      author: "Tiago Nogueira",
      rating: 5,
      date: "4 dias atrás",
      comment: "O melhor renderizador em tempo real, facil de instalar e ativou vitalicio mesmo"
    },
    {
      author: "Luiz P. Santos",
      rating: 4,
      date: "1 semana atrás",
      comment: "Entrega imediata e funciona mto bem com minha rtx 3060. Muito bom"
    },
    {
      author: "Jessica R.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Caramba, os renders de interiores saem em 5 segundos, agilizou mto meu trabalho aq"
    },
    {
      author: "Matheus Ramos",
      rating: 5,
      date: "1 mês atrás",
      comment: "Tudo funcionando, recomendo dmais pra quem faz projetos comerciais"
    }
  ],
  promob_professional_2025: [
    {
      author: "Marceneiro Adelson",
      rating: 5,
      date: "2 dias atrás",
      comment: "Promob 2025 completo com cut pro funcionando perfeito. Catalogo atualizado e rodando liso"
    },
    {
      author: "Marcenaria Silva",
      rating: 5,
      date: "4 dias atrás",
      comment: "Peguei a versão 2024 Enterprise pro notebook da oficina e está rodando muito bem, excelente custo benefício."
    },
    {
      author: "Claudio P. Rosa",
      rating: 5,
      date: "5 dias atrás",
      comment: "suporte me ajudou a instalar por acesso remoto pq deu erro de permissao no meu windows. Excelente pos venda"
    },
    {
      author: "Jeferson Costa",
      rating: 5,
      date: "1 semana atrás",
      comment: "O cut pro ajuda mto a economizar chapa de mdf, funciona perfeitamente o plano de corte"
    },
    {
      author: "Bruna A. Freitas",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Gostei muito, essencial pra minha marcenaria. Entrega super rapida no email"
    },
    {
      author: "Valter M. Ramos",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Excelente programa, plano de corte ta gerando certinho e economizando mdf"
    },
    {
      author: "Alexandre G.",
      rating: 4,
      date: "3 semanas atrás",
      comment: "tudo certo com a instalacao, recomendo a loja para todos"
    },
    {
      author: "Cesar D.",
      rating: 4,
      date: "1 mês atrás",
      comment: "Tudo ok, ativação funcionando bem. Fiquei surpreso com a velocidade de envio."
    },
    {
      author: "Diego Pereira",
      rating: 5,
      date: "1 mês atrás",
      comment: "Recomendo msm a loja, suporte resolveu tudo pelo WhatsApp rapidinho."
    },
    {
      author: "Sandro B.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Muito bom, ativou facil e ta ajudando bastante nos projetos de móveis planejados aq"
    }
  ],
  coreldraw_2026: [
    {
      author: "Douglas Arte",
      rating: 5,
      date: "2 dias atrás",
      comment: "CorelDraw rodando sem travar com arquivos pesados de comunicacao visual. Recomendo dmais"
    },
    {
      author: "Gisele T. Andrade",
      rating: 5,
      date: "3 dias atrás",
      comment: "Nossa muito bom! Roda direto no macOS sem precisar de emular nada e veio super bem explicado a instalacao. Amei!"
    },
    {
      author: "Rodrigo P. Martins",
      rating: 5,
      date: "5 dias atrás",
      comment: "tudo certo no meu macbook m2 pro. o corel roda nativo e as ferramentas de vetor estao super rapidas"
    },
    {
      author: "Fabio R. Ramos",
      rating: 5,
      date: "1 semana atrás",
      comment: "Uso pra fazer artes pra sublimacao, funciona tudo e nao fica dando erro de licenca nem modo visitante."
    },
    {
      author: "Luan Gráfica Rápida",
      rating: 5,
      date: "1 semana atrás",
      comment: "Peguei o X7 pro PC da plotter de recorte e o 2025 pro computador de criação. Ambos funcionando 100% e salvando normal."
    },
    {
      author: "Matheus N. Costa",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Muito bom o software, chegou super rapido no email com os links certinho e o video passo a passo"
    },
    {
      author: "Fabiola S. Nogueira",
      rating: 4,
      date: "2 semanas atrás",
      comment: "comprei pra fazer artes e estampas no Mac e ate agora esta perfeito. o suporte me ajudou a instalar por chat no whatsapp, recomendo."
    },
    {
      author: "Vivian L.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Sempre usei Corel e essa versao 2026 ta mt estavel. Instalou sem dor de cabeca seguindo o video"
    },
    {
      author: "Carlos Henrique S.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Estava sofrendo com programa fechando sozinho antes, comprei esse da C2Tech e nunca mais tive problema. Salva e exporta PDF certinho."
    },
    {
      author: "Priscila Fontes",
      rating: 5,
      date: "1 mês atrás",
      comment: "Comprei a versão 2022 que eu já era acostumada a usar na agência e rodou liso demais no meu notebook."
    },
    {
      author: "Alexandre Rocha",
      rating: 5,
      date: "1 mês atrás",
      comment: "entrega na hora e suporte tirou minhas duvidas rapidinho. Nota dez"
    },
    {
      author: "Gráfica Expressa JM",
      rating: 5,
      date: "1 mês atrás",
      comment: "Preço excelente pela qualidade. O PowerTrace e o Photo-Paint vieram junto funcionando perfeitamente."
    },
    {
      author: "Bruno V. Tavares",
      rating: 4,
      date: "2 meses atrás",
      comment: "Ótimo atendimento e envio imediato no e-mail após o Pix. Recomendo pra quem trabalha com serigrafia e estamparia."
    },
    {
      author: "Tatiane M. Melo",
      rating: 5,
      date: "2 meses atrás",
      comment: "Muito fácil de instalar com o vídeo tutorial que vem na pasta do Drive. Funcionando vitalício de verdade!"
    }
  ],
  photoshop_2026: [
    {
      author: "Henrique G. P.",
      rating: 5,
      date: "Ontem",
      comment: "Photoshop 2026 sensacional, roda super leve e tem todas as ferramentas de edicao locais"
    },
    {
      author: "Jessica M. Rosa",
      rating: 5,
      date: "4 dias atrás",
      comment: "otimo custo beneficio, suporte tirou todas as minhas duvidas no whatsapp antes de eu comprar."
    },
    {
      author: "Wanderley Silva",
      rating: 4,
      date: "1 semana atrás",
      comment: "recomendo a todos, instalacao rapida e programa 100% funcional"
    },
    {
      author: "Felipe N.",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Melhor ferramenta de edição de fotos local q existe. Comprei e ativou tudo certinho"
    },
    {
      author: "Luciana G.",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Tudo funcionando liso no win 11. Uso pra trabalhar td dia e ta otimo"
    },
    {
      author: "Marcelo K.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Fácil instalação e vem com passo a passo bem explicado no e-mail."
    },
    {
      author: "Artur Ramos",
      rating: 4,
      date: "2 meses atrás",
      comment: "o programa é muito bom e roda liso. Apenas o download que demorou um pouco por ser pesado."
    }
  ],
  illustrator_2026: [
    {
      author: "Guilherme S.",
      rating: 5,
      date: "Ontem",
      comment: "Illustrator 2026 rodando muito rápido no Windows 11. Criei várias artes vetorizadas pesadas e não travou nenhuma vez."
    },
    {
      author: "Camila Nogueira",
      rating: 5,
      date: "4 dias atrás",
      comment: "Excelente para trabalhar com design gráfico local. A ativação vitalícia sem assinatura mensal economiza muito no ano."
    },
    {
      author: "Fabio D.",
      rating: 4,
      date: "1 semana atrás",
      comment: "Gostei muito da estabilidade dessa versão. Suporte foi super atencioso e me ajudou na instalação rápida."
    },
    {
      author: "Lucas B. Martins",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Excelente alternativa de compra vitalícia local. O Illustrator é super completo e sem surpresas."
    }
  ],
  premiere_2026: [
    {
      author: "Matheus V. Costa",
      rating: 5,
      date: "Ontem",
      comment: "Muito bom! Premiere 2026 com excelente desempenho de renderização por GPU. Editei em 4K sem engasgos."
    },
    {
      author: "Larissa Dias",
      rating: 5,
      date: "3 dias atrás",
      comment: "Entrega super rápida do link de download e instruções simples de instalar. Recomendo demais!"
    },
    {
      author: "Tiago Silva",
      rating: 4,
      date: "1 semana atrás",
      comment: "O programa é ótimo e completo. O download é um pouco pesado, mas a velocidade de resposta do editor compensa."
    },
    {
      author: "Gabriel Nogueira",
      rating: 5,
      date: "2 semanas atrás",
      comment: "Melhor editor do mercado. Comprei e já estou editando meus trabalhos locais."
    },
    {
      author: "Mariana Santos",
      rating: 5,
      date: "3 semanas atrás",
      comment: "Muito fácil de ativar seguindo o tutorial enviado. Aprovou na hora por Pix."
    }
  ],
  after_effects_2026: [
    {
      author: "Bruno M. Ramos",
      rating: 5,
      date: "Ontem",
      comment: "After Effects 2026 incrível. Renderizei animações complexas e o consumo de RAM está bem otimizado comparado à versão anterior."
    },
    {
      author: "Marina P.",
      rating: 4,
      date: "5 dias atrás",
      comment: "Comprei para o meu estúdio e ativou de primeira. Suporte por WhatsApp tirou minhas dúvidas de compatibilidade rapidamente."
    }
  ],
  lightroom_classic_2026: [
    {
      author: "Rodrigo F. Lima",
      rating: 5,
      date: "Ontem",
      comment: "Lightroom Classic 2026 perfeito para importar grandes catálogos de fotos RAW. A revelação de imagens está muito fluida."
    },
    {
      author: "Debora L. Gomes",
      rating: 5,
      date: "2 dias atrás",
      comment: "Sensacional! Edição profissional de fotos sem pagar mensalidades absurdas. O processo de compra foi muito seguro."
    },
    {
      author: "Vinicius Souza",
      rating: 4,
      date: "1 semana atrás",
      comment: "Excelente custo-benefício. Recomendo para fotógrafos profissionais que querem usar a versão local estável."
    }
  ],
  proteus_9: [
    {
      author: "Jefferson Santos",
      rating: 5,
      date: "2 dias atrás",
      comment: "Melhor suite de simulacao de circuitos e layout pci, instalei e rodou os projetos do arduino sem problemas"
    },
    {
      author: "Gabriel R.",
      rating: 5,
      date: "1 semana atrás",
      comment: "tudo certo, simulando perfeitamente. Muito util para os meus estudos de engenharia eletrica"
    },
    {
      author: "Diego F. Melo",
      rating: 5,
      date: "3 semanas atrás",
      comment: "suporte ajudou no zap pq eu nao estava achando o link de download kkkkk recomendo dmais"
    }
  ],
  exocad_31: [
    {
      author: "Dr. Gustavo N.",
      rating: 5,
      date: "3 dias atrás",
      comment: "Instalou com todos os modulos clinicos ativos, perfeito pro meu laboratorio de protese. Recomendo"
    },
    {
      author: "Protetico Valter",
      rating: 5,
      date: "1 semana atrás",
      comment: "estava desconfiado pelo preco mas veio tudo certinho e funcionando perfeito. Otimo atendimento"
    },
    {
      author: "Dra. Aline Souza",
      rating: 4,
      date: "2 semanas atrás",
      comment: "muito bom, exocad rodando liso com meu scanner intraoral. Economizei um dinheirao"
    }
  ],
  parallels_desktop_26: [
    {
      author: "Renan Castilho",
      rating: 5,
      date: "2 dias atrás",
      comment: "cara mt bom, rodou o windows 11 no meu macbook air m1 super rapido. nem parece q e emulador, parece nativo!"
    },
    {
      author: "Thiago M. Albuquerque",
      rating: 5,
      date: "1 semana atrás",
      comment: "Tinha algums programas de engenharia q nao rodava no mac, com o parallels funcionou td certinho. ativou vitalicio de primeira"
    },
    {
      author: "Patricia V. Lima",
      rating: 4,
      date: "2 semanas atrás",
      comment: "otimo custo beneficio! a instalacao tem bastantes passos mas o tutorial em video q eles mandam ajuda muito."
    }
  ],
  camtasia_2026: [
    {
      author: "Julio C. Ramos",
      rating: 5,
      date: "3 dias atrás",
      comment: "Gravo minhas videoaulas com ele td dia, o editor ta super completo e leve no win 11. Recomendo dmais!"
    },
    {
      author: "Mariana T. Albuquerque",
      rating: 5,
      date: "1 semana atrás",
      comment: "Melhor gravador de tela q ja usei. Chegou na hora no e-mail e ativou vitalicio certinho. Nota 10!"
    }
  ],
  pdfelement_12: [
    {
      author: "Renato G. Vieira",
      rating: 5,
      date: "3 dias atrás",
      comment: "Ótimo programa, muito mais leve e rápido que o acrobat. Consigo editar e converter qualquer pdf em word em segundos."
    },
    {
      author: "Claudia F. Lins",
      rating: 5,
      date: "1 semana atrás",
      comment: "O OCR dele funcionou perfeitamente para digitalizar uns documentos antigos escaneados que eu tinha. Recomendo demais!"
    }
  ],
  wondershare_recoverit_13: [
    {
      author: "Felipe S. Pires",
      rating: 5,
      date: "3 dias atrás",
      comment: "Salvou minha vida! Consegui recuperar mais de 200GB de fotos e vídeos de um HD externo que tinha sido formatado por engano. Funcionou perfeito!"
    }
  ],
  autodesk_all_apps: [
    {
      author: "Ricardo Albuquerque",
      rating: 5,
      date: "Ontem",
      comment: "Sensacional! Liberação foi muito rápida no meu e-mail. Entrei em contato com o suporte pelo WhatsApp, me passaram o login e senha privados e já estou usando o AutoCAD e o Revit originais. Vale muito a pena!"
    },
    {
      author: "Sofia Helena M.",
      rating: 5,
      date: "3 dias atrás",
      comment: "Uso no meu escritório de arquitetura e me economizou um dinheirão. Todos os 86 programas da Autodesk estão inclusos na conta. Atualizações oficiais acontecem direto nas ferramentas. O plano recorrente no Pix é super prático."
    },
    {
      author: "Eng. Daniel Farias",
      rating: 5,
      date: "1 semana atrás",
      comment: "Trabalho com projetos complexos no Inventor e Civil 3D, e o acesso original é fundamental. A conta é 100% privada e o suporte deles é sensacional, tirou minhas dúvidas de login pelo zap muito rápido. Excelente!"
    },
    {
      author: "Gabriela Vasconcelos",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Muito bom ter todas as ferramentas em uma só assinatura. O processo de pegar o login com o suporte foi tranquilo. Recomendo para engenheiros e arquitetos."
    }
  ],
  windows_11_pro: [
    {
      author: "João Batista",
      rating: 5,
      date: "Ontem",
      comment: "Chave enviada na hora pelo WhatsApp, ativei meu PC novo sem nenhum problema. Recomendo muito!"
    },
    {
      author: "Marcos P.",
      rating: 5,
      date: "3 dias atrás",
      comment: "Ativação vinculada na minha conta Microsoft certinho, agora não perco mais se precisar formatar."
    },
    {
      author: "Letícia Costa",
      rating: 5,
      date: "1 semana atrás",
      comment: "Atendimento nota 10! Tive uma dúvida na hora de validar no sistema e me ajudaram passo a passo."
    },
    {
      author: "Felipe S.",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Muito bom preço, a chave original é outra vida, o sistema fica sem frescura de ativador."
    },
    {
      author: "Augusto S.",
      rating: 5,
      date: "1 mês atrás",
      comment: "Tudo perfeito, a licença é permanente mesmo e o Windows Update funciona normal."
    }
  ],
  windows_10_pro: [
    {
      author: "Thiago Almeida",
      rating: 5,
      date: "4 dias atrás",
      comment: "Rápido e prático, chegou a chave no whats em 2 minutos. Meu Windows 10 já tá ativadão."
    },
    {
      author: "Roberto Oliveira",
      rating: 5,
      date: "1 semana atrás",
      comment: "Tava cansado daquela marca d'água de ativar o Windows. Comprei aqui e sumiu na hora com a chave original."
    }
  ],
  adobe_acrobat_pro_2026: [
    {
      author: "Julio C. Ramos",
      rating: 5,
      date: "Ontem",
      comment: "Excelente! Editando e assinando meus contratos em PDF sem complicação. Licença vitalícia compensa muito."
    },
    {
      author: "Amanda Freitas",
      rating: 5,
      date: "3 dias atrás",
      comment: "Instalação super rápida e o software roda liso no Windows 11. Cansada de pagar mensalidade pra Adobe!"
    },
    {
      author: "Carlos P. Neto",
      rating: 5,
      date: "1 semana atrás",
      comment: "Recomendo a todos, entrega super rápida e o Acrobat tá funcionando perfeitamente."
    }
  ]
,
  filmora_15: [
    {
      author: "Carlos Eduardo",
      rating: 5,
      date: "3 dias atrás",
      comment: "Excelente programa para edição, uso no meu canal do YouTube e os novos recursos de IA economizam muito tempo. Recomendo demais!"
    },
    {
      author: "Fernanda Lima",
      rating: 5,
      date: "10 dias atrás",
      comment: "A instalação foi super fácil. Recebi o link logo após o pagamento via Pix. Tudo funcionando perfeitamente."
    },
    {
      author: "Roberto Santos",
      rating: 4,
      date: "15 dias atrás",
      comment: "Software muito bom e leve. Chegou tudo certinho no email."
    }
  ],
  geo5_2024_win: [
    {
      author: "Eng. Marcelo",
      rating: 5,
      date: "5 dias atrás",
      comment: "Todos os módulos liberados conforme anunciado. Já estou usando nos projetos de contenção do escritório. Sensacional."
    },
    {
      author: "Ricardo Silva",
      rating: 5,
      date: "12 dias atrás",
      comment: "O suporte remoto deles é nota 10. Tive uma dúvida na instalação e resolveram em 5 minutos."
    }
  ],
  fl_studio_2025: [
    {
      author: "DJ Marcos",
      rating: 5,
      date: "2 dias atrás",
      comment: "Versão completassa, veio com todos os plugins que eu precisava. Beatmaking subiu de nível."
    },
    {
      author: "Lucas Beats",
      rating: 5,
      date: "1 semana atrás",
      comment: "Muito bom, link direto do Drive sem enrolação."
    },
    {
      author: "Ana Prod",
      rating: 5,
      date: "20 dias atrás",
      comment: "Melhor investimento, funcionando 100%. Recomendo."
    },
    {
      author: "Pedro Henrique",
      rating: 4,
      date: "25 dias atrás",
      comment: "Instalação tranquila. Obrigado C2Tech."
    }
  ]
,
  altoqi_visus_2026: [
    {
      author: "Eng. Matheus Guimarães",
      rating: 5,
      date: "3 dias atrás",
      comment: "Excelente para orçamentação e quantitativos BIM. Conectou perfeitamente com os projetos do Eberick 2026 e acelerou muito a elaboração das nossas planilhas de obra."
    },
    {
      author: "Thiago Silveira",
      rating: 5,
      date: "1 semana atrás",
      comment: "Instalação rápida com o tutorial em vídeo, tudo funcionando 100%. O suporte no WhatsApp tirou uma dúvida sobre a exportação IFC na mesma hora."
    },
    {
      author: "Renato Barcellos",
      rating: 4,
      date: "2 semanas atrás",
      comment: "Software muito completo para planejamento 4D/5D. Programa roda muito fluido com os modelos da AltoQi. Recomendo."
    },
    {
      author: "Eng. André F. Costa",
      rating: 5,
      date: "1 mês atrás",
      comment: "Extração de quantitativos precisa e ágil. Economizou dias de trabalho manual na engenharia de custos."
    }
  ],
  '3ds_max_2027': [
    {
      author: "Lucas Andrade",
      rating: 5,
      date: "2 dias atrás",
      comment: "Top demais, versão 2027 rodando liso com V-Ray e Corona Renderer. O tutorial em vídeo ajudou muito na ativação."
    },
    {
      author: "Diego F. Martins",
      rating: 5,
      date: "5 dias atrás",
      comment: "Comprei com receio mas me surpreendi. Entrega imediata no email e WhatsApp. Já estou renderizando projetos do escritório."
    },
    {
      author: "Gabriel Sampaio",
      rating: 4,
      date: "12 dias atrás",
      comment: "Muito estável, sem travamentos no Windows 11. Suporte tirou uma dúvida rápida sobre o instalador. Vale cada centavo."
    }
  ],
};