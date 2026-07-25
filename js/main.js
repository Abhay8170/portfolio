/* ============================================
   ABHAY SHARMA — Shared interactions
   ============================================ */

// Theme toggle
(function themeInit() {
  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    btn.textContent = saved === "dark" ? "☀" : "☾";
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      document.querySelectorAll(".theme-toggle").forEach((b) => {
        b.textContent = next === "dark" ? "☀" : "☾";
      });
    });
  });
})();

// Particles
(function initParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];
  const COUNT = 70;
  const CONNECTION_DIST = 130;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const color = isLight ? "8, 145, 178" : "0, 240, 255";

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.22;
          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.65)`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener("resize", () => { resize(); createParticles(); });
})();

// Typing effect (home only)
(function typingEffect() {
  const el = document.getElementById("typed-text");
  if (!el) return;
  const phrases = [
    "Data Science & AI Engineer",
    "Generative AI Builder",
    "RAG & ML Systems",
    "CSE AIML · Greater Noida",
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false, pause = 0;

  function tick() {
    const current = phrases[phraseIndex];
    if (pause > 0) { pause--; requestAnimationFrame(tick); return; }
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) { pause = 85; deleting = true; }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pause = 18;
      }
    }
    setTimeout(() => requestAnimationFrame(tick), deleting ? 26 : 52);
  }
  tick();
})();

// Nav scroll + mobile menu
(function navBehavior() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    });
  }

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // Highlight active page
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    } else if (href && path.includes(href.replace(".html", "")) && href !== "index.html") {
      link.classList.add("active");
    }
  });
})();

// Stat counters
(function counters() {
  const nums = document.querySelectorAll(".stat-num");
  if (!nums.length) return;
  let started = false;

  function animate() {
    nums.forEach((el) => {
      const target = +el.getAttribute("data-target");
      const start = performance.now();
      const duration = 1500;
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
    });
  }

  const stats = document.querySelector(".hero-stats");
  if (!stats) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      animate();
    }
  }, { threshold: 0.3 });
  obs.observe(stats);
})();

// Project filters
(function projectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card[data-category]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        const cat = card.getAttribute("data-category") || "";
        if (filter === "all" || cat.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
})();

// Contact form (Web3Forms / Formspree compatible)
(function contactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById("formSuccess");
    const original = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    const data = new FormData(form);

    try {
      // Using Web3Forms free endpoint — replace access_key with yours from https://web3forms.com
      const accessKey = form.querySelector('[name="access_key"]')?.value;
      if (accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data,
        });
        if (res.ok) {
          form.reset();
          if (success) success.style.display = "block";
          btn.textContent = "Sent ✓";
        } else {
          throw new Error("Submit failed");
        }
      } else {
        // Demo mode when no key configured
        await new Promise((r) => setTimeout(r, 800));
        form.reset();
        if (success) {
          success.style.display = "block";
          success.textContent = "Demo mode: form works! Add your Web3Forms access key to receive real emails.";
        }
        btn.textContent = "Sent ✓";
      }
    } catch (err) {
      btn.textContent = "Error — try email";
      console.error(err);
    }

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 3000);
  });
})();
