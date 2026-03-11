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
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D9AB73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="3" x2="12" y2="21"/>
        <path d="M5 9l7-6 7 6"/>
        <path d="M5 9c0 2.76 3.13 5 7 5s7-2.24 7-5"/>
        <line x1="5" y1="21" x2="19" y2="21"/>
      </svg>`,
      titulo: "Direito Cível",
      descricao: "Atuo em ações de cobrança, contratos, indenizações por danos morais e materiais, rescisões contratuais, responsabilidade civil e relações de consumo. Analiso cada caso com rigor técnico para identificar a melhor estratégia, buscando acordos vantajosos ou atuando com firmeza no processo judicial quando necessário. Meu objetivo é proteger o seu patrimônio e atuar firmemente para que seus direitos sejam respeitados em todas as relações civis."
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D9AB73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>`,
      titulo: "Direito Previdenciário",
      descricao: "Especializada em concessão e revisão de benefícios junto ao INSS: aposentadoria por tempo de contribuição, por idade, por invalidez, auxílio-doença, BPC/LOAS e pensão por morte. Recorro de indeferimentos, calculo o melhor momento para requerer seu benefício e combato revisões indevidas. Se o INSS negou ou cortou seu benefício, estou pronta para buscar as vias legais adequadas visando a revisão dessa decisão e a busca pela proteção dos seus direitos previdenciários."
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D9AB73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>`,
      titulo: "Direito Trabalhista",
      descricao: "Defendo trabalhadores e empresas em questões como verbas rescisórias (FGTS, aviso prévio, 13º salário), reconhecimento de vínculo empregatício, assédio moral e sexual no trabalho, horas extras não pagas, adicional de insalubridade/periculosidade e acordos coletivos. Atuo tanto na Justiça do Trabalho quanto em negociações extrajudiciais, sempre com foco em buscar a melhor solução jurídica para o meu cliente, atuando com máxima diligência e dedicação técnica em cada etapa."
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D9AB73" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>`,
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
