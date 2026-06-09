// ==================== DATA ====================
const questions = [
  {
    id: 1,
    text: `Um analista foi contratado para desenvolver um sistema de pesquisa de DVDs em lojas virtuais. O sistema deverá solicitar ao usuário um título de DVD, que será usado para realizar a pesquisa nas bases de dados das lojas conveniadas.\n\nCom relação ao modelo de ciclo de vida, qual afirmativa está CORRETA?`,
    options: [
      "A execução sequencial das fases sem retorno produz um sistema que pode ser validado pelo contratante em qualquer etapa.",
      "A elaboração do protótipo pode aumentar riscos de inclusão de funcionalidades não prioritárias.",
      "A definição das restrições deve ser a segunda fase a ser realizada no projeto, na etapa de engenharia.",
      "Um processo iterativo permite versões progressivas mais completas do sistema."
    ],
    correct: [1, 3],
    multipleCorrect: true,
    explanation: "O protótipo facilita a resolução de dúvidas mas abre espaço para novas funcionalidades (II correto). O processo iterativo permite versões incrementais e progressivamente mais completas (IV correto). A afirmativa I está incorreta pois a execução sequencial não captura correções identificadas em fases posteriores.",
    level: 'easy'
  },
  {
    id: 2,
    text: `Uma pizzaria ampliou suas instalações e contratou uma empresa para melhorar o sistema informatizado. No desenvolvimento, a empresa aproveitou partes do sistema antigo e estendeu os componentes, reaproveitando código já validado e acrescentando novas funções.\n\nQual conceito de orientação a objetos está descrito?`,
    options: ["Sobrecarga", "Herança", "Sobreposição", "Abstração"],
    correct: [1],
    multipleCorrect: false,
    explanation: "A herança aproveita tudo que foi desenvolvido e aprovado na superclasse, possibilitando o uso nas subclasses como código já testado e validado. A sobrecarga cria novas versões de métodos; a sobreposição substitui (não reaproveita); a abstração é sobre reduzir o domínio, não sobre reúso.",
    level: 'easy'
  },
  {
    id: 3,
    text: `O Rational Unified Process (RUP) é um processo de engenharia de software iterativo e incremental. Com base na iteração do RUP, analise as asserções:\n\nI. A cada iteração das fases do RUP, geram-se ou não artefatos de software.\nPORQUE\nII. Os artefatos produzidos dependem da ênfase que é dada a cada disciplina.\n\nAssinale a opção correta:`,
    options: [
      "As duas asserções são verdadeiras, e a segunda justifica a primeira.",
      "As duas asserções são verdadeiras, e a segunda NÃO justifica a primeira.",
      "A primeira asserção é verdadeira e a segunda é falsa.",
      "A primeira asserção é falsa e a segunda é verdadeira."
    ],
    correct: [3],
    multipleCorrect: false,
    explanation: "A asserção I é FALSA: a cada iteração, geram-se vários artefatos obrigatoriamente — eles não são opcionais. A asserção II é VERDADEIRA: cada artefato é escolhido em função da ênfase/peso de cada disciplina. Portanto, alternativa D.",
    level: 'easy'
  },
  {
    id: 4,
    text: `Os alunos deveriam escolher um sistema para modelagem. Um grupo estabeleceu a seguinte estratégia: criaram nicknames em um chat, reuniram-se online, cada integrante sugeriu sistemas sem criticar os outros, o líder copiava as ideias para um editor de texto e, ao final, as 5 melhores ideias foram colocadas em votação.\n\nEsta estratégia é uma adaptação de qual técnica de levantamento de requisitos?`,
    options: ["JAD (Joint Application Design)", "PIECES", "FAST (Facilitated Application Specification Technique)", "Entrevista", "Brainstorming"],
    correct: [4],
    multipleCorrect: false,
    explanation: "A técnica é Brainstorming. As características que confirmam isso: criação de nicknames (possível anonimato), proibição de críticas às ideias, documentação das ideias para análise posterior, análise somente ao final, votação das melhores ideias.",
    level: 'easy'
  },
  {
    id: 5,
    text: `Uma indústria de alimentos tem um sistema para classificar sementes por cor e um mecanismo robótico controlado por interface gráfica para separação em lotes. O mecanismo foi substituído com sucesso por um equipamento de outra marca.\n\nAnalise as afirmativas sobre fatores de qualidade:\nI. As operações de classificação e separação não podem falhar — o atributo correspondente é a interoperabilidade.\nII. A fácil substituição do robô por outra marca indica que o sistema é portável.\nIII. A interface gráfica do controle robótico deve contemplar ergonomia — fator de usabilidade.\n\nQuantas afirmativas estão corretas?`,
    options: [
      "Apenas a afirmativa III está correta.",
      "Apenas as afirmativas I e II estão corretas.",
      "Apenas as afirmativas I e III estão corretas.",
      "Apenas as afirmativas II e III estão corretas.",
      "Todas as afirmativas estão corretas."
    ],
    correct: [0],
    multipleCorrect: false,
    explanation: "Apenas a afirmativa III está correta. I está errada: a confiabilidade é o atributo correto para operações que não podem falhar, não interoperabilidade. II está errada: a substituição do robô indica interoperabilidade, não portabilidade. III está correta: ergonomia está ligada à usabilidade.",
    level: 'easy'
  }
];

// ==================== STATE ====================
let currentScreen = 'login';
let currentLevel = 'easy';
let currentQuestion = 0;
let selectedOptions = {};
let answeredQuestions = {};

// ==================== NAVIGATION ====================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  currentScreen = name;
  window.scrollTo(0, 0);
}

function toggleDropdown() {
  document.getElementById('dropdown-overlay').classList.toggle('open');
}
function closeDropdown() {
  document.getElementById('dropdown-overlay').classList.remove('open');
}
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function togglePw() {
  const pw = document.getElementById('login-pw');
  const icon = document.getElementById('pw-icon');
  if (pw.type === 'password') {
    pw.type = 'text';
    icon.setAttribute('href', '#ic-eye-off');
  } else {
    pw.type = 'password';
    icon.setAttribute('href', '#ic-eye');
  }
}

// ==================== QUIZ ====================
const letters = ['A', 'B', 'C', 'D', 'E'];

function startLevel(level) {
  currentLevel = level;
  currentQuestion = 0;
  selectedOptions = {};
  answeredQuestions = {};

  const badges = { easy: 'Nível Fácil', medium: 'Nível Médio', hard: 'Nível Difícil' };
  const badge = document.getElementById('level-badge-display');
  badge.textContent = badges[level];
  badge.className = 'level-badge ' + level;

  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;

  const total = questions.length;
  document.getElementById('q-current').textContent = currentQuestion + 1;
  document.getElementById('q-total').textContent = total;

  const pct = ((currentQuestion + 1) / total) * 100;
  document.getElementById('q-progress-fill').style.width = pct + '%';

  document.getElementById('q-text').innerHTML = q.text.replace(/\n/g, '<br>');

  const optContainer = document.getElementById('q-options');
  optContainer.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    const isAnswered = answeredQuestions[currentQuestion] !== undefined;
    const isSelected = selectedOptions[currentQuestion] !== undefined &&
      (Array.isArray(selectedOptions[currentQuestion])
        ? selectedOptions[currentQuestion].includes(i)
        : selectedOptions[currentQuestion] === i);
    const isCorrect = q.correct.includes(i);

    let cls = 'option-item';
    if (isAnswered) {
      if (isCorrect) cls += ' correct';
      else if (isSelected && !isCorrect) cls += ' wrong';
    } else if (isSelected) {
      cls += ' selected';
    }

    div.className = cls;
    div.innerHTML = `
      <div class="option-letter">${letters[i]}</div>
      <span class="option-text">${opt}</span>
    `;
    if (!isAnswered) {
      div.onclick = () => selectOption(i);
    }
    optContainer.appendChild(div);
  });

  const fb = document.getElementById('feedback-box');
  if (answeredQuestions[currentQuestion] !== undefined) {
    const isCorrect = answeredQuestions[currentQuestion];
    fb.className = 'feedback-box show ' + (isCorrect ? 'correct' : 'wrong');
    const iconHref = isCorrect ? '#ic-check' : '#ic-x';
    const label = isCorrect ? 'Correto!' : 'Incorreto!';
    fb.innerHTML = `<strong style="display:flex;align-items:center;gap:6px;">
      <svg width="16" height="16"><use href="${iconHref}"/></svg> ${label}
    </strong><br>${q.explanation}`;
  } else {
    fb.className = 'feedback-box';
    fb.innerHTML = '';
  }
}

function selectOption(idx) {
  const q = questions[currentQuestion];
  if (answeredQuestions[currentQuestion] !== undefined) return;
  selectedOptions[currentQuestion] = idx;
  const isCorrect = q.correct.includes(idx);
  answeredQuestions[currentQuestion] = isCorrect;
  renderQuestion();
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function discardTwo() {
  const q = questions[currentQuestion];
  if (answeredQuestions[currentQuestion] !== undefined) return;
  const wrongOpts = q.options.map((_, i) => i).filter(i => !q.correct.includes(i));
  const toRemove = wrongOpts.sort(() => Math.random() - 0.5).slice(0, 2);
  const items = document.querySelectorAll('.option-item');
  toRemove.forEach(i => {
    if (items[i]) {
      items[i].style.opacity = '0.3';
      items[i].style.pointerEvents = 'none';
      items[i].style.textDecoration = 'line-through';
    }
  });
}

function skipQuestion() {
  answeredQuestions[currentQuestion] = false;
  nextQuestion();
}

function showResult() {
  const total = questions.length;
  const correct = Object.values(answeredQuestions).filter(v => v === true).length;
  const wrong = total - correct;
  const pct = Math.round((correct / total) * 100);
  const diamonds = Math.round(correct * 0.8);

  document.getElementById('result-score').textContent = correct + '/' + total;
  document.getElementById('result-sub').textContent = `Você acertou ${pct}% das questões!`;
  document.getElementById('res-correct').textContent = correct;
  document.getElementById('res-wrong').textContent = wrong;
  document.getElementById('res-diamonds').textContent = '+' + diamonds;

  const wrap = document.getElementById('result-icon-wrap');
  const svg = document.getElementById('result-icon-svg');
  const title = document.getElementById('result-title');

  if (pct >= 80) {
    wrap.className = 'result-icon-wrap great';
    svg.innerHTML = '<use href="#ic-trophy"/>';
    svg.setAttribute('color', 'var(--green-dark)');
    title.textContent = 'Excelente resultado!';
  } else if (pct >= 60) {
    wrap.className = 'result-icon-wrap good';
    svg.innerHTML = '<use href="#ic-star"/>';
    svg.setAttribute('color', '#d4830a');
    title.textContent = 'Bom trabalho!';
  } else {
    wrap.className = 'result-icon-wrap retry';
    svg.innerHTML = '<use href="#ic-book"/>';
    svg.setAttribute('color', 'var(--purple-dark)');
    title.textContent = 'Continue praticando!';
  }

  showScreen('result');
}

function restartQuiz() { startLevel(currentLevel); }

// Init
showScreen('login');