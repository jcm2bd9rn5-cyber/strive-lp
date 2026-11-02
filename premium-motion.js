/**
 * STRIVE / cinematic product narrative
 * Scroll is the timeline. No animation dependencies or background timers.
 * Readable without JS, no focus traps, honors OS reduced-motion preferences.
 */
(() => {
  'use strict';
  const doc = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.querySelector('main');
  const header = document.getElementById('header');
  const progress = document.getElementById('progress-fill');
  const hero = document.querySelector('.hero');
  const philosophy = document.getElementById('philosophy');
  const orbit = document.getElementById('strive-orbit');
  const orbitNodes = orbit ? Array.from(orbit.querySelectorAll('.orbit__item')) : [];
  const journey = document.getElementById('experience');
  const journeyScene = document.getElementById('journey-scene');
  const visualFrame = document.querySelector('.journey__visual-frame');
  const storySteps = Array.from(document.querySelectorAll('[data-journey-step]'));
  const jumpButtons = Array.from(document.querySelectorAll('[data-jump]'));
  const sceneCaption = document.getElementById('journey-caption');
  const sceneOutline = journeyScene?.querySelector('.journey__outline');
  const mission = document.querySelector('.mission');
  const navigation = Array.from(document.querySelectorAll('.header__nav a'));
  const chapters = ['philosophy', 'experience', 'battle'];
  const clamp = (n, low = 0, high = 1) => Math.max(low, Math.min(high, n));
  const formatPx = n => `${n.toFixed(1)}px`;
  const labels = { record: 'WORKOUT RECORD', analysis: 'PROGRESS ANALYSIS', battle: 'FRIENDS & BATTLE' };
  const nums = { record: '01', analysis: '02', battle: '03' };
  const hasMotion = () => !prefersReducedMotion.matches;

  // Progressive scroll entry, only hiding items outside the initial view.
  const revealElements = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && hasMotion()) {
    revealElements.forEach(node => {
      if (node.getBoundingClientRect().top > innerHeight * .83) node.classList.add('will-reveal');
      else node.classList.add('is-visible');
    });
    doc.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -38px 0px', threshold: .06 });
    revealElements.forEach(node => observer.observe(node));
  } else {
    doc.classList.add('js');
    revealElements.forEach(node => node.classList.add('is-visible'));
  }

  let activeJourneyStep = 'record';
  const selectStep = id => {
    if (!labels[id] || id === activeJourneyStep) return;
    activeJourneyStep = id;
    if (journeyScene) journeyScene.dataset.current = id;
    if (sceneCaption) sceneCaption.textContent = labels[id];
    if (sceneOutline) sceneOutline.textContent = nums[id];
    storySteps.forEach(node => node.classList.toggle('is-current', node.dataset.journeyStep === id));
    jumpButtons.forEach(button => {
      const active = button.dataset.jump === id;
      button.classList.toggle('is-current', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const chooseActiveStep = () => {
    if (!journey || !visualFrame || storySteps.length === 0) return;
    const bounds = journey.getBoundingClientRect();
    if (bounds.bottom < 0 || bounds.top > innerHeight) return;
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const probeY = mobile
      ? Math.min(innerHeight - 75, visualFrame.getBoundingClientRect().bottom + 94)
      : innerHeight * .52;
    let bestId = activeJourneyStep;
    let bestDistance = Infinity;
    for (const article of storySteps) {
      const rect = article.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom >= probeY) {
        bestId = article.dataset.journeyStep;
        break;
      }
      const distance = Math.min(Math.abs(rect.top - probeY), Math.abs(rect.bottom - probeY));
      if (distance < bestDistance) {
        bestDistance = distance;
        bestId = article.dataset.journeyStep;
      }
    }
    selectStep(bestId);
  };

  // Small unobtrusive direct-selection controls, synchronized to scroll state.
  jumpButtons.forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.jump;
    const target = storySteps.find(node => node.dataset.journeyStep === id);
    if (!target) return;
    selectStep(id);
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const offset = mobile ? visualFrame.getBoundingClientRect().height + 77 : Math.min(innerHeight * .1, 95);
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top, behavior: hasMotion() ? 'smooth' : 'instant' });
  }));

  let scrollFrame = 0;
  const updateScroll = () => {
    scrollFrame = 0;
    const y = Math.max(0, scrollY);
    const height = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${height > 0 ? clamp(y / height).toFixed(4) : 0})`;
    header?.classList.toggle('is-scrolled', y > 18);

    // One continuous camera pull-back: the image, headline and actual app screens
    // travel at different depths. Effects are disabled for reduced motion.
    if (hero && hasMotion()) {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const p = clamp(-rect.top / Math.max(rect.height, 1));
        hero.style.setProperty('--hero-photo', formatPx(-p * 55));
        hero.style.setProperty('--hero-glow-shift', formatPx(p * 28));
        hero.style.setProperty('--hero-stage-shift', formatPx(-p * 45));
        hero.style.setProperty('--hero-copy-shift', formatPx(-p * 18));
        hero.style.setProperty('--hero-copy-alpha', String(1 - p * .3));
        hero.style.setProperty('--hero-left-y', formatPx(-p * 56));
        hero.style.setProperty('--hero-left-x', formatPx(-p * 24));
        hero.style.setProperty('--hero-center-y', formatPx(-p * 86));
        hero.style.setProperty('--hero-right-y', formatPx(-p * 46));
        hero.style.setProperty('--hero-right-x', formatPx(p * 22));
      }
    }
    if (philosophy && orbit && hasMotion()) {
      const rect = philosophy.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const progress = clamp((innerHeight * .75 - rect.top) / Math.max(1, rect.height + innerHeight * .2));
        orbit.style.setProperty('--orbit-rotation', `${(progress * 34 - 14).toFixed(1)}deg`);
        const index = Math.min(4, Math.floor(progress * 5));
        orbitNodes.forEach((node, i) => node.classList.toggle('is-lit', index === i));
      }
    }
    if (mission && hasMotion()) {
      const rect = mission.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        mission.style.setProperty('--mission-line', clamp((innerHeight * .8 - rect.top) / (rect.height * .7)).toFixed(2));
      }
    }
    chooseActiveStep();
    const active = [...chapters].reverse().find(id => {
      const element = document.getElementById(id);
      return element && element.getBoundingClientRect().top <= innerHeight * .5;
    });
    navigation.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${active}`));
  };
  const scheduleScroll = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
  };
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll, { passive: true });
  prefersReducedMotion.addEventListener?.('change', () => {
    revealElements.forEach(el => el.classList.add('is-visible'));
    scheduleScroll();
  });
  scheduleScroll();

  // Fine-pointer parallax adjusts the light, not the readability of phone UI.
  const stage = document.getElementById('hero-stage');
  if (stage && window.matchMedia('(pointer: fine)').matches) {
    let pointerFrame = 0;
    let point = null;
    stage.addEventListener('pointermove', e => {
      if (!hasMotion()) return;
      point = { x: e.clientX, y: e.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const rect = stage.getBoundingClientRect();
        const x = clamp((point.x - rect.left) / rect.width, 0, 1) - .5;
        const y = clamp((point.y - rect.top) / rect.height, 0, 1) - .5;
        stage.style.setProperty('--mx', formatPx(x * 28));
        stage.style.setProperty('--my', formatPx(y * 21));
      });
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--mx', '0px');
      stage.style.setProperty('--my', '0px');
    });
  }
})();
