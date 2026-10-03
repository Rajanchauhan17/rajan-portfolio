/**
 * PORTFOLIO WEBSITE - INTERACTIVE JAVASCRIPT
 * Author: Rajan Chauhan
 * Features:
 *  - Project Sliding Container (Carousel) with Touch Swipe, Mouse Drag, Autoplay, & Filtering
 *  - Animated Scroll Reveal & Stat Counter
 *  - Interactive Canvas Particles & Glow Aura
 *  - Dark/Light Theme Switching with LocalStorage
 *  - Mobile Navigation Drawer
 *  - Project Modal Case Study Details
 *  - Contact Form Real-Time Validation & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const rootHtml = document.documentElement;

  // Retrieve saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  rootHtml.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = rootHtml.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      rootHtml.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & ACTIVE LINK SPY
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    // Add scrolled class for glass blur effect
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy: highlight current section in navigation
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
      drawerLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     3. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);

  // Close drawer when any mobile navigation link is clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ==========================================================================
     4. HERO TYPING ANIMATION
     ========================================================================== */
  const typingTextElement = document.getElementById('typingText');
  const phrases = [
    'Full Stack Web Applications',
    'Generative AI Solutions',
    'High Performance REST & GraphQL APIs',
    'Interactive Reactive UI/UX Dashboards',
    'Scalable Cloud Architectures'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* ==========================================================================
     5. INTERACTIVE BACKGROUND PARTICLE CANVAS
     ========================================================================== */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 60);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    function connectParticles() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 130) {
            const opacityValue = 1 - (distance / 130);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ==========================================================================
     6. CURSOR GLOW EFFECT (Desktop)
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  /* ==========================================================================
     7. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale'
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     8. ANIMATED STAT COUNTER (Counting up numbers)
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // ms
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            counter.textContent = currentVal.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection) statsObserver.observe(statsSection);

  /* ==========================================================================
     9. PROJECT SECTION: SLIDING CONTAINER / CAROUSEL
     ========================================================================== */
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderViewport = document.getElementById('sliderViewport');
  const allSlides = Array.from(document.querySelectorAll('.project-slide'));
  const currentSlideNumber = document.getElementById('currentSlideNumber');
  const totalSlidesNumber = document.getElementById('totalSlidesNumber');
  const prevBtnTop = document.getElementById('prevSlideBtn');
  const nextBtnTop = document.getElementById('nextSlideBtn');
  const prevBtnBottom = document.getElementById('prevSlideBtnBottom');
  const nextBtnBottom = document.getElementById('nextSlideBtnBottom');
  const sliderDotsContainer = document.getElementById('sliderDots');
  const autoplayToggleBtn = document.getElementById('autoplayToggle');
  const autoplayIcon = document.getElementById('autoplayIcon');
  const autoplayText = document.getElementById('autoplayText');
  const progressBar = document.getElementById('sliderProgressBar');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let activeSlides = [...allSlides];
  let currentIndex = 0;
  let autoplayInterval = null;
  let progressInterval = null;
  const SLIDE_DURATION = 6000; // 6 seconds per slide
  let isAutoplayActive = true;
  let progressStart = 0;

  // Initialize dots based on current active slides
  function renderDots() {
    if (!sliderDotsContainer) return;
    sliderDotsContainer.innerHTML = '';
    activeSlides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `dot ${idx === currentIndex ? 'active' : ''}`;
      dot.setAttribute('data-slide', idx);
      dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      sliderDotsContainer.appendChild(dot);
    });
  }

  // Update slider position & UI elements
  function updateSlider(animate = true) {
    if (activeSlides.length === 0) return;

    // Wrap-around bounds check
    if (currentIndex >= activeSlides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = activeSlides.length - 1;

    // Adjust track position using exact viewport pixel width
    const slideWidth = sliderViewport ? sliderViewport.clientWidth : 0;
    sliderTrack.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Update numbers
    if (currentSlideNumber) {
      currentSlideNumber.textContent = String(currentIndex + 1).padStart(2, '0');
    }
    if (totalSlidesNumber) {
      totalSlidesNumber.textContent = String(activeSlides.length).padStart(2, '0');
    }

    // Update dots
    const dots = sliderDotsContainer ? sliderDotsContainer.querySelectorAll('.dot') : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    // Reset progress bar
    resetProgressBar();
  }

  // Ensure slider remains aligned on window resize or orientation change
  window.addEventListener('resize', () => {
    updateSlider(false);
  });

  function goToSlide(index) {
    currentIndex = index;
    updateSlider(true);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % activeSlides.length;
    updateSlider(true);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + activeSlides.length) % activeSlides.length;
    updateSlider(true);
  }

  // Next / Prev Button Listeners
  if (prevBtnTop) prevBtnTop.addEventListener('click', () => { prevSlide(); restartAutoplay(); });
  if (nextBtnTop) nextBtnTop.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
  if (prevBtnBottom) prevBtnBottom.addEventListener('click', () => { prevSlide(); restartAutoplay(); });
  if (nextBtnBottom) nextBtnBottom.addEventListener('click', () => { nextSlide(); restartAutoplay(); });

  // Autoplay Logic with Visual Progress Bar
  function resetProgressBar() {
    if (!progressBar) return;
    progressBar.style.width = '0%';
    progressStart = Date.now();
  }

  function startAutoplay() {
    if (!isAutoplayActive || activeSlides.length <= 1) return;
    stopAutoplay();
    resetProgressBar();

    progressInterval = setInterval(() => {
      if (!isAutoplayActive) return;
      const elapsed = Date.now() - progressStart;
      const percentage = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      if (progressBar) progressBar.style.width = `${percentage}%`;
    }, 50);

    autoplayInterval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    clearInterval(progressInterval);
    if (progressBar) progressBar.style.width = '0%';
  }

  function restartAutoplay() {
    if (isAutoplayActive) {
      stopAutoplay();
      startAutoplay();
    }
  }

  if (autoplayToggleBtn) {
    autoplayToggleBtn.addEventListener('click', () => {
      isAutoplayActive = !isAutoplayActive;
      if (isAutoplayActive) {
        autoplayIcon.className = 'fa-solid fa-pause';
        autoplayText.textContent = 'Auto-Play';
        startAutoplay();
        showToast('Auto-play slide navigation enabled', 'info');
      } else {
        autoplayIcon.className = 'fa-solid fa-play';
        autoplayText.textContent = 'Paused';
        stopAutoplay();
        showToast('Auto-play paused', 'info');
      }
    });
  }

  // Pause on hover over the slider
  if (sliderViewport) {
    sliderViewport.addEventListener('mouseenter', () => {
      if (isAutoplayActive) stopAutoplay();
    });
    sliderViewport.addEventListener('mouseleave', () => {
      if (isAutoplayActive) startAutoplay();
    });
  }

  // --- TOUCH SWIPE FOR MOBILE ---
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let isSwiping = false;

  if (sliderViewport) {
    sliderViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      isSwiping = true;
      if (isAutoplayActive) stopAutoplay();
    }, { passive: true });

    sliderViewport.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant over vertical scroll
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
        if (diffX < 0) {
          nextSlide(); // Swiped left
        } else {
          prevSlide(); // Swiped right
        }
      }
      isSwiping = false;
      restartAutoplay();
    }, { passive: true });

    // --- MOUSE DRAG SUPPORT ---
    let mouseStartX = 0;
    let isMouseDown = false;

    sliderViewport.addEventListener('mousedown', (e) => {
      // Prevent drag if clicking a button or link
      if (e.target.closest('button') || e.target.closest('a')) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
      if (isAutoplayActive) stopAutoplay();
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const mouseEndX = e.clientX;
      const diff = mouseEndX - mouseStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      restartAutoplay();
    });

    // Keyboard Arrow navigation when over the slider
    sliderViewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        restartAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        restartAutoplay();
      }
    });
  }

  // --- CATEGORY FILTERING ---
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      allSlides.forEach(slide => {
        const slideCat = slide.getAttribute('data-category') || '';
        if (filterVal === 'all' || slideCat.includes(filterVal)) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });

      // Recalculate active slides
      activeSlides = allSlides.filter(slide => slide.style.display !== 'none');
      currentIndex = 0;
      renderDots();
      updateSlider(false);
      restartAutoplay();
    });
  });

  // Initial Slider Setup
  renderDots();
  updateSlider(false);
  startAutoplay();


  /* ==========================================================================
     10. PROJECT CASE STUDY MODAL DETAILS
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsData = {
    1: {
      title: 'Nexus AI Studio',
      subtitle: 'Multimodal Generative AI Workspace & Assistant Platform',
      image: 'assets/images/project_ai.jpg',
      overview: 'Nexus AI Studio was engineered to provide software development teams with an enterprise-ready workspace combining AI code generation, automated documentation querying via Retrieval-Augmented Generation (RAG), and custom LLM agent orchestrations.',
      problem: 'Engineers spent up to 35% of their sprint cycles writing boilerplate syntax, digging through fragmented internal API wikis, and debugging syntax issues.',
      solution: 'Built a unified desktop and web platform that indexes private repositories into high-dimensional vector embeddings, allowing developers to query systems with real-time streaming answers and one-click code generation.',
      specs: [
        { label: 'Frontend Stack', val: 'Next.js 14, React, Tailwind CSS, Monaco Editor' },
        { label: 'Backend Stack', val: 'Python FastAPI, LangChain, Celery, Redis' },
        { label: 'Database & Vectors', val: 'PostgreSQL, Pinecone Vector DB' },
        { label: 'Key Metric', val: '64% faster API documentation lookup and code drafting' }
      ],
      features: [
        'Real-time token streaming with syntax highlighting and diff comparisons',
        'Private knowledge base integration with automatic file chunking and vector indexing',
        'Fine-tuned system prompts for Python, TypeScript, Go, and SQL workflows',
        'Token usage and latency monitoring dashboard with per-team budget limits'
      ]
    },
    2: {
      title: 'Nova Market Platform',
      subtitle: 'Next-Generation Ultra-Fast E-Commerce Architecture',
      image: 'assets/images/project_ecommerce.jpg',
      overview: 'Nova Market is a high-conversion modern digital storefront designed for instant page transitions, seamless multi-currency checkout, and real-time inventory synchronization across multi-warehouse locations.',
      problem: 'Legacy e-commerce systems suffered from 3.5s+ page load latencies, high cart abandonment during multi-step checkouts, and desynchronized stock counts during flash sales.',
      solution: 'Developed a decoupled headless storefront with aggressive edge caching, optimistic UI updates, and atomic inventory locks using Redis transactions.',
      specs: [
        { label: 'Frontend Stack', val: 'React.js, Redux Toolkit, Framer Motion, SCSS' },
        { label: 'Backend Architecture', val: 'Node.js, Express, Microservices architecture' },
        { label: 'Payments & Cache', val: 'Stripe Elements, Redis Cache, AWS S3' },
        { label: 'Key Metric', val: '0.4s average page load, 28% increase in completed conversions' }
      ],
      features: [
        'Instant client-side multi-attribute filtering (brand, size, price, rating) with 0ms lag',
        'One-click Stripe checkout with Apple Pay & Google Pay support',
        'Persistent cart with cross-device synchronization and automatic session recovery',
        'Real-time low inventory indicators and automated admin order dispatch webhooks'
      ]
    },
    3: {
      title: 'CryptoFlow Analytics',
      subtitle: 'Real-Time Financial Market Terminal & Portfolio Intelligence',
      image: 'assets/images/project_fintech.jpg',
      overview: 'CryptoFlow is an advanced financial intelligence terminal providing algorithmic traders and investors with live order-book depth feeds, customizable technical charting indicators, and instant price anomaly alerts.',
      problem: 'Traders needed high-frequency data from multiple exchanges without browser tab freezes, memory leaks, or missed trade trigger notifications.',
      solution: 'Engineered a WebSocket pipeline with binary message packing, worker-thread charting computation, and zero DOM reflows during rapid tick updates.',
      specs: [
        { label: 'Frontend Engine', val: 'React, HTML5 Canvas Rendering, Chart.js / TradingView API' },
        { label: 'Streaming Infrastructure', val: 'WebSockets, Node.js cluster, TimescaleDB' },
        { label: 'Security & Auth', val: 'JWT, HMAC request signatures, AES-256 encrypted keys' },
        { label: 'Key Metric', val: 'Handles 1,200+ ticks/sec without client memory degradation' }
      ],
      features: [
        'Real-time multi-exchange candlestick charts with SMA, EMA, RSI, and MACD overlays',
        'Algorithmic threshold alert engine triggering web notifications and Telegram webhooks',
        'Automated portfolio valuation with FIFO/LIFO tax and realized gain calculations',
        'Dark mode terminal UX with responsive mobile layout and touch pan/zoom'
      ]
    },
    4: {
      title: 'Synergy Workspace',
      subtitle: 'Agile Kanban & Real-time Team Collaboration Suite',
      image: 'assets/images/project_taskflow.jpg',
      overview: 'Synergy Workspace is a productivity hub for distributed engineering and product teams. It features real-time interactive boards, sprint velocity calculations, and multi-user live editing with zero conflicts.',
      problem: 'Remote teams experienced desynchronized board states, lack of sprint visibility, and clunky third-party task management tools that slowed down standups.',
      solution: 'Crafted a blazingly responsive Kanban and roadmap platform utilizing CRDT-inspired collaborative synchronization over WebSockets.',
      specs: [
        { label: 'Frontend Stack', val: 'Next.js, Tailwind CSS, Lucide Icons, Drag & Drop API' },
        { label: 'Backend & Sync', val: 'Node.js, Socket.io, Prisma ORM, PostgreSQL' },
        { label: 'Testing & CI', val: 'Jest, Playwright, GitHub Actions workflow' },
        { label: 'Key Metric', val: 'Used by 25+ teams with 99.98% operational uptime' }
      ],
      features: [
        'Fluid drag-and-drop task columns with instant optimistic client updates',
        'Live teammate presence indicators with active cursor avatars and activity feeds',
        'Automated sprint velocity and burndown charts generated dynamically',
        'Custom tagging, markdown issue descriptions, and attachment uploads'
      ]
    }
  };

  function openProjectModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !modalBody) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-header-img" />
      <div class="project-meta-strip">
        <span class="category-badge ai-badge"><i class="fa-solid fa-layer-group"></i> Case Study</span>
        <span class="project-status-tag"><i class="fa-solid fa-circle-check"></i> Verified Project</span>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>
      
      <p class="modal-overview">${data.overview}</p>

      <div style="margin-bottom: 1.5rem;">
        <h4 class="modal-section-title"><i class="fa-solid fa-triangle-exclamation" style="color: var(--accent-amber);"></i> The Challenge</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${data.problem}</p>
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 class="modal-section-title"><i class="fa-solid fa-lightbulb" style="color: var(--secondary);"></i> The Solution & Architecture</h4>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${data.solution}</p>
      </div>

      <h4 class="modal-section-title"><i class="fa-solid fa-sliders" style="color: var(--primary);"></i> Technical Specifications</h4>
      <div class="modal-specs-list">
        ${data.specs.map(spec => `
          <div class="spec-item">
            <span>${spec.label}</span>
            <strong>${spec.val}</strong>
          </div>
        `).join('')}
      </div>

      <h4 class="modal-section-title"><i class="fa-solid fa-star" style="color: var(--accent-pink);"></i> Key Capabilities</h4>
      <ul style="margin-bottom: 2rem; display: flex; flex-direction: column; gap: 0.6rem;">
        ${data.features.map(f => `
          <li style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-secondary); font-size: 0.92rem;">
            <i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i> ${f}
          </li>
        `).join('')}
      </ul>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://github.com" target="_blank" rel="noopener" class="btn btn-primary">
          <i class="fa-brands fa-github"></i> View Source Code
        </a>
        <button class="btn btn-outline" onclick="document.getElementById('projectModal').classList.remove('open'); document.body.style.overflow='';">
          <i class="fa-solid fa-xmark"></i> Close Details
        </button>
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Bind view case study buttons
  document.querySelectorAll('.view-case-study').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = button.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // Escape key closes modal & mobile drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeMobileMenu();
    }
  });


  /* ==========================================================================
     11. CONTACT FORM REAL-TIME VALIDATION & SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitFormBtn');
  const successAlert = document.getElementById('formSuccessAlert');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(input, errorElement, validatorFn, errorMsg) {
    const isValid = validatorFn(input.value.trim());
    if (!isValid) {
      errorElement.textContent = errorMsg;
      input.style.borderColor = 'var(--accent-pink)';
      return false;
    } else {
      errorElement.textContent = '';
      input.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      return true;
    }
  }

  // Real-time input listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters)');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, emailError, validateEmail, 'Please enter a valid email address');
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      validateField(subjectInput, subjectError, val => val.length >= 3, 'Please enter a subject (at least 3 characters)');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageError, val => val.length >= 10, 'Please write a message of at least 10 characters');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, val => val.length >= 2, 'Please enter your name (at least 2 characters)');
      const isEmailValid = validateField(emailInput, emailError, validateEmail, 'Please enter a valid email address');
      const isSubjectValid = validateField(subjectInput, subjectError, val => val.length >= 3, 'Please enter a subject (at least 3 characters)');
      const isMessageValid = validateField(messageInput, messageError, val => val.length >= 10, 'Please write a message of at least 10 characters');

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast('Please correct the errors in the form before sending.', 'error');
        return;
      }

      // Show loading spinner
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success alert & toast
        if (successAlert) {
          successAlert.style.display = 'flex';
        }
        showToast('Message sent successfully! Rajan will contact you soon.', 'success');

        // Reset form
        contactForm.reset();
      }, 1200);
    });
  }

  /* ==========================================================================
     12. COPY EMAIL TO CLIPBOARD
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailTextEl = document.getElementById('emailText');

  if (copyEmailBtn && emailTextEl) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailTextEl.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const tooltip = copyEmailBtn.querySelector('.tooltip');
        if (tooltip) tooltip.textContent = 'Copied!';
        showToast('Email address copied to clipboard!', 'success');

        setTimeout(() => {
          if (tooltip) tooltip.textContent = 'Copy';
        }, 2500);
      }).catch(() => {
        showToast('Could not copy email automatically.', 'error');
      });
    });
  }

  /* ==========================================================================
     13. DOWNLOAD RESUME BUTTON HANDLER
     ========================================================================== */
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('Opening Rajan Chauhan Resume preview...', 'info');
      // Create mock resume download notification
      setTimeout(() => {
        showToast('Resume ready for download!', 'success');
      }, 700);
    });
  }

  /* ==========================================================================
     14. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = 'fa-solid fa-circle-info';
    let iconColor = 'var(--primary)';
    if (type === 'success') {
      icon = 'fa-solid fa-circle-check';
      iconColor = 'var(--accent-emerald)';
    } else if (type === 'error') {
      icon = 'fa-solid fa-circle-exclamation';
      iconColor = 'var(--accent-pink)';
    }

    toast.innerHTML = `
      <i class="${icon}" style="color: ${iconColor}; font-size: 1.1rem;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  }

});
