/* ============================================================
   AKSHAY — Creative Developer · main.js
   Preloader → hero reveal → Lenis smooth scroll → GSAP scroll
   choreography → cursor + magnetic system. See DESIGN.md.
   ============================================================ */

(function () {
  "use strict";

  var prefersReduced = false;
  try {
    prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { /* older engines */ }

  var finePointer = false;
  try {
    finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  } catch (e) { /* older engines */ }

  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = typeof window.ScrollTrigger !== "undefined";
  var animate = hasGSAP && hasST && !prefersReduced;

  if (hasGSAP && hasST) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ----------------------------------------------------------
     Clock + time-based greeting
  ---------------------------------------------------------- */
  (function clockAndGreeting() {
    var clockEl = document.getElementById("clock");
    var footerClockEl = document.getElementById("footerClock");
    var greetingEl = document.getElementById("greeting");

    var tzShort = "";
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(new Date());
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === "timeZoneName") { tzShort = parts[i].value; }
      }
    } catch (e) { tzShort = ""; }

    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function tick() {
      var d = new Date();
      var t = pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
      var label = tzShort ? t + " " + tzShort : t;
      if (clockEl) { clockEl.textContent = label; }
      if (footerClockEl) { footerClockEl.textContent = label; }
    }

    if (greetingEl) {
      var h = new Date().getHours();
      var g = "Good evening";
      if (h >= 5 && h < 12) { g = "Good morning"; }
      else if (h >= 12 && h < 17) { g = "Good afternoon"; }
      else if (h >= 21 || h < 5) { g = "Up late"; }
      greetingEl.textContent = g + " — you found the right tab";
    }

    tick();
    window.setInterval(tick, 1000);
  })();

  /* ----------------------------------------------------------
     Lenis smooth scroll (skipped for reduced motion)
  ---------------------------------------------------------- */
  var lenis = null;
  if (animate && typeof window.Lenis !== "undefined") {
    try {
      lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } catch (e) { lenis = null; }
  }

  /* Anchor navigation (works with and without Lenis) */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") { return; }
      var target = document.querySelector(id);
      if (!target) { return; }
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -64 });
      } else {
        var y = target.getBoundingClientRect().top + window.pageYOffset - 64;
        window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" });
      }
    });
  });

  /* ----------------------------------------------------------
     Custom cursor: accent dot + trailing ring (fine pointers only)
  ---------------------------------------------------------- */
  if (finePointer && !prefersReduced) {
    var dot = document.getElementById("cursorDot");
    var ring = document.getElementById("cursorRing");

    if (dot && ring) {
      document.body.classList.add("cursor-on");

      var mx = window.innerWidth / 2, my = window.innerHeight / 2;
      var dx = mx, dy = my, rx = mx, ry = my;
      var seen = false;

      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");

      document.addEventListener("mousemove", function (e) {
        mx = e.clientX; my = e.clientY;
        if (!seen) {
          seen = true;
          dx = rx = mx; dy = ry = my;
          dot.classList.remove("is-hidden");
          ring.classList.remove("is-hidden");
        }
      });

      document.addEventListener("mouseleave", function () {
        dot.classList.add("is-hidden");
        ring.classList.add("is-hidden");
        seen = false;
      });

      var ringScale = 1;
      var targetScale = 1;

      (function loop() {
        dx += (mx - dx) * 0.55;
        dy += (my - dy) * 0.55;
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ringScale += (targetScale - ringScale) * 0.2;
        dot.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) scale(" + ringScale.toFixed(3) + ")";
        window.requestAnimationFrame(loop);
      })();

      $$("[data-hover], a, button").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          targetScale = el.getAttribute("data-hover") === "text" ? 2.6 : 1.8;
          ring.classList.add("is-active");
        });
        el.addEventListener("mouseleave", function () {
          targetScale = 1;
          ring.classList.remove("is-active");
        });
      });

      /* Ring goes paper-colored over the ink footer */
      var footer = $(".footer");
      if (footer) {
        footer.addEventListener("mouseenter", function () { ring.classList.add("is-inverted"); });
        footer.addEventListener("mouseleave", function () { ring.classList.remove("is-inverted"); });
      }
    }
  }

  /* ----------------------------------------------------------
     Magnetic elements
  ---------------------------------------------------------- */
  if (finePointer && !prefersReduced && hasGSAP) {
    $$("[data-magnetic]").forEach(function (el) {
      var strength = 0.35;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var relX = e.clientX - (r.left + r.width / 2);
        var relY = e.clientY - (r.top + r.height / 2);
        window.gsap.to(el, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.4,
          ease: "power3.out"
        });
      });
      el.addEventListener("mouseleave", function () {
        window.gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  /* ----------------------------------------------------------
     Preloader + hero intro
  ---------------------------------------------------------- */
  var preloader = document.getElementById("preloader");
  var countEl = document.getElementById("preloaderCount");

  function killPreloader() {
    if (preloader) { preloader.classList.add("is-done"); }
  }

  function heroIntro() {
    if (!animate) { return; }
    var tl = window.gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(".hero__word", { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0)
      .to(".hero__eyebrow-inner", { yPercent: 0, duration: 0.9 }, 0.25)
      .to(".hero__meta", { autoAlpha: 1, y: 0, duration: 0.8 }, 0.6)
      .to(".header", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.55);
  }

  if (!animate || !preloader || !countEl) {
    killPreloader();
  } else {
    /* Hidden initial states only when we will animate them in */
    window.gsap.set(".hero__word", { yPercent: 110 });
    window.gsap.set(".hero__eyebrow-inner", { yPercent: 110 });
    window.gsap.set(".hero__meta", { autoAlpha: 0, y: 24 });
    window.gsap.set(".header", { autoAlpha: 0, y: -14 });

    var counter = { v: 0 };
    var loadTl = window.gsap.timeline();
    loadTl
      .to(counter, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: function () {
          var v = Math.round(counter.v);
          countEl.textContent = (v < 10 ? "00" : v < 100 ? "0" : "") + v;
        }
      })
      .to(preloader, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: killPreloader
      }, "+=0.15")
      .add(heroIntro, "-=0.55");
  }

  /* ----------------------------------------------------------
     Scroll choreography
  ---------------------------------------------------------- */
  if (animate) {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    /* Section heads: accent rule sweeps in, title rises */
    $$(".section-head").forEach(function (head) {
      gsap.set(head, { "--rule": 0 });
      var title = $(".section-head__title", head);
      var tl = gsap.timeline({
        scrollTrigger: { trigger: head, start: "top 85%", once: true }
      });
      tl.to(head, { "--rule": 1, duration: 0.8, ease: "power2.inOut" }, 0);
      if (title) {
        tl.from(title, { y: 40, autoAlpha: 0, duration: 0.8, ease: "power4.out" }, 0.1);
      }
    });

    /* About: line-by-line masked reveal */
    var aboutLines = $$("#aboutLead .rline__inner");
    if (aboutLines.length) {
      gsap.set(aboutLines, { yPercent: 110 });
      gsap.to(aboutLines, {
        yPercent: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "#aboutLead", start: "top 85%", once: true }
      });
    }

    /* About side column */
    var aboutSide = $(".about__side");
    if (aboutSide) {
      gsap.from(aboutSide, {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: aboutSide, start: "top 88%", once: true }
      });
    }

    /* Footer CTA rise */
    var footerCta = $(".footer__cta");
    if (footerCta) {
      gsap.from(footerCta, {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".footer", start: "top 75%", once: true }
      });
    }

    /* Work gallery: horizontal pin+scrub on desktop, vertical reveals on mobile */
    var mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", function () {
      var track = document.getElementById("workTrack");
      var section = document.getElementById("work");
      if (!track || !section) { return; }

      var distance = function () {
        return Math.max(0, track.scrollWidth - window.innerWidth + 48);
      };

      gsap.to(track, {
        x: function () { return -distance(); },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: function () { return "+=" + distance(); },
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      /* Gentle counter-drift inside thumbnails for depth */
      $$(".card__thumb-mark").forEach(function (mark) {
        gsap.fromTo(mark, { xPercent: -12 }, {
          xPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: function () { return "+=" + distance(); },
            scrub: 1
          }
        });
      });
    });

    mm.add("(max-width: 768px)", function () {
      $$(".card").forEach(function (card) {
        gsap.from(card, {
          y: 48,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true }
        });
      });
    });

    /* Fonts + layout settle */
    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    });
  }
})();
