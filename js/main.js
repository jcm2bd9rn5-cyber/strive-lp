// Strive premium LP — lightweight, progressive enhancement.
// All content remains available when JS is disabled.
(() => {
  "use strict";
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.getElementById("site-header");
  const progress = document.querySelector(".scroll-progress");
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

  if (!reduceMotion && "IntersectionObserver" in window) {
    // Mark only below-the-fold elements as reveal candidates to avoid hiding the hero.
    const fold = window.innerHeight;
    revealItems.forEach(el => {
      if (el.getBoundingClientRect().top > fold * 0.78) el.classList.add("will-reveal");
    });
    root.classList.add("js");
    // Avoid hidden content during slow device load; ensure the hero remains visible.
    revealItems.forEach(el => {
      if (!el.classList.contains("will-reveal")) el.classList.add("is-visible");
    });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  // Only update a tiny progress transform during scroll.
  let scrollScheduled = false;
  const updateScroll = () => {
    scrollScheduled = false;
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
    if (progress) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      progress.style.transform = "scaleX(" + ratio.toFixed(4) + ")";
    }
  };
  window.addEventListener("scroll", () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      window.requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  window.addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  // Meaningful movement: a restrained light-source response, not a scattered
  // set of unrelated parallax animations.
  const stage = document.querySelector("[data-stage]");
  if (stage && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let scheduled = false;
    let last = null;
    stage.addEventListener("pointermove", event => {
      last = { x: event.clientX, y: event.clientY };
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        const rect = stage.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, ((last.x - rect.left) / rect.width - .5) * 2));
        const y = Math.max(-1, Math.min(1, ((last.y - rect.top) / rect.height - .5) * 2));
        stage.style.setProperty("--pointer-x", (x * 17).toFixed(1) + "px");
        stage.style.setProperty("--pointer-y", (y * 12).toFixed(1) + "px");
      });
    }, { passive: true });
    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--pointer-x", "0px");
      stage.style.setProperty("--pointer-y", "0px");
    });
  }

  // Functional interactive product explorer, using real app captures.
  const showcase = document.querySelector("[data-showcase]");
  const items = {
    workout: {
      src: "assets/screens/workout.webp",
      alt: "前回の重量と回数を確認しながら記録できるStriveの実画面。",
      index: "01",
      kicker: "01 / YOUR LAST SET",
      title: "前回を知れば、\n次が見える。",
      body: "前回の重量と回数を目の前に。入力と休憩タイマーも一画面にまとめ、トレーニングのリズムを途切れさせない。",
      tag: "LESS TAPPING. MORE TRAINING."
    },
    analytics: {
      src: "assets/screens/analytics.webp",
      alt: "トレーニング量、頻度、自己ベストなどを確認できるStriveの分析画面。",
      index: "02",
      kicker: "02 / TRACK YOUR PROGRESS",
      title: "努力は、\n数字に残る。",
      body: "積み上げたボリューム、頻度、PRを可視化。変化が見えるから、次の目標がはっきりする。",
      tag: "EVERY REP COUNTS."
    },
    battle: {
      src: "assets/battle.webp",
      alt: "友達とトレーニング回数とPR更新を競えるStriveのバトル画面。",
      index: "03",
      kicker: "03 / TURN IT INTO FUEL",
      title: "悔しさを、\n次の挑戦へ。",
      body: "筋トレ回数で競う「継続で勝つ」。自己ベスト更新で競う「PRで超える」。その差が、また行く理由になる。",
      tag: "MAKE THE NEXT REP PERSONAL."
    }
  };
  if (showcase) {
    const buttons = Array.from(showcase.querySelectorAll("[data-screen]"));
    const image = document.getElementById("showcase-image");
    const number = document.getElementById("showcase-number");
    const kicker = document.getElementById("showcase-kicker");
    const title = document.getElementById("showcase-title");
    const body = document.getElementById("showcase-body");
    const tag = document.getElementById("showcase-tag");
    let active = "workout";
    let sequence = 0;

    // Preload alternate screens so navigation isn't delayed on most devices.
    ["analytics", "battle"].forEach(key => {
      const preload = new Image();
      preload.src = items[key].src;
    });

    const changeScreen = key => {
      const item = items[key];
      if (!item || key === active) return;
      active = key;
      sequence += 1;
      const thisSequence = sequence;
      buttons.forEach(button => {
        const selected = button.dataset.screen === key;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      if (!image) return;
      if (!reduceMotion) image.classList.add("is-changing");
      const render = () => {
        if (thisSequence !== sequence) return;
        image.src = item.src;
        image.alt = item.alt;
        number.textContent = item.index;
        kicker.textContent = item.kicker;
        title.textContent = item.title;
        title.style.whiteSpace = "pre-line";
        body.textContent = item.body;
        tag.textContent = item.tag;
        image.classList.remove("is-changing");
      };
      if (reduceMotion) render();
      else window.setTimeout(render, 165);
    };
    buttons.forEach(button => {
      button.addEventListener("click", () => changeScreen(button.dataset.screen));
    });
    // Arrow keys work within the visual tabs and don't trap Tab focus.
    buttons.forEach((button, index) => button.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = buttons[(index + step + buttons.length) % buttons.length];
      next.focus();
      changeScreen(next.dataset.screen);
    }));
  }
})();