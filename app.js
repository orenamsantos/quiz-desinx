/* =============================================
   Protocolo Desinx — App Logic
   ============================================= */


/* =============================================
   1. TESTIMONIALS POOL (15 unique)
   ============================================= */

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

  // Fisher-Yates shuffle
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
   2. HEADLINES POOL (10 headlines + 10 subheadlines)
   ============================================= */

const HEADLINES = [
  'Ninguém te contou isso sobre emagrecimento <span class="rw" id="rw">até agora</span>',
  'O protocolo simples que está <span class="rw" id="rw">confundindo nutricionistas</span>',
  'Seu metabolismo não é lento. Está <span class="rw" id="rw">travado</span>.',
  'Por que você não emagrece mesmo fazendo <span class="rw" id="rw">tudo certo</span>?',
  'O erro invisível que sabota 93% das mulheres que tentam <span class="rw" id="rw">perder peso</span>',
  'Elas emagreceram sem dieta, sem academia e sem <span class="rw" id="rw">passar fome</span>',
  'Antes de tentar mais uma dieta, <span class="rw" id="rw">leia isso</span>.',
  'O método que inverte a lógica do emagrecimento e funciona em <span class="rw" id="rw">14 dias</span>',
  'Esqueça tudo que te ensinaram sobre <span class="rw" id="rw">perder peso</span>.',
  'A razão científica pela qual seu corpo <span class="rw" id="rw">resiste a emagrecer</span>',
];

const SUBHEADLINES = [
  'Faça o quiz de 2 minutos e descubra o que realmente trava seu metabolismo — e como destravar ainda essa semana.',
  'Responda 7 perguntas e receba um protocolo personalizado que já ajudou mais de 12.000 mulheres.',
  'Descubra em 2 minutos por que nenhuma dieta funcionou — e o que fazer no lugar.',
  'Seu corpo está pedindo uma coisa. Você está dando outra. Esse quiz mostra exatamente o quê.',
  'O quiz gratuito que revela o bloqueio metabólico que ninguém te contou que existe.',
  'Não é falta de disciplina. É falta de sequência. Descubra a ordem certa em 2 minutos.',
  'Mais de 12.000 mulheres descobriram por que não emagreciam. Você pode ser a próxima.',
  'Resultados em 14 dias, sem academia, sem receitas complicadas. Comece pelo quiz.',
  'Seu plano personalizado está a 2 minutos de distância. Responda e veja o que muda.',
  'A chave não é comer menos. É destravar primeiro. Descubra como no quiz gratuito.',
];

const ROTATING_WORDS = {
  0: ['até agora', 'e você vai entender por quê', 'mas agora vai'],
  1: ['confundindo nutricionistas', 'surpreendendo endocrinologistas', 'virando o jogo'],
  2: ['travado', 'bloqueado', 'adormecido'],
  3: ['tudo certo', 'dieta certinha', 'exercício todo dia'],
  4: ['perder peso', 'emagrecer', 'secar a barriga'],
  5: ['passar fome', 'sofrer', 'se privar'],
  6: ['leia isso', 'assista isso', 'descubra isso'],
  7: ['14 dias', '2 semanas', 'poucos dias'],
  8: ['perder peso', 'emagrecer', 'queimar gordura'],
  9: ['resiste a emagrecer', 'trava no mesmo peso', 'não responde a dietas'],
};

const headlineIndex = Math.floor(Math.random() * HEADLINES.length);
const subheadlineIndex = Math.floor(Math.random() * SUBHEADLINES.length);


/* =============================================
   3. STATE
   ============================================= */

const state = {
  currentStep: 0,
  answers: {},
  userData: { name: '', whatsapp: '' },
  startTime: Date.now(),
  stepStartTime: Date.now(),
};


/* =============================================
   4. QUIZ STEPS DATA
   ============================================= */

const steps = [
  // START
  { id: 'start', phase: 0, type: 'start' },

  // PHASE 1 — OBJETIVO
  {
    id: 'objetivo', phase: 1, type: 'single',
    question: 'Qual é o seu objetivo principal agora?',
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
    question: 'O que mais te frustra quando tenta emagrecer?',
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
    question: 'Quais são as áreas que mais te incomodam?',
    microcopy: 'Selecione todas que se aplicam',
    options: [
      { icon: '🫃', label: 'Barriga' },
      { icon: '🦵', label: 'Coxas' },
      { icon: '💪', label: 'Braços' },
      { icon: '🍑', label: 'Glúteos' },
      { icon: '😮‍💨', label: 'Inchaço geral' },
      { icon: '✨', label: 'Corpo inteiro' },
    ],
  },

  // PHASE 2 — HISTÓRICO
  {
    id: 'metodos', phase: 2, type: 'multi',
    question: 'O que você já tentou para {objetivo}?',
    options: [
      { icon: '📋', label: 'Dietas restritivas' },
      { icon: '💊', label: 'Chás, suplementos ou shakes' },
      { icon: '🏋️', label: 'Academia ou exercícios' },
      { icon: '📱', label: 'Outros apps de emagrecimento' },
      { icon: '🍽️', label: 'Jejum intermitente' },
      { icon: '❌', label: 'Nunca tentei nada' },
    ],
  },
  {
    id: 'resultado-tentativas', phase: 2, type: 'single',
    question: 'Como foram seus resultados até agora?',
    options: [
      { icon: '😕', label: 'Perdi pouco e parei' },
      { icon: '🔄', label: 'Emagreci mas voltei a engordar' },
      { icon: '😤', label: 'Não vi resultado nenhum' },
      { icon: '🤷', label: 'Nunca mantive tempo suficiente' },
      { icon: '✅', label: 'Tive bons resultados mas quero mais' },
    ],
  },
  {
    id: 'trava', phase: 2, type: 'single', conditional: true,
    preHeadline: 'Isso é mais comum do que você imagina.',
    question: 'Na sua opinião, o que travou seu progresso?',
    postSelect: 'A boa notícia: nada disso é permanente. O Protocolo trabalha exatamente nesse ponto.',
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
    question: 'Como você descreveria sua alimentação hoje?',
    options: [
      { icon: '🍔', label: 'Como de tudo, sem regra' },
      { icon: '🥗', label: 'Tento comer saudável mas escorrego' },
      { icon: '📋', label: 'Sigo uma dieta com alguma disciplina' },
      { icon: '🤷', label: 'Não sei se como bem ou mal' },
      { icon: '🍕', label: 'Sei que como mal mas não consigo mudar' },
    ],
  },
  { id: 'validacao', phase: 2, type: 'transition' },

  // PHASE 3 — ESTILO DE VIDA
  {
    id: 'rotina', phase: 3, type: 'single',
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
    question: 'Quanto tempo por dia você consegue dedicar ao seu plano?',
    postSelect: 'Perfeito. O Protocolo se adapta ao seu tempo — sem exigir horas na cozinha ou academia.',
    options: [
      { icon: '⏱️', label: 'Menos de 15 minutos' },
      { icon: '⏱️', label: '15 a 30 minutos' },
      { icon: '⏱️', label: '30 minutos a 1 hora' },
      { icon: '⏱️', label: 'Mais de 1 hora' },
    ],
  },
  {
    id: 'restricoes', phase: 3, type: 'multi',
    question: 'Você tem alguma restrição alimentar?',
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
    question: 'Como está seu sono atualmente?',
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
    question: 'Qual é a sua faixa etária?',
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
   5. RENDER ENGINE
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

  // Bind events after render
  if (step.type === 'start')   bindStart();
  if (step.type === 'single')  bindSingle(step);
  if (step.type === 'multi')   bindMulti(step);
  if (step.type === 'numeric') bindNumeric();
  if (step.type === 'target')  bindTarget();
  if (step.type === 'lead')    bindLead();
  if (step.type === 'pricing') bindPricing();
}

function nextStep() {
  trackStep(steps[state.currentStep]);
  state.currentStep++;
  renderStep(state.currentStep);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function trackStep(step) {
  const elapsed = Date.now() - state.stepStartTime;
  console.log(`[Analytics] step=${step.id}, answer=${JSON.stringify(state.answers[step.id])}, time=${elapsed}ms`);
}


/* =============================================
   6. PROGRESS BAR
   ============================================= */

function updateProgress(phase) {
  const bar = document.getElementById('progressBar');
  if (phase === 0) {
    bar.classList.remove('visible');
    return;
  }
  bar.classList.add('visible');
  
  // Zeigarnik Effect: start at 15% minimum and scale the rest
  const basePercent = 15;
  const rawPercent = (phase / 4) * 100; // Assuming 4 phases
  const finalPercent = basePercent + (rawPercent * 0.85);
  
  bar.querySelectorAll('.progress-phase').forEach(el => {
    const p = parseInt(el.dataset.phase);
    el.classList.toggle('active', p === phase);
    el.classList.toggle('done', p < phase);
  });
  
  // Update the fill bar width based on the new math
  const fill = bar.querySelector('.progress-fill');
  if (fill) {
    fill.style.width = finalPercent + '%';
  }
}


/* =============================================
   7. TOAST
   ============================================= */

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}


/* =============================================
   8. RENDERERS
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

      <button class="btn-primary" id="btnStart" onclick="handleStartClick()">
        Quero meu plano personalizado
      </button>

      <div style="margin:20px 0 16px">
        ${renderReviewCards(3)}
      </div>

      <div class="legal-wrap">
        <label class="legal-check" id="legalLabel">
          <input type="checkbox" id="legalCheckbox">
          <span>Ao continuar, concordo com os <a href="https://inverta.app/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</a> e <a href="https://inverta.app/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</span>
        </label>
        <div class="legal-error" id="legalError">
          ⚠️ Você precisa aceitar os termos para continuar.
        </div>
      </div>
    </div>
  `;
}

function handleStartClick() {
  const checkbox = document.getElementById('legalCheckbox');
  const label = document.getElementById('legalLabel');
  const error = document.getElementById('legalError');

  if (!checkbox.checked) {
    label.classList.add('shake', 'error-state');
    error.classList.add('visible');

    // Scroll automático até o checkbox para garantir visibilidade
    label.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => label.classList.remove('shake'), 400);

    checkbox.addEventListener('change', function handler() {
      if (checkbox.checked) {
        label.classList.remove('error-state');
        error.classList.remove('visible');
        checkbox.removeEventListener('change', handler);
      }
    });
    return;
  }

  nextStep();
}

function bindStart() {
  const words = ROTATING_WORDS[headlineIndex] || ['perder peso', 'eliminar inchaço', 'ter energia'];
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
    <button class="btn-primary" id="btnNext" disabled onclick="nextStep()">Continuar</button>
  `;
}

function renderMulti(step) {
  let question = step.question;
  if (question.includes('{objetivo}') && state.answers['objetivo']) {
    question = question.replace('{objetivo}', state.answers['objetivo'].toLowerCase());
  }

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
    <h2 class="step-question">${question}</h2>
    ${microcopy}
    <div class="options-grid">${options}</div>
    <button class="btn-primary" id="btnNext" disabled onclick="nextStep()">Continuar</button>
  `;
}

function renderTransition() {
  return `
    <div class="transition-screen">
      <div class="icon-big">🥛</div>
      <h2 class="headline">Você não falhou.<br>Os métodos é que falharam com você.</h2>
      <p class="body-text">
        A maioria dos programas tenta forçar seu corpo a emagrecer — com restrição,
        sofrimento e força de vontade. Mas se o metabolismo está travado, nada disso funciona.
      </p>
      <p class="body-text" style="font-weight:600;color:var(--text)">
        É como encher um copo virado de cabeça pra baixo.
      </p>
      <div class="highlight">
        💧 É por isso que o <strong>Protocolo Desinx</strong> começa de um jeito
        diferente. Primeiro, a gente inverte o copo. Destrava seu metabolismo. Aí sim, tudo que
        você faz começa a funcionar.
      </div>
      <button class="btn-primary" onclick="nextStep()">Continuar minha análise</button>
    </div>
  `;
}

function renderNumeric() {
  return `
    <h2 class="step-question">Suas medidas</h2>
    <p class="step-subtitle">Precisamos desses dados para personalizar seu protocolo.</p>

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

    <button class="btn-primary" id="btnNext" disabled onclick="saveNumeric()">Continuar</button>
  `;
}

function renderTarget() {
  return `
    <h2 class="step-question">Qual peso você gostaria de alcançar?</h2>
    <p class="step-subtitle">Não se preocupe — qualquer meta é válida.</p>

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
    <h2 class="step-question">Estamos quase lá!</h2>
    <p class="step-subtitle">Coloque seu WhatsApp para receber seu Protocolo e um <strong>PDF bônus: '3 Alimentos que Travam seu Metabolismo'</strong>.</p>

    <div class="input-group">
      <label>Como posso te chamar?</label>
      <input type="text" class="text-field" id="inputName" placeholder="Seu primeiro nome">
    </div>

    <div class="input-group">
      <label>Qual seu WhatsApp?</label>
      <div style="width: 100%;">
        <input type="tel" class="text-field" id="inputWhatsapp" style="margin-bottom:0;">
      </div>
      <div class="input-error-msg" id="errWhatsapp"></div>
      <p class="justify-text">Usamos seu nome pra personalizar o plano e o WhatsApp pra enviar seu acesso. Sem spam.</p>
    </div>

    <label class="legal-check" style="cursor:pointer">
      <input type="checkbox" id="optinCheck" checked>
      Quero receber dicas gratuitas sobre emagrecimento
    </label>

    <button class="btn-primary" id="btnNext" disabled onclick="saveLead()">
      Ver meu plano personalizado
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

  return `
    <div class="result-wrap">
      <div class="result-header">
        <h2 class="headline">${name}, seu Protocolo está pronto! 🎉</h2>
        <p class="sub">Baseado nas suas respostas, criamos um plano de 3 fases para
          destravar seu metabolismo e alcançar ${target}kg.</p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card"><div class="b-icon">💧</div><div class="b-title">Inversão Metabólica</div><div class="b-desc">Elimina o que trava nas 2 primeiras semanas</div></div>
        <div class="benefit-card"><div class="b-icon">⚡</div><div class="b-title">Energia Real</div><div class="b-desc">Sem fadiga de dieta. Dá energia, não tira.</div></div>
        <div class="benefit-card"><div class="b-icon">🔥</div><div class="b-title">Queima Automática</div><div class="b-desc">Semana 3+, metabolismo trabalha por você</div></div>
        <div class="benefit-card"><div class="b-icon">🪞</div><div class="b-title">Resultado Visível</div><div class="b-desc">Menos inchaço. No espelho e na roupa.</div></div>
      </div>

      <div class="plan-preview">
        <h3>📋 Sua Semana 1</h3>
        <div class="plan-day"><span class="day-num">1</span>Protocolo de Hidratação Estratégica</div>
        <div class="plan-day"><span class="day-num">2</span>Reset Alimentar (cardápio de eliminação)</div>
        <div class="plan-day"><span class="day-num">3</span>Micro-treino de 12 min — Ativação Leve</div>
        <div class="plan-day"><span class="day-num">4</span>Protocolo de Desinchaço</div>
        <div class="plan-day"><span class="day-num">5</span>Cardápio Rotativo + Ajuste de Sono</div>
        <div class="plan-day"><span class="day-num">6</span>Micro-treino de 15 minutos</div>
        <div class="plan-day"><span class="day-num">7</span>Descanso Ativo + Avaliação</div>
      </div>

      <div class="estimate-box">
        <div class="big">-${minL} a ${maxL} kg</div>
        <div class="small">Estimativa para as primeiras 4 semanas</div>
      </div>

      <button class="btn-primary btn-result" onclick="nextStep()">Quero começar meu Protocolo</button>
    </div>
  `;
}

function renderPricing() {
  return `
    <div class="pricing-header">
      <h2 class="headline">Escolha seu plano e comece hoje</h2>
      <div class="timer-bar">
        <span>🔥</span> Oferta expira em <strong id="timerDisplay">15:00</strong>
      </div>
    </div>

    <div class="price-anchoring">
      <div class="anchor-item"><span>Consulta Nutricional:</span> <span><strike>R$ 350,00</strike></span></div>
      <div class="anchor-item"><span>Plano de Treino:</span> <span><strike>R$ 150,00</strike></span></div>
      <div class="anchor-item total"><span>Valor Total:</span> <span><strike>R$ 500,00</strike></span></div>
      <div class="anchor-highlight">Seu Protocolo Hoje: a partir de R$ 16,00/mês</div>
    </div>

    <div class="pricing-cards">
      <div class="price-card" data-plan="month" onclick="selectPlan(this)">
        <div class="price-left"><span class="price-radio"></span><div><div class="price-name">Mensal</div><div class="price-detail">Acesso completo ao Protocolo</div></div></div>
        <div class="price-right"><div class="price-value">R$ 29,90</div><div class="price-per">/mês</div></div>
      </div>
      <div class="price-card featured selected" data-plan="quarter" onclick="selectPlan(this)">
        <span class="badge">⭐ 93% ESCOLHEM ESTE</span>
        <div class="price-left"><span class="price-radio"></span><div><div class="price-name">Trimestral</div><div class="price-detail">Melhor custo-benefício</div></div></div>
        <div class="price-right"><div class="price-value">R$ 19,90</div><div class="price-per">/mês (R$ 59,70)</div></div>
      </div>
      <div class="price-card" data-plan="annual" onclick="selectPlan(this)">
        <span class="badge badge-economy">ECONOMIZE 57%</span>
        <div class="price-left"><span class="price-radio"></span><div><div class="price-name">Anual</div><div class="price-detail">Maior economia — compromisso total</div></div></div>
        <div class="price-right"><div class="price-value">R$ 16,00</div><div class="price-per">/mês (R$ 154,80)</div></div>
      </div>
    </div>

    <p class="pricing-social-proof">
      93% das assinantes escolhem o trimestral — quem segue por 3 meses tem <strong>2x mais chance</strong> de manter o peso.
    </p>

    <div class="guarantee-box-full">
      <div class="guarantee-box-icon">🔒</div>
      <div class="guarantee-box-body">
        <div class="guarantee-box-title">Garantia Incondicional de 7 Dias</div>
        <div class="guarantee-box-text">Teste o Protocolo por 7 dias. Se não sentir diferença no corpo, devolvemos 100% do valor — sem perguntas, sem burocracia.</div>
      </div>
    </div>

    <button class="btn-primary" id="btnCheckout" onclick="goCheckout()">Começar agora — R$ 19,90/mês</button>

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
  // Redirect to standalone thank you page
  const params = new URLSearchParams({
    nome: state.userData.name || '',
    wpp: state.userData.whatsapp || '',
  });
  window.location.href = 'obrigado.html?' + params.toString();
  return '<div style="text-align:center;padding:40px 0"><p>Redirecionando...</p></div>';
}


/* =============================================
   9. EVENT BINDINGS
   ============================================= */

function bindSingle(step) {
  const cards = document.querySelectorAll('.option-card');
  const btn = document.getElementById('btnNext');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.answers[step.id] = card.dataset.value;
      btn.disabled = false;
      if (step.postSelect) {
        setTimeout(() => showToast(step.postSelect), 300);
      }
    });
  });
}

function bindMulti(step) {
  const cards = document.querySelectorAll('.option-card');
  const btn = document.getElementById('btnNext');
  const selected = new Set();

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
    });
  });
}

function bindNumeric() {
  const inputAltura = document.getElementById('inputAltura');
  const inputPeso = document.getElementById('inputPeso');
  const btn = document.getElementById('btnNext');
  const errAltura = document.getElementById('errAltura');
  const errPeso = document.getElementById('errPeso');

  function validate() {
    const altura = +inputAltura.value;
    const peso = +inputPeso.value;
    let alturaOk = true;
    let pesoOk = true;

    // Reset states
    inputAltura.classList.remove('input-error');
    inputPeso.classList.remove('input-error');
    errAltura.classList.remove('visible');
    errPeso.classList.remove('visible');
    errAltura.textContent = '';
    errPeso.textContent = '';

    // Validate altura
    if (inputAltura.value) {
      if (altura < 120) {
        alturaOk = false;
        errAltura.textContent = '⚠️ Altura mínima: 120 cm';
        errAltura.classList.add('visible');
        inputAltura.classList.add('input-error');
      } else if (altura > 206) {
        alturaOk = false;
        errAltura.textContent = '⚠️ Altura máxima: 206 cm';
        errAltura.classList.add('visible');
        inputAltura.classList.add('input-error');
      }
    } else {
      alturaOk = false;
    }

    // Validate peso
    if (inputPeso.value) {
      if (peso < 30) {
        pesoOk = false;
        errPeso.textContent = '⚠️ Peso mínimo: 30 kg';
        errPeso.classList.add('visible');
        inputPeso.classList.add('input-error');
      } else if (peso > 250) {
        pesoOk = false;
        errPeso.textContent = '⚠️ Peso máximo: 250 kg';
        errPeso.classList.add('visible');
        inputPeso.classList.add('input-error');
      }
    } else {
      pesoOk = false;
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

    // Reset
    input.classList.remove('input-error');
    errTarget.classList.remove('visible');
    errTarget.textContent = '';
    feedback.classList.remove('visible', 'error');

    if (!input.value) {
      ok = false;
    } else if (value < 30) {
      ok = false;
      errTarget.textContent = '⚠️ Peso mínimo: 30 kg';
      errTarget.classList.add('visible');
      input.classList.add('input-error');
    } else if (value > 200) {
      ok = false;
      errTarget.textContent = '⚠️ Peso máximo: 200 kg';
      errTarget.classList.add('visible');
      input.classList.add('input-error');
    } else if (value >= current) {
      feedback.classList.add('visible');
      feedback.textContent = 'ℹ️ Seu peso-alvo é igual ou acima do atual — ajustaremos o protocolo para definição e saúde';
    } else {
      feedback.classList.add('visible');
      if (diff <= 5)       feedback.textContent = '🎯 Meta leve — você pode chegar lá em 4 semanas';
      else if (diff <= 15) feedback.textContent = '💪 Meta realista — o Protocolo foi feito pra isso';
      else if (diff <= 30) feedback.textContent = '🔥 Meta desafiadora — vamos juntas, passo a passo';
      else                 feedback.textContent = '✨ Transformação profunda — o Pilar 1 vai ser seu melhor amigo';
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

  // Name validation: only letters and spaces
  inputName.addEventListener('input', () => {
    inputName.value = inputName.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    validateLead();
  });

  // Initialize intl-tel-input
  if (window.intlTelInput) {
    itiInstance = window.intlTelInput(inputWpp, {
      initialCountry: "br",
      preferredCountries: ["br", "pt", "us"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.2.1/js/utils.js",
    });
  }

  inputWpp.addEventListener('input', () => {
    // Remove all non-numeric characters
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
        // Brazil: exactly 11 digits and must have '9' after the 2-digit DDD
        if (digits.length === 11 && digits[2] === '9') {
          wppOk = true;
        } else {
          wppOk = false;
          if (digits.length > 0 && digits.length < 11) {
            errorMsg = '⚠️ O número deve ter 11 dígitos (DDD + 9 + número).';
          } else if (digits.length === 11 && digits[2] !== '9') {
            errorMsg = '⚠️ O número deve conter o dígito 9 após o DDD.';
          } else if (digits.length > 11) {
            errorMsg = '⚠️ O número não pode ter mais de 11 dígitos.';
          }
        }
      } else {
        // Other countries: rely on intl-tel-input validation
        wppOk = itiInstance.isValidNumber();
      }
    } else {
      wppOk = inputWpp.value.trim().length >= 8;
    }

    // Reset error
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
  // In production: POST to API here
  console.log('[Lead Captured]', state.userData, state.answers);
  nextStep();
}


/* =============================================
   10. LOADING SCREEN
   ============================================= */

function startLoading(container) {
  updateProgress(0);

  const messages = [
    'Analisando seu perfil metabólico...',
    'Calculando sua janela de ativação...',
    'Identificando seus bloqueios...',
    'Montando seu cardápio inteligente...',
    'Personalizando seus treinos...',
    'Finalizando seu plano de inversão...',
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
    progress += 2;
    bar.style.width = progress + '%';

    if (progress % 18 === 0 && msgIdx < messages.length - 1) {
      msgIdx++;
      text.style.opacity = '0';
      setTimeout(() => {
        text.textContent = messages[msgIdx];
        text.style.opacity = '1';
      }, 200);
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        state.currentStep++;
        renderStep(state.currentStep);
      }, 600);
    }
  }, 80);
}


/* =============================================
   11. PRICING ACTIONS
   ============================================= */

function bindPricing() {
  startTimer();
}

function selectPlan(el) {
  document.querySelectorAll('.price-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  const btn = document.getElementById('btnCheckout');
  const plan = el.dataset.plan;
  const prices = { month: 'R$ 29,90/mês', quarter: 'R$ 19,90/mês', annual: 'R$ 16,00/mês' };
  btn.textContent = `Começar agora — ${prices[plan]}`;
}

function goCheckout() {
  const selected = document.querySelector('.price-card.selected');
  const plan = selected ? selected.dataset.plan : 'quarter';
  
  // Checkout URLs by plan
  const checkoutUrls = {
    month: 'https://payment.ticto.app/O7406796A',
    quarter: 'https://checkout.ticto.app/O131B466E',
    annual: 'https://checkout.ticto.app/O167DA548'
  };
  
  console.log('[Checkout]', { plan, user: state.userData, answers: state.answers });
  
  // Redirect to checkout
  window.location.href = checkoutUrls[plan];
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
   12. INIT & SOCIAL PROOF & EXIT INTENT
   ============================================= */

const FAKE_NAMES = ['Ana', 'Maria', 'Juliana', 'Camila', 'Fernanda', 'Patrícia', 'Aline', 'Bruna'];
const FAKE_CITIES = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Brasília', 'Salvador'];

function initSocialProof() {
  setInterval(() => {
    // Only show on result or pricing screens
    const currentStep = steps[state.currentStep];
    if (!currentStep || (currentStep.id !== 'resultado' && currentStep.id !== 'pricing')) return;
    
    // 70% chance to show every 12 seconds to make it more visible for testing
    if (Math.random() > 0.3) {
      const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      const city = FAKE_CITIES[Math.floor(Math.random() * FAKE_CITIES.length)];
      showToast(`🛒 ${name} de ${city} acabou de adquirir o Protocolo!`);
    }
  }, 12000);
}

let exitIntentShown = false;

function triggerExitIntent() {
  if (exitIntentShown) return;
  exitIntentShown = true;
  const modal = document.getElementById('exitModal');
  if (modal) modal.classList.add('visible');
}

function initExitIntent() {
  // Desktop: Mouse Leave
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && state.currentStep > 2 && state.currentStep < steps.length) {
      triggerExitIntent();
    }
  });

  // Mobile: Back Button Interception
  // We push a dummy state. When user clicks back, popstate fires.
  if (window.history && window.history.pushState) {
    window.history.pushState({ noExit: true }, '');
    window.addEventListener('popstate', (event) => {
      if (!exitIntentShown && state.currentStep > 2 && state.currentStep < steps.length) {
        triggerExitIntent();
        // Push again so the next back click actually works or triggers again
        window.history.pushState({ noExit: true }, '');
      }
    });
  }

  // Mobile: Fast Scroll Up (often indicates intent to reach address bar)
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    // If scrolling up fast near the top
    if (st < lastScrollTop && st < 100 && (lastScrollTop - st) > 30) {
      if (state.currentStep > 2 && state.currentStep < steps.length) {
        triggerExitIntent();
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, { passive: true });
}

function closeExitModal() {
  const modal = document.getElementById('exitModal');
  if (modal) modal.classList.remove('visible');
}

function acceptExitOffer() {
  // O usuário quer voltar para o quiz de onde parou, então apenas fechamos o modal.
  // Isso mantém o estado atual do quiz intacto.
  closeExitModal();
}

renderStep(0);
initSocialProof();
initExitIntent();
