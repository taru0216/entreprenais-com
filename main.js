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

  // ============ AI widget open buttons (#71: inline onclick を addEventListener に移行) ============
  // showcase-card__btn-open と contact__ai-btn の onclick を外部 JS に移動し、
  // CSP の script-src 'unsafe-inline' 依存を削減する。
  // 注: inline <script> ブロック（GA4・widget offline fallback）は別途対応が必要なため
  //     'unsafe-inline' は _headers で引き続き許可中。
  function openWidgetBtn() {
    var widgetBtn = document.querySelector(".__eai-widget-btn");
    if (widgetBtn) {
      widgetBtn.click();
    }
  }

  document.querySelectorAll(".showcase-card__btn-open, .contact__ai-btn").forEach(function (btn) {
    // オフライン状態（btn.disabled=true）では onclick を付与しない
    if (!btn.disabled) {
      btn.addEventListener("click", openWidgetBtn);
    }
  });
})();
