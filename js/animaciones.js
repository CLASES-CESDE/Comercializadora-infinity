(function () {
  "use strict";

  /* ---------- menú móvil ---------- */
  var burger = document.getElementById("burger");
  var panel = document.getElementById("mobile-panel");
  var close = document.getElementById("close-panel");

  function setPanel(open) {
    if (!panel) return;
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setPanel(true); });
  if (close) close.addEventListener("click", function () { setPanel(false); });
  if (panel) {
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setPanel(false); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setPanel(false);
  });

  /* header pegado */
  var head = document.getElementById("site-head");
  function onScroll() {
    if (!head) return;
    head.classList.toggle("is-stuck", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- animaciones ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !window.gsap) return;

  gsap.registerPlugin(ScrollTrigger);

  // Entrada del hero
  var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.from(".hero [data-hero='1']", { y: 14, opacity: 0, duration: .7 })
    .from(".hero h1 .line > span", { yPercent: 115, duration: 1.05, stagger: .09 }, "-=0.45")
    .from(".hero [data-hero='2']", { y: 18, opacity: 0, duration: .8 }, "-=0.65")
    .from(".hero [data-hero='3'] .btn", { y: 16, opacity: 0, duration: .6, stagger: .08 }, "-=0.55")
    .from(".hero [data-hero='4'] li", { y: 10, opacity: 0, duration: .5, stagger: .07 }, "-=0.45")
    .from(".hero-main", { clipPath: "inset(0 0 100% 0)", duration: 1.15, ease: "expo.inOut" }, 0.15)
    .from(".hero-card", { scale: .85, opacity: 0, rotate: 4, duration: .9 }, "-=0.7")
    .from(".hero-badge", { scale: .8, opacity: 0, rotate: -12, duration: .7 }, "-=0.75");

  // Parallax suave del hero
  gsap.to(".hero-main img", {
    yPercent: 9,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  // Reveals con stagger por contenedor
  gsap.utils.toArray(".section, .why, .ig, .final-cta").forEach(function (section) {
    var items = section.querySelectorAll(".reveal");
    if (!items.length) return;
    gsap.from(items, {
      y: 22, opacity: 0, duration: .75, ease: "power2.out", stagger: .07,
      scrollTrigger: { trigger: section, start: "top 78%", once: true }
    });
  });

  // La nota de mayoristas entra con un giro leve
  gsap.from(".wholesale-note", {
    y: 26, opacity: 0, rotate: 0, duration: .9, ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".wholesale-visual", start: "top 75%", once: true }
  });
})();