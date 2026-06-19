/**
 * ============================================================
 * SENJA & CO. CAFE — Main JavaScript
 * Handles: Navbar, Mobile Menu, Lightbox, Scroll Animations,
 *          WhatsApp, Back-to-Top, Active Nav State
 * ============================================================
 */

'use strict';

/* ============================================================
   EDITABLE CONFIGURATION — Update contact info here ONCE
   to reflect changes across the entire website.
   ============================================================ */
const SENJA_CONFIG = {
  // ⬇️ EDIT THIS to update all WhatsApp buttons at once
  whatsAppNumber: '6281234567890',      // Format: country code + number (no +, no spaces)
  whatsAppDefaultMsg: 'Halo Senja & Co. Cafe! Saya ingin mengetahui lebih lanjut dan melakukan reservasi meja.',

  // ⬇️ Other contact info (for reference — update in HTML too)
  email:     'hello@senjacafe.com',
  instagram: 'https://instagram.com/senjacafe',
  address:   'Jl. Sudirman No. 88, Jakarta Selatan',
};

/* ============================================================
   WHATSAPP UTILITY
   All WA links call this function — change the number in
   SENJA_CONFIG.whatsAppNumber and every button updates.
   ============================================================ */
function openWhatsApp(message) {
  const msg = encodeURIComponent(message || SENJA_CONFIG.whatsAppDefaultMsg);
  const url = `https://wa.me/${SENJA_CONFIG.whatsAppNumber}?text=${msg}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return false; // prevent default anchor behavior
}

function orderWhatsApp(itemName) {
  const msg = `Halo Senja & Co. Cafe! Saya ingin memesan ${itemName}. Apakah tersedia sekarang?`;
  openWhatsApp(msg);
}

// Expose to global scope for inline onclick handlers
window.openWhatsApp  = openWhatsApp;
window.orderWhatsApp = orderWhatsApp;

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollAnimations();
  initLightbox();
  initBackToTop();
  initSmoothScroll();
  updateOpenStatus();
});

/* ============================================================
   NAVBAR — sticky + scroll style change
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60;

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
}

/* ============================================================
   MOBILE MENU — hamburger toggle + overlay
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
  });
}

/* ============================================================
   SCROLL SPY — highlight active nav link
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   SCROLL ANIMATIONS — [data-aos] elements
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   LIGHTBOX — gallery modal
   ============================================================ */
function initLightbox() {
  const modal         = document.getElementById('lightboxModal');
  const img           = document.getElementById('lightboxImg');
  const caption       = document.getElementById('lightboxCaption');
  const closeBtn      = document.getElementById('lightboxClose');
  const prevBtn       = document.getElementById('lightboxPrev');
  const nextBtn       = document.getElementById('lightboxNext');
  if (!modal) return;

  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const item = items[index];
    img.src           = item.dataset.src || item.querySelector('img').src;
    img.alt           = item.dataset.caption || '';
    caption.textContent = item.dataset.caption || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    img.style.opacity = '0';
    img.onload = () => {
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '1';
    };
  };

  const closeLightbox = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { img.src = ''; }, 300);
  };

  const navigate = (direction) => {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    img.style.opacity = '0';
    setTimeout(() => openLightbox(currentIndex), 200);
  };

  // Attach click events to gallery items
  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigate(-1));
  nextBtn?.addEventListener('click', () => navigate(1));

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const SHOW_THRESHOLD = 400;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > SHOW_THRESHOLD);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SMOOTH SCROLL — for all anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navbarH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h') || '80', 10);
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarH;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   OPEN STATUS — show "Open Now" or "Closed" in real-time
   ============================================================ */
function updateOpenStatus() {
  const badge = document.querySelector('.res-open-badge');
  if (!badge) return;

  const now    = new Date();
  const day    = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hour   = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;

  // Mon-Thu: 08:00-22:00, Fri-Sun: 08:00-23:00
  const openMinutes  = 8 * 60;   // 08:00
  let   closeMinutes = 22 * 60;  // 22:00

  if (day === 5 || day === 6 || day === 0) {
    closeMinutes = 23 * 60; // 23:00 on Fri/Sat/Sun
  }

  const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

  badge.innerHTML = isOpen
    ? '<i class="fas fa-circle"></i> Open Now'
    : '<i class="fas fa-circle" style="color:#e74c3c"></i> Closed';

  badge.style.color = isOpen ? 'var(--color-whatsapp)' : '#e74c3c';
}

/* ============================================================
   NAVBAR BACKGROUND FIX — on hero section image load
   ============================================================ */
window.addEventListener('load', () => {
  // Trigger AOS for elements already in viewport
  document.querySelectorAll('[data-aos]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('aos-animate');
    }
  });

  // Animate counters in stats section
  initCounterAnimation();
});

/* ============================================================
   COUNTER ANIMATION — animate stat numbers on scroll
   ============================================================ */
function initCounterAnimation() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(el) {
  const originalText = el.textContent.trim();
  const numMatch     = originalText.match(/[\d.]+/);
  if (!numMatch) return;

  const targetNum = parseFloat(numMatch[0]);
  const prefix    = originalText.replace(numMatch[0], '').replace(/\d+(\.\d+)?/, '');
  const suffix    = originalText.replace(/^[^0-9]*(\d+(\.\d+)?)/, '').trim();

  let startNum  = 0;
  const duration = 1800; // ms
  const startTime = performance.now();

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const update = (currentTime) => {
    const elapsed  = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOut(progress);
    const current  = Math.round(eased * targetNum * 10) / 10;

    el.textContent = (Number.isInteger(targetNum) ? Math.round(current) : current) + (originalText.includes('+') ? '+' : '') + (originalText.includes('★') ? '★' : '');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = originalText; // restore exact original text
    }
  };

  requestAnimationFrame(update);
}

/* ============================================================
   CARD TILT EFFECT — subtle 3D tilt on hover (desktop only)
   ============================================================ */
(function initTiltEffect() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

  const tiltables = document.querySelectorAll('.menu-card, .event-card, .why-card');

  tiltables.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const tiltX  = y * -6;  // tilt in degrees
      const tiltY  = x *  6;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ============================================================
   PARALLAX HERO — subtle movement on scroll
   ============================================================ */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) return;
    const offset = window.scrollY * 0.35;
    heroBg.style.transform = `translateY(${offset}px) scale(1.1)`;
  }, { passive: true });
})();

/* ============================================================
   NAVBAR PROGRESS BAR — reading indicator (optional)
   ============================================================ */
(function initReadingProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; width: 0%;
    background: linear-gradient(90deg, var(--color-brown), var(--color-tan));
    z-index: 1001; transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = scrollPercent + '%';
  }, { passive: true });
})();

/* ============================================================
   FLOATING WA BUTTON — update href dynamically from config
   ============================================================ */
(function updateFloatingWA() {
  const floatingWa = document.getElementById('floatingWa');
  if (!floatingWa) return;

  // Update onclick to use config number
  floatingWa.setAttribute('onclick',
    `openWhatsApp('${SENJA_CONFIG.whatsAppDefaultMsg}'); return false;`
  );
})();

/* ============================================================
   IMAGE LAZY LOAD FALLBACK — for browsers without native support
   ============================================================ */
(function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return; // native support

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const observer   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  lazyImages.forEach(img => observer.observe(img));
})();

/* ============================================================
   CONSOLE BRANDING
   ============================================================ */
console.log(
  '%c☕ Senja & Co. Cafe',
  'font-size: 18px; font-weight: bold; color: #8B5E3C; font-family: serif;'
);
console.log(
  '%cGood Food. Great Coffee. Beautiful Moments.',
  'color: #C09060; font-style: italic;'
);
