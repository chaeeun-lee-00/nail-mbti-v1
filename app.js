const app = document.querySelector('#app');
const toast = document.querySelector('#toast');

const nails = {
  N01: { name: '무색 유리방울', desc: '클리어 숏 · 작은 버블', icon: '🫧', m: 0, k: 1, intensity: 0, bg: 'linear-gradient(145deg,#e9fbff,#fff)', nail: 'linear-gradient(160deg,#fff,#c9f5ff)' },
  N02: { name: '냉동 별조각', desc: '아이스블루 · 실버 별', icon: '✦', m: 1, k: 1, intensity: 1, bg: 'linear-gradient(145deg,#d8f5ff,#bdd1ff)', nail: 'linear-gradient(160deg,#eefcff,#7cd7ff)' },
  N03: { name: '블랙 하트 프렌치', desc: '누드 · 미니 하트', icon: '♥', m: 2, k: 2, intensity: 1, bg: 'linear-gradient(145deg,#ffe4ef,#e5d9e4)', nail: 'linear-gradient(160deg,#ffd9e6 55%,#211521 56%)' },
  N04: { name: '크롬 가시', desc: '건메탈 · 스틸레토', icon: '†', m: 4, k: 0, intensity: 4, bg: 'linear-gradient(145deg,#43404a,#aeaabd)', nail: 'linear-gradient(160deg,#f5f5ff,#37323c 48%,#c7c3d7)' },
  N05: { name: '딸기우유 리본', desc: '핑크 시럽 · 화이트 리본', icon: '🎀', m: 0, k: 4, intensity: 2, bg: 'linear-gradient(145deg,#ffd0e6,#fff3f9)', nail: 'linear-gradient(160deg,#fff2f7,#ff8dc3)' },
  N06: { name: '토끼 피어싱', desc: '밀크화이트 · 실버 링', icon: '🐰', m: 2, k: 4, intensity: 3, bg: 'linear-gradient(145deg,#f9f0ff,#cbd7ff)', nail: 'linear-gradient(160deg,#fff,#e7d8ff)' },
  N07: { name: '체리 체인', desc: '레드시럽 · 실버 체인', icon: '🍒', m: 4, k: 2, intensity: 4, bg: 'linear-gradient(145deg,#ff9cb0,#4b1830)', nail: 'linear-gradient(160deg,#ffb4c3,#b4003e)' },
  N08: { name: '깨진 핑크 하트', desc: '핑크×블랙 · 금 간 하트', icon: '💔', m: 4, k: 4, intensity: 4, bg: 'linear-gradient(145deg,#ff65aa,#2a1526)', nail: 'linear-gradient(160deg,#ffb5da 45%,#311323 46%)' },
  N09: { name: '파스텔 장난감', desc: '컬러풀 · 3D 파츠', icon: '🧸', m: 1, k: 4, intensity: 4, bg: 'linear-gradient(145deg,#fff1a7,#b9a7ff)', nail: 'linear-gradient(160deg,#fff19b,#ff91c7,#95dcff)' },
  N10: { name: '눈물 자석젤', desc: '라벤더그레이 · 물방울', icon: '💧', m: 3, k: 2, intensity: 2, bg: 'linear-gradient(145deg,#c5b8df,#69748e)', nail: 'linear-gradient(160deg,#efebff,#8f7cae)' },
  N11: { name: '검은 고양이 발톱', desc: '블랙 · 캣아이', icon: '🐈‍⬛', m: 3, k: 3, intensity: 3, bg: 'linear-gradient(145deg,#2e2231,#987ba5)', nail: 'linear-gradient(160deg,#66506b,#191119)' },
  N12: { name: '리본 크롬', desc: '실버 크롬 · 핑크 리본', icon: '🎀', m: 2, k: 4, intensity: 4, bg: 'linear-gradient(145deg,#ccd0dd,#ff9dcb)', nail: 'linear-gradient(160deg,#fff,#999eaa 50%,#f2f3ff)' },
};

const bases = [
  { id: 'clear', name: '클리어', color: 'linear-gradient(160deg,#fff,#dff9ff)', m: 0, k: 1, intensity: 0 },
  { id: 'pink', name: '핑크 시럽', color: 'linear-gradient(160deg,#fff0f7,#ff89bd)', m: 0, k: 4, intensity: 2 },
  { id: 'ice', name: '아이스블루', color: 'linear-gradient(160deg,#effcff,#6dcfff)', m: 1, k: 1, intensity: 1 },
  { id: 'cherry', name: '체리레드', color: 'linear-gradient(160deg,#ffafbf,#bd003f)', m: 4, k: 2, intensity: 4 },
  { id: 'black', name: '블랙 크롬', color: 'linear-gradient(160deg,#9d9aa5,#171017)', m: 4, k: 0, intensity: 4 },
];

const parts = [
  { id: 'bubble', name: '🫧 유리방울', icon: '🫧', m: 0, k: 1, intensity: 1 },
  { id: 'ribbon', name: '🎀 리본', icon: '🎀', m: 0, k: 4, intensity: 2 },
  { id: 'rabbit', name: '🐰 토끼', icon: '🐰', m: 1, k: 4, intensity: 3 },
  { id: 'tear', name: '💧 눈물', icon: '💧', m: 3, k: 2, intensity: 2 },
  { id: 'chain', name: '⛓ 체인', icon: '⛓', m: 4, k: 1, intensity: 4 },
  { id: 'thorn', name: '† 가시', icon: '†', m: 4, k: 0, intensity: 4 },
  { id: 'heart', name: '♥ 하트', icon: '♥', m: 1, k: 4, intensity: 2 },
  { id: 'piercing', name: '◎ 피어싱', icon: '◎', m: 3, k: 2, intensity: 3 },
];

const questions = [
  { id: 'save', type: 'multi', kicker: '첫인상 01', title: '피드에서 발견하면 저장할 네일 2개', guide: '딱 두 개만 골라줘. 오래 고민하지 않아도 돼.', ids: ['N01','N04','N05','N08','N10','N12'], required: 2 },
  { id: 'rank', type: 'rank', kicker: '취향 순위 02', title: '눈이 가는 순서대로 네일 3개 선택', guide: '선택한 순서가 기록돼. 다시 누르면 취소할 수 있어.', ids: ['N02','N03','N06','N07','N09','N11'], required: 3 },
  { id: 'wear', type: 'single', kicker: '실착 취향 03', title: '내일 진짜 시술하고 싶은 네일은?', guide: '구경할 때가 아니라 실제 내 손에 올린다고 생각해줘.', ids: ['N01','N03','N05','N06','N07','N11'], required: 1 },
  { id: 'builder', type: 'builder', kicker: '네일 조합 04', title: '베이스 하나와 파츠 2개로 내 네일 완성', guide: '원하는 베이스와 포인트 파츠를 골라줘.' },
  { id: 'social', type: 'single', kicker: '보이는 취향 05', title: '친구가 “완전 너 같다”고 보내면 기분 좋은 네일', guide: '내가 다른 사람에게 어떻게 보이고 싶은지도 취향이니까.', ids: ['N02','N03','N05','N08','N10','N12'], required: 1 },
  { id: 'forbidden', type: 'single', kicker: '저장 전용 06', title: '예쁘지만 실제로 하기에는 망설여지는 네일', guide: '실착은 어려워도 자꾸 눈이 가는 디자인 하나.', ids: ['N04','N06','N07','N08','N09','N12'], required: 1 },
  { id: 'finger', type: 'finger', kicker: '포인트 선택 07', title: '딱 하나만 화려하게 꾸민다면 어느 손가락?', guide: '가장 먼저 떠오르는 손가락을 골라줘.' },
  { id: 'final', type: 'final', kicker: '마지막 선택 08', title: '예약까지 10분. 네일샵에 가져갈 단 한 장은?', guide: '앞에서 네가 직접 골랐던 네일만 모아봤어.', required: 1 },
];

const results = {
  ll: { name: '감정 OFF 탑젤 유령', emoji: '👻', quote: '아무 생각 없어 보이지만 기준 미달은 조용히 삭제해.', charge: '꾸민 티는 적어도 광택과 마감의 차이는 정확히 알아보는 타입.', tags: ['클리어','누드','숏네일','미니멀'], bg: 'linear-gradient(145deg,#e8fbff,#ffffff)' },
  ml: { name: '얼어붙은 유리 고양이', emoji: '🐈', quote: '답장은 늦게 해도 읽씹당한 시간은 정확히 기억해.', charge: '차가운 컬러 속 작은 실버 디테일에 은근히 마음을 빼앗기는 타입.', tags: ['아이스블루','자석젤','실버','시크'], bg: 'linear-gradient(145deg,#d9f6ff,#b9a7ff)' },
  hl: { name: '흑화 3초 전 크롬 천사', emoji: '🪽', quote: '천사 모드는 상대방의 태도에 따라 조기 종료됩니다.', charge: '애매한 장식보다 블랙 크롬처럼 선명하고 강한 디자인을 좋아해.', tags: ['블랙','크롬','스틸레토','메탈'], bg: 'linear-gradient(145deg,#a9a5b1,#342033)' },
  lm: { name: '말랑 시럽 인간', emoji: '🫠', quote: '말랑해 보인다고 아무거나 섞으면 맛없어져.', charge: '부드러운 컬러를 좋아하지만 시럽의 농도만큼은 타협하지 않아.', tags: ['시럽네일','핑크','글로시','라운드'], bg: 'linear-gradient(145deg,#ffe8f3,#ffacd2)' },
  mm: { name: '리본 뒤 야간모드', emoji: '🎭', quote: '내 손은 청순한데 저장 목록은 새벽 3시야.', charge: '실착은 밀크핑크, 저장함은 블랙 리본과 체인으로 채워지는 타입.', tags: ['핑크블랙','리본','다크큐트','포인트네일'], bg: 'linear-gradient(145deg,#ffb6d8,#6e496b)' },
  hm: { name: '체리맛 가시 악마', emoji: '😈', quote: '다가오지 마. 그런데 왜 진짜 안 와?', charge: '달콤한 하트에도 체인이나 가시 한 조각은 꼭 필요한 타입.', tags: ['체리레드','체인','다크로맨틱','롱네일'], bg: 'linear-gradient(145deg,#ff8eaa,#52162f)' },
  lh: { name: '순애보 토끼젤리', emoji: '🐰', quote: '좋아하는 사람과 네일에는 계산 같은 거 안 해.', charge: '하트와 토끼처럼 귀여운 디테일을 발견하면 바로 저장하는 타입.', tags: ['베이비핑크','토끼','하트','러블리'], bg: 'linear-gradient(145deg,#fff0f7,#ffb9db)' },
  mh: { name: '질투 폭주 리본캣', emoji: '😾', quote: '신경 안 써. 그냥 다 보고 있었을 뿐이야.', charge: '사랑스러운 리본에 낯선 피어싱 하나를 섞을 때 가장 설레는 타입.', tags: ['리본네일','고양이','실버파츠','키치'], bg: 'linear-gradient(145deg,#ffacd4,#b9a7ff)' },
  hh: { name: '고장 난 하트 인형', emoji: '💔', quote: '사랑받고 싶지만 평범해지고 싶지는 않아.', charge: '리본·체인·하트를 한 손에 전부 올려도 아직 부족한 맥시멀 타입.', tags: ['맥시멀','핑크블랙','3D파츠','다크모에'], bg: 'linear-gradient(145deg,#ff5aa7,#4d1839)' },
};

const state = { screen: 'intro', name: '', index: 0, responses: {}, current: null };

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1700);
}

function setScreen(screen) {
  state.screen = screen;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function render() {
  if (state.screen === 'intro') renderIntro();
  if (state.screen === 'name') renderName();
  if (state.screen === 'quiz') renderQuiz();
  if (state.screen === 'loading') renderLoading();
  if (state.screen === 'result') renderResult();
}

function renderIntro() {
  app.innerHTML = `
    <section class="screen intro-screen">
      <span class="eyebrow">✦ PATZ NAIL TASTE TEST</span>
      <h1 class="intro-title">내 네일 취향,<br><strong>몇 대 몇?</strong></h1>
      <p class="lead">네일을 고르면 알아보는<br>나의 멘헤라력 vs 모에력</p>
      <div class="evidence-board" aria-hidden="true">
        <div class="phone"><div class="mini-grid"><span class="mini-nail" style="--bg:#ff99c9">🎀</span><span class="mini-nail" style="--bg:#272027">⛓</span><span class="mini-nail" style="--bg:#dff8ff">🫧</span><span class="mini-nail" style="--bg:#c8b3ff">💧</span></div></div>
        <div class="tape">MENTAL × MOE · MENTAL × MOE</div>
        <div class="stamp">TASTE CHECK</div>
      </div>
      <button class="primary-btn" id="startBtn">테스트 시작하기</button>
      <p class="microcopy">약 2분 · 심리 진단이 아닌 네일 미감 테스트</p>
    </section>`;
  document.querySelector('#startBtn').addEventListener('click', () => setScreen('name'));
}

function renderName() {
  app.innerHTML = `
    <section class="screen name-screen">
      <div class="name-card">
        <span class="eyebrow">MY NAIL PROFILE</span>
        <h2>결과 카드에 표시할<br>이름을 알려줘</h2>
        <p class="lead">입력하지 않아도 테스트할 수 있어.</p>
        <input class="name-input" id="nameInput" maxlength="10" autocomplete="off" placeholder="닉네임 입력 (선택)" value="${escapeHtml(state.name)}" />
        <button class="primary-btn" id="nameBtn">네일 고르기 시작</button>
        <p class="microcopy">정답은 없어. 사진만 보고 편하게 골라줘.</p>
      </div>
    </section>`;
  const input = document.querySelector('#nameInput');
  const go = () => { state.name = input.value.trim() || '익명의 네일 수집가'; state.index = 0; state.current = null; setScreen('quiz'); };
  document.querySelector('#nameBtn').addEventListener('click', go);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function nailOption(id, selection = [], rank = false) {
  const item = nails[id];
  const selectedIndex = selection.indexOf(id);
  return `<button class="option ${selectedIndex >= 0 ? 'selected' : ''}" data-id="${id}" aria-pressed="${selectedIndex >= 0}">
    ${selectedIndex >= 0 && rank ? `<span class="option-rank">${selectedIndex + 1}</span>` : ''}
    <span class="nail-art" data-icon="${item.icon}" style="--card-bg:${item.bg};--nail-bg:${item.nail};--tilt:${(Number(id.slice(1)) % 2 ? -5 : 6)}deg"></span>
    <span class="option-name">${item.name}</span>
    <span class="option-desc">${item.desc}</span>
  </button>`;
}

function defaultCurrent(question) {
  if (state.responses[question.id] != null) return structuredClone(state.responses[question.id]);
  if (question.type === 'multi' || question.type === 'rank') return [];
  if (question.type === 'builder') return { base: null, parts: [] };
  return null;
}

function renderQuiz() {
  const q = questions[state.index];
  if (state.current == null) state.current = defaultCurrent(q);
  const progress = ((state.index + 1) / questions.length) * 100;
  app.innerHTML = `
    <section class="screen quiz-screen">
      <header class="quiz-head">
        <div class="quiz-meta"><span>테스트 진행 중</span><span>${state.index + 1} / ${questions.length}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div>
      </header>
      <div class="question-copy"><p class="question-kicker">${q.kicker}</p><h2>${q.title}</h2><p class="question-guide">${q.guide}</p></div>
      <div id="questionBody"></div>
      <footer class="quiz-footer"><button class="primary-btn" id="nextBtn" ${isValid(q) ? '' : 'disabled'}>${state.index === questions.length - 1 ? '내 취향 결과 보기' : '다음 질문'}</button></footer>
    </section>`;
  renderQuestionBody(q);
  document.querySelector('#nextBtn').addEventListener('click', nextQuestion);
}

function renderQuestionBody(q) {
  const body = document.querySelector('#questionBody');
  if (['multi','rank','single'].includes(q.type)) {
    const selection = Array.isArray(state.current) ? state.current : (state.current ? [state.current] : []);
    body.innerHTML = `<div class="option-grid">${q.ids.map(id => nailOption(id, selection, q.type === 'rank')).join('')}</div>`;
    body.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => selectNail(q, btn.dataset.id)));
  }
  if (q.type === 'builder') renderBuilder(body);
  if (q.type === 'finger') renderFinger(body);
  if (q.type === 'final') {
    const ids = getFinalCandidates();
    const selection = state.current ? [state.current] : [];
    body.innerHTML = `<div class="option-grid">${ids.map(id => nailOption(id, selection, false)).join('')}</div>`;
    body.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => selectNail(q, btn.dataset.id)));
  }
}

function selectNail(q, id) {
  if (q.type === 'single' || q.type === 'final') state.current = id;
  if (q.type === 'multi') {
    const selected = [...state.current];
    const at = selected.indexOf(id);
    if (at >= 0) selected.splice(at, 1);
    else if (selected.length < q.required) selected.push(id);
    else showToast(`딱 ${q.required}개만 고를 수 있어!`);
    state.current = selected;
  }
  if (q.type === 'rank') {
    const selected = [...state.current];
    const at = selected.indexOf(id);
    if (at >= 0) selected.splice(at, 1);
    else if (selected.length < q.required) selected.push(id);
    else showToast('TOP 3 선택 완료!');
    state.current = selected;
  }
  renderQuiz();
}

function renderBuilder(body) {
  const current = state.current;
  const base = bases.find(item => item.id === current.base);
  const icons = current.parts.map(id => parts.find(item => item.id === id).icon);
  body.innerHTML = `
    <div class="builder-preview"><div class="finger-row">${[80,105,116,104,76].map((height, i) => `<span class="preview-nail" style="--height:${height}px;--base:${base?.color || '#f7eff4'}">${icons[i % Math.max(icons.length,1)] || ''}</span>`).join('')}</div></div>
    <p class="builder-title">1. 베이스 선택</p>
    <div class="chip-row">${bases.map(item => `<button class="chip ${current.base === item.id ? 'selected' : ''}" data-base="${item.id}">${item.name}</button>`).join('')}</div>
    <p class="builder-title">2. 포인트 파츠 2개 선택</p>
    <div class="chip-row">${parts.map(item => `<button class="chip ${current.parts.includes(item.id) ? 'selected' : ''}" data-part="${item.id}">${item.name}</button>`).join('')}</div>`;
  body.querySelectorAll('[data-base]').forEach(btn => btn.addEventListener('click', () => { state.current.base = btn.dataset.base; renderQuiz(); }));
  body.querySelectorAll('[data-part]').forEach(btn => btn.addEventListener('click', () => {
    const list = [...state.current.parts];
    const at = list.indexOf(btn.dataset.part);
    if (at >= 0) list.splice(at, 1);
    else if (list.length < 2) list.push(btn.dataset.part);
    else showToast('파츠는 2개까지만 고를 수 있어!');
    state.current.parts = list;
    renderQuiz();
  }));
}

function renderFinger(body) {
  const fingers = [
    { id: 'thumb', label: '엄지', icon: '👍' }, { id: 'index', label: '검지', icon: '☝️' }, { id: 'middle', label: '중지', icon: '🖤' }, { id: 'ring', label: '약지', icon: '💍' }, { id: 'pinky', label: '새끼', icon: '🤙' }
  ];
  body.innerHTML = `<div class="builder-preview"><div class="finger-row">${[80,105,116,104,76].map((height, i) => `<span class="preview-nail" style="--height:${height}px;--base:${state.current === fingers[i].id ? 'var(--pink)' : '#ffdbea'}">${state.current === fingers[i].id ? '✦' : ''}</span>`).join('')}</div></div><div class="finger-choices">${fingers.map(item => `<button class="finger-choice ${state.current === item.id ? 'selected' : ''}" data-finger="${item.id}">${item.icon}<br>${item.label}</button>`).join('')}</div>`;
  body.querySelectorAll('[data-finger]').forEach(btn => btn.addEventListener('click', () => { state.current = btn.dataset.finger; renderQuiz(); }));
}

function isValid(q) {
  if (q.type === 'multi' || q.type === 'rank') return Array.isArray(state.current) && state.current.length === q.required;
  if (q.type === 'builder') return state.current?.base && state.current.parts?.length === 2;
  return Boolean(state.current);
}

function nextQuestion() {
  const q = questions[state.index];
  if (!isValid(q)) return;
  state.responses[q.id] = structuredClone(state.current);
  showToast(state.index === questions.length - 1 ? '선택 완료!' : '선택을 저장했어');
  if (state.index < questions.length - 1) {
    state.index += 1;
    state.current = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderQuiz();
  } else setScreen('loading');
}

function getFinalCandidates() {
  const ids = [];
  ['wear','social','forbidden'].forEach(key => { const value = state.responses[key]; if (value && !ids.includes(value)) ids.push(value); });
  ['save','rank'].forEach(key => (state.responses[key] || []).forEach(id => { if (!ids.includes(id)) ids.push(id); }));
  Object.keys(nails).forEach(id => { if (ids.length < 4 && !ids.includes(id)) ids.push(id); });
  return ids.slice(0, 4);
}

function renderLoading() {
  app.innerHTML = `<section class="screen loading-screen"><div><div class="scanner"><div class="scan-nail"></div><div class="scan-line"></div></div><span class="eyebrow">취향 분석 중</span><h2 id="loadingText">저장 취향 확인 중…</h2><div class="loading-bar"><span id="loadingFill" style="width:12%"></span></div><p class="microcopy">네가 고른 디자인의 공통점을 찾고 있어.</p></div></section>`;
  const messages = [
    ['실착 취향 비교 중…', 38], ['컬러와 파츠 조합 중…', 64], ['멘헤라력과 모에력 계산 중…', 84], ['결과 완성!', 100]
  ];
  let i = 0;
  const timer = setInterval(() => {
    const [message, width] = messages[i];
    document.querySelector('#loadingText').textContent = message;
    document.querySelector('#loadingFill').style.width = `${width}%`;
    i += 1;
    if (i === messages.length) {
      clearInterval(timer);
      setTimeout(() => setScreen('result'), 500);
    }
  }, 600);
}

function addScore(acc, source, weight) {
  acc.m += source.m * weight;
  acc.k += source.k * weight;
  acc.denom += 4 * weight;
}

function calculateResult() {
  const acc = { m: 0, k: 0, denom: 0 };
  const evidence = new Map();
  const addNail = (id, weight) => {
    if (!id || !nails[id]) return;
    addScore(acc, nails[id], weight);
    evidence.set(id, (evidence.get(id) || 0) + weight);
  };
  (state.responses.save || []).forEach(id => addNail(id, 1));
  (state.responses.rank || []).forEach((id, i) => addNail(id, [1.4,.9,.5][i]));
  addNail(state.responses.wear, 1.5);
  addNail(state.responses.social, 1);
  addNail(state.responses.forbidden, .4);
  addNail(state.responses.final, 1.8);

  const built = state.responses.builder;
  if (built) {
    addScore(acc, bases.find(item => item.id === built.base), .7);
    built.parts.forEach(id => addScore(acc, parts.find(item => item.id === id), .8));
  }
  const fingerAdjustments = { thumb: {m:0,k:0}, index:{m:.3,k:0}, middle:{m:.5,k:0}, ring:{m:0,k:.5}, pinky:{m:0,k:.3} };
  const finger = fingerAdjustments[state.responses.finger] || {m:0,k:0};
  acc.m += finger.m;
  acc.k += finger.k;

  const rawM = Math.max(0, Math.min(100, acc.m / acc.denom * 100));
  const rawK = Math.max(0, Math.min(100, acc.k / acc.denom * 100));
  // The two axes have different card-pool averages. This calibration keeps one
  // visually common axis from swallowing the other before real beta data arrives.
  const calibrate = (raw, lowCut, highCut) => {
    if (raw < lowCut) return Math.round(raw / lowCut * 33);
    if (raw < highCut) return Math.round(33 + (raw - lowCut) / (highCut - lowCut) * 34);
    return Math.round(67 + (raw - highCut) / (100 - highCut) * 33);
  };
  const m = calibrate(rawM, 45, 56);
  const k = calibrate(rawK, 54, 66);
  const band = score => score < 34 ? 'l' : score < 67 ? 'm' : 'h';
  const key = `${band(m)}${band(k)}`;

  const saveChoices = (state.responses.save || []).map(id => ({ id, weight: 1 }));
  if (state.responses.forbidden) saveChoices.push({ id: state.responses.forbidden, weight: .25 });
  const wearChoices = [
    { id: state.responses.wear, weight: 1 },
    { id: state.responses.final, weight: 1.3 },
  ].filter(item => item.id);
  const weightedIntensity = choices => {
    const weight = choices.reduce((sum, item) => sum + item.weight, 0) || 1;
    return choices.reduce((sum, item) => sum + nails[item.id].intensity * item.weight, 0) / weight;
  };
  const delta = weightedIntensity(saveChoices) - weightedIntensity(wearChoices);
  const subtype = delta >= .6 ? '봉인형' : delta <= -.6 ? '폭주형' : '본체형';
  const temperature = Math.round(Math.abs(delta) * 25);
  const topEvidence = [...evidence.entries()].sort((a,b) => b[1] - a[1]).slice(0,3).map(([id]) => nails[id].name);
  return { ...results[key], key, m, k, subtype, temperature, topEvidence };
}

function renderResult() {
  const result = calculateResult();
  const name = escapeHtml(state.name);
  app.innerHTML = `
    <section class="screen result-screen">
      <span class="eyebrow">✦ 분석 완료</span>
      <div class="report">
        <p class="result-label">${name}의 네일 취향</p>
        <h2 class="result-name">${result.subtype}<br>${result.name}</h2>
        <p class="result-quote">“${result.quote}”</p>
        <div class="character-card" style="--result-bg:${result.bg}"><span class="character-emoji">${result.emoji}</span><span class="subtype-stamp">${result.subtype}</span></div>
        <div class="score-list">
          ${scoreBar('멘헤라력', result.m, '#ff4fa3')}
          ${scoreBar('모에력', result.k, '#b9a7ff')}
          ${scoreBar('취향 온도 차이', result.temperature, '#dfff4f')}
        </div>
        <div class="charge"><strong>내 취향 한 줄 요약</strong><p>${result.charge}</p></div>
        <div class="tags">${result.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}</div>
        <div class="charge"><strong>내가 좋아한 디자인</strong><p>${result.topEvidence.join(' · ')}</p></div>
      </div>
      <div class="result-actions">
        <button class="primary-btn" id="shareBtn">친구에게 공유하기</button>
        <button class="primary-btn patz-btn" id="patzBtn">파츠에서 일치 네일 36개 보기</button>
        <button class="secondary-btn" id="copyBtn">결과 문구 복사</button>
      </div>
      <button class="restart-btn" id="restartBtn">다시 테스트하기</button>
      <p class="disclaimer">이 결과는 실제 심리·정신건강 진단이 아닌 재미를 위한 네일 미감 테스트입니다.</p>
    </section>`;
  const shareText = `${state.name}의 네일 취향은 몇 대 몇?\n${result.subtype} ${result.name}\n멘헤라 ${result.m} · 모에 ${result.k}\n너의 네일 취향도 확인해봐!`;
  document.querySelector('#shareBtn').addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share({ title: '내 네일 취향, 몇 대 몇?', text: shareText, url: location.href }); }
      catch (_) { /* user cancelled */ }
    } else {
      await copyText(`${shareText}\n${location.href}`);
      showToast('공유 문구를 복사했어!');
    }
  });
  document.querySelector('#copyBtn').addEventListener('click', async () => { await copyText(shareText); showToast('결과를 복사했어!'); });
  document.querySelector('#patzBtn').addEventListener('click', () => showToast('파츠 딥링크가 들어갈 자리야 ✦'));
  document.querySelector('#restartBtn').addEventListener('click', () => { state.index = 0; state.responses = {}; state.current = null; setScreen('intro'); });
}

function scoreBar(label, value, color) {
  return `<div><div class="score-head"><span>${label}</span><span>${value}</span></div><div class="score-track"><span style="width:${value}%;--fill:${color}"></span></div></div>`;
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch (_) {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
}

render();
