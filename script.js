/* ─── Dados do Site ─────────────────────────────
   Substitua os valores entre aspas antes de publicar.
   ─────────────────────────────────────────────── */
const DADOS = {
  linkWpp: "https://api.whatsapp.com/send/?phone=5543999354464&text&type=phone_number&app_absent=0",
  numeroOab: "OAB/PR 127.251",
  numeroCpf: "111.313.049-00",
  nomeCurto: "Beatriz Bortoto",

  // ─── Especialidades ──────────────────────────
  // Cada item: { icon, titulo, descricao }
  especialidades: [
    {
      icon: "⚖️",
      titulo: "Direito Cível",
      descricao: "Atuo em ações de cobrança, contratos, indenizações por danos morais e materiais, rescisões contratuais, responsabilidade civil e relações de consumo. Analiso cada caso com rigor técnico para identificar a melhor estratégia, buscando acordos vantajosos ou atuando com firmeza no processo judicial quando necessário. Meu objetivo é proteger o seu patrimônio e atuar firmemente para que seus direitos sejam respeitados em todas as relações civis."
    },
    {
      icon: "🏛️",
      titulo: "Direito Previdenciário",
      descricao: "Especializada em concessão e revisão de benefícios junto ao INSS: aposentadoria por tempo de contribuição, por idade, por invalidez, auxílio-doença, BPC/LOAS e pensão por morte. Recorro de indeferimentos, calculo o melhor momento para requerer seu benefício e combato revisões indevidas. Se o INSS negou ou cortou seu benefício, estou pronta para buscar as vias legais adequadas visando a revisão dessa decisão e a busca pela proteção dos seus direitos previdenciários."
    },
    {
      icon: "💼",
      titulo: "Direito Trabalhista",
      descricao: "Defendo trabalhadores e empresas em questões como verbas rescisórias (FGTS, aviso prévio, 13º salário), reconhecimento de vínculo empregatício, assédio moral e sexual no trabalho, horas extras não pagas, adicional de insalubridade/periculosidade e acordos coletivos. Atuo tanto na Justiça do Trabalho quanto em negociações extrajudiciais, sempre com foco em buscar a melhor solução jurídica para o meu cliente, atuando com máxima diligência e dedicação técnica em cada etapa."
    },
    {
      icon: "🛡️",
      titulo: "Direito Criminal",
      descricao: "Ofereço defesa técnica e humanizada em inquéritos policiais, flagrantes, audiências de custódia e todas as fases do processo penal. Atuo em crimes contra a pessoa, patrimônio, honra, trânsito e entorpecentes, além de crimes cibernéticos. Também oriento vítimas na elaboração de boletins de ocorrência e acompanho ações penais privadas. A sua liberdade e reputação são bens que merecem a mais séria e dedicada proteção jurídica."
    }
  ]
};

/* ════════════════════════════════
   INIT
   ════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  applyLinks();
  renderAreaCards();
  initNav();
  initScrollBehavior();
  initReveal();
});

/* ─── Preenche todos os links e placeholders de dados ─── */
function applyLinks() {
  // All WPP links are already hardcoded in HTML — nothing to replace here.
  // This function is kept for future dynamic substitution if needed.
}

/* ─── Renderiza cards de áreas de atuação ─── */
function renderAreaCards() {
  const grid = document.getElementById('areasGrid');
  if (!grid) return;

  DADOS.especialidades.forEach((area, i) => {
    const card = document.createElement('article');
    card.className = 'area-card';
    card.setAttribute('data-reveal', '');
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="area-num">0${i + 1}</div>
      <div class="area-icon">${area.icon}</div>
      <h3>${area.titulo}</h3>
      <p>${area.descricao}</p>
    `;
    grid.appendChild(card);
  });
}

/* ─── Nav scroll & hamburger ─── */
function initNav() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    animateHamburger(hamburger, isOpen);
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      animateHamburger(hamburger, false);
    });
  });
}

function animateHamburger(btn, isOpen) {
  const spans = btn.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

/* ─── Smooth scroll offset for fixed header ─── */
function initScrollBehavior() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('header').offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── Reveal on scroll (IntersectionObserver) ─── */
function initReveal() {
  /* Add data-reveal to all major section children */
  const revealSelectors = [
    '.hero-content', '.hero-visual',
    '.sobre-visual', '.sobre-content',
    '.section-header',
    '.valor-card', '.step',
    '.contato-content', '.contato-visual',
    '.footer-top', '.footer-bottom'
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}
