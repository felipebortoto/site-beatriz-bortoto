/* ─── Dados do Site ─────────────────────────────
   Substitua os valores entre aspas antes de publicar.
   ─────────────────────────────────────────────── */
const DADOS = {
  linkWpp: "[LINK_WPP]",          // Ex: "https://wa.me/5511999999999"
  numeroOab: "[NUMERO_OAB]",      // Ex: "OAB/SP 12345"
  numeroCpf: "[NUMERO_CPF]",      // Ex: "000.000.000-00"
  nomeCurto: "Beatriz Bortoto",

  // ─── Especialidades ──────────────────────────
  // Cada item: { icon, titulo, descricao (max 250 chars) }
  especialidades: [
    {
      icon: "👨‍👩‍👧",
      titulo: "Direito de Família",
      descricao: "Divórcio, guarda, pensão alimentícia e inventário. Resolvo conflitos familiares com sensibilidade e eficiência, garantindo seus direitos sem desgaste emocional desnecessário."
    },
    {
      icon: "⚖️",
      titulo: "Direito Civil",
      descricao: "Contratos, cobranças, rescisões e indenizações. Defendo seus interesses em relações civis com estratégia clara e atuação focada no resultado que você precisa."
    },
    {
      icon: "🏠",
      titulo: "Direito Imobiliário",
      descricao: "Compra, venda, locação e regularização de imóveis. Garanto segurança jurídica em cada etapa da sua transação imobiliária, evitando riscos e prejuízos futuros."
    },
    {
      icon: "💼",
      titulo: "Direito do Trabalho",
      descricao: "Verbas rescisórias, assédio, demissão indevida e acordos. Protejo seus direitos trabalhistas com agilidade e expertise, seja você trabalhador ou empresa."
    },
    {
      icon: "🛡️",
      titulo: "Direito do Consumidor",
      descricao: "Cancelamentos, cobranças indevidas, produtos defeituosos e danos morais. Faço valer seus direitos frente a empresas e prestadores de serviço de forma rápida e eficaz."
    },
    {
      icon: "📜",
      titulo: "Inventário e Herança",
      descricao: "Abertura de inventário, partilha de bens e planejamento sucessório. Cuido do processo com cuidado e celeridade para proteger o patrimônio da sua família."
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
  /* Links WhatsApp */
  document.querySelectorAll('[href="[LINK_WPP]"]').forEach(el => {
    el.setAttribute("href", DADOS.linkWpp);
  });

  /* OAB no body texto */
  document.querySelectorAll('*:not(script):not(style)').forEach(el => {
    if (el.childNodes.length === 0) return;
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) { // text node
        const txt = node.textContent;
        if (txt.includes('[NUMERO_OAB]') || txt.includes('[NUMERO_CPF]') || txt.includes('[NOME_ADVOGADA]')) {
          node.textContent = txt
            .replace(/\[NUMERO_OAB\]/g, DADOS.numeroOab)
            .replace(/\[NUMERO_CPF\]/g, DADOS.numeroCpf)
            .replace(/\[NOME_ADVOGADA\]/g, DADOS.nomeCurto);
        }
      }
    });
  });
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
