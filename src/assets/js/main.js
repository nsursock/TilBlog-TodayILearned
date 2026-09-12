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

  // threshold > 0 fails for tall elements (long posts): viewport/height can stay
  // below 12% forever on mobile, leaving opacity:0 content permanently hidden.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -32px 0px", threshold: 0 },
  );

  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // Already on screen (or taller than the viewport) → show immediately.
    if (rect.top < vh && rect.bottom > 0) {
      node.classList.add("is-in");
      return;
    }
    observer.observe(node);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveals);
} else {
  initReveals();
}
