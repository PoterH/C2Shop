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
      author: "Carlos Alberto M.",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Módulos de contenção e fundações rodando perfeitamente. Excelente custo-benefício."
    }
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
      author: "Javier Morales",
      rating: 5,
      date: "hace 5 días",
      country: "ES",
      comment: "Excelente software. Llegó al correo de inmediato y la guía es muy clara."
    },
    {
      author: "Rodrigo S. Lima",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Instalou de primeira no Windows 11. Suporte tirou uma dúvida de dll rapidinho."
    }
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
      author: "Arq. Tiago Rocha",
      rating: 5,
      date: "1 semana atrás",
      country: "PT",
      comment: "Entrega rápida e licença vitalícia impecável. Funciona perfeitamente."
    },
    {
      author: "Mariana L. Queiroz",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Uso nos projetos do escritório todos os dias. Muito estável e completo."
    }
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
      author: "Felipe Fontana",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Software pesado mas a instalação foi bem tranquila com o tutorial enviado."
    }
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
      author: "Marcio V. Ramos",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Simulações mecânicas perfeitas, atendeu 100% as demandas da oficina."
    }
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
      author: "Esteban Cárdenas",
      rating: 5,
      date: "hace 1 semana",
      country: "CO",
      comment: "Herramientas de loteo y carreteras completas. Gran soporte técnico."
    },
    {
      author: "Eng. Roberto Dias",
      rating: 4,
      date: "3 semanas atrás",
      country: "BR",
      comment: "Chegou no email imediatamente. Tive que reiniciar para ler as fontes mas deu certo."
    }
  ],
  navisworks_2027: [
    {
      author: "Lucas Moreira",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Clash detection e compatibilização BIM funcionando perfeitamente."
    },
    {
      author: "Liam Patterson",
      rating: 5,
      date: "1 week ago",
      country: "US",
      comment: "Seamless BIM coordination file checks. Activated without any complications."
    }
  ],
  sketchup_2026_win: [
    {
      author: "Beatriz Vasconcelos",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Uso com Enscape e V-Ray todos os dias. Leve e sem travar nada."
    },
    {
      author: "Gonzalo Fernández",
      rating: 5,
      date: "hace 6 días",
      country: "AR",
      comment: "Excelente programa y muy buen precio. La activación permanente es lo mejor."
    },
    {
      author: "Marcus Cole",
      rating: 5,
      date: "2 weeks ago",
      country: "US",
      comment: "Instant download link. Worked right away on my desktop."
    }
  ],
  eberick_builder_2025: [
    {
      author: "Eng. Daniel Sampaio",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Dimensionamento de concreto armado e lajes funcionando perfeitamente. Nota 10."
    },
    {
      author: "Rui Miguel Ribeiro",
      rating: 5,
      date: "2 semanas atrás",
      country: "PT",
      comment: "Excelente conjunto para cálculo estrutural e instalações. Muito confiável."
    }
  ],
  altoqi_visus_2026: [
    {
      author: "Eng. Paulo R. Neves",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Orçamento 5D e planejamento integrados com IFC redondos. Entrega rápida."
    },
    {
      author: "Gonçalo Tavares",
      rating: 4,
      date: "1 semana atrás",
      country: "PT",
      comment: "Boa integração com modelos BIM. Apoio técnico muito atencioso no WhatsApp."
    }
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
      author: "Juliana P. Duarte",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Troquei o sistema antigo por esse e os projetos fluem muito melhor. Recomendo."
    },
    {
      author: "Sebastián Navarro",
      rating: 5,
      date: "hace 2 semanas",
      country: "CL",
      comment: "Gran versión para arquitectura BIM. Funciona sin suscripciones."
    }
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
      author: "Eng. Eduardo Mota",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Software completo para estruturas metálicas e concreto. Suporte muito ágil."
    },
    {
      author: "Ignacio Benítez",
      rating: 5,
      date: "hace 2 semanas",
      country: "AR",
      comment: "Excelente paquete, todo el módulo estructural listo para usar."
    }
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
      author: "Fabio Junqueira",
      rating: 5,
      date: "5 dias atrás",
      country: "BR",
      comment: "Chegou rápido, instalei seguindo o vídeo e os testes de esforço rodaram lisos."
    },
    {
      author: "Mauricio Garza",
      rating: 5,
      date: "hace 1 semana",
      country: "MX",
      comment: "Muy buen trato por WhatsApp y el instalador funciona a la primera."
    }
  ],
  sisdea_2025: [
    {
      author: "Valdemir Souza Jr.",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Regressão linear e inferência estatística para laudos de imóveis perfeita."
    },
    {
      author: "Eng. Camila F.",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Atendeu todas as exigências da norma NBR 14653. Super recomendo."
    }
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
      author: "Diego Salgado",
      rating: 5,
      date: "hace 6 días",
      country: "ES",
      comment: "Excelente para diseño industrial y joyería 3D. Activación inmediata."
    },
    {
      author: "Renato Galvão",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Tive uma dúvida com o plugin do Grasshopper e o suporte resolveu em 5 min."
    }
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
      author: "Anderson K.",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Excelente alternativa para quem não quer pagar mensalidade abusiva de CAD."
    }
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
      author: "Eng. Wagner Ramos",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Software muito robusto para galpões e estruturas metálicas pesadas."
    }
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
      author: "Luciana M. Prado",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Recebi a chave e o link em segundos. Já estou usando no home office."
    },
    {
      author: "Andrés Morales",
      rating: 5,
      date: "hace 1 semana",
      country: "ES",
      comment: "Activación limpia y permanente. Excelente servicio."
    }
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
      author: "Guilherme Toledo",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Renderizou cenas pesadas de interiores sem erro nenhum no SketchUp."
    },
    {
      author: "Valeria Guzmán",
      rating: 4,
      date: "hace 2 semanas",
      country: "MX",
      comment: "Muy buen renderizador, la instalación fue guiada y todo quedó listo."
    }
  ],
  enscape: [
    {
      author: "Vinicius Prado",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Passeios virtuais e renders em tempo real fluidos no SketchUp e Revit."
    },
    {
      author: "Ethan Taylor",
      rating: 5,
      date: "1 week ago",
      country: "US",
      comment: "Real-time walkthroughs for clients are flawless. Instant license."
    }
  ],
  promob_professional_2025: [
    {
      author: "Marcenaria Silva & Filhos",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Cortando e orçando móveis direto na marcenaria. Entrega super rápida."
    },
    {
      author: "Manuel Ferreira",
      rating: 5,
      date: "5 dias atrás",
      country: "PT",
      comment: "Excelente para desenho de cozinhas e móveis à medida. Muito satisfeito."
    },
    {
      author: "Leandro P. Castro",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Plugins funcionando 100% e geração de lista de compras perfeita."
    }
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
      author: "Gilberto Nogueira",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Salvou minha produção de peças usinadas. G-code gerando perfeitamente."
    }
  ],
  coreldraw_2026: [
    {
      author: "Thiago F. Alencar",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Uso na minha gráfica rápida todos os dias. Sem mensagem chata de expiração."
    },
    {
      author: "Joaquim Esteves",
      rating: 5,
      date: "5 dias atrás",
      country: "PT",
      comment: "Instalação rápida e suporte impecável. Ferramentas vectoriais 5 estrelas."
    },
    {
      author: "Claudia Mendoza",
      rating: 4,
      date: "hace 1 semana",
      country: "ES",
      comment: "Muy completo y estable. Excelente relación calidad y precio."
    }
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
      author: "Rodrigo B. Meireles",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Tratamento de fotos com camadas pesadas sem engasgos. Recomendo muito."
    },
    {
      author: "Natalia Cordero",
      rating: 5,
      date: "hace 1 semana",
      country: "MX",
      comment: "Entrega rápida y todo bien explicado en el enlace que enviaron."
    }
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
      author: "Aline Barbosa",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Criando identidades visuais completas sem travamentos. Muito estável."
    }
  ],
  premiere_2026: [
    {
      author: "Gabriel Santos",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Timeline fluida em 4K e renderização acelerada por GPU. Top demais."
    },
    {
      author: "Lucas Echeverría",
      rating: 4,
      date: "hace 5 días",
      country: "ES",
      comment: "Edición de vídeo muy rápida. Tuve una duda y me ayudaron al instante."
    },
    {
      author: "William Carter",
      rating: 5,
      date: "2 weeks ago",
      country: "US",
      comment: "Solid software, exports cleanly with no watermarks. 10/10 purchase."
    }
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
      author: "Renan P. Silveira",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Plugins de partículas e transições carregando perfeitamente. Nota 10."
    }
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
      author: "Bruno C. Lacerda",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Excelente para quem trabalha com eventos e ensaios fotográficos."
    }
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
      author: "Prof. Sérgio N.",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Utilizo nas aulas de engenharia elétrica da faculdade. Simulador perfeito."
    }
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
      author: "Dra. Claudia V.",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Fluxo digital do laboratório funcionando 100%. Entrega imediata."
    }
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
      author: "Tiago Fontes",
      rating: 5,
      date: "5 dias atrás",
      country: "PT",
      comment: "Excelente desempenho no Mac. Não perde nada em velocidade. 5 estrelas."
    },
    {
      author: "Gustavo H. Paiva",
      rating: 5,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Integração perfeita do Windows no Mac. Super recomendo a loja."
    }
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
      author: "Leticia Ramos",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Gravo aulas para o meu curso online e o editor é muito intuitivo."
    }
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
      author: "Daniela F. Pires",
      rating: 4,
      date: "2 semanas atrás",
      country: "BR",
      comment: "Reconhecimento OCR funciona muito bem com documentos escaneados."
    }
  ],
  wondershare_recoverit_13: [
    {
      author: "Marcos Aurelio C.",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Recuperei um HD externo com fotos de 5 anos atrás que achei que tinha perdido."
    }
  ],
  autodesk_all_apps: [
    {
      author: "Eng. Leonardo B.",
      rating: 5,
      date: "2 dias atrás",
      country: "BR",
      comment: "Acesso completo a todos os softwares da Autodesk ativado na hora."
    },
    {
      author: "Anthony Reed",
      rating: 5,
      date: "1 week ago",
      country: "US",
      comment: "Awesome package deal for complete AEC design suite. Very pleased."
    }
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
      author: "Helena S. Barreto",
      rating: 5,
      date: "3 dias atrás",
      country: "BR",
      comment: "Ativou direto nas configurações do Windows sem complicação. Perfeito."
    },
    {
      author: "Jorge Luis R.",
      rating: 5,
      date: "hace 6 días",
      country: "ES",
      comment: "Clave original inmediata al correo. Totalmente fiable."
    }
  ],
  windows_10_pro: [
    {
      author: "Rafael C. Medeiros",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Chave genuína, ativou o Windows 10 Pro no meu desktop na hora."
    },
    {
      author: "Martín Paredes",
      rating: 5,
      date: "hace 1 semana",
      country: "AR",
      comment: "Funcionó de maravilla en una máquina de oficina."
    }
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
      author: "Emilio Salazar",
      rating: 5,
      date: "hace 4 días",
      country: "ES",
      comment: "Excelente herramienta para la oficina. Todo funciona a la perfección."
    },
    {
      author: "Patricia V. Toledo",
      rating: 4,
      date: "1 semana atrás",
      country: "BR",
      comment: "Assinatura digital e edição de formulários funcionando perfeitamente."
    }
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
      author: "Lucas P. Beatmaker",
      rating: 5,
      date: "4 dias atrás",
      country: "BR",
      comment: "Produzindo meus beats todo dia. Plugins de mixagem e synths 100% liberados."
    },
    {
      author: "Carlos E. Santana",
      rating: 5,
      date: "hace 1 semana",
      country: "MX",
      comment: "Increíble para producción musical, viene completo y sin fallos."
    }
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
      author: "Juliana C. Rios",
      rating: 5,
      date: "1 semana atrás",
      country: "BR",
      comment: "Super leve para editar vídeos do YouTube e Reels. Entrega rápida."
    }
  ],
};
