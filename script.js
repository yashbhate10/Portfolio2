/**
 * Yash Bhate Portfolio - Interactive Scripts & Animations
 * Features:
 * - 3D Card Tilt Effect on Mouse Move
 * - Custom Dual-Ring Cursor with Magnetic Button Snapping
 * - Cursor Radial Glow tracking
 * - Intersection Observer Reveal-on-Scroll
 * - Dark & Light Mode Theme persistence
 * - Mobile Navigation Drawer
 * - Smooth Typing Animation with dynamic human pacing
 * - Contact Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCustomCursor();
  initTiltEffect();
  initScrollReveal();
  initTypingEffect();
  initMobileNav();
  initBackToTop();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * 1. Dark & Light Theme Toggle with LocalStorage
 */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('yash_theme_pref');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', active);
      localStorage.setItem('yash_theme_pref', active);
    });
  }
}

/**
 * 2. Custom Cursor & Glow Follower (Desktop)
 */
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  const cursorGlow = document.getElementById('cursor-glow');

  if (!cursorDot || !cursorOutline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    if (cursorGlow) {
      cursorGlow.style.left = `${mouseX}px`;
      cursorGlow.style.top = `${mouseY}px`;
    }
  });

  // Smooth trailing outline animation loop
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover detection for interactive links & buttons
  const interactives = document.querySelectorAll('a, button, .tilt-card, input, textarea');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/**
 * 3. 3D Card Tilt Effect on Hover
 */
function initTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt rotation angles
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/**
 * 4. Intersection Observer: Reveal Elements on Scroll
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 5. Typing Animation with Natural Dynamic Pacing
 */
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const phrases = [
    'ideas into real software',
    'complex problems into clean code',
    'curiosity into high-impact products',
    'algorithmic logic into fast apps'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 90;

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 45;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000; // Pause at completion
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 500; // Pause before starting next
    }

    setTimeout(tick, delay);
  }

  tick();
}

/**
 * 6. Mobile Navigation Drawer
 */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/**
 * 7. Back to Top Button
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 380) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 8. Form Submission Handler
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (feedback) {
    feedback.textContent = `Thanks, ${name}! Launching your mail client...`;
    feedback.className = 'form-status success';
    feedback.style.display = 'block';

    const mailto = `mailto:yashbhate60@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry: ${subject}`
    )}&body=${encodeURIComponent(`Hi Yash,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

    setTimeout(() => {
      window.location.href = mailto;
      form.reset();
    }, 1000);
  }
}
