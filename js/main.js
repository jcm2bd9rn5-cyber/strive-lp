// Content stays visible when JavaScript is unavailable.
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(
      ".feature__copy, .analytics__header, .story__inner, .pro__inner",
    )
    .forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
}

// Toggle only when crossing the threshold; no continuous scroll animation.
const header = document.querySelector(".header");
const updateHeader = () =>
  header.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
