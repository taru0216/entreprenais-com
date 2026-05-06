(function () {
  "use strict";

  // ============ Year auto-fill ============
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ============ Sticky nav state ============
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ============ Reveal on scroll (IntersectionObserver) ============
  // Targets [data-reveal] (existing) plus IoA timeline / cards / mission paragraphs / product preview.
  var reveals = document.querySelectorAll(
    "[data-reveal], .timeline__item, .card, .mission__lead, .mission__body, .preview"
  );

  if (!("IntersectionObserver" in window)) {
    // Fallback — just show everything
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
      setTimeout(function () {
        el.classList.add("is-visible");
      }, isNaN(delay) ? 0 : delay);
      io.unobserve(el);
    });
  }, {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  });

  reveals.forEach(function (el) { io.observe(el); });

  // ============ Subtle parallax for hero glows ============
  var glowA = document.querySelector(".hero__glow--a");
  var glowB = document.querySelector(".hero__glow--b");
  if (glowA && glowB && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var onMove = function () {
      var y = Math.min(window.scrollY, 800);
      glowA.style.transform = "translate3d(0," + (y * 0.18) + "px, 0)";
      glowB.style.transform = "translate3d(0," + (y * -0.12) + "px, 0)";
    };
    window.addEventListener("scroll", onMove, { passive: true });
  }
})();
