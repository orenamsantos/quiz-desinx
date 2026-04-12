/* =============================================
   Protocolo Desinx — App Logic v2.0
   Direct Response / High-Conversion Rewrite
   ============================================= */


/* =============================================
   1. TESTIMONIALS POOL (15 unique)
   ============================================= */

function makeAvatar(name, hue) {
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect fill="hsl(${hue},45%,88%)" width="80" height="80" rx="40"/><text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="hsl(${hue},40%,40%)" font-family="sans-serif" font-size="32" font-weight="600">${name[0]}</text></svg>`)}`;
}

const TESTIMONIALS = [
  { name: 'Camila R.',   age: 34, job: 'analista de marketing, mãe de 2', text: 'Perdi 8kg em 6 semanas sem academia. Meu marido perguntou o que eu estava fazendo de diferente.', stars: 5,   av: 'https://i.pravatar.cc/80?img=1' },
  { name: 'Patrícia M.', age: 41, job: 'professora',                      text: 'Pela primeira vez em 10 anos, não voltei a engordar. O Protocolo mudou minha relação com a balança.',   stars: 5,   av: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Fernanda L.', age: 29, job: 'designer freelancer',             text: 'O inchaço sumiu na segunda semana. Minhas calças voltaram a servir.',                                   stars: 5,   av: 'https://i.pravatar.cc/80?img=9' },
  { name: 'Juliana S.',  age: 37, job: 'advogada',                        text: 'Gastei uma fortuna em nutri e academia. Aqui tive resultado em 3 semanas pagando o preço de um café.',   stars: 5,   av: 'https://i.pravatar.cc/80?img=16' },
  { name: 'Renata C.',   age: 45, job: 'enfermeira, mãe de 3',            text: 'Com 3 filhos e plantão, eu achava impossível. 15 minutos por dia foi tudo que precisei.',                stars: 5,   av: 'https://i.pravatar.cc/80?img=20' },
  { name: 'Aline F.',    age: 32, job: 'empreendedora',                   text: 'Eliminei 6kg sem cortar o que amo comer. O segredo é a ordem, não a restrição.',                         stars: 4.5, av: 'https://i.pravatar.cc/80?img=23' },
  { name: 'Mariana D.',  age: 38, job: 'gerente de RH',                   text: 'Minha energia voltou no dia 4. Parece exagero, mas é real. Eu tinha esquecido como era ter disposição.', stars: 5,   av: 'https://i.pravatar.cc/80?img=25' },
  { name: 'Beatriz O.',  age: 27, job: 'estudante de medicina',           text: 'Eu estudava emagrecimento e mesmo assim não conseguia. O Protocolo me mostrou o que eu fazia na ordem errada.', stars: 4.5, av: 'https://i.pravatar.cc/80?img=32' },
  { name: 'Carla T.',    age: 43, job: 'servidora pública',               text: 'Meu metabolismo parecia morto. Na segunda semana eu já sentia diferença na roupa e no espelho.',         stars: 5,   av: 'https://i.pravatar.cc/80?img=36' },
  { name: 'Débora N.',   age: 31, job: 'fotógrafa',                       text: 'Já tinha tentado 4 apps diferentes. Esse foi o primeiro que eu terminei a primeira semana inteira.',     stars: 4.5, av: 'https://i.pravatar.cc/80?img=38' },
  { name: 'Larissa P.',  age: 36, job: 'dentista, mãe de 1',              text: 'Perdi a barriga pós-parto que tinha há 2 anos. Minha autoestima voltou junto com as roupas antigas.',    stars: 5,   av: 'https://i.pravatar.cc/80?img=41' },
  { name: 'Priscila V.', age: 44, job: 'professora de yoga',              text: 'Mesmo como instrutora, eu não conseguia perder peso. O Protocolo completou o que faltava.',              stars: 5,   av: 'https://i.pravatar.cc/80?img=44' },
  { name: 'Gabriela M.', age: 28, job: 'social media',                    text: 'Minha chefe perguntou se eu fiz lipo. Foram 7kg em 5 semanas. Sem cirurgia, sem sofrimento.',           stars: 5,   av: 'https://i.pravatar.cc/80?img=47' },
  { name: 'Tatiane R.',  age: 39, job: 'bancária',                        text: 'Eu vivia inchada e cansada. Na primeira fase meu corpo desinflou de um jeito que nunca tinha acontecido.', stars: 4.5, av: 'https://i.pravatar.cc/80?img=48' },
  { name: 'Sandra K.',   age: 52, job: 'empresária',                      text: 'Com 52 anos eu achei que meu metabolismo tinha aposentado. O Protocolo provou que eu estava errada.',    stars: 5,   av: 'https://i.pravatar.cc/80?img=49' },
];

function renderStars(rating) {
  let html = '';
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  for (let i = 0; i < full; i++) html += '★';
  if (hasHalf) {
    html += '<span style="position:relative;display:inline-block">'
          + '<span style="color:#E5E7EB">★</span>'
          + '<span style="position:absolute;left:0;top:0;width:55%;overflow:hidden;color:#F59E0B">★</span>'
          + '</span>';
  }
  for (let i = 0; i < 5 - full - (hasHalf ? 1 : 0); i++) {
    html += '<span style="color:#E5E7EB">★</span>';
  }
  return html;
}

let _usedTestimonials = new Set();

function getRandomTestimonials(count) {
  const available = [];
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    if (!_usedTestimonials.has(i)) available.push(i);
  }
  if (available.length < count) {
    _usedTestimonials.clear();
    for (let i = 0; i < TESTIMONIALS.length; i++) available.push(i);
  }
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  const picked = available.slice(0, count);
  picked.forEach(i => _usedTestimonials.add(i));
  return picked.map(i => TESTIMONIALS[i]);
}

function avatarFallback(name) {
  return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22><rect fill=%22%23E5E7EB%22 width=%2240%22 height=%2240%22/><text x=%2250%%22 y=%2254%%22 text-anchor=%22middle%22 fill=%22%236B7280%22 font-size=%2216%22>${name[0]}</text></svg>`;
}

function renderReviewCards(count = 3) {
  return getRandomTestimonials(count).map(r => `
    <div class="review-card">
      <img class="review-avatar" src="${r.av}" alt="${r.name}" loading="lazy"
           onerror="this.src='${avatarFallback(r.name)}'">
      <div class="review-body">
        <div class="review-stars">${renderStars(r.stars)}</div>
        <div class="review-quote">"${r.text}"</div>
        <div class="review-author">${r.name}, ${r.age} anos — ${r.job}</div>
      </div>
    </div>
  `).join('');
}

function renderPricingReviews(count = 3) {
  return getRandomTestimonials(count).map(r => `
    <div class="p-review">
      <img class="review-avatar" src="${r.av}" alt="${r.name}" loading="lazy"
           onerror="this.src='${avatarFallback(r.name)}'">
      <div class="p-body">
        <div class="stars">${renderStars(r.stars)}</div>
        <div class="text">"${r.text}"</div>
        <div class="author">${r.name}, ${r.age} anos — ${r.job}</div>
      </div>
    </div>
  `).join('');
}


/* =============================================
   2. HEADLINES — PAIN-SPECIFIC, IDENTITY-DRIVEN
   ============================================= */

const HEADLINES = [
  'Você faz dieta, treina, conta caloria — e a balança <span class="rw" id="rw">não mexe</span>.',
  'Seu corpo não está contra você. Está <span class="rw" id="rw">travado</span>.',
  '93% das mulheres que não emagrecem cometem o mesmo <span class="rw" id="rw">erro invisível</span>',
  'O problema nunca foi disciplina. Foi <span class="rw" id="rw">sequência</span>.',
  'Existe uma razão biológica pela qual nenhuma dieta funcionou <span class="rw" id="rw">pra você</span>',
];

const SUBHEADLINES = [
  'Responda 7 perguntas em 2 minutos. Descubra o que realmente trava seu metabolismo — e como destravar ainda essa semana.',
  'Mais de 12.847 mulheres já descobriram o bloqueio que nenhum nutricionista encontrou. Faça o teste gratuito.',
  'Seu corpo está pedindo uma coisa. Você está dando outra. Esse teste revela exatamente o quê — em 2 minutos.',
  'Antes de tentar mais uma dieta, descubra por que as anteriores falharam. Teste gratuito de 2 minutos.',
  'Não é falta de esforço. É um bloqueio metabólico que 93% das mulheres nem sabem que têm. Descubra o seu.',
];

const ROTATING_WORDS = {
  0: ['não mexe', 'trava no mesmo número', 'não responde'],
  1: ['travado', 'em modo de proteção', 'adormecido'],
  2: ['erro invisível', 'bloqueio oculto', 'sabotador silencioso'],
  3: ['sequência', 'a ordem que você faz', 'o passo que você pula'],
  4: ['pra você', 'até agora', 'sozinha'],
};

const headlineIndex = Math.floor(Math.random() * HEADLINES.length);
const subheadlineIndex = Math.floor(Math.random() * SUBHEADLINES.length);


/* =============================================
   3. DYNAMIC POST-SELECT FEEDBACK MAP
   ============================================= */

const DYNAMIC_FEEDBACK = {
  'objetivo': {
    'Perder peso': '87% das mulheres que chegam aqui marcam essa opção — e quase todas tinham o mesmo bloqueio invisível.',
    'Definir o corpo': 'Definição sem destravar o metabolismo é como pintar uma parede mofada. Primeiro, a gente resolve a base.',
    'Eliminar inchaço e retenção': 'O inchaço é o primeiro sinal de que algo está errado por dentro. Bom — é também o primeiro a sumir.',
    'Ter mais energia e disposição': 'Falta de energia é sintoma clássico de metabolismo em modo de sobrevivência. Você está no lugar certo.',
    'Me sentir bem comigo mesma': 'Tudo começa por dentro. Quando o corpo funciona, a autoestima volta sozinha.',
  },
  'frustracao': {
    'Faço dieta mas não perco peso': '⚠️ Isso não é falta de esforço. É o sinal mais claro de que seu metabolismo está operando em modo de sobrevivência.',
    'Perco e depois recupero tudo': '⚠️ Efeito rebote. Acontece quando você força a perda sem destravar primeiro. Seu corpo entende restrição como ameaça.',
    'Sinto muita fome e desisto': '⚠️ Fome incontrolável é sinal hormonal — leptina e grelina desreguladas. Não é fraqueza. É química.',
    'Não tenho tempo pra rotinas complicadas': '⚠️ O Protocolo foi desenhado pra quem tem menos de 15 minutos por dia. Rotina complicada é o motivo pelo qual os outros métodos falham.',
    'Não sei por onde começar': '⚠️ A confusão é proposital. A indústria lucra com você perdida. Aqui, o caminho é um só — e é simples.',
  },
  'corpo': {
    '_default': 'Sem julgamento. Essa informação calibra o protocolo pro seu corpo real — não pra um corpo genérico.',
  },
  'resultado-tentativas': {
    'Perdi pouco e parei': 'Seu corpo entrou em modo de defesa. Quando detecta restrição, ele freia tudo. É o sinal clássico de metabolismo travado.',
    'Emagreci mas voltei a engordar': 'Efeito rebote. Você perdeu peso sem destravar o metabolismo — e ele puxou tudo de volta como autodefesa.',
    'Não vi resultado nenhum': 'Quando absolutamente nada funciona, o problema nunca é esforço. É a sequência. Você estava fazendo as coisas certas na ordem errada.',
    'Nunca mantive tempo suficiente': 'Os métodos antigos exigem semanas de sofrimento antes do primeiro resultado. Aqui, a diferença aparece nos primeiros 7 dias.',
    'Tive bons resultados mas quero mais': 'Ótimo sinal. Seu metabolismo ainda responde — agora é questão de potencializar com a sequência certa.',
  },
  'trava': {
    'Meu metabolismo é muito lento': 'Seu metabolismo não é lento. Está em modo de proteção. O Pilar 1 do Protocolo foi desenhado pra reverter exatamente isso em 7 a 14 dias.',
    'Não consigo controlar a fome': 'Fome descontrolada = leptina em colapso. Não é falta de vontade. O Pilar 1 reseta esses sinais em 5-7 dias.',
    'Falta de motivação': 'Motivação acaba. Método, não. O Protocolo não depende de força de vontade — depende de sequência.',
    'Não sei o que fiz de errado': 'Provavelmente nada de errado. Só na ordem errada. É como montar um móvel pulando os 3 primeiros passos.',
    'Acho que é hormonal': 'Provavelmente é. Cortisol, insulina, leptina — quando estão desregulados, nenhuma dieta funciona. O Protocolo começa por aí.',
  },
  'atividade': {
    'Sedentária (quase nenhuma atividade)': 'O Protocolo não exige treino. Os micro-exercícios de 12 min são opcionais e feitos no seu quarto.',
    'Leve (caminhadas, tarefas do dia)': 'Esse nível já ajuda. Com o metabolismo destravado, até a caminhada leve vira queima ativa.',
    'Moderada (treino 2-3x por semana)': 'Você já treina e não vê resultado? Isso confirma: o problema não é exercício. É o que acontece antes dele.',
    'Intensa (treino 4+ vezes por semana)': 'Se você treina forte e não perde peso, seu metabolismo está em modo de sobrevivência. Treino sozinho não resolve — destravar vem primeiro.',
  },
  'alimentacao': {
    'Como de tudo, sem regra': 'Você não precisa mudar tudo. Precisa mudar a ordem. 3 ajustes na sequência alimentar mudam mais que qualquer dieta.',
    'Tento comer saudável mas escorrego': 'O "escorrego" não é falta de disciplina — é seu corpo gritando por algo que falta. O Protocolo elimina isso na raiz.',
    'Sigo uma dieta com alguma disciplina': 'Se você já tem disciplina e não vê resultado, o problema não é o que você come. É a sequência metabólica.',
    'Não sei se como bem ou mal': 'Essa confusão é comum. A indústria de dietas lucra com informação contraditória. Aqui, é direto ao ponto.',
    'Sei que como mal mas não consigo mudar': 'Você não precisa virar outra pessoa. O Protocolo funciona com ajustes mínimos — na ordem certa.',
  },
  'rotina': {
    '_default': 'Essa informação define qual das 4 versões do protocolo você vai receber.',
  },
  'tempo': {
    'Menos de 15 minutos': 'Anotado. Seu protocolo será montado pra caber em menos de 15 minutos por dia. Sem academia, sem receitas de 2 horas.',
    '15 a 30 minutos': 'Tempo ideal. 80% das mulheres que tiveram resultado investiam exatamente isso.',
    '30 minutos a 1 hora': 'Ótimo — com esse tempo, a versão avançada do Protocolo vai acelerar seus resultados.',
    'Mais de 1 hora': 'Com esse tempo, seu protocolo pode incluir os módulos bônus de aceleração.',
  },
  'restricoes': {
    '_default': 'Registrado. Todas as recomendações vão respeitar suas restrições — nada genérico, nada que coloque sua saúde em risco.',
  },
  'sono': {
    'Durmo bem, acordo disposta': 'Excelente. Sono bom = cortisol controlado = metabolismo mais responsivo. Você tem uma vantagem.',
    'Durmo mas acordo cansada': '⚠️ Acordar cansada mesmo dormindo indica cortisol elevado à noite. Isso trava a queima de gordura por até 14 horas. O Pilar 2 ataca exatamente isso.',
    'Tenho dificuldade pra dormir': '⚠️ Insônia dispara cortisol, que aumenta a fome e trava o metabolismo. O Pilar 2 do Protocolo foi desenhado pra corrigir isso antes de qualquer dieta.',
    'Durmo pouco (menos de 6h)': '⚠️ Menos de 6h de sono aumenta a fome em até 45% e reduz a queima calórica em 20%. Seu corpo está em modo de emergência. O Protocolo começa por aqui.',
  },
  'idade': {
    '18 – 24 anos': 'Nessa faixa, o metabolismo responde rápido. Se está travado agora, a janela de correção é curta — mas ainda está 100% aberta.',
    '25 – 34 anos': 'Essa é a faixa onde pequenas correções geram grandes resultados. Seu corpo ainda responde bem — se você souber a sequência.',
    '35 – 44 anos': 'Essa é a faixa onde o metabolismo mais responde ao Protocolo. A janela de ativação hormonal ainda está aberta — mas está fechando.',
    '45 – 54 anos': 'Depois dos 45, cada mês sem destravar torna a correção mais lenta. A boa notícia: o Protocolo foi calibrado pra essa faixa.',
    '55+ anos': 'Seu metabolismo não aposentou. Ele está em modo de proteção há anos. O Pilar 1 acorda ele de volta — em qualquer idade.',
  },
};

function getDynamicFeedback(stepId, value) {
  const map = DYNAMIC_FEEDBACK[stepId];
  if (!map) return null;
  if (map[value]) return map[value];
  if (map['_default']) return map['_default'];
  return null;
}


/* =============================================
   4. STATE
   ============================================= */

const state = {
  currentStep: 0,
  answers: {},
  userData: { name: '', whatsapp: '' },
  startTime: Date.now(),
  stepStartTime: Date.now(),
};


/* =============================================
   5. QUIZ STEPS DATA — REWRITTEN COPY
   ============================================= */

const steps = [
  // START
  { id: 'start', phase: 0, type: 'start' },

  // PHASE 1 — DIAGNÓSTICO (was "Objetivo")
  {
    id: 'objetivo', phase: 1, type: 'single',
    question: 'O que você mais quer resolver agora no seu corpo?',
    options: [
      { icon: '🎯', label: 'Perder peso' },
      { icon: '💪', label: 'Definir o corpo' },
      { icon: '💧', label: 'Eliminar inchaço e retenção' },
      { icon: '⚡', label: 'Ter mais energia e disposição' },
      { icon: '🧘', label: 'Me sentir bem comigo mesma' },
    ],
  },
  {
    id: 'frustracao', phase: 1, type: 'single',
    preHeadline: 'Entendi. Agora preciso saber o que está travando você.',
    question: 'Qual dessas situações mais te descreve?',
    options: [
      { icon: '😤', label: 'Faço dieta mas não perco peso' },
      { icon: '🔄', label: 'Perco e depois recupero tudo' },
      { icon: '🍽️', label: 'Sinto muita fome e desisto' },
      { icon: '⏰', label: 'Não tenho tempo pra rotinas complicadas' },
      { icon: '😶', label: 'Não sei por onde começar' },
    ],
  },
  {
    id: 'corpo', phase: 1, type: 'single',
    preHeadline: 'Sem julgamento — isso calibra o protocolo pro seu corpo real.',
    question: 'Como você descreveria seu corpo hoje?',
    options: [
      { icon: '🪶', label: 'Magra mas flácida' },
      { icon: '⚖️', label: 'Peso médio com barriga' },
      { icon: '📈', label: 'Acima do peso' },
      { icon: '📊', label: 'Muito acima do peso' },
      { icon: '💦', label: 'Retenção e inchaço' },
      { icon: '🤷', label: 'Não sei definir' },
    ],
  },
  {
    id: 'areas', phase: 1, type: 'multi',
    question: 'Quais áreas do corpo mais te incomodam?',
    microcopy: 'Selecione todas — o protocolo vai priorizar pela ordem de impacto.',
    options: [
      { icon: '🫃', label: 'Barriga' },
      { icon: '🦵', label: 'Coxas' },
      { icon: '💪', label: 'Braços' },
      { icon: '🍑', label: 'Glúteos' },
      { icon: '😮‍💨', label: 'Inchaço geral' },
      { icon: '✨', label: 'Corpo inteiro' },
    ],
    postSelect: 'Anotado. O protocolo vai atacar essas áreas na sequência certa — começando pelo que dá resultado mais rápido.',
  },

  // PHASE 2 — HISTÓRICO DE FRACASSO
  {
    id: 'metodos', phase: 2, type: 'multi',
    preHeadline: 'Vamos entender o que já não funcionou.',
    question: 'O que você já tentou para {objetivo}?',
    microcopy: 'Selecione tudo que se aplica — sem julgamento.',
    options: [
      { icon: '📋', label: 'Dietas restritivas' },
      { icon: '💊', label: 'Chás, suplementos ou shakes' },
      { icon: '🏋️', label: 'Academia ou exercícios' },
      { icon: '📱', label: 'Outros apps de emagrecimento' },
      { icon: '🍽️', label: 'Jejum intermitente' },
      { icon: '❌', label: 'Nunca tentei nada' },
    ],
    postSelect: 'Você já investiu tempo, dinheiro e energia nisso. O problema nunca foi o que você tentou — foi a ordem em que fez.',
  },
  {
    id: 'resultado-tentativas', phase: 2, type: 'single',
    question: 'E qual foi o resultado de tudo isso?',
    options: [
      { icon: '😕', label: 'Perdi pouco e parei' },
      { icon: '🔄', label: 'Emagreci mas voltei a engordar' },
      { icon: '😤', label: 'Não vi resultado nenhum' },
      { icon: '🤷', label: 'Nunca mantive tempo suficiente' },
      { icon: '✅', label: 'Tive bons resultados mas quero mais' },
    ],
  },

  // TRANSITION — after pain peak (moved here strategically)
  { id: 'validacao', phase: 2, type: 'transition' },

  {
    id: 'trava', phase: 2, type: 'single', conditional: true,
    preHeadline: 'Isso acontece com 93% das mulheres. Você não é exceção — é a regra.',
    question: 'Na sua opinião, o que travou seu progresso?',
    options: [
      { icon: '🧬', label: 'Meu metabolismo é muito lento' },
      { icon: '🍫', label: 'Não consigo controlar a fome' },
      { icon: '😩', label: 'Falta de motivação' },
      { icon: '🤷', label: 'Não sei o que fiz de errado' },
      { icon: '🔬', label: 'Acho que é hormonal' },
    ],
  },
  {
    id: 'atividade', phase: 2, type: 'single',
    question: 'Qual é seu nível de atividade física hoje?',
    options: [
      { icon: '🛋️', label: 'Sedentária (quase nenhuma atividade)' },
      { icon: '🚶', label: 'Leve (caminhadas, tarefas do dia)' },
      { icon: '🏃', label: 'Moderada (treino 2-3x por semana)' },
      { icon: '💪', label: 'Intensa (treino 4+ vezes por semana)' },
    ],
  },
  {
    id: 'alimentacao', phase: 2, type: 'single',
    question: 'Como você descreveria sua alimentação?',
    options: [
      { icon: '🍔', label: 'Como de tudo, sem regra' },
      { icon: '🥗', label: 'Tento comer saudável mas escorrego' },
      { icon: '📋', label: 'Sigo uma dieta com alguma disciplina' },
      { icon: '🤷', label: 'Não sei se como bem ou mal' },
      { icon: '🍕', label: 'Sei que como mal mas não consigo mudar' },
    ],
  },

  // PHASE 3 — ESTILO DE VIDA (calibração)
  {
    id: 'rotina', phase: 3, type: 'single',
    preHeadline: 'Agora vamos calibrar o protocolo pra sua realidade.',
    question: 'Como é sua rotina diária?',
    options: [
      { icon: '🏢', label: 'Trabalho sentada a maior parte do dia' },
      { icon: '🚶', label: 'Fico em pé ou andando bastante' },
      { icon: '🏠', label: 'Fico em casa (home office ou mãe em tempo integral)' },
      { icon: '🔄', label: 'Minha rotina muda muito de um dia pro outro' },
    ],
  },
  {
    id: 'tempo', phase: 3, type: 'single',
    question: 'Quanto tempo por dia você consegue dedicar?',
    options: [
      { icon: '⏱️', label: 'Menos de 15 minutos' },
      { icon: '⏱️', label: '15 a 30 minutos' },
      { icon: '⏱️', label: '30 minutos a 1 hora' },
      { icon: '⏱️', label: 'Mais de 1 hora' },
    ],
  },
  {
    id: 'restricoes', phase: 3, type: 'multi',
    question: 'Alguma restrição alimentar?',
    microcopy: 'Selecione todas que se aplicam',
    options: [
      { icon: '🥛', label: 'Intolerância à lactose' },
      { icon: '🌾', label: 'Intolerância ao glúten' },
      { icon: '🥩', label: 'Vegetariana ou vegana' },
      { icon: '🤰', label: 'Gestante ou lactante' },
      { icon: '💊', label: 'Tomo medicação para tireoide' },
      { icon: '✅', label: 'Nenhuma restrição' },
    ],
  },
  {
    id: 'sono', phase: 3, type: 'single',
    question: 'Como está seu sono?',
    options: [
      { icon: '😴', label: 'Durmo bem, acordo disposta' },
      { icon: '😐', label: 'Durmo mas acordo cansada' },
      { icon: '🌙', label: 'Tenho dificuldade pra dormir' },
      { icon: '⏰', label: 'Durmo pouco (menos de 6h)' },
    ],
  },

  // PHASE 4 — PERFIL
  {
    id: 'idade', phase: 4, type: 'single',
    question: 'Qual sua faixa etária?',
    options: [
      { icon: '', label: '18 – 24 anos' },
      { icon: '', label: '25 – 34 anos' },
      { icon: '', label: '35 – 44 anos' },
      { icon: '', label: '45 – 54 anos' },
      { icon: '', label: '55+ anos' },
    ],
  },
  { id: 'medidas',   phase: 4, type: 'numeric' },
  { id: 'peso-alvo', phase: 4, type: 'target' },
  { id: 'dados',     phase: 4, type: 'lead' },

  // POST-QUIZ
  { id: 'loading',   phase: 0, type: 'loading' },
  { id: 'resultado', phase: 0, type: 'result' },
  { id: 'pricing',   phase: 0, type: 'pricing' },
  { id: 'thankyou',  phase: 0, type: 'thankyou' },
];


/* =============================================
   6. RENDER ENGINE
   ============================================= */

function renderStep(idx) {
  const step = steps[idx];
  const container = document.getElementById('stepsContainer');
  state.stepStartTime = Date.now();

  // Conditional: skip "trava" if answer doesn't match
  if (step.conditional) {
    const prev = state.answers['resultado-tentativas'];
    if (prev && !['Perdi pouco e parei', 'Não vi resultado nenhum'].includes(prev)) {
      state.currentStep = idx + 1;
      renderStep(idx + 1);
      return;
    }
  }

  // Skip "resultado-tentativas" if user never tried anything
  if (step.id === 'resultado-tentativas') {
    const metodos = state.answers['metodos'];
    if (metodos && Array.isArray(metodos) && metodos.includes('Nunca tentei nada')) {
      state.currentStep = idx + 2;
      renderStep(idx + 2);
      return;
    }
  }

  updateProgress(step.phase);

  let html = '';
  switch (step.type) {
    case 'start':      html = renderStart(); break;
    case 'single':     html = renderSingle(step); break;
    case 'multi':      html = renderMulti(step); break;
    case 'transition': html = renderTransition(); break;
    case 'numeric':    html = renderNumeric(); break;
    case 'target':     html = renderTarget(); break;
    case 'lead':       html = renderLead(); break;
    case 'loading':    startLoading(container); return;
    case 'result':     html = renderResult(); break;
    case 'pricing':    html = renderPricing(); break;
    case 'thankyou':   html = renderThankYou(); break;
  }

  container.innerHTML = `<div class="step active">${html}</div>`;

  if (step.type === 'start')   bindStart();
  if (step.type === 'single')  bindSingle(step);
  if (step.type === 'multi')   bindMulti(step);
  if (step.type === 'numeric') bindNumeric();
  if (step.type === 'target')  bindTarget();
  if (step.type === 'lead')    bindLead();
  if (step.type === 'pricing') bindPricing();

  // Auto-scroll to CTA on result page (mobile only)
  if (step.type === 'result' && window.innerWidth < 768) {
    autoScrollToCTA();
  }
}

function nextStep() {
  trackStep(steps[state.currentStep]);
  state.currentStep++;
  renderStep(state.currentStep);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function autoScrollToCTA() {
  let userScrolled = false;

  // Detect if user scrolls manually — if so, cancel auto-scroll
  const onUserScroll = () => { userScrolled = true; };
  window.addEventListener('scroll', onUserScroll, { passive: true });
  window.addEventListener('touchmove', onUserScroll, { passive: true });

  // Wait for user to read the diagnosis, then gently guide to CTA
  setTimeout(() => {
    // Clean up listeners
    window.removeEventListener('scroll', onUserScroll);
    window.removeEventListener('touchmove', onUserScroll);

    // Only scroll if user hasn't interacted
    if (userScrolled) return;

    const btn = document.querySelector('.btn-result');
    if (!btn) return;

    // Scroll so the CTA is visible at bottom of screen with some context above
    const btnRect = btn.getBoundingClientRect();
    const targetScroll = window.pageYOffset + btnRect.top - window.innerHeight + btnRect.height + 40;

    // Only scroll down, never up
    if (targetScroll > window.pageYOffset) {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, 2200);
}

function trackStep(step) {
  const elapsed = Date.now() - state.stepStartTime;
  console.log(`[Analytics] step=${step.id}, answer=${JSON.stringify(state.answers[step.id])}, time=${elapsed}ms`);
}


/* =============================================
   7. PROGRESS BAR
   ============================================= */

function updateProgress(phase) {
  const bar = document.getElementById('progressBar');
  if (phase === 0) {
    bar.classList.remove('visible');
    return;
  }
  bar.classList.add('visible');
  const basePercent = 15;
  const rawPercent = (phase / 4) * 100;
  const finalPercent = basePercent + (rawPercent * 0.85);

  bar.querySelectorAll('.progress-phase').forEach(el => {
    const p = parseInt(el.dataset.phase);
    el.classList.toggle('active', p === phase);
    el.classList.toggle('done', p < phase);
  });

  const fill = bar.querySelector('.progress-fill');
  if (fill) fill.style.width = finalPercent + '%';
}


/* =============================================
   8. TOAST
   ============================================= */

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerHTML = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}


/* =============================================
   9. RENDERERS — REWRITTEN COPY
   ============================================= */

function renderStart() {
  return `
    <div class="start-hero">
      <div class="logo-wrap">
        <img src="logo.webp" alt="Desinx"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
        <div class="logo-text" style="display:none">DESIN<span>X</span></div>
      </div>

      <h1 class="start-headline">${HEADLINES[headlineIndex]}</h1>
      <p class="start-sub">${SUBHEADLINES[subheadlineIndex]}</p>

      <button class="btn-primary" id="btnStart" onclick="nextStep()">
        Descobrir o que trava meu corpo →
      </button>

      <p style="font-size:12px;color:var(--text-light);text-align:center;margin-top:12px">
        ⏱ Leva menos de 2 minutos · 100% gratuito · Sem cadastro
      </p>

      <div class="legal-wrap" style="margin-top:8px">
        <p style="font-size:11px;color:var(--text-light);text-align:center">
          Ao continuar, você concorda com os <a href="https://inverta.app/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e <a href="https://inverta.app/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  `;
}

function bindStart() {
  const words = ROTATING_WORDS[headlineIndex] || ['não mexe', 'trava', 'resiste'];
  let wordIdx = 0;
  const el = document.getElementById('rw');
  if (!el) return;

  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      wordIdx = (wordIdx + 1) % words.length;
      el.textContent = words[wordIdx];
      el.style.opacity = '1';
    }, 300);
  }, 3000);
}

function renderSingle(step) {
  let question = step.question;
  if (question.includes('{objetivo}') && state.answers['objetivo']) {
    question = question.replace('{objetivo}', state.answers['objetivo'].toLowerCase());
  }

  const pre = step.preHeadline
    ? `<p class="step-microcopy" style="font-style:normal;font-weight:600;color:var(--accent)">${step.preHeadline}</p>`
    : '';

  const options = step.options.map(o => `
    <div class="option-card" data-value="${o.label}">
      ${o.icon ? `<span class="icon">${o.icon}</span>` : ''}
      <span class="label">${o.label}</span>
      <span class="check"></span>
    </div>
  `).join('');

  return `
    ${pre}
    <h2 class="step-question">${question}</h2>
    <div class="options-grid">${options}</div>
    <div class="dynamic-feedback" id="dynamicFeedback"></div>
    <button class="btn-primary" id="btnNext" disabled onclick="nextStep()">Continuar</button>
  `;
}

function renderMulti(step) {
  let question = step.question;
  if (question.includes('{objetivo}') && state.answers['objetivo']) {
    question = question.replace('{objetivo}', state.answers['objetivo'].toLowerCase());
  }

  const pre = step.preHeadline
    ? `<p class="step-microcopy" style="font-style:normal;font-weight:600;color:var(--accent)">${step.preHeadline}</p>`
    : '';

  const microcopy = step.microcopy
    ? `<p class="step-microcopy">${step.microcopy}</p>`
    : '';

  const options = step.options.map(o => `
    <div class="option-card" data-value="${o.label}">
      <span class="icon">${o.icon}</span>
      <span class="label">${o.label}</span>
      <span class="check"></span>
    </div>
  `).join('');

  return `
    ${pre}
    <h2 class="step-question">${question}</h2>
    ${microcopy}
    <div class="options-grid">${options}</div>
    <div class="dynamic-feedback" id="dynamicFeedback"></div>
    <button class="btn-primary" id="btnNext" disabled onclick="nextStep()">Continuar</button>
  `;
}

function renderTransition() {
  const frustracao = state.answers['frustracao'] || '';
  const frustracaoMap = {
    'Faço dieta mas não perco peso': 'faz dieta e não perde peso',
    'Perco e depois recupero tudo': 'perde peso e depois recupera tudo',
    'Sinto muita fome e desisto': 'sente muita fome e acaba desistindo',
    'Não tenho tempo pra rotinas complicadas': 'não tem tempo pra rotinas complicadas',
    'Não sei por onde começar': 'não sabe por onde começar',
  };
  const frustracaoText = frustracaoMap[frustracao] || 'não consegue emagrecer';

  const metodos = state.answers['metodos'];
  const metodosText = metodos && Array.isArray(metodos) && metodos.length > 0
    ? metodos.filter(m => m !== 'Nunca tentei nada').slice(0, 2).join(' e ').toLowerCase()
    : 'tudo que tentou';

  return `
    <div class="transition-screen">
      <div class="icon-big">💧</div>
      <h2 class="headline">Agora faz sentido.</h2>
      <p class="body-text">
        Você <strong>${frustracaoText}</strong> mesmo tentando ${metodosText}.
        Isso não é coincidência — é o padrão de um metabolismo em <strong>modo de proteção</strong>.
      </p>
      <p class="body-text" style="font-weight:600;color:var(--text)">
        É como encher um copo virado de cabeça pra baixo.<br>
        Não importa quanta água você joga — nada fica.
      </p>
      <div class="highlight">
        💧 O <strong>Protocolo Desinx</strong> não tenta forçar seu corpo.<br>
        Primeiro, ele <strong>inverte o copo</strong>. Destrava o metabolismo.<br>
        Aí sim, tudo que você fizer começa a funcionar.
      </div>
      <p style="font-size:13px;color:var(--text-light);text-align:center;margin:16px 0 0">
        Mais de <strong style="color:var(--primary)">12.847 mulheres</strong> já destravaram o metabolismo com esse método.
      </p>
      <button class="btn-primary" onclick="nextStep()">Continuar minha análise →</button>
    </div>
  `;
}

function renderNumeric() {
  return `
    <h2 class="step-question">Suas medidas atuais</h2>
    <p class="step-subtitle">Esses dados calibram a intensidade do seu protocolo.</p>

    <div class="input-group">
      <label>Qual é a sua altura?</label>
      <div class="input-row">
        <input type="number" class="input-field" id="inputAltura"
               placeholder="165" min="120" max="206" inputmode="numeric">
        <span class="input-unit">cm</span>
      </div>
      <span class="input-hint">Entre 120 cm e 206 cm</span>
      <div class="input-error-msg" id="errAltura"></div>
    </div>

    <div class="input-group">
      <label>Qual é seu peso atual?</label>
      <div class="input-row">
        <input type="number" class="input-field" id="inputPeso"
               placeholder="70" min="30" max="250" inputmode="numeric">
        <span class="input-unit">kg</span>
      </div>
      <span class="input-hint">Entre 30 kg e 250 kg</span>
      <div class="input-error-msg" id="errPeso"></div>
    </div>

    <div class="dynamic-feedback" id="imcFeedback"></div>

    <button class="btn-primary" id="btnNext" disabled onclick="saveNumeric()">Continuar</button>
  `;
}

function renderTarget() {
  const current = state.answers['peso'] || 70;
  return `
    <h2 class="step-question">Se você pudesse escolher, quanto gostaria de pesar?</h2>
    <p class="step-subtitle">Seu peso atual: <strong>${current}kg</strong>. Coloque sua meta — qualquer uma é válida.</p>

    <div class="input-group">
      <div class="input-row">
        <input type="number" class="input-field" id="inputTarget"
               placeholder="60" min="30" max="200" inputmode="numeric">
        <span class="input-unit">kg</span>
      </div>
      <span class="input-hint">Entre 30 kg e 200 kg</span>
      <div class="input-error-msg" id="errTarget"></div>
    </div>

    <div class="feedback-badge" id="targetFeedback"></div>
    <button class="btn-primary" id="btnNext" disabled onclick="saveTarget()" style="margin-top:24px">
      Continuar
    </button>
  `;
}

function renderLead() {
  return `
    <h2 class="step-question">Seu protocolo personalizado está pronto.</h2>
    <p class="step-subtitle">Para qual WhatsApp enviamos seu acesso?</p>

    <div class="input-group">
      <label>Seu primeiro nome</label>
      <input type="text" class="text-field" id="inputName" placeholder="Como posso te chamar?">
    </div>

    <div class="input-group">
      <label>Seu WhatsApp</label>
      <div style="width: 100%;">
        <input type="tel" class="text-field" id="inputWhatsapp" style="margin-bottom:0;">
      </div>
      <div class="input-error-msg" id="errWhatsapp"></div>
      <p class="justify-text">Usamos pra personalizar seu plano e enviar o acesso. Sem spam, prometemos.</p>
    </div>

    <p style="font-size:13px;color:var(--primary);font-weight:600;text-align:center;margin:12px 0">
      🎁 Bônus: você também recebe o guia "3 Alimentos que Travam seu Metabolismo" (grátis).
    </p>

    <label class="legal-check" style="cursor:pointer">
      <input type="checkbox" id="optinCheck" checked>
      Quero receber dicas gratuitas sobre emagrecimento
    </label>

    <div class="legal-wrap" style="margin:12px 0">
      <label class="legal-check" id="legalLabel">
        <input type="checkbox" id="legalCheckbox" checked>
        <span>Concordo com os <a href="https://inverta.app/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e <a href="https://inverta.app/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</span>
      </label>
    </div>

    <button class="btn-primary" id="btnNext" disabled onclick="saveLead()">
      Ver meu protocolo personalizado →
    </button>
  `;
}

function renderResult() {
  const name = state.userData.name || 'Você';
  const target = state.answers['peso-alvo'] || '?';
  const current = state.answers['peso'] || 70;
  const diff = Math.max(0, current - target);
  const minL = Math.max(1, Math.round(diff * 0.3));
  const maxL = Math.max(2, Math.round(diff * 0.6));

  // Determine primary blockage
  const frustracao = state.answers['frustracao'] || '';
  const trava = state.answers['trava'] || '';
  const sono = state.answers['sono'] || '';
  let blockName = 'Metabolismo em Modo de Proteção';
  let blockDesc = 'Seu corpo interpreta restrição como ameaça e freia toda queima de gordura.';

  if (trava.includes('fome') || frustracao.includes('fome')) {
    blockName = 'Desregulação de Leptina e Grelina';
    blockDesc = 'Seus hormônios da fome estão invertidos — você sente fome mesmo quando não precisa comer.';
  } else if (trava.includes('hormonal')) {
    blockName = 'Bloqueio Hormonal Silencioso';
    blockDesc = 'Cortisol e insulina estão travando seu corpo em modo de acúmulo.';
  } else if (sono.includes('cansada') || sono.includes('pouco')) {
    blockName = 'Cortisol Noturno Elevado';
    blockDesc = 'Seu sono ruim dispara cortisol que trava a queima por até 14 horas.';
  } else if (frustracao.includes('Perco e depois recupero')) {
    blockName = 'Ciclo de Rebote Metabólico';
    blockDesc = 'Seu corpo aprendeu a estocar gordura como defesa contra futuras restrições.';
  }

  const areas = state.answers['areas'];
  const areasText = areas && Array.isArray(areas)
    ? areas.join(', ').toLowerCase()
    : 'corpo inteiro';

  const metodos = state.answers['metodos'];
  const metodosText = metodos && Array.isArray(metodos)
    ? metodos.slice(0, 2).join(' e ').toLowerCase()
    : '';

  return `
    <div class="result-wrap">
      <div class="result-header">
        <h2 class="headline">${name}, encontramos seu bloqueio principal.</h2>
        <div class="diagnosis-card">
          <div class="diagnosis-label">DIAGNÓSTICO</div>
          <div class="diagnosis-name">🔬 ${blockName}</div>
          <div class="diagnosis-desc">${blockDesc}</div>
          ${metodosText ? `<div class="diagnosis-explain">Isso explica por que ${metodosText} não funcionou pra você.</div>` : ''}
        </div>
      </div>

      <p class="sub" style="text-align:center;margin:20px 0;color:var(--text-light)">
        Criamos um protocolo de 3 fases para corrigir esse bloqueio e te levar a <strong style="color:var(--primary)">${target}kg</strong>.
      </p>

      <div class="benefits-grid">
        <div class="benefit-card"><div class="b-icon">💧</div><div class="b-title">Fase 1 — Inversão</div><div class="b-desc">Destrava o metabolismo nos primeiros 7-14 dias</div></div>
        <div class="benefit-card"><div class="b-icon">⚡</div><div class="b-title">Fase 2 — Ativação</div><div class="b-desc">Reseta hormônios da fome e do sono</div></div>
        <div class="benefit-card"><div class="b-icon">🔥</div><div class="b-title">Fase 3 — Queima</div><div class="b-desc">Metabolismo trabalha por você 24/7</div></div>
        <div class="benefit-card"><div class="b-icon">🪞</div><div class="b-title">Resultado</div><div class="b-desc">Menos ${areasText}. No espelho e na roupa.</div></div>
      </div>

      <div class="plan-preview">
        <h3>📋 Sua Semana 1 — Foco: ${areasText}</h3>
        <div class="plan-day"><span class="day-num">1</span>Protocolo de Hidratação Estratégica</div>
        <div class="plan-day"><span class="day-num">2</span>Reset Alimentar (cardápio de eliminação)</div>
        <div class="plan-day"><span class="day-num">3</span>Micro-treino de 12 min — Ativação Leve</div>
        <div class="plan-day"><span class="day-num">4</span>Protocolo de Desinchaço</div>
        <div class="plan-day"><span class="day-num">5</span>Cardápio Rotativo + Ajuste de Sono</div>
        <div class="plan-day"><span class="day-num">6</span>Micro-treino de 15 min — Foco ${areas && areas[0] ? areas[0] : 'Corpo'}</div>
        <div class="plan-day"><span class="day-num">7</span>Avaliação + Ajuste do Protocolo</div>
      </div>

      <div class="estimate-box">
        <div class="big">-${minL} a ${maxL} kg</div>
        <div class="small">Estimativa para as primeiras 4 semanas com o Protocolo</div>
      </div>

      ${renderReviewCards(2)}

      <button class="btn-primary btn-result" onclick="nextStep()">Desbloquear meu Protocolo Personalizado →</button>
    </div>
  `;
}

function renderPricing() {
  const name = state.userData.name || 'Você';
  const frustracao = state.answers['frustracao'] || '';
  const metodos = state.answers['metodos'];
  const metodosText = metodos && Array.isArray(metodos) && metodos.length > 0
    ? metodos.filter(m => m !== 'Nunca tentei nada').join(', ').toLowerCase()
    : '';

  return `
    <div class="pricing-header">
      <h2 class="headline">${name}, seu Protocolo está pronto.<br>Escolha como começar.</h2>
      <div class="timer-bar">
        <span>🔥</span> Preço promocional expira em <strong id="timerDisplay">15:00</strong>
        <span style="font-size:11px;display:block;margin-top:2px">Após esse tempo, o valor volta para R$ 67,00</span>
      </div>
    </div>

    ${metodosText ? `
    <div class="cost-inaction" style="background:linear-gradient(135deg,#fef2f2,#fff1f2);border:1px solid #fca5a5;border-radius:12px;padding:16px 20px;margin-bottom:20px;text-align:center">
      <p style="font-size:13px;color:#991b1b;margin:0;line-height:1.5">
        ⚠️ Você já investiu em <strong>${metodosText}</strong> sem resultado duradouro.
        Sem corrigir o bloqueio metabólico, a tendência é ganhar mais <strong>2-4kg nos próximos 6 meses</strong> — o padrão se repete.
      </p>
    </div>` : ''}

    <div class="price-anchoring">
      <div class="anchor-item"><span>Consulta Nutricional:</span> <span><strike>R$ 350,00</strike></span></div>
      <div class="anchor-item"><span>Personal Trainer:</span> <span><strike>R$ 250,00</strike></span></div>
      <div class="anchor-item"><span>Suplementos e shakes:</span> <span><strike>R$ 200,00</strike></span></div>
      <div class="anchor-item total"><span>Custo mensal típico:</span> <span><strike>R$ 800,00/mês</strike></span></div>
      <div class="anchor-highlight">Seu Protocolo Completo: a partir de R$ 39,90 — pagamento único</div>
    </div>

    <div class="pricing-cards">
      <div class="price-card" data-plan="essential" onclick="selectPlan(this)">
        <div class="price-left"><span class="price-radio"></span><div><div class="price-name">Protocolo Completo</div><div class="price-detail">Acesso vitalício às 3 fases + cardápios + treinos</div></div></div>
        <div class="price-right"><div class="price-value">R$ 39,90</div><div class="price-per">pagamento único</div></div>
      </div>
      <div class="price-card featured selected" data-plan="premium" onclick="selectPlan(this)">
        <span class="badge">⭐ Mais escolhido</span>
        <div class="price-left"><span class="price-radio"></span><div><div class="price-name">Protocolo + Receitas + Bônus</div><div class="price-detail">Tudo do Completo + Guia de 50 receitas + Protocolo estendido 42 dias</div></div></div>
        <div class="price-right">
          <div class="price-value">R$ 67,00</div>
          <div class="price-per">pagamento único</div>
          <div style="font-size:11px;color:var(--primary);font-weight:600;margin-top:2px">Economize R$ 20,80</div>
        </div>
      </div>
    </div>

    <div style="background:var(--primary-light, #E6F5F3);border-radius:10px;padding:14px 18px;margin-bottom:20px;text-align:center">
      <p style="font-size:13px;color:var(--text);margin:0;line-height:1.5">
        💡 <strong>Pague uma vez. Acesse pra sempre.</strong> Sem assinatura, sem cobrança recorrente, sem surpresas.
      </p>
    </div>

    <div class="guarantee-block">
      <div class="guarantee-icon">🔒</div>
      <div class="guarantee-text">
        <strong>Garantia Incondicional de 7 Dias — Risco Zero</strong>
        <p>Teste o Protocolo por 7 dias. Se não sentir diferença no corpo, no inchaço ou na energia, devolvemos 100% do valor — sem perguntas, sem burocracia. Um simples e-mail resolve.</p>
      </div>
    </div>

    <button class="btn-primary" id="btnCheckout" onclick="goCheckout()">Começar agora — R$ 67,00 (uma vez só)</button>

    <p style="font-size:12px;color:var(--text-light);text-align:center;margin-top:8px">
      Você está a 1 clique de receber seu protocolo no WhatsApp que cadastrou.
    </p>

    <div class="payment-methods">
      <span style="display:flex;align-items:center;gap:4px">💳 Cartão</span>
      <span style="display:flex;align-items:center;gap:4px">
        <svg width="14" height="14" viewBox="0 0 512 512" style="display:block"><path fill="#32BCAD" d="M256 0L0 256l256 256 256-256L256 0zm133.1 256L256 389.1 122.9 256 256 122.9 389.1 256zM256 169.1l-86.9 86.9 86.9 86.9 86.9-86.9-86.9-86.9z"/></svg>
        PIX
      </span>
    </div>

    <div class="pricing-reviews">${renderPricingReviews(3)}</div>
  `;
}

function renderThankYou() {
  const areas = state.answers['areas'];
  const areasText = areas && Array.isArray(areas) ? areas.join(', ') : '';
  const params = new URLSearchParams({
    nome: state.userData.name || '',
    wpp: state.userData.whatsapp || '',
    areas: areasText,
  });
  window.location.href = 'thank-you.html?' + params.toString();
  return '<div style="text-align:center;padding:40px 0"><p>Redirecionando...</p></div>';
}


/* =============================================
   10. EVENT BINDINGS — WITH DYNAMIC FEEDBACK
   ============================================= */

function bindSingle(step) {
  const cards = document.querySelectorAll('.option-card');
  const btn = document.getElementById('btnNext');
  const feedbackEl = document.getElementById('dynamicFeedback');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.answers[step.id] = card.dataset.value;
      btn.disabled = false;

      // Dynamic feedback
      const feedback = getDynamicFeedback(step.id, card.dataset.value);
      if (feedback && feedbackEl) {
        feedbackEl.innerHTML = feedback;
        feedbackEl.classList.add('visible');
      } else if (feedbackEl) {
        feedbackEl.classList.remove('visible');
      }

      // Also show postSelect toast if defined
      if (step.postSelect) {
        setTimeout(() => showToast(step.postSelect), 400);
      }
    });
  });
}

function bindMulti(step) {
  const cards = document.querySelectorAll('.option-card');
  const btn = document.getElementById('btnNext');
  const selected = new Set();
  const feedbackEl = document.getElementById('dynamicFeedback');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const val = card.dataset.value;
      if (selected.has(val)) {
        selected.delete(val);
        card.classList.remove('selected');
      } else {
        selected.add(val);
        card.classList.add('selected');
      }
      state.answers[step.id] = Array.from(selected);
      btn.disabled = selected.size === 0;

      // Show feedback on first selection
      if (selected.size === 1) {
        const feedback = getDynamicFeedback(step.id, val);
        if (feedback && feedbackEl) {
          feedbackEl.innerHTML = feedback;
          feedbackEl.classList.add('visible');
        }
      }

      // Show postSelect toast
      if (step.postSelect && selected.size > 0) {
        setTimeout(() => showToast(step.postSelect), 400);
      }
    });
  });
}

function bindNumeric() {
  const inputAltura = document.getElementById('inputAltura');
  const inputPeso = document.getElementById('inputPeso');
  const btn = document.getElementById('btnNext');
  const errAltura = document.getElementById('errAltura');
  const errPeso = document.getElementById('errPeso');
  const imcEl = document.getElementById('imcFeedback');

  function validate() {
    const altura = +inputAltura.value;
    const peso = +inputPeso.value;
    let alturaOk = true;
    let pesoOk = true;

    inputAltura.classList.remove('input-error');
    inputPeso.classList.remove('input-error');
    errAltura.classList.remove('visible');
    errPeso.classList.remove('visible');
    errAltura.textContent = '';
    errPeso.textContent = '';

    if (inputAltura.value) {
      if (altura < 120) { alturaOk = false; errAltura.textContent = '⚠️ Altura mínima: 120 cm'; errAltura.classList.add('visible'); inputAltura.classList.add('input-error'); }
      else if (altura > 206) { alturaOk = false; errAltura.textContent = '⚠️ Altura máxima: 206 cm'; errAltura.classList.add('visible'); inputAltura.classList.add('input-error'); }
    } else { alturaOk = false; }

    if (inputPeso.value) {
      if (peso < 30) { pesoOk = false; errPeso.textContent = '⚠️ Peso mínimo: 30 kg'; errPeso.classList.add('visible'); inputPeso.classList.add('input-error'); }
      else if (peso > 250) { pesoOk = false; errPeso.textContent = '⚠️ Peso máximo: 250 kg'; errPeso.classList.add('visible'); inputPeso.classList.add('input-error'); }
    } else { pesoOk = false; }

    // Show IMC when both are valid
    if (alturaOk && pesoOk && imcEl) {
      const imc = (peso / ((altura / 100) ** 2)).toFixed(1);
      let imcMsg = '';
      if (imc < 18.5) imcMsg = `Seu IMC atual: <strong>${imc}</strong> (abaixo do peso). O protocolo será ajustado para definição saudável.`;
      else if (imc < 25) imcMsg = `Seu IMC atual: <strong>${imc}</strong> (faixa normal). Mulheres nessa faixa respondem rápido ao Pilar 1.`;
      else if (imc < 30) imcMsg = `Seu IMC atual: <strong>${imc}</strong> (acima do ideal). Mulheres nessa faixa perdem em média 4-7kg nas primeiras 4 semanas.`;
      else imcMsg = `Seu IMC atual: <strong>${imc}</strong>. Mulheres nessa faixa têm os resultados mais expressivos — a inversão metabólica faz diferença radical.`;
      imcEl.innerHTML = imcMsg;
      imcEl.classList.add('visible');
    } else if (imcEl) {
      imcEl.classList.remove('visible');
    }

    btn.disabled = !(alturaOk && pesoOk);
  }

  inputAltura.addEventListener('input', validate);
  inputPeso.addEventListener('input', validate);
}

function saveNumeric() {
  const altura = +document.getElementById('inputAltura').value;
  const peso = +document.getElementById('inputPeso').value;
  if (altura < 120 || altura > 206 || peso < 30 || peso > 250) return;
  state.answers['altura'] = altura;
  state.answers['peso'] = peso;
  nextStep();
}

function bindTarget() {
  const input = document.getElementById('inputTarget');
  const feedback = document.getElementById('targetFeedback');
  const btn = document.getElementById('btnNext');
  const errTarget = document.getElementById('errTarget');

  input.addEventListener('input', () => {
    const value = +input.value;
    const current = state.answers['peso'] || 70;
    const diff = current - value;
    let ok = true;

    input.classList.remove('input-error');
    errTarget.classList.remove('visible');
    errTarget.textContent = '';
    feedback.classList.remove('visible', 'error');

    if (!input.value) { ok = false; }
    else if (value < 30) { ok = false; errTarget.textContent = '⚠️ Peso mínimo: 30 kg'; errTarget.classList.add('visible'); input.classList.add('input-error'); }
    else if (value > 200) { ok = false; errTarget.textContent = '⚠️ Peso máximo: 200 kg'; errTarget.classList.add('visible'); input.classList.add('input-error'); }
    else if (value >= current) {
      feedback.classList.add('visible');
      feedback.textContent = 'ℹ️ Peso-alvo igual ou acima do atual — o protocolo será ajustado pra definição e saúde.';
    } else {
      feedback.classList.add('visible');
      const weeks = Math.max(2, Math.round(diff / 1.2));
      if (diff <= 5) feedback.textContent = `🎯 Meta leve — estimativa: ${weeks} semanas com o Protocolo.`;
      else if (diff <= 15) feedback.textContent = `💪 Meta realista — estimativa: ${weeks} semanas. O Protocolo foi feito pra isso.`;
      else if (diff <= 30) feedback.textContent = `🔥 Meta desafiadora — estimativa: ${weeks} semanas. Vamos juntas, fase a fase.`;
      else feedback.textContent = `✨ Transformação profunda — estimativa: ${weeks} semanas. O Pilar 1 vai ser seu melhor amigo.`;
    }

    btn.disabled = !ok;
  });
}

function saveTarget() {
  const value = +document.getElementById('inputTarget').value;
  if (value < 30 || value > 200) return;
  state.answers['peso-alvo'] = value;
  nextStep();
}

let itiInstance = null;

function bindLead() {
  const inputName = document.getElementById('inputName');
  const inputWpp = document.getElementById('inputWhatsapp');
  const btn = document.getElementById('btnNext');
  const errWpp = document.getElementById('errWhatsapp');

  inputName.addEventListener('input', () => {
    inputName.value = inputName.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    validateLead();
  });

  if (window.intlTelInput) {
    itiInstance = window.intlTelInput(inputWpp, {
      initialCountry: "br",
      preferredCountries: ["br", "pt", "us"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js",
    });
  }

  inputWpp.addEventListener('input', () => {
    inputWpp.value = inputWpp.value.replace(/\D/g, '');
    validateLead();
  });
  inputWpp.addEventListener('countrychange', validateLead);

  function validateLead() {
    const nameOk = inputName.value.trim().length >= 2;
    let wppOk = false;
    let errorMsg = '⚠️ Número de WhatsApp inválido para este país.';

    if (itiInstance) {
      const countryData = itiInstance.getSelectedCountryData();
      const digits = inputWpp.value;

      if (countryData.iso2 === 'br') {
        if (digits.length === 11 && digits[2] === '9') { wppOk = true; }
        else {
          wppOk = false;
          if (digits.length > 0 && digits.length < 11) errorMsg = '⚠️ O número deve ter 11 dígitos (DDD + 9 + número).';
          else if (digits.length === 11 && digits[2] !== '9') errorMsg = '⚠️ O número deve conter o dígito 9 após o DDD.';
          else if (digits.length > 11) errorMsg = '⚠️ O número não pode ter mais de 11 dígitos.';
        }
      } else {
        wppOk = itiInstance.isValidNumber();
      }
    } else {
      wppOk = inputWpp.value.trim().length >= 8;
    }

    inputWpp.classList.remove('input-error');
    errWpp.classList.remove('visible');
    errWpp.textContent = '';

    if (inputWpp.value.trim().length > 0 && !wppOk) {
      inputWpp.classList.add('input-error');
      errWpp.textContent = errorMsg;
      errWpp.classList.add('visible');
    }

    btn.disabled = !(nameOk && wppOk);
  }
}

function saveLead() {
  const name = document.getElementById('inputName').value.trim();
  const btn = document.getElementById('btnNext');
  if (btn.disabled) return;

  state.userData.name = name;
  state.userData.whatsapp = itiInstance ? itiInstance.getNumber() : document.getElementById('inputWhatsapp').value;
  console.log('[Lead Captured]', state.userData, state.answers);
  nextStep();
}


/* =============================================
   11. LOADING SCREEN — PERSONALIZED & LONGER
   ============================================= */

function startLoading(container) {
  updateProgress(0);

  const objetivo = state.answers['objetivo'] || 'perder peso';
  const sono = state.answers['sono'] || '';
  const restricoes = state.answers['restricoes'];
  const areas = state.answers['areas'];

  const messages = [
    `Analisando seu perfil para ${objetivo.toLowerCase()}...`,
    'Identificando bloqueios metabólicos...',
    sono ? `Avaliando impacto do sono: "${sono.toLowerCase()}"...` : 'Calculando sua janela de ativação...',
    restricoes && Array.isArray(restricoes) && !restricoes.includes('Nenhuma restrição')
      ? `Adaptando cardápio para suas restrições...`
      : 'Montando seu cardápio inteligente...',
    areas && Array.isArray(areas) ? `Personalizando treinos para: ${areas.slice(0, 2).join(', ')}...` : 'Calibrando micro-treinos...',
    '⚠️ Identificamos 3 bloqueios no seu perfil...',
    'Montando solução personalizada...',
    'Finalizando seu Protocolo de Inversão...',
  ];

  container.innerHTML = `
    <div class="step active">
      <div class="loading-screen">
        <div class="water-ripple"><span class="water-drop">💧</span></div>
        <h2 class="headline">Criando seu Protocolo personalizado...</h2>
        <div class="loading-bar-wrap">
          <div class="loading-bar-fill" id="loadingBar"></div>
        </div>
        <p class="loading-text" id="loadingText">${messages[0]}</p>
      </div>
    </div>
  `;

  const bar = document.getElementById('loadingBar');
  const text = document.getElementById('loadingText');
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += 1; // slower — takes ~10s
    bar.style.width = progress + '%';

    if (progress % 13 === 0 && msgIdx < messages.length - 1) {
      msgIdx++;
      text.style.opacity = '0';
      setTimeout(() => {
        text.textContent = messages[msgIdx];
        text.style.opacity = '1';
      }, 250);
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        state.currentStep++;
        renderStep(state.currentStep);
      }, 800);
    }
  }, 100);
}


/* =============================================
   12. PRICING ACTIONS
   ============================================= */

function bindPricing() {
  startTimer();
}

function selectPlan(el) {
  document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  const btn = document.getElementById('btnCheckout');
  const plan = el.dataset.plan;
  const prices = { essential: 'R$ 39,90', premium: 'R$ 67,00' };
  btn.textContent = `Começar agora — ${prices[plan]} (uma vez só)`;
}

function goCheckout() {
  const selected = document.querySelector('.price-card.selected');
  const plan = selected ? selected.dataset.plan : 'premium';

  const checkoutLinks = {
    essential: 'https://checkout.ticto.app/OF0C63DF7',
    premium:   'https://checkout.ticto.app/OBC594508',
  };

  let url = checkoutLinks[plan] || checkoutLinks.premium;

  // Preenchimento automático dos dados do cliente na Ticto
  const params = new URLSearchParams();
  if (state.userData.name) {
    params.set('name', state.userData.name);
    params.set('customer_name', state.userData.name);
  }
  if (state.userData.whatsapp) {
    params.set('phone', state.userData.whatsapp);
    params.set('customer_phone', state.userData.whatsapp);
    params.set('celular', state.userData.whatsapp);
  }
  if (state.userData.email) {
    params.set('email', state.userData.email);
    params.set('customer_email', state.userData.email);
  }
  if (params.toString()) url += '?' + params.toString();

  console.log('[Checkout]', { plan, url, user: state.userData });
  window.location.href = url;
}

function startTimer() {
  let seconds = 15 * 60;
  const display = document.getElementById('timerDisplay');

  const tick = setInterval(() => {
    seconds--;
    if (seconds <= 0) { clearInterval(tick); return; }
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    if (display) {
      display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }
  }, 1000);
}


/* =============================================
   13. SOCIAL PROOF & EXIT INTENT
   ============================================= */

const FAKE_NAMES = ['Ana', 'Maria', 'Juliana', 'Camila', 'Fernanda', 'Patrícia', 'Aline', 'Bruna', 'Larissa', 'Carla'];
const FAKE_CITIES = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Brasília', 'Salvador', 'Fortaleza', 'Recife'];
const FAKE_ACTIONS = [
  'acabou de garantir o Protocolo!',
  'desbloqueou o Protocolo agora!',
  'garantiu o Protocolo Completo!',
  'começou a Fase 1 agora!',
  'acabou de garantir o pacote completo!',
];

function initSocialProof() {
  setInterval(() => {
    const currentStep = steps[state.currentStep];
    if (!currentStep || (currentStep.id !== 'resultado' && currentStep.id !== 'pricing')) return;

    if (Math.random() > 0.3) {
      const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      const city = FAKE_CITIES[Math.floor(Math.random() * FAKE_CITIES.length)];
      const action = FAKE_ACTIONS[Math.floor(Math.random() * FAKE_ACTIONS.length)];
      showToast(`🛒 ${name} de ${city} ${action}`);
    }
  }, 10000);
}

let exitIntentShown = false;

function shouldShowExitIntent() {
  const currentStep = steps[state.currentStep];
  if (!currentStep) return false;
  // Only trigger from phase 3 (Calibração) onwards, excluding post-quiz screens
  return currentStep.phase >= 3 || currentStep.id === 'resultado' || currentStep.id === 'pricing';
}

function triggerExitIntent() {
  if (exitIntentShown) return;
  if (!shouldShowExitIntent()) return;
  exitIntentShown = true;

  // Dynamic copy based on where they are in the funnel
  const modal = document.getElementById('exitModal');
  const currentStep = steps[state.currentStep];
  const titleEl = modal.querySelector('.exit-title');
  const descEl = modal.querySelector('.exit-desc');

  if (currentStep && (currentStep.id === 'resultado' || currentStep.id === 'pricing')) {
    titleEl.textContent = 'Seu Protocolo já está pronto.';
    descEl.innerHTML = 'Você completou toda a análise. Seu plano personalizado está esperando — é só desbloquear. Sair agora significa <strong>perder o protocolo montado pra você</strong>.';
  } else {
    titleEl.textContent = 'Você já está na metade da análise.';
    descEl.innerHTML = 'Faltam poucas perguntas pra montar seu protocolo personalizado. Se sair agora, vai precisar <strong>recomeçar do zero</strong>.';
  }

  modal.classList.add('visible');
}

function initExitIntent() {
  // Only trigger on browser back button
  if (window.history && window.history.pushState) {
    window.history.pushState({ noExit: true }, '');
    window.addEventListener('popstate', (event) => {
      if (!exitIntentShown && shouldShowExitIntent()) {
        triggerExitIntent();
        window.history.pushState({ noExit: true }, '');
      }
    });
  }
}

function closeExitModal() {
  const modal = document.getElementById('exitModal');
  if (modal) modal.classList.remove('visible');
}

function acceptExitOffer() {
  closeExitModal();
}

renderStep(0);
initSocialProof();
initExitIntent();
