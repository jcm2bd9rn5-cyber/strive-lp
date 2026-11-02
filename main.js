(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const header = document.getElementById('header');
  const progress = document.getElementById('progress-fill');
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.header__nav a')];

  // A single consistent reveal language. The site works without JavaScript.
  const reveals = [...document.querySelectorAll('.reveal')];
  if (!reduce && 'IntersectionObserver' in window) {
    // Mark only elements currently out of view; avoid hiding content already displayed.
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight * .88) el.classList.add('will-reveal');
      else el.classList.add('is-visible');
    });
    root.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      for (const item of entries) {
        if (!item.isIntersecting) continue;
        item.target.classList.add('is-visible');
        observer.unobserve(item.target);
      }
    }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  let scheduled = false;
  const refresh = () => {
    scheduled = false;
    const y = Math.max(0, window.scrollY);
    if (header) header.classList.toggle('is-scrolled', y > 18);
    if (progress) {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }
    const current = sections.filter(s => s.getBoundingClientRect().top < innerHeight * .43).at(-1)?.id;
    links.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
  };
  const queueRefresh = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(refresh);
  };
  window.addEventListener('scroll', queueRefresh, { passive: true });
  window.addEventListener('resize', queueRefresh, { passive: true });
  refresh();

  // Only the atmospheric light source responds gently to the pointer.
  const stage = document.getElementById('hero-stage');
  if (stage && !reduce && matchMedia('(pointer:fine)').matches) {
    let raf = 0;
    stage.addEventListener('pointermove', e => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - .5;
        const y = (e.clientY - rect.top) / rect.height - .5;
        stage.style.setProperty('--mx', `${Math.max(-12, Math.min(12, x*24))}px`);
        stage.style.setProperty('--my', `${Math.max(-9, Math.min(9, y*18))}px`);
      });
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--mx', '0px');
      stage.style.setProperty('--my', '0px');
    });
  }
})();