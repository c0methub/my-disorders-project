(() => {
  const intro = document.querySelector("#intro");
  const question = document.querySelector("#question");
  const profile = document.querySelector("#profile");
  const goodbye = document.querySelector("#visitor");
  const site = document.querySelector("#site");
  const menuButton = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("#nav-links");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showStage(nextStage) {
    [question, profile, goodbye].forEach((stage) => {
      if (!stage) return;
      stage.hidden = true;
      stage.classList.remove("stage-active");
    });
    nextStage.hidden = false;
    requestAnimationFrame(() => nextStage.classList.add("stage-active"));
  }

  function showPresentation() {
    if (!intro || !site) return;
    intro.setAttribute("aria-hidden", "true");
    site.hidden = false;
    requestAnimationFrame(() => site.classList.add("visible"));
    document.body.classList.remove("locked");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }

  document.querySelector("#yes")?.addEventListener("click", () => showStage(profile));
  document.querySelector("#no")?.addEventListener("click", () => showStage(goodbye));
  document.querySelector("#continue")?.addEventListener("click", showPresentation);

  document.querySelector("#close-page")?.addEventListener("click", () => {
    window.close();
    const note = document.querySelector("#close-note");
    if (note) note.textContent = "Your browser may not let a page close itself. Please close this tab.";
  });

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.textContent = isOpen ? "Menu" : "Close";
      navLinks.classList.toggle("open", !isOpen);
    });
    navLinks.addEventListener("click", (event) => {
      if (!event.target.closest("a")) return;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
      navLinks.classList.remove("open");
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("in"));
  }

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");
  progress.innerHTML = "<span></span>";
  document.body.append(progress);
  const progressFill = progress.firstElementChild;
  let progressQueued = false;
  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressFill.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
    progressQueued = false;
  }
  window.addEventListener("scroll", () => {
    if (progressQueued) return;
    progressQueued = true;
    requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
  updateProgress();

  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = document.querySelectorAll('.navlinks a[href^="#"]');
  if ("IntersectionObserver" in window && sections.length && sectionLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-20% 0px -65% 0px" });
    sections.forEach((section) => navObserver.observe(section));
  }
})();
