# Revisão de responsividade, idiomas e Trustpilot

Data: 7 de novembro de 2026. Revisão do código local, sem publicação.

## Resultado

O site tinha ajustes necessários para telas estreitas e intermediárias. Foram corrigidos o espaço ocupado pelo cabeçalho, o limite de largura do seletor de idioma, o acesso ao menu em tablets, o alinhamento das categorias roláveis e a quebra da linha de seleção de dispositivos. O checkout recebeu limite de altura baseado na área visível e proteção contra títulos longos. O catálogo passou a conter a faixa de avaliações em uma área rolável em telas estreitas, preservando o componente e o conteúdo dos banners Trustpilot.

## Validação

- Edge headless: início, catálogo, um produto acessado pela vitrine, sobre nós, contato, FAQ, entrega e pagamento, termos e privacidade.
- Larguras: 320, 375, 768, 1024 e 1440 pixels; 45 combinações sem largura do documento superior à viewport após os ajustes. Carrosséis mantêm sua rolagem interna.
- Verificação adicional em 320 pixels para português brasileiro, português de Portugal, inglês e espanhol; detecção inicial, moeda padrão, preferência salva e abertura do menu passaram. Capturas disponíveis nesta pasta.
- Build de produção passou. Bundle JavaScript principal de aproximadamente 845 kB (226 kB gzip): há oportunidade de dividir as páginas por carregamento sob demanda.
- ESLint: 88 erros e 1 aviso em código preexistente, incluindo tipos `any`, efeitos e dependências de hooks. O build não elimina essas pendências.
- Recursos externos foram bloqueados na medição do layout para tornar o teste independente dos serviços de terceiros. Não foram realizadas compras, submissões de formulário nem validação do ambiente publicado.

## Idiomas

A detecção usa as preferências configuradas no navegador, e não identifica a língua falada pelo cliente. São suportados pt-BR, pt-PT, inglês e espanhol; outros idiomas usam o primeiro idioma suportado da lista, com português brasileiro como fallback. A seleção manual salva tem prioridade.

Corrigido: a detecção agora considera `navigator.languages`, continua funcionando quando o armazenamento está indisponível e atualiza o atributo `lang` do documento. A moeda inicial usa o idioma detectado (BRL para Brasil, USD para os demais), preservando uma escolha de moeda salva; antes, uma primeira visita em inglês podia iniciar em reais.

A tradução NÃO é completa: descrições e opções de ordenação no catálogo, páginas de termos/privacidade e vários textos de atendimento/checkout permanecem em português. Portanto, o site ainda precisa de revisão de conteúdo para oferecer uma experiência internacional integral. Português de Portugal também compartilha diversos textos brasileiros.

## Trustpilot e redirecionamentos

Não foi encontrada URL de destino `trustpilot.com`/`trustpilot.net`, leitura de `document.cookie`, meta refresh ou redirecionamento automático para o Trustpilot no código da aplicação, arquivos públicos de script/HTML ou configuração Vercel. A configuração Vercel contém apenas a reescrita interna para index.html.

Os componentes Trustpilot exibem imagens e avaliações definidas no próprio código; seus botões abrem um modal interno de garantias/avaliações e há referência de âncora `#trustpilot`. Não foi encontrada integração de carregamento de avaliações pela API ou widget oficial. Isso não confirma a autenticidade das notas ou avaliações exibidas, que devem ser conferidas pelo responsável da loja.

Os destinos externos identificados nos fluxos da aplicação são checkout Cakto, WhatsApp e e-mail. Existem scripts de Mercado Pago, Meta Pixel e Vercel Analytics; não foi identificado vínculo deles com um redirecionamento Trustpilot. O comportamento do site publicado, infraestrutura externa e conteúdo futuro de scripts terceiros não pode ser garantido pela revisão local.

Banners, notas, depoimentos, logos e links Trustpilot foram preservados.

## Avaliação de viabilidade

A navegação e a estrutura responsiva estão utilizáveis nas combinações testadas. Ainda não é adequado afirmar que toda a operação está validada: faltam tradução completa, redução do pacote inicial, tratamento das pendências de lint e um teste de ponta a ponta de pagamento/entrega em ambiente de testes. A ausência de overflow nas páginas medidas não substitui testes em aparelhos reais, zoom, teclado virtual e todas as variantes dos produtos.
