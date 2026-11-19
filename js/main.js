// Inisialisasi komponen setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypedText();
  initAOS();
  initNavbarScroll();
  initVanillaTilt();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initBackToTop();
});

// Partikel background canvas
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const maxParticles = window.innerWidth < 768 ? 35 : 75;
  const connectionDistance = 120;
  let mouse = { x: null, y: null, radius: 150 };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.4 ? 'rgba(0, 210, 255,' : 'rgba(139, 92, 246,';
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.baseAlpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00d2ff';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Efek teks mengetik (Typed.js)
function initTypedText() {
  const typedTarget = document.querySelector('.typed-text-target');
  if (!typedTarget || typeof Typed === 'undefined') return;

  new Typed(typedTarget, {
    strings: [
      'Mahasiswa S1 Sistem Informasi',
      'Junior Web Developer',
      'Next.js &amp; Frontend Enthusiast',
      'Software Engineering Learner'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1800,
    startDelay: 350,
    loop: true,
    smartBackspace: true,
    contentType: 'html',
    cursorChar: '▋'
  });
}

// Inisialisasi AOS (Animate On Scroll)
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 850,
      offset: 60,
      easing: 'ease-out-cubic',
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
}

// Navbar scroll & scrollspy
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-cyber');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

// Efek kemiringan 3D kartu (VanillaTilt)
function initVanillaTilt() {
  if (typeof VanillaTilt === 'undefined') return;

  const tiltCards = document.querySelectorAll('.tilt-card');
  if (tiltCards.length > 0) {
    VanillaTilt.init(tiltCards, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      perspective: 1200,
      scale: 1.02
    });
  }
}

// Render kartu proyek & filter kategori
function renderProjects(filterValue = 'all') {
  const container = document.getElementById('projectsContainer');
  if (!container || typeof projectsData === 'undefined') return;

  const filteredProjects = projectsData.filter(project => {
    if (filterValue === 'all') return true;
    return project.category === filterValue;
  });

  container.innerHTML = filteredProjects.map(p => `
    <div class="col-12 col-md-6 col-lg-4 project-grid-item" data-category="${p.category}" data-aos="fade-up">
      <article class="project-card tilt-card">
        <div class="project-img-wrapper" data-project-id="${p.id}">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="project-overlay">
            <button class="btn-cyber-primary btn-sm btn-view-project-detail" data-project-id="${p.id}">
              <i class="bi bi-info-circle"></i> Detail Proyek
            </button>
          </div>
        </div>
        <div class="project-content">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="project-category">${p.categoryLabel}</span>
              <span class="badge ${p.category === 'completed' ? 'bg-success bg-opacity-25 text-success border border-success border-opacity-50' : 'bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50'} small" style="font-size: 0.7rem;">${p.statusBadge}</span>
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-desc">${p.shortDesc}</p>
            <div class="tech-tag-list">
              ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="project-links">
            ${p.liveUrl && p.liveUrl !== '#' ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn text-cyan">
                <i class="bi bi-box-arrow-up-right"></i> Live Demo
              </a>
            ` : `
              <button type="button" class="project-link-btn text-warning btn-view-project-detail border-0 bg-transparent p-0" data-project-id="${p.id}">
                <i class="bi bi-hourglass-split"></i> Detail &amp; Rencana
              </button>
            `}
            <a href="${p.githubUrl || '#'}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
              <i class="bi bi-github"></i> Repository
            </a>
          </div>
        </div>
      </article>
    </div>
  `).join('');

  initVanillaTilt();
  bindModalTriggers();
}

function updateFilterCounts() {
  if (typeof projectsData === 'undefined') return;
  const allCount = projectsData.length;
  const completedCount = projectsData.filter(p => p.category === 'completed').length;
  const inProgressCount = projectsData.filter(p => p.category === 'in-progress').length;

  const btnAll = document.querySelector('.filter-btn[data-filter="all"]');
  const btnCompleted = document.querySelector('.filter-btn[data-filter="completed"]');
  const btnInProgress = document.querySelector('.filter-btn[data-filter="in-progress"]');

  if (btnAll) btnAll.textContent = `Semua Proyek (${allCount})`;
  if (btnCompleted) btnCompleted.textContent = `Selesai (${completedCount})`;
  if (btnInProgress) btnInProgress.textContent = `Dalam Pengembangan (${inProgressCount})`;
}

function initProjectFilters() {
  updateFilterCounts();
  renderProjects('all');

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter') || 'all';
      renderProjects(filterValue);
    });
  });
}

// Modal detail proyek
function bindModalTriggers() {
  const modalElement = document.getElementById('projectDetailModal');
  if (!modalElement || typeof projectsData === 'undefined') return;

  const detailTriggers = document.querySelectorAll('.btn-view-project-detail, .project-img-wrapper');

  detailTriggers.forEach(trigger => {
    trigger.style.cursor = 'pointer';
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-id') || trigger.querySelector('.btn-view-project-detail')?.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projectId);
      if (!project) return;

      document.getElementById('modalProjectTitle').textContent = project.title;
      document.getElementById('modalProjectCategory').textContent = project.categoryLabel;
      document.getElementById('modalProjectDesc').textContent = project.fullDesc;
      document.getElementById('modalProjectArchitecture').textContent = project.architecture;

      const imgElem = document.getElementById('modalProjectImg');
      imgElem.src = project.image;
      imgElem.alt = project.title;

      const metricsContainer = document.getElementById('modalProjectMetrics');
      if (metricsContainer && project.metrics) {
        metricsContainer.innerHTML = `
          <div class="col-4 text-center p-2 rounded" style="background: rgba(0,210,255,0.06); border: 1px solid rgba(0,210,255,0.15)">
            <small class="text-secondary d-block" style="font-size: 0.72rem;">PERAN</small>
            <span class="text-cyan fw-bold" style="font-size: 0.82rem;">${project.metrics.role}</span>
          </div>
          <div class="col-4 text-center p-2 rounded" style="background: rgba(139,92,246,0.06); border: 1px solid rgba(139,92,246,0.15)">
            <small class="text-secondary d-block" style="font-size: 0.72rem;">STACK</small>
            <span class="text-violet fw-bold" style="font-size: 0.82rem;">${project.metrics.tech}</span>
          </div>
          <div class="col-4 text-center p-2 rounded" style="background: rgba(16,185,129,0.06); border: 1px solid rgba(16,185,129,0.15)">
            <small class="text-secondary d-block" style="font-size: 0.72rem;">STATUS</small>
            <span class="text-success fw-bold" style="font-size: 0.82rem;">${project.metrics.status}</span>
          </div>
        `;
      }

      const featureListElem = document.getElementById('modalProjectFeatures');
      if (featureListElem && project.features) {
        featureListElem.innerHTML = project.features
          .map(f => `<li class="mb-2 d-flex align-items-center gap-2"><i class="bi bi-check2-circle text-cyan"></i> <span>${f}</span></li>`)
          .join('');
      }

      const techTagsElem = document.getElementById('modalProjectTags');
      if (techTagsElem && project.tags) {
        techTagsElem.innerHTML = project.tags
          .map(t => `<span class="tech-tag">${t}</span>`)
          .join('');
      }

      const liveDemoBtn = document.getElementById('modalLiveDemoBtn');
      const githubBtn = document.getElementById('modalGithubBtn');
      if (liveDemoBtn) liveDemoBtn.href = project.liveUrl;
      if (githubBtn) githubBtn.href = project.githubUrl;

      const bsModal = bootstrap.Modal.getOrCreateInstance(modalElement);
      bsModal.show();
    });
  });
}

function initProjectModal() {
  bindModalTriggers();
}

// Validasi formulir kontak real-time
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('senderSubject');
  const messageInput = document.getElementById('senderMessage');
  const submitBtn = document.getElementById('submitContactBtn');
  const feedbackAlert = document.getElementById('contactFormAlert');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input, condition, errorMsg) {
    const errorContainer = input.parentElement.querySelector('.form-feedback-msg');
    if (!condition) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (errorContainer) {
        errorContainer.textContent = errorMsg;
        errorContainer.className = 'form-feedback-msg text-danger';
      }
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errorContainer) {
        errorContainer.textContent = '✓ Valid';
        errorContainer.className = 'form-feedback-msg text-success';
      }
      return true;
    }
  }

  nameInput?.addEventListener('input', () => {
    validateField(nameInput, nameInput.value.trim().length >= 3, 'Nama minimal 3 karakter.');
  });

  emailInput?.addEventListener('input', () => {
    validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Format email tidak valid.');
  });

  subjectInput?.addEventListener('input', () => {
    validateField(subjectInput, subjectInput.value.trim().length >= 4, 'Subjek minimal 4 karakter.');
  });

  messageInput?.addEventListener('input', () => {
    validateField(messageInput, messageInput.value.trim().length >= 10, 'Pesan minimal 10 karakter.');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 3, 'Nama minimal 3 karakter.');
    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'Format email tidak valid.');
    const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 4, 'Subjek minimal 4 karakter.');
    const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'Pesan minimal 10 karakter.');

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      if (feedbackAlert) {
        feedbackAlert.innerHTML = `
          <div class="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <div>Harap periksa kembali isian formulir Anda. Pastikan semua data terisi dengan benar.</div>
          </div>
        `;
      }
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span>Mengirim Pesan...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      const senderName = nameInput.value.trim();
      const senderEmail = emailInput.value.trim();
      const senderSubject = subjectInput.value.trim();
      const senderMessage = messageInput.value.trim();

      if (feedbackAlert) {
        feedbackAlert.innerHTML = `
          <div class="alert alert-success d-flex flex-column gap-2 mb-3" role="alert" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399;">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-check-circle-fill fs-5"></i>
              <strong>Pesan Berhasil Terkirim!</strong>
            </div>
            <p class="mb-1" style="font-size: 0.88rem; color: #e2e8f0;">
              Terima kasih <strong>${senderName}</strong>. Notifikasi telah diproses. Anda juga dapat mengirimkannya langsung ke email saya melalui tombol di bawah jika diperlukan.
            </p>
            <div>
              <a href="mailto:ridhwanrido794@gmail.com?subject=${encodeURIComponent(senderSubject)}&body=${encodeURIComponent('Nama: ' + senderName + '\nEmail: ' + senderEmail + '\n\n' + senderMessage)}" class="btn btn-sm btn-outline-light mt-1">
                <i class="bi bi-envelope-open me-1"></i> Buka di Email Client Anda
              </a>
            </div>
          </div>
        `;
      }

      form.reset();
      [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
        inp.classList.remove('is-valid');
        const err = inp.parentElement.querySelector('.form-feedback-msg');
        if (err) err.textContent = '';
      });
    }, 1200);
  });
}

// Tombol back to top
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
