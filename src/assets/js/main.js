import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.start();

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  nodes.forEach((node) => observer.observe(node));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveals);
} else {
  initReveals();
}
