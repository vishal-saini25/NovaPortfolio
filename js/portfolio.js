/* Main portfolio interactions and rendering logic extracted from the original HTML. */
let portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    let activeProjectCategory = "All";
    let activeExperienceFilter = "All";
    let activeBlogMode = "drafts";
    let lastFormattedContactText = "";
    let ambientAnimId = null;

    function loadSavedData() {
      try {
        const saved = localStorage.getItem("nova_portfolio_data_minimal_v4");
        if (saved) {
          const sv = JSON.parse(saved);
          portfolioData = Object.assign({}, DEFAULT_PORTFOLIO_DATA, sv, {
            profile: Object.assign({}, DEFAULT_PORTFOLIO_DATA.profile, sv.profile || {}),
            socials: Object.assign({}, DEFAULT_PORTFOLIO_DATA.socials, sv.socials || {})
          });
        }
      } catch (e) {}
    }

    function toggleMobileMenu() {
      const drawer = document.getElementById("mobile-nav-drawer");
      const btn = document.getElementById("btn-mobile-menu");
      const iconOpen = document.getElementById("icon-menu-open");
      const iconClose = document.getElementById("icon-menu-close");
      if (!drawer || !btn) return;
      const isHidden = drawer.classList.toggle("hidden");
      btn.setAttribute("aria-expanded", String(!isHidden));
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle("hidden", !isHidden);
        iconClose.classList.toggle("hidden", isHidden);
      }
    }

    function closeMobileMenu() {
      const drawer = document.getElementById("mobile-nav-drawer");
      const btn = document.getElementById("btn-mobile-menu");
      const iconOpen = document.getElementById("icon-menu-open");
      const iconClose = document.getElementById("icon-menu-close");
      if (drawer && !drawer.classList.contains("hidden")) {
        drawer.classList.add("hidden");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (iconOpen) iconOpen.classList.remove("hidden");
        if (iconClose) iconClose.classList.add("hidden");
      }
    }

    function escapeHtml(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    // ===================================================================
    // 1. TYPING ANIMATION: "Nova."
    // ===================================================================
    function initTypingAnimation() {
      const textEl = document.getElementById("typed-text");
      const cursorEl = document.getElementById("typed-cursor");
      if (!textEl) return;

      textEl.textContent = "";
      const word = "Nova.";
      let charIdx = 0;

      function typeChar() {
        if (charIdx < word.length) {
          textEl.textContent += word.charAt(charIdx);
          charIdx++;
          setTimeout(typeChar, 130 + Math.random() * 60);
        } else if (cursorEl) {
          cursorEl.classList.add("cursor-blink");
        }
      }

      setTimeout(typeChar, 280);
    }

    // ===================================================================
    // 2. INTERACTIVE 3D CARD ANIMATION FOR DENJI PORTRAIT
    // ===================================================================
    function initDenjiCardAnimation() {
      const wrapper = document.getElementById("denji-card-wrapper");
      const card = document.getElementById("denji-3d-card");
      const glare = document.getElementById("denji-glare");
      if (!wrapper || !card) return;

      let bounds = null;

      function updateBounds() {
        bounds = wrapper.getBoundingClientRect();
      }
      window.addEventListener("resize", updateBounds, { passive: true });
      window.addEventListener("scroll", updateBounds, { passive: true });

      wrapper.addEventListener("mouseenter", () => {
        updateBounds();
        card.classList.remove("animate-subtle-float");
      });

      wrapper.addEventListener("mousemove", (e) => {
        if (!bounds) updateBounds();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = mouseX / bounds.width;
        const yPct = mouseY / bounds.height;

        const maxRot = 11;
        const rotY = (xPct - 0.5) * maxRot * 2;
        const rotX = -(yPct - 0.5) * maxRot * 2;

        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          glare.style.setProperty("--glare-x", `${(xPct * 100).toFixed(1)}%`);
          glare.style.setProperty("--glare-y", `${(yPct * 100).toFixed(1)}%`);
        }
      });

      wrapper.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        setTimeout(() => {
          card.classList.add("animate-subtle-float");
        }, 200);
      });
    }

    // ===================================================================
    // 3. CUSTOM INTERACTIVE CURSOR
    // ===================================================================
    function initCustomCursor() {
      const dot = document.getElementById("cursor-dot");
      const ring = document.getElementById("cursor-ring");
      if (!dot || !ring) return;

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let ringX = mouseX;
      let ringY = mouseY;

      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }, { passive: true });

      function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
      }
      requestAnimationFrame(animateRing);

      const interactiveSelector = "a, button, input, textarea, select, .skill-chip, .glass-panel, #denji-card-wrapper";
      document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactiveSelector)) {
          document.body.classList.add("cursor-hover");
        }
      });
      document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelector)) {
          document.body.classList.remove("cursor-hover");
        }
      });
    }

    // ===================================================================
    // 4. MINIMALIST CODER BACKGROUND ANIMATION (ARCHITECTURAL GRID +
    //    DRIFTING CODE/ML SYNTAX GLYPHS & DATA PULSES — NO MOVING DOTS)
    // ===================================================================
    function initAmbientCanvas() {
      const canvas = document.getElementById("ambient-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { canvas.style.display = "none"; return; }

      if (ambientAnimId) {
        cancelAnimationFrame(ambientAnimId);
      }

      let width = window.innerWidth;
      let height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      function sizeCanvas() {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      sizeCanvas();

      const gridSize = 64;
      const GLYPH_RGB = ["212, 163, 89", "94, 143, 148", "156, 163, 175"];

      // Authentic AI/ML & C++/Python code tokens
      const codeTokens = [
        "def forward(x):",
        "loss.backward()",
        "torch.no_grad()",
        "np.linalg.svd(A)",
        "∇L(θ)",
        "O(n log n)",
        "std::move(ptr)",
        "X_train.shape",
        "nn.Linear(d, k)",
        "λ · ||w||₂²",
        "df.groupby()",
        "optimizer.step()",
        "σ(Wx + b)",
        "constexpr",
        "yield batch",
        "argmax(z)"
      ];

      let glyphs = [];
      let pulses = [];

      function buildScene() {
        width = window.innerWidth;
        height = window.innerHeight;
        sizeCanvas();

        const glyphCount = Math.min(18, Math.max(9, Math.floor(width / 110)));
        glyphs = [];
        for (let i = 0; i < glyphCount; i++) {
          glyphs.push({
            text: codeTokens[i % codeTokens.length],
            x: Math.random() * width,
            y: Math.random() * height,
            vy: -(0.12 + Math.random() * 0.16),
            alpha: 0.03 + Math.random() * 0.04,
            tone: i % 3
          });
        }

        // Minimalist orthogonal circuit pulses gliding along the architectural grid lines
        const pulseCount = Math.min(8, Math.max(4, Math.floor(width / 220)));
        pulses = [];
        for (let i = 0; i < pulseCount; i++) {
          const horizontal = i % 2 === 0;
          const gx = Math.floor(Math.random() * Math.max(1, Math.floor(width / gridSize))) * gridSize;
          const gy = Math.floor(Math.random() * Math.max(1, Math.floor(height / gridSize))) * gridSize;
          pulses.push({
            x: gx,
            y: gy,
            horizontal,
            speed: 0.45 + Math.random() * 0.45,
            length: 48 + Math.random() * 44,
            alpha: 0.08 + Math.random() * 0.07,
            isGold: i % 2 === 0
          });
        }
      }

      buildScene();
      window.addEventListener("resize", buildScene, { passive: true });

      function renderCoderBackground() {
        ctx.clearRect(0, 0, width, height);

        // 1. Subtle architectural blueprint grid + micro crosshairs at every 2nd intersection
        ctx.strokeStyle = "rgba(255, 255, 255, 0.018)";
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Subtle intersection "+" markers every 128px
        ctx.strokeStyle = "rgba(212, 163, 89, 0.06)";
        for (let x = gridSize; x < width; x += gridSize * 2) {
          for (let y = gridSize; y < height; y += gridSize * 2) {
            ctx.beginPath();
            ctx.moveTo(x - 3, y);
            ctx.lineTo(x + 3, y);
            ctx.moveTo(x, y - 3);
            ctx.lineTo(x, y + 3);
            ctx.stroke();
          }
        }

        // 2. Orthogonal data pulses gliding along grid lines
        for (let i = 0; i < pulses.length; i++) {
          const p = pulses[i];
          const rgb = p.isGold ? "212, 163, 89" : "94, 143, 148";
          if (p.horizontal) {
            p.x += p.speed;
            if (p.x - p.length > width) {
              p.x = -20;
              p.y = Math.floor(Math.random() * Math.max(1, Math.floor(height / gridSize))) * gridSize;
            }
            const grad = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
            grad.addColorStop(0, `rgba(${rgb}, 0)`);
            grad.addColorStop(1, `rgba(${rgb}, ${p.alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(p.x - p.length, p.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          } else {
            p.y += p.speed;
            if (p.y - p.length > height) {
              p.y = -20;
              p.x = Math.floor(Math.random() * Math.max(1, Math.floor(width / gridSize))) * gridSize;
            }
            const grad = ctx.createLinearGradient(p.x, p.y - p.length, p.x, p.y);
            grad.addColorStop(0, `rgba(${rgb}, 0)`);
            grad.addColorStop(1, `rgba(${rgb}, ${p.alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - p.length);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }

        // 3. Minimalist drifting code & ML syntax glyphs
        ctx.font = '500 11px "JetBrains Mono", monospace';
        for (let i = 0; i < glyphs.length; i++) {
          const g = glyphs[i];
          g.y += g.vy;
          if (g.y < -24) {
            g.y = height + 24;
            g.x = Math.random() * (width - 120) + 20;
          }
          ctx.fillStyle = `rgba(${GLYPH_RGB[g.tone]}, ${g.alpha})`;
          ctx.fillText(g.text, g.x, g.y);
        }

        ambientAnimId = requestAnimationFrame(renderCoderBackground);
      }

      ambientAnimId = requestAnimationFrame(renderCoderBackground);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) { cancelAnimationFrame(ambientAnimId); ambientAnimId = null; }
        else if (!ambientAnimId) { ambientAnimId = requestAnimationFrame(renderCoderBackground); }
      });
    }

    function renderProfileAndSocials() {
      const p = portfolioData.profile;
      const s = portfolioData.socials;

      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.textContent = val;
      };

      setTxt("hero-eyebrow", p.eyebrow);
      setTxt("hero-statement", p.statement);
      setTxt("hero-supporting", p.supporting);
      setTxt("hero-motto", p.motto);
      setTxt("about-para-1", p.bioParagraphs[0]);
      setTxt("about-para-2", p.bioParagraphs[1]);
      setTxt("about-para-3", p.bioParagraphs[2]);
      setTxt("profile-role", p.role);
      setTxt("profile-focus", p.focus);
      setTxt("profile-interests", p.interests);
      setTxt("profile-location", p.location);

      const emailEl = document.getElementById("social-email-display");
      if (emailEl) {
        emailEl.innerHTML = s.email
          ? `<a href="mailto:${escapeHtml(s.email)}" class="text-textPrimary hover:text-accentGold transition-colors">${escapeHtml(s.email)}</a>`
          : `Not set`;
      }

      const githubEl = document.getElementById("social-github-display");
      if (githubEl) {
        const label = (s.github || "").replace(/^https?:\/\//, "");
        githubEl.innerHTML = s.github
          ? `<a href="${escapeHtml(s.github)}" target="_blank" rel="noopener noreferrer" class="text-textPrimary hover:text-accentGold transition-colors">${escapeHtml(label)} ↗</a>`
          : `Not set`;
      }

      const linkedinEl = document.getElementById("social-linkedin-display");
      if (linkedinEl) {
        const label = (s.linkedin || "").replace(/^https?:\/\//, "");
        linkedinEl.innerHTML = s.linkedin
          ? `<a href="${escapeHtml(s.linkedin)}" target="_blank" rel="noopener noreferrer" class="text-textPrimary hover:text-accentGold transition-colors">${escapeHtml(label)} ↗</a>`
          : `Not set`;
      }
    }

    function filterProjects(category) {
      activeProjectCategory = category;
      document.querySelectorAll(".project-filter-btn").forEach((btn) => {
        const isMatch = btn.id === `filter-btn-${slugify(category)}`;
        btn.setAttribute("aria-selected", String(isMatch));
        btn.className = isMatch
          ? "project-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors bg-accentGold text-[#090B0E]"
          : "project-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors bg-white/[0.03] text-textSecondary border border-white/[0.08] hover:text-textPrimary";
      });
      renderProjects();
    }

    function renderProjects() {
      const container = document.getElementById("projects-grid-container");
      if (!container) return;

      const filtered = portfolioData.projects.filter((p) =>
        activeProjectCategory === "All" ? true : p.category === activeProjectCategory
      );

      const renderChips = (stack) =>
        stack
          .map((tech) => `<span class="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-textSecondary border border-white/[0.07]">${escapeHtml(tech)}</span>`)
          .join("");

      let html = `<div class="grid grid-cols-1 md:grid-cols-2 gap-5">`;
      filtered.forEach((proj, idx) => {
        const spanClass = idx === 0 ? "md:col-span-2" : "";
        const featuredClass = idx === 0 ? "project-featured" : "";
        html += `
          <article class="glass-panel reveal rounded-xl p-6 ${idx === 0 ? 'sm:p-7' : ''} flex flex-col justify-between space-y-5 ${spanClass} ${featuredClass} ${spanClass ? 'border-l-2 border-l-accentGold/60' : ''}">
            <div class="space-y-2.5">
              <div class="flex items-center justify-between gap-2 text-xs font-mono">
                <span class="text-accentGold">${escapeHtml(proj.category)}</span>
                <span class="flex items-center gap-2 text-textMuted"><span class="status-dot" aria-hidden="true"></span>${escapeHtml(proj.status)}<span class="font-mono text-textMuted/70 pl-2 ml-1 border-l border-white/10">${String(idx + 1).padStart(2, "0")}</span></span>
              </div>
              <h3 class="font-display text-lg sm:text-xl font-bold text-textPrimary leading-snug">
                ${escapeHtml(proj.title)}
              </h3>
              <p class="text-sm text-textSecondary leading-relaxed">
                ${escapeHtml(proj.summary)}
              </p>
            </div>

            <div class="pt-3.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div class="flex flex-wrap gap-1.5">
                ${renderChips(proj.stack)}
              </div>
              <button
                type="button"
                onclick="openProjectModal('${proj.id}')"
                class="inline-flex items-center gap-1 text-xs font-mono font-medium text-accentGold hover:underline"
              >
                <span>Inspect</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        `;
      });
      html += `</div>`;
      container.innerHTML = html;
    }

    function openProjectModal(projectId) {
      const proj = portfolioData.projects.find((p) => p.id === projectId);
      if (!proj) return;
      const modal = document.getElementById("project-detail-modal");
      const catEl = document.getElementById("modal-project-category");
      const statusEl = document.getElementById("modal-project-status");
      const bodyEl = document.getElementById("modal-project-body");
      if (!modal || !bodyEl) return;

      if (catEl) catEl.textContent = proj.category;
      if (statusEl) statusEl.textContent = proj.status;

      bodyEl.innerHTML = `
        <div class="space-y-3 border-b border-white/10 pb-5">
          <h3 id="modal-project-title" class="font-display text-2xl font-bold text-textPrimary">${escapeHtml(proj.title)}</h3>
          <p class="text-textSecondary text-sm sm:text-base">${escapeHtml(proj.summary)}</p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${proj.stack.map((t) => `<span class="px-2.5 py-0.5 rounded text-xs font-mono bg-white/5 text-textPrimary border border-white/10">${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p class="font-mono text-[11px] uppercase tracking-wider text-accentGold mb-1">Problem Addressed</p>
            <p class="text-xs sm:text-sm text-textPrimary leading-relaxed">${escapeHtml(proj.problem)}</p>
          </div>
          <div class="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <p class="font-mono text-[11px] uppercase tracking-wider text-accentSage mb-1">Architecture &amp; Approach</p>
            <p class="text-xs sm:text-sm text-textPrimary leading-relaxed">${escapeHtml(proj.approach)}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-textSecondary flex flex-wrap items-center justify-between gap-2">
          <span>Repository Link (Placeholder):</span>
          <a href="${escapeHtml(proj.githubUrl || '#projects')}" target="_blank" rel="noopener noreferrer" class="text-accentGold hover:underline">${escapeHtml(proj.githubUrl || 'github.com/nova-ml')} ↗</a>
        </div>
      `;
      modal.classList.remove("hidden");
    }

    function closeProjectModal() {
      const modal = document.getElementById("project-detail-modal");
      if (modal) modal.classList.add("hidden");
    }

    function filterExperience(typeFilter) {
      activeExperienceFilter = typeFilter;
      document.querySelectorAll(".exp-filter-btn").forEach((btn) => {
        const isMatch = btn.id === `exp-filter-${slugify(typeFilter)}`;
        btn.className = isMatch
          ? "exp-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono bg-accentGold text-[#090B0E] font-medium"
          : "exp-filter-btn px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.03] text-textSecondary border border-white/[0.08] hover:text-textPrimary";
      });
      renderExperience();
    }

    function renderExperience() {
      const container = document.getElementById("experience-timeline-container");
      if (!container) return;

      const items = portfolioData.experience.filter((item) =>
        activeExperienceFilter === "All" ? true : item.type === activeExperienceFilter
      );

      container.innerHTML = items
        .map(
          (item) => `
          <div class="relative group reveal">
            <span class="tl-dot absolute -left-[29px] sm:-left-[37px] top-2 w-2.5 h-2.5 rounded-full bg-[#090B0E] border-2 border-accentGold"></span>
            <article class="glass-panel rounded-xl p-5 sm:p-6 space-y-2.5">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span class="text-accentGold">${escapeHtml(item.role)}</span>
                <span class="text-textMuted">${escapeHtml(item.dates)} · ${escapeHtml(item.location)}</span>
              </div>
              <p class="text-xs font-mono text-textSecondary">${escapeHtml(item.organization)}</p>
              <p class="text-sm text-textSecondary leading-relaxed">${escapeHtml(item.description)}</p>
              <div class="flex flex-wrap gap-1.5 pt-2">
                ${item.technologies.map((t) => `<span class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-textSecondary border border-white/[0.07]">${escapeHtml(t)}</span>`).join("")}
              </div>
            </article>
          </div>
        `
        )
        .join("");
    }

    function setBlogViewMode(mode) {
      activeBlogMode = mode;
      const btnStatus = document.getElementById("btn-blog-mode-status");
      const btnDrafts = document.getElementById("btn-blog-mode-drafts");
      if (btnStatus && btnDrafts) {
        if (mode === "status") {
          btnStatus.className = "px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors bg-accentGold text-[#090B0E]";
          btnDrafts.className = "px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors text-textSecondary hover:text-textPrimary";
        } else {
          btnDrafts.className = "px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors bg-accentGold text-[#090B0E]";
          btnStatus.className = "px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors text-textSecondary hover:text-textPrimary";
        }
      }
      renderBlogs();
    }

    function renderBlogs() {
      const container = document.getElementById("blogs-content-container");
      if (!container) return;

      if (activeBlogMode === "status") {
        container.innerHTML = `
          <div class="glass-panel rounded-xl p-8 text-center max-w-2xl mx-auto space-y-4">
            <span class="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-white/5 text-accentGold border border-white/10">
              Writing Queue
            </span>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-textPrimary">
              Long-form engineering notes coming soon.
            </h3>
            <p class="text-sm text-textSecondary leading-relaxed">
              As I build machine learning pipelines and study core systems in Python and PyTorch, I'll publish full technical write-ups here.
            </p>
            <div class="pt-1">
              <button
                type="button"
                onclick="setBlogViewMode('drafts')"
                class="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-accentGold text-[#090B0E]"
              >
                View 3 Sample Drafts →
              </button>
            </div>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${portfolioData.blogs
            .map(
              (post, bi) => `
              <article class="glass-panel reveal relative overflow-hidden rounded-xl p-5 flex flex-col justify-between space-y-4">
                <span class="note-wm font-mono" aria-hidden="true">#0${bi + 1}</span>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-xs font-mono text-textMuted">
                    <span class="text-accentGold">${escapeHtml(post.dateLabel)}</span>
                    <span>${escapeHtml(post.readingTime)}</span>
                  </div>
                  <h3 class="font-display text-base font-bold text-textPrimary leading-snug">
                    ${escapeHtml(post.title)}
                  </h3>
                  <p class="text-xs sm:text-sm text-textSecondary leading-relaxed">${escapeHtml(post.summary)}</p>
                </div>
                <div class="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div class="flex flex-wrap gap-1.5">
                    ${post.topics.map((t) => `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-textMuted border border-white/[0.06]">${escapeHtml(t)}</span>`).join("")}
                  </div>
                  <button type="button" onclick="openBlogModal('${post.id}')" class="text-xs font-mono text-accentGold hover:underline">
                    Read ↗
                  </button>
                </div>
              </article>
            `
            )
            .join("")}
        </div>
      `;
    }

    function openBlogModal(blogId) {
      const post = portfolioData.blogs.find((b) => b.id === blogId);
      if (!post) return;
      const modal = document.getElementById("blog-reader-modal");
      const readTimeEl = document.getElementById("modal-blog-readtime");
      const bodyEl = document.getElementById("modal-blog-body");
      if (!modal || !bodyEl) return;

      if (readTimeEl) readTimeEl.textContent = post.readingTime;
      bodyEl.innerHTML = `
        <article class="space-y-5">
          <header class="border-b border-white/10 pb-4 space-y-2">
            <div class="flex flex-wrap gap-1.5">
              ${post.topics.map((t) => `<span class="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-accentGold border border-white/10">${escapeHtml(t)}</span>`).join("")}
            </div>
            <h3 id="modal-blog-title" class="font-display text-2xl font-bold text-textPrimary">${escapeHtml(post.title)}</h3>
            <p class="text-xs font-mono text-textMuted">${escapeHtml(post.dateLabel)}</p>
          </header>
          <div class="text-sm text-textSecondary space-y-3 leading-relaxed">
            <p>${escapeHtml(post.summary)}</p>
            <div class="p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-textPrimary space-y-1">
              <p class="text-accentGold">// Draft Placeholder Section</p>
              <p>Replace this block with your markdown or technical article content when ready.</p>
            </div>
          </div>
        </article>
      `;
      modal.classList.remove("hidden");
    }

    function closeBlogModal() {
      const modal = document.getElementById("blog-reader-modal");
      if (modal) modal.classList.add("hidden");
    }

    function handleContactSubmit(event) {
      event.preventDefault();
      const botField = document.getElementById("contact-bot-field");
      if (botField && botField.value) return;

      const name = (document.getElementById("contact-name")?.value || "").trim();
      const email = (document.getElementById("contact-email")?.value || "").trim();
      const subject = (document.getElementById("contact-subject")?.value || "").trim();
      const message = (document.getElementById("contact-message")?.value || "").trim();

      let isValid = true;
      const setErr = (id, msg) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (msg) {
          el.textContent = msg;
          el.classList.remove("hidden");
          isValid = false;
        } else {
          el.textContent = "";
          el.classList.add("hidden");
        }
      };

      setErr("error-contact-name", name.length < 2 ? "Please enter your name." : "");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErr("error-contact-email", !emailRegex.test(email) ? "Valid email required." : "");
      setErr("error-contact-subject", subject.length < 3 ? "Subject required." : "");
      setErr("error-contact-message", message.length < 10 ? "Message too short." : "");

      const feedbackBox = document.getElementById("contact-feedback-box");
      if (!isValid) {
        if (feedbackBox) feedbackBox.classList.add("hidden");
        return;
      }

      lastFormattedContactText = `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;
      const recipient = portfolioData.socials.email || "";
      const mailtoHref = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent("[Nova Portfolio] " + subject)}&body=${encodeURIComponent(lastFormattedContactText)}`;

      const titleEl = document.getElementById("contact-feedback-title");
      const descEl = document.getElementById("contact-feedback-desc");
      const mailtoLink = document.getElementById("contact-mailto-link");

      if (titleEl) titleEl.textContent = "Message Ready";
      if (descEl) descEl.textContent = "Open your default mail client or copy the formatted message below.";
      if (mailtoLink) mailtoLink.setAttribute("href", mailtoHref);
      if (feedbackBox) feedbackBox.classList.remove("hidden");
      showToast("Message prepared");
    }

    function resetContactForm() {
      const form = document.getElementById("contact-form");
      if (form) form.reset();
      ["error-contact-name", "error-contact-email", "error-contact-subject", "error-contact-message", "contact-feedback-box"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
      });
    }

    function copyFormattedContactMessage() {
      if (!lastFormattedContactText) return;
      copyTextToClipboard(lastFormattedContactText, "Copied message to clipboard");
    }

    const COMMAND_ITEMS = [
      { label: "01 / About Overview", action: () => { location.hash = "#about"; closeCommandPalette(); } },
      { label: "02 / Languages & Stack", action: () => { location.hash = "#skills"; closeCommandPalette(); } },
      { label: "03 / Selected Projects", action: () => { location.hash = "#projects"; closeCommandPalette(); } },
      { label: "04 / Experience & Milestones", action: () => { location.hash = "#experience"; closeCommandPalette(); } },
      { label: "05 / Technical Notes", action: () => { location.hash = "#blogs"; closeCommandPalette(); } },
      { label: "06 / Contact", action: () => { location.hash = "#contact"; closeCommandPalette(); } },
      { label: "Edit Portfolio Placeholder Info", action: () => { closeCommandPalette(); openDataEditorModal(); } }
    ];

    function openCommandPalette() {
      const modal = document.getElementById("cmd-palette-modal");
      const input = document.getElementById("cmd-palette-input");
      if (!modal) return;
      modal.classList.remove("hidden");
      renderCommandPaletteItems("");
      if (input) {
        input.value = "";
        setTimeout(() => input.focus(), 30);
      }
    }

    function closeCommandPalette() {
      const modal = document.getElementById("cmd-palette-modal");
      if (modal) modal.classList.add("hidden");
    }

    function renderCommandPaletteItems(query) {
      const list = document.getElementById("cmd-palette-list");
      if (!list) return;
      const q = (query || "").toLowerCase().trim();
      const matches = COMMAND_ITEMS.map((item, idx) => ({ item, idx })).filter(({ item }) =>
        item.label.toLowerCase().includes(q)
      );
      list.innerHTML = matches
        .map(
          ({ item, idx }) => `
          <button
            type="button"
            onclick="runCommandItem(${idx})"
            class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-mono text-textPrimary hover:bg-white/10 flex items-center justify-between transition-colors"
          >
            <span>${escapeHtml(item.label)}</span>
            <span class="text-accentGold">↵</span>
          </button>
        `
        )
        .join("");
    }

    function runCommandItem(index) {
      if (COMMAND_ITEMS[index]) COMMAND_ITEMS[index].action();
    }

    function openDataEditorModal(section) {
      const modal = document.getElementById("data-editor-modal");
      if (!modal) return;
      const setVal = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.value = v || "";
      };
      setVal("edit-hero-statement", portfolioData.profile.statement);
      setVal("edit-profile-location", portfolioData.profile.location);
      setVal("edit-profile-focus", portfolioData.profile.focus);
      setVal("edit-social-email", portfolioData.socials.email);
      setVal("edit-social-github", portfolioData.socials.github);
      setVal("edit-social-linkedin", portfolioData.socials.linkedin);
      setVal("edit-about-bio", portfolioData.profile.bioParagraphs[0]);
      modal.classList.remove("hidden");
      setTimeout(() => {
        const target = document.getElementById({ profile: "edit-about-bio", socials: "edit-social-email" }[section]);
        if (target) { target.scrollIntoView({ block: "center" }); target.focus(); }
      }, 60);
    }

    function closeDataEditorModal() {
      const modal = document.getElementById("data-editor-modal");
      if (modal) modal.classList.add("hidden");
    }

    function savePortfolioCustomizations() {
      const getVal = (id) => (document.getElementById(id)?.value || "").trim();
      portfolioData.profile.statement = getVal("edit-hero-statement") || DEFAULT_PORTFOLIO_DATA.profile.statement;
      portfolioData.profile.location = getVal("edit-profile-location") || DEFAULT_PORTFOLIO_DATA.profile.location;
      portfolioData.profile.focus = getVal("edit-profile-focus") || DEFAULT_PORTFOLIO_DATA.profile.focus;
      portfolioData.profile.bioParagraphs[0] = getVal("edit-about-bio") || DEFAULT_PORTFOLIO_DATA.profile.bioParagraphs[0];
      portfolioData.socials.email = getVal("edit-social-email");
      portfolioData.socials.github = getVal("edit-social-github");
      portfolioData.socials.linkedin = getVal("edit-social-linkedin");

      try {
        localStorage.setItem("nova_portfolio_data_minimal_v4", JSON.stringify(portfolioData));
      } catch (e) {}

      renderProfileAndSocials();
      closeDataEditorModal();
      showToast("Changes applied");
    }

    function resetPortfolioCustomizations() {
      portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
      try {
        localStorage.removeItem("nova_portfolio_data_minimal_v4");
      } catch (e) {}
      renderProfileAndSocials();
      closeDataEditorModal();
      showToast("Reset to defaults");
    }

    function exportPortfolioConfigJSON() {
      copyTextToClipboard(JSON.stringify(portfolioData, null, 2), "Copied JSON config");
    }

    function copyTextToClipboard(text, successMsg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => showToast(successMsg),
          () => fallbackCopy(text, successMsg)
        );
      } else {
        fallbackCopy(text, successMsg);
      }
    }

    function fallbackCopy(text, successMsg) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast(successMsg);
      } catch (e) {}
      document.body.removeChild(ta);
    }

    let toastTimer = null;
    function showToast(msg) {
      const banner = document.getElementById("toast-banner");
      const msgEl = document.getElementById("toast-message");
      if (!banner || !msgEl) return;
      msgEl.textContent = msg;
      banner.classList.remove("hidden");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        banner.classList.add("hidden");
      }, 3000);
    }

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommandPalette();
      } else if (e.key === "Escape") {
        closeProjectModal();
        closeBlogModal();
        closeCommandPalette();
        closeDataEditorModal();
        closeMobileMenu();
      }
    });

    function initScrollSpy() {
      const sectionIds = ["about", "skills", "projects", "experience", "blogs", "contact"];
      const navLinks = document.querySelectorAll(".nav-link");
      window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY + 180;
        let currentId = "";
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPos) {
            currentId = id;
          }
        }
        navLinks.forEach((link) => {
          const isMatch = link.getAttribute("data-section") === currentId;
          link.classList.toggle("active-nav", isMatch);
        });
      }, { passive: true });
    }

        // ===================================================================
    // UPGRADE: reveal, scroll FX, focus management, small helpers
    // ===================================================================
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function slugify(s) {
      return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    let revealIO = null;
    function observeReveals(root) {
      const els = (root || document).querySelectorAll(".reveal:not([data-rv])");
      if (REDUCED || !("IntersectionObserver" in window)) {
        els.forEach((el) => { el.setAttribute("data-rv", "1"); el.classList.add("in"); });
        return;
      }
      if (!revealIO) {
        revealIO = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const t = e.target;
            t.classList.add("in");
            revealIO.unobserve(t);
            setTimeout(() => t.style.setProperty("--d", 0), 1000); // hover transitions shouldn't inherit the stagger delay
          });
        }, { threshold: 0.12 });
      }
      els.forEach((el, i) => {
        el.setAttribute("data-rv", "1");
        el.style.setProperty("--d", i % 6);
        revealIO.observe(el);
      });
    }

    function initScrollFx() {
      const bar = document.getElementById("scroll-progress");
      const nav = document.getElementById("site-navbar");
      const layers = Array.from(document.querySelectorAll("[data-parallax]"));
      let ticking = false;
      function frame() {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
        if (nav) nav.classList.toggle("nav-scrolled", window.scrollY > 40);
        if (REDUCED) return;
        layers.forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -60 || r.top > window.innerHeight + 60) return;
          const off = ((r.top + r.height / 2) - window.innerHeight / 2) * -0.06;
          el.style.transform = `translate3d(0, ${Math.max(-24, Math.min(24, off)).toFixed(1)}px, 0)`;
        });
      }
      window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
      window.addEventListener("resize", frame, { passive: true });
      frame();
    }

    function initModalFocus() {
      const sel = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
      document.querySelectorAll('[role="dialog"]').forEach((dlg) => {
        let last = null, open = false;
        new MutationObserver(() => {
          const visible = !dlg.classList.contains("hidden");
          if (visible && !open) {
            open = true;
            last = document.activeElement;
            setTimeout(() => {
              if (!dlg.contains(document.activeElement)) { const f = dlg.querySelector(sel); if (f) f.focus(); }
            }, 30);
          } else if (!visible && open) {
            open = false;
            if (last && last.focus) last.focus();
          }
        }).observe(dlg, { attributes: true, attributeFilter: ["class"] });
        dlg.addEventListener("keydown", (e) => {
          if (e.key !== "Tab") return;
          const f = Array.from(dlg.querySelectorAll(sel)).filter((x) => x.offsetParent !== null);
          if (!f.length) return;
          const first = f[0], lastEl = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
          else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
        });
      });
    }

    function initUpgrade() {
      // Mark static elements for reveal (dynamic cards get the class in their templates)
      document.querySelectorAll(".eyebrow, h2.h-sweep, .skill-chip, #about aside, #contact .glass-panel, .img-frame").forEach((el) => el.classList.add("reveal"));
      observeReveals();
      ["projects-grid-container", "experience-timeline-container", "blogs-content-container"].forEach((id) => {
        const c = document.getElementById(id);
        if (!c) return;
        observeReveals(c);
        new MutationObserver(() => observeReveals(c)).observe(c, { childList: true });
      });
      initScrollFx();
      initModalFocus();
      document.addEventListener("click", (e) => {
        const d = document.getElementById("mobile-nav-drawer");
        const b = document.getElementById("btn-mobile-menu");
        if (d && !d.classList.contains("hidden") && !d.contains(e.target) && !(b && b.contains(e.target))) closeMobileMenu();
      });
    }

    window.addEventListener("DOMContentLoaded", () => {
      const yearEl = document.getElementById("footer-year");
      if (yearEl) yearEl.textContent = String(new Date().getFullYear());
      loadSavedData();
      renderProfileAndSocials();
      renderProjects();
      renderExperience();
      renderBlogs();
      initScrollSpy();
      initTypingAnimation();
      initDenjiCardAnimation();
      initCustomCursor();
      // The canvas grid is deliberately disabled in favor of the static color field.
      initUpgrade();
    });
