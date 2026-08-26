/**
 * TechNova - Main JavaScript
 * Navigation, scroll animations, and interactions
 */

(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav__link, .nav__cta");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- Theme toggle ---- */
  const themeToggle = document.getElementById("themeToggle");

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function updateThemeUI(theme) {
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeUI(theme);
  }

  updateThemeUI(getTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = getTheme() === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "light" : "dark");
      }
    });

  /* ---- Header scroll effect ---- */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile navigation ---- */
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("nav--open");
      navToggle.classList.toggle("nav-toggle--active");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("nav--open");
        navToggle.classList.remove("nav-toggle--active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Stagger children after parent is visible ---- */
  function revealStaggered(parent, staggerMs) {
    const children = parent.querySelectorAll(":scope > .reveal");
    children.forEach(function (child, index) {
      setTimeout(function () {
        child.classList.add("is-visible");
      }, index * staggerMs);
    });
  }

  /* ---- Scroll reveal animations ---- */
  function initScrollReveal() {
    const heroElements = [
      { selector: ".hero__badge", variant: "fade-down", delay: 0 },
      { selector: ".hero__title", variant: "fade-up", delay: 100 },
      { selector: ".hero__description", variant: "fade-up", delay: 200 },
      { selector: ".hero__actions", variant: "fade-up", delay: 300 },
      { selector: ".hero__visual", variant: "fade-left", delay: 200 },
    ];

    heroElements.forEach(function (item) {
      const el = document.querySelector(item.selector);
      if (!el) return;
      el.classList.add("reveal", "reveal--" + item.variant, "reveal--on-load");
      el.style.setProperty("--reveal-delay", item.delay + "ms");
    });

    const staggerGroups = [
      { parent: ".stats__grid", child: ".stat-item", variant: "scale" },
      { parent: ".services__grid", child: ".service-card", variant: "fade-up" },
      {
        parent: ".testimonials__grid",
        child: ".testimonial-card",
        variant: "fade-up",
      },
      { parent: ".contact__list", child: ".contact-item", variant: "fade-right" },
    ];

    const staggerParents = [];

    staggerGroups.forEach(function (group) {
      const parent = document.querySelector(group.parent);
      if (!parent) return;

      parent.classList.add("reveal", "reveal--fade", "reveal--stagger-parent");
      staggerParents.push(parent);

      parent.querySelectorAll(group.child).forEach(function (child) {
        child.classList.add("reveal", "reveal--" + group.variant);
      });
    });

    document
      .querySelectorAll(
        ".services__header, .testimonials__header, .contact__info, .contact__form-card"
      )
      .forEach(function (el) {
        el.classList.add("reveal", "reveal--fade-up");
      });

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      initStatCounters(true);
      return;
    }

    document.querySelectorAll(".reveal--on-load").forEach(function (el) {
      const delay = parseInt(el.style.getPropertyValue("--reveal-delay")) || 0;
      setTimeout(function () {
        el.classList.add("is-visible");
      }, delay + 100);
    });

    const standaloneReveals = [];
    document
      .querySelectorAll(".reveal:not(.reveal--on-load)")
      .forEach(function (el) {
        if (
          el.closest(".reveal--stagger-parent") &&
          !el.classList.contains("reveal--stagger-parent")
        ) {
          return;
        }
        standaloneReveals.push(el);
      });

    staggerParents.forEach(function (p) {
      if (standaloneReveals.indexOf(p) === -1) {
        standaloneReveals.push(p);
      }
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const target = entry.target;
          observer.unobserve(target);

          if (target.classList.contains("reveal--stagger-parent")) {
            target.classList.add("is-visible");
            revealStaggered(target, 120);

            if (target.classList.contains("stats__grid")) {
              initStatCounters(false);
            }
          } else {
            target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    standaloneReveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Stat counter animation ---- */
  function initStatCounters(instant) {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      if (el.dataset.counted === "true") return;

      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = instant ? 0 : 1500;

      if (instant) {
        el.textContent = target + suffix;
        el.classList.add("is-counted");
        el.dataset.counted = "true";
        return;
      }

      const startTime = performance.now();

      function update(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
          el.classList.add("is-counted");
          el.dataset.counted = "true";
        }
      }

      requestAnimationFrame(update);
    });
  }

  

  initScrollReveal();
})();
