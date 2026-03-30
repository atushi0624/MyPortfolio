/* ============================================================
   main.js — Portfolio Site
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Header: scroll shadow
  ---------------------------------------------------------- */
  const header = document.querySelector('.header');

  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------
     Hamburger menu
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav--mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('is-open');
      mobileNav.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    mobileNav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-open');
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     Intersection Observer — fade-in
  ---------------------------------------------------------- */
  const fadeTargets = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeTargets.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ----------------------------------------------------------
     Form: simple client-side validation
  ---------------------------------------------------------- */
  const form = document.querySelector('.contact__form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const company = form.querySelector('#field-company');
      const name    = form.querySelector('#field-name');
      const email   = form.querySelector('#field-email');
      let valid = true;

      [company, name, email].forEach(function (field) {
        if (!field) return;
        const val = field.value.trim();
        if (!val) {
          field.style.borderColor = '#e74c3c';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          email.style.borderColor = '#e74c3c';
          valid = false;
        }
      }

      if (valid) {
        alert('送信が完了しました。（モック: 実際には送信されません）');
        form.reset();
      } else {
        alert('必須項目をすべて入力してください。');
      }
    });
  }

  /* ----------------------------------------------------------
     Lightbox
  ---------------------------------------------------------- */
  var overlay = document.getElementById('lightbox-overlay');
  var lightboxImg = overlay && overlay.querySelector('.lightbox-img');
  var closeBtn = overlay && overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    if (!overlay || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  if (overlay) {
    // Close on overlay background click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    // ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // Attach click to all .lightbox-trigger images
  document.querySelectorAll('.lightbox-trigger').forEach(function (img) {
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });
})();
