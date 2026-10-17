/**
 * Portfolio Interactive Scripts
 * Author: Yash Prashant Bhate
 * Includes: Dark/Light Mode with localStorage persistence, Mobile Menu,
 * Typing Animation, Active Nav Link Tracking, Smooth Scroll, and Form Handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark & Light Mode)
  initTheme();

  // 2. Mobile Navigation Toggle
  initMobileNav();

  // 3. Typing Text Animation in Hero
  initTypingEffect();

  // 4. Scroll Header & Active Navigation Highlighting
  initScrollEffects();

  // 5. Back to Top Button
  initBackToTop();

  // 6. Dynamic Current Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/**
 * Handles Dark/Light Mode toggle and respects system preference & localStorage
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const rootHtml = document.documentElement;

  // Retrieve saved preference or use system preference
  const savedTheme = localStorage.getItem('yash_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  rootHtml.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = rootHtml.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-theme', currentTheme);
      localStorage.setItem('yash_portfolio_theme', currentTheme);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('yash_portfolio_theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      rootHtml.setAttribute('data-theme', newTheme);
    }
  });
}

/**
 * Mobile Navigation Drawer & Hamburger Menu
 */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close menu when clicked outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  }
}

/**
 * Smooth Typing Text Effect in Hero
 */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'new ideas into reality',
    'innovative software solutions',
    'creative digital products',
    'clean & efficient code'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/**
 * Scroll Tracking: Active Navigation & Header Shadow
 */
function initScrollEffects() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header subtle shadow on scroll
    if (header) {
      if (scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    // Active Navigation Link Highlighting
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Contact Form Submission Handler (Client-side simulation with mailto option)
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
    feedback.textContent = `Thank you, ${name}! Opening your email client to send your message...`;
    feedback.className = 'form-feedback success';
    feedback.style.display = 'block';

    // Open mailto link so user can immediately send an email to Yash
    const mailtoUrl = `mailto:yashbhate60@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry: ${subject}`
    )}&body=${encodeURIComponent(`Hi Yash,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 1200);
  }
}
