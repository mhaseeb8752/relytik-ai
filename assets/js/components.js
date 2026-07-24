/**
 * Relytik Corporate Component Loader
 * Dynamically loads nav.html and footer.html components and initializes interactive UX features.
 */

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
});

async function loadComponents() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // Load Navigation
  if (navPlaceholder) {
    try {
      const navResponse = await fetch('components/nav.html');
      if (!navResponse.ok) throw new Error(`HTTP error! status: ${navResponse.status}`);
      const navHtml = await navResponse.text();
      navPlaceholder.innerHTML = navHtml;
      initNavigation();
    } catch (err) {
      console.warn('Could not fetch components/nav.html directly:', err);
      // Fallback nav rendering if fetch fails (e.g., restricted file:// protocol)
      renderFallbackNav(navPlaceholder);
      initNavigation();
    }
  }

  // Load Footer
  if (footerPlaceholder) {
    try {
      const footerResponse = await fetch('components/footer.html');
      if (!footerResponse.ok) throw new Error(`HTTP error! status: ${footerResponse.status}`);
      const footerHtml = await footerResponse.text();
      footerPlaceholder.innerHTML = footerHtml;
      initFooter();
    } catch (err) {
      console.warn('Could not fetch components/footer.html directly:', err);
      // Fallback footer rendering
      renderFallbackFooter(footerPlaceholder);
      initFooter();
    }
  }
}

/**
 * Initialize Navigation logic, active page highlighting, and mobile menu
 */
function initNavigation() {
  const header = document.getElementById('main-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Active page highlighting
  highlightActiveNav();

  // Scroll header effect: add shadow on scroll, hide on scroll down, reveal on scroll up
  if (header) {
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let accumulatedScroll = 0;

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
      const isMobileMenuOpen = mobileMenu && mobileMenu.classList.contains('rt-mobile-menu-active');

      // Keep header visible when mobile menu is open
      if (isMobileMenuOpen) {
        header.classList.remove('rt-header-hidden');
        lastScrollY = currentScrollY;
        accumulatedScroll = 0;
        return;
      }

      // Add shadow / background blur when scrolled past 20px
      if (currentScrollY > 20) {
        header.classList.add('rt-header-scrolled');
      } else {
        header.classList.remove('rt-header-scrolled');
      }

      // Always keep header visible near top of page (first 80px)
      if (currentScrollY <= 80) {
        header.classList.remove('rt-header-hidden');
        accumulatedScroll = 0;
      } else {
        const delta = currentScrollY - lastScrollY;

        if (delta > 0) {
          // Scrolling down
          if (accumulatedScroll < 0) accumulatedScroll = 0;
          accumulatedScroll += delta;

          if (accumulatedScroll > 12) {
            header.classList.add('rt-header-hidden');
          }
        } else if (delta < 0) {
          // Scrolling up
          if (accumulatedScroll > 0) accumulatedScroll = 0;
          accumulatedScroll += delta;

          if (accumulatedScroll < -4) {
            header.classList.remove('rt-header-hidden');
          }
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Mobile menu toggle
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('rt-hamburger-active');
      mobileMenu.classList.toggle('rt-mobile-menu-active');
      mobileMenu.setAttribute('aria-hidden', isExpanded);
      document.body.classList.toggle('rt-body-lock');
    });

    // Close mobile menu when clicking nav link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.classList.remove('rt-hamburger-active');
        mobileMenu.classList.remove('rt-mobile-menu-active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('rt-body-lock');
      });
    });
  }
}

/**
 * Determine active page and apply active class to corresponding links
 */
function highlightActiveNav() {
  // Get body data-page or URL path
  const pageAttr = document.body.getAttribute('data-page');
  let currentPath = window.location.pathname.split('/').pop();

  if (!currentPath || currentPath === '') {
    currentPath = 'index.html';
  }

  const navLinks = document.querySelectorAll('.rt-nav-link, .rt-mobile-link');
  
  navLinks.forEach(link => {
    const navKey = link.getAttribute('data-nav');
    const href = link.getAttribute('href');

    let isActive = false;

    if (pageAttr && navKey === pageAttr) {
      isActive = true;
    } else if (href === currentPath || (currentPath === 'index.html' && (href === 'index.html' || href === './'))) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add('rt-active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('rt-active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Initialize Footer components & dynamic year
 */
function initFooter() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Fallback Nav markup if fetch fails in local file system environment
 */
function renderFallbackNav(container) {
  container.innerHTML = `
    <header class="rt-header" id="main-header">
      <div class="rt-container rt-nav-container">
        <a href="index.html" class="rt-brand"><img src="assets/logo-placeholder.svg" alt="Relytik" class="rt-logo-img" width="160" height="40"></a>
        <nav class="rt-desktop-nav">
          <ul class="rt-nav-list">
            <li><a href="index.html" class="rt-nav-link" data-nav="index">Home</a></li>
            <li><a href="about.html" class="rt-nav-link" data-nav="about">About Us</a></li>
            <li><a href="services.html" class="rt-nav-link" data-nav="services">Services</a></li>
            <li><a href="partners.html" class="rt-nav-link" data-nav="partners">Partners</a></li>
            <li><a href="contact.html" class="rt-nav-link" data-nav="contact">Contact</a></li>
          </ul>
        </nav>
        <div class="rt-header-actions">
          <a href="contact.html" class="rt-btn rt-btn-primary rt-btn-sm rt-hide-mobile">Get Started</a>
          <button id="hamburger-btn" class="rt-hamburger-btn" aria-label="Toggle menu">
            <span class="rt-hamburger-bar"></span>
            <span class="rt-hamburger-bar"></span>
            <span class="rt-hamburger-bar"></span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="rt-mobile-menu">
        <div class="rt-mobile-menu-inner">
          <ul class="rt-mobile-nav-list">
            <li><a href="index.html" class="rt-mobile-link" data-nav="index">Home</a></li>
            <li><a href="about.html" class="rt-mobile-link" data-nav="about">About Us</a></li>
            <li><a href="services.html" class="rt-mobile-link" data-nav="services">Services</a></li>
            <li><a href="partners.html" class="rt-mobile-link" data-nav="partners">Partners</a></li>
            <li><a href="contact.html" class="rt-mobile-link" data-nav="contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </header>
  `;
}

/**
 * Fallback Footer markup if fetch fails
 */
function renderFallbackFooter(container) {
  container.innerHTML = `
    <footer class="rt-footer">
      <div class="rt-container">
        <div class="rt-footer-bottom">
          <p>&copy; <span id="copyright-year">2026</span> Relytik LLC. Broker's Reliable Ticketing Solutions.</p>
        </div>
      </div>
    </footer>
  `;
}
