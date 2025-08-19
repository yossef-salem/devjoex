// Utility functions
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Dynamically set header height for anchor scrolling
function applyDynamicHeaderOffset() {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  if (!header) return;
  const height = header.getBoundingClientRect().height;
  root.style.setProperty('--header-height', `${height}px`);
  // Use scroll-padding-top for smooth anchor alignment
  root.style.scrollPaddingTop = `${height}px`;
}

// Observe header size changes (e.g., responsive or content changes)
function observeHeaderResize() {
  const header = document.querySelector('.site-header');
  if (!('ResizeObserver' in window) || !header) return;
  const ro = new ResizeObserver(() => applyDynamicHeaderOffset());
  ro.observe(header);
}

// Loading screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const progressFill = document.querySelector('.loading-progress-fill');
  const progressText = document.querySelector('.loading-progress-text');
  
  if (!loadingScreen) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          initAnimations();
        }, 500);
      }, 500);
    }
    
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `${Math.round(progress)}%`;
  }, 100);
}



// Navigation
function initNavigation() {
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (!navToggle || !navList) return;
  
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('is-open');
    // Re-apply offset in case header height changes when menu opens
    applyDynamicHeaderOffset();
  });
  
  // Close mobile nav when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
        applyDynamicHeaderOffset();
      }
    });
  });
  
  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('is-open');
    }
  });
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      // Ignore if just '#'
      if (!targetId || targetId === '#') return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Progress bar
function initProgressBar() {
  const progressBar = document.querySelector('.progress__bar');
  
  if (!progressBar) return;
  
  const updateProgress = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = `${scrollPercent}%`;
  };
  
  window.addEventListener('scroll', throttle(updateProgress, 16));
  updateProgress();
}

// Scroll animations
function initScrollAnimations() {
  if (prefersReducedMotion) return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-animate
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => observer.observe(el));
}

// Parallax effects
function initParallax() {
  if (prefersReducedMotion) return;
  
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };
  
  window.addEventListener('scroll', throttle(updateParallax, 16));
}

// Floating elements animation
function initFloatingElements() {
  if (prefersReducedMotion) return;
  
  const floatingElements = document.querySelectorAll('.hero__float');
  
  floatingElements.forEach((element, index) => {
    const delay = index * 0.5;
    element.style.animationDelay = `${delay}s`;
  });
}

// Particle animation
function initParticleAnimation() {
  if (prefersReducedMotion) return;
  
  const particles = document.querySelectorAll('.hero__particle');
  
  particles.forEach((particle, index) => {
    const delay = index * 2;
    particle.style.animationDelay = `${delay}s`;
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  // Auto-resize textarea
  const textarea = form.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 400) + 'px';
    });
  }
  
  form.addEventListener('submit', async (e) => {
    // Get form elements
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const submitBtn = form.querySelector('.contact__submit');
    const originalText = submitBtn.innerHTML;
    
    // Clear previous errors
    form.querySelectorAll('.error').forEach(error => error.textContent = '');
    
    // Validate form data
    let isValid = true;
    const errors = {};
    
    // Validate name
    if (!nameInput.value.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    // Show errors if validation fails
    if (!isValid) {
      e.preventDefault(); // Prevent form submission
      Object.keys(errors).forEach(field => {
        const errorElement = form.querySelector(`#${field}`).closest('.contact__field').querySelector('.error');
        if (errorElement) {
          errorElement.textContent = errors[field];
        }
      });
      return;
    }
    
    // Show loading state
    submitBtn.innerHTML = `
      <span class="btn__text">Sending...</span>
      <svg class="btn__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="31.416" stroke-dashoffset="31.416">
          <animate attributeName="stroke-dashoffset" values="0;31.416" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
    submitBtn.disabled = true;
    
    // Form will be submitted to Formspree automatically
    // The _next field will redirect to thanks.html after successful submission
  });
}

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll('.about__tab-btn');
  const tabPanels = document.querySelectorAll('.about__tab-panel');
  
  if (!tabButtons.length) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Update active button
      tabButtons.forEach(btn => btn.classList.remove('about__tab-btn--active'));
      button.classList.add('about__tab-btn--active');
      
      // Update active panel
      tabPanels.forEach(panel => {
        panel.classList.remove('about__tab-panel--active');
        if (panel.getAttribute('data-tab') === targetTab) {
          panel.classList.add('about__tab-panel--active');
        }
      });
    });
  });
}

// Magnetic effect for buttons
function initMagneticEffect() {
  if (prefersReducedMotion) return;
  
  const magneticElements = document.querySelectorAll('.social-icon');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.1;
      const moveY = y * 0.1;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0px, 0px)';
    });
  });
}

// Hover animations
function initHoverAnimations() {
  if (prefersReducedMotion) return;
  
  // Project cards
  const projectCards = document.querySelectorAll('.project');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = 'var(--shadow-xl)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = 'var(--shadow-md)';
    });
  });
  
  // Skill chips
  const chips = document.querySelectorAll('.chip');
  
  chips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Typing effect
function initTypingEffect() {
  if (prefersReducedMotion) return;
  
  const typingElements = document.querySelectorAll('.hero__greeting .char, .hero__subtitle .word');
  
  typingElements.forEach((element, index) => {
    const delay = index * 0.1;
    element.style.animationDelay = `${delay}s`;
  });
}

// Initialize all animations
function initAnimations() {
  if (prefersReducedMotion) return;
  
  // Add entrance animations
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  animatedElements.forEach((element, index) => {
    const delay = index * 0.1;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    element.style.transitionDelay = `${delay}s`;
    
    // Trigger animation after a small delay
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
}

// Neon effect for about section image
function initNeonEffect() {
  const aboutImageWrap = document.querySelector('.about__image-wrap');
  if (!aboutImageWrap) return;

  aboutImageWrap.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion) return;
    
    const rect = aboutImageWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / centerX * 10;
    const moveY = (y - centerY) / centerY * 10;
    
    aboutImageWrap.style.setProperty('--neon-offset-x', `${moveX}px`);
    aboutImageWrap.style.setProperty('--neon-offset-y', `${moveY}px`);
  });

  aboutImageWrap.addEventListener('mouseleave', () => {
    aboutImageWrap.style.setProperty('--neon-offset-x', '0px');
    aboutImageWrap.style.setProperty('--neon-offset-y', '0px');
  });
}

// Performance optimization
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Preload critical resources
  const criticalImages = ['avatar.jpg'];
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `./assets/${src}`;
    document.head.appendChild(link);
  });
}

// Initialize everything
function init() {
  // Ensure scroll starts at top on reload
  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  } catch (e) {}
  window.scrollTo(0, 0);

  // Set current year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Dynamic header offset for anchors
  applyDynamicHeaderOffset();
  observeHeaderResize();
  window.addEventListener('resize', debounce(applyDynamicHeaderOffset, 200));
  window.addEventListener('orientationchange', applyDynamicHeaderOffset);
  
  // Initialize all functionality
  initNavigation();
  initSmoothScrolling();
  initProgressBar();
  initScrollAnimations();
  initParallax();
  initFloatingElements();
  initParticleAnimation();
  initContactForm();
  initTabs();
  initMagneticEffect();
  initHoverAnimations();
  initTypingEffect();
  initNeonEffect();
  initPerformanceOptimizations();
  
  // Add scroll-triggered animations
  window.addEventListener('scroll', throttle(() => {
    if (!prefersReducedMotion) {
      // additional scroll logic
    }
  }, 16));
}

// Start loading screen and initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
  initLoadingScreen();
}

// Initialize everything after loading screen
window.addEventListener('load', init);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    initNavigation,
    initScrollAnimations,
    initParallax
  };
}
