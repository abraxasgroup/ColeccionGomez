/* ============================================
   COLECCIÓN GOMEZ — SCRIPT.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ───────────────────────────────────
  const loader = document.getElementById('loader');
  document.body.classList.add('loading');

  setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.remove('loading');
    initReveal();
  }, 2200);

  // ── CUSTOM CURSOR ────────────────────────────
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });

    (function tickRing() {
      rx += (mx - rx) * 0.09;
      ry += (my - ry) * 0.09;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(tickRing);
    })();

    const hoverEls = document.querySelectorAll('a, button, .news-card, .coll-item, .svc-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('expand'));
      el.addEventListener('mouseleave', () => cur.classList.remove('expand'));
    });
  }

  // ── NAV ──────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ── MOBILE MENU ──────────────────────────────
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.mm-link').forEach(l => {
    l.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  // ── SCROLL REVEAL ────────────────────────────
  function initReveal() {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
  }

  // ── SMOOTH SCROLL ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const offset = nav.offsetHeight;
        window.scrollTo({ top: t.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ── MAGNETIC BUTTONS ─────────────────────────
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ── PARALLAX HERO LINES ──────────────────────
  const heroLines = document.querySelector('.hero-lines');
  if (heroLines) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroLines.style.transform = `translateY(${y * 0.15}px)`;
    });
  }

  // ── IMAGE PARALLAX ───────────────────────────
  const parallaxImgs = document.querySelectorAll('.coll-img-inner img, .bio-img-wrap img');
  if (window.matchMedia('(min-width: 768px)').matches) {
    window.addEventListener('scroll', () => {
      parallaxImgs.forEach(img => {
        const rect = img.closest('[class$="inner"], .bio-img-wrap').getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const move   = center * 0.06;
        img.style.transform = `scale(1.08) translateY(${move}px)`;
      });
    });
  }

  // ── ACTIVE NAV HIGHLIGHT ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(l => {
      l.style.color = '';
      if (l.getAttribute('href') === '#' + current) l.style.color = 'var(--gold)';
    });
  });

});
