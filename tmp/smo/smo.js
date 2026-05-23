(function () {
  "use strict";

  /* ============================================================
     SMO ページ固有アニメーション
     main.js の IntersectionObserver を使わず独立実装
     対象クラス: .smo-reveal（フェードイン+スライドアップ）
     ============================================================ */

  // Reduced motion 尊重
  var prefersReducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  if (prefersReducedMotion) {
    // アニメーション無効 — 全要素を即座に表示
    document.querySelectorAll(".smo-reveal").forEach(function (el) {
      el.classList.add("smo-visible");
    });
    return;
  }

  /* ---- Hero: ページロード時に即アニメーション ---- */
  var heroEls = document.querySelectorAll(".smo__hero .smo-reveal");
  heroEls.forEach(function (el, i) {
    setTimeout(function () {
      el.classList.add("smo-visible");
    }, i * 80);
  });

  /* ---- IntersectionObserver が使えない環境では全表示 ---- */
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".smo-reveal").forEach(function (el) {
      el.classList.add("smo-visible");
    });
    return;
  }

  /* ---- PROBLEM カード専用 Observer（stagger） ---- */
  var problemCards = document.querySelectorAll(".smo__problem-card.smo-reveal");
  var problemObserver = new IntersectionObserver(function (entries) {
    var triggered = false;
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        // グリッドの最初のカードが見えたら全カードをスタガー表示
        problemCards.forEach(function (card, i) {
          setTimeout(function () {
            card.classList.add("smo-visible");
          }, i * 110);
          problemObserver.unobserve(card);
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px"
  });

  if (problemCards.length > 0) {
    // 最初のカードだけ observe（1枚が入ったら全部起動）
    problemObserver.observe(problemCards[0]);
  }

  /* ---- 汎用 Observer（その他の .smo-reveal 要素） ---- */
  var generalObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = parseInt(el.getAttribute("data-smo-delay") || "0", 10);
      setTimeout(function () {
        el.classList.add("smo-visible");
      }, isNaN(delay) ? 0 : delay);
      generalObserver.unobserve(el);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px"
  });

  document.querySelectorAll(".smo-reveal").forEach(function (el) {
    // Hero 要素と problem カードは別途処理済みのためスキップ
    if (el.closest(".smo__hero") || el.classList.contains("smo__problem-card")) return;
    generalObserver.observe(el);
  });

})();
