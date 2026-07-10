/* ==========================================================
   AVIT — Foquier Desarrollos · Interacciones
   ========================================================== */
(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const isMobile = () => window.matchMedia("(max-width: 860px)").matches;

  /* ---------- Header solido al scrollear ---------- */
  const setHeader = () => {
    header.classList.toggle("is-solid", window.scrollY > 60 || nav.classList.contains("open"));
  };
  window.addEventListener("scroll", setHeader, { passive: true });
  setHeader();

  /* ---------- Menu movil ---------- */
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("active", open);
    header.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
    setHeader();
  });

  const closeMobileNav = () => {
    nav.classList.remove("open");
    burger.classList.remove("active");
    header.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setHeader();
  };

  /* ---------- Dropdowns (click en movil / hover en desktop) ---------- */
  document.querySelectorAll(".nav__item--drop").forEach((item) => {
    const btn = item.querySelector(".nav__drop-btn");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".nav__item--drop.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".nav__drop-btn").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Cerrar dropdowns al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__item--drop")) {
      document.querySelectorAll(".nav__item--drop.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".nav__drop-btn").setAttribute("aria-expanded", "false");
      });
    }
  });

  // Al navegar desde el menu, cerrar todo
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (isMobile()) closeMobileNav();
    });
  });

  /* ---------- Parallax suave del hero ---------- */
  const heroBg = document.getElementById("heroBg");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroBg && !reduceMotion) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = "translateY(" + y * 0.25 + "px)";
      }
    }, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Contadores animados ---------- */
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-count]").forEach(animateCount);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".stats").forEach((el) => statsObserver.observe(el));

  /* ---------- Lightbox de galeria ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const items = Array.from(document.querySelectorAll(".gallery__item"));
  const lbArrows = [document.getElementById("lbPrev"), document.getElementById("lbNext")];
  let current = 0;

  const showLightbox = (src, alt, caption, withArrows) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lbCaption.textContent = caption || "";
    lbArrows.forEach((a) => (a.style.display = withArrows ? "" : "none"));
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const openLightbox = (i) => {
    current = i;
    const img = items[i].querySelector("img");
    showLightbox(img.src, img.alt, items[i].dataset.caption, true);
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const moveLightbox = (dir) => {
    openLightbox((current + dir + items.length) % items.length);
  };

  items.forEach((item, i) => item.addEventListener("click", () => openLightbox(i)));

  /* ---------- Amenities con imagen ---------- */
  document.querySelectorAll(".amenity--clickable").forEach((btn) => {
    btn.addEventListener("click", () => {
      showLightbox(btn.dataset.img, btn.dataset.caption, btn.dataset.caption, false);
    });
  });

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", (e) => { e.stopPropagation(); moveLightbox(-1); });
  document.getElementById("lbNext").addEventListener("click", (e) => { e.stopPropagation(); moveLightbox(1); });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    const arrowsVisible = lbArrows[0].style.display !== "none";
    if (e.key === "ArrowLeft" && arrowsVisible) moveLightbox(-1);
    if (e.key === "ArrowRight" && arrowsVisible) moveLightbox(1);
  });
})();
