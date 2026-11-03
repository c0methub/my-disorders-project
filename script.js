const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.textContent = isOpen ? "Menu" : "Close";
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "Menu";
    navigation.classList.remove("open");
  });
}

// Add the enhancements stylesheet without needing to replace the inline intro design.
if (!document.querySelector('link[href="enhancements.css"]')) {
  const enhancementStyles = document.createElement("link");
  enhancementStyles.rel = "stylesheet";
  enhancementStyles.href = "enhancements.css";
  document.head.append(enhancementStyles);
}

const site = document.querySelector("#site") || document.querySelector(".site");
const footer = document.querySelector(".site-footer, .footer");
const main = document.querySelector("main");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Show a friendly rating prompt at the end of the guide. Ratings stay on this device.
if (site && footer && !document.querySelector("#site-rating")) {
  const ratingSection = document.createElement("section");
  ratingSection.className = "rating-section";
  ratingSection.id = "site-rating";
  ratingSection.setAttribute("aria-labelledby", "rating-title");
  ratingSection.innerHTML = `
    <div class="rating-card">
      <p class="rating-kicker">You made it to the end ✦</p>
      <h2 id="rating-title">How would you rate this website?</h2>
      <p class="rating-copy">Your quick feedback helps make this student project better.</p>
      <button class="rating-open" id="rating-open" type="button" aria-expanded="false" aria-controls="rating-options">Rate this website</button>
      <div class="rating-options" id="rating-options" role="group" aria-label="Choose a rating from 1 to 5 stars" hidden>
        <button class="rating-star" type="button" data-rating="1" aria-label="1 out of 5 stars">★</button>
        <button class="rating-star" type="button" data-rating="2" aria-label="2 out of 5 stars">★</button>
        <button class="rating-star" type="button" data-rating="3" aria-label="3 out of 5 stars">★</button>
        <button class="rating-star" type="button" data-rating="4" aria-label="4 out of 5 stars">★</button>
        <button class="rating-star" type="button" data-rating="5" aria-label="5 out of 5 stars">★</button>
      </div>
      <p class="rating-status" id="rating-status" aria-live="polite"></p>
      <p class="rating-privacy">Just for fun — your rating is saved only in this browser.</p>
    </div>`;
  footer.before(ratingSection);

  const openButton = ratingSection.querySelector("#rating-open");
  const options = ratingSection.querySelector("#rating-options");
  const status = ratingSection.querySelector("#rating-status");
  const starButtons = [...ratingSection.querySelectorAll(".rating-star")];
  const storageKey = "celiac-clearly-site-rating";

  openButton.addEventListener("click", () => {
    options.hidden = false;
    openButton.setAttribute("aria-expanded", "true");
    openButton.textContent = "Choose your rating below";
    starButtons[0].focus();
  });

  starButtons.forEach((star) => {
    star.addEventListener("click", () => {
      const score = Number(star.dataset.rating);
      starButtons.forEach((item) => {
        const selected = Number(item.dataset.rating) <= score;
        item.classList.toggle("selected", selected);
        item.setAttribute("aria-pressed", String(Number(item.dataset.rating) === score));
      });
      try { localStorage.setItem(storageKey, String(score)); } catch (_) { /* Storage may be disabled. */ }
      status.textContent = `Thanks for rating the site ${score} out of 5 stars!`;
      openButton.textContent = "Thanks for your feedback!";
    });
  });

  try {
    const savedScore = Number(localStorage.getItem(storageKey));
    if (savedScore >= 1 && savedScore <= 5) {
      options.hidden = false;
      openButton.setAttribute("aria-expanded", "true");
      openButton.textContent = "Update your rating";
      starButtons.forEach((star) => {
        const score = Number(star.dataset.rating);
        star.classList.toggle("selected", score <= savedScore);
        star.setAttribute("aria-pressed", String(score === savedScore));
      });
      status.textContent = `You rated this site ${savedScore} out of 5 stars. Thank you!`;
    }
  } catch (_) { /* Rating still works for the current visit. */ }
}

// A slim reading-progress indicator and staggered reveals add life without getting in the way.
const progress = document.createElement("div");
progress.className = "reading-progress";
progress.setAttribute("aria-hidden", "true");
progress.innerHTML = "<span></span>";
document.body.append(progress);
const progressFill = progress.firstElementChild;
let progressQueued = false;
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  progressFill.style.transform = `scaleX(${amount})`;
  progressQueued = false;
}
window.addEventListener("scroll", () => {
  if (progressQueued) return;
  progressQueued = true;
  window.requestAnimationFrame(updateProgress);
}, { passive: true });
window.addEventListener("resize", updateProgress, { passive: true });
updateProgress();

const animatedItems = document.querySelectorAll(".hero-visual, .section-header, .card, .step, .mini-card, .soft-panel, .source, .rating-card");
if (!reducedMotion && "IntersectionObserver" in window) {
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("motion-visible");
      motionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  animatedItems.forEach((item) => {
    item.classList.add("motion-reveal");
    motionObserver.observe(item);
  });
} else {
  animatedItems.forEach((item) => item.classList.add("motion-visible"));
}

// A compact YouTube player, deliberately opt-in: audio only starts after Play is pressed.
if (site && !document.querySelector("#musicbar")) {
  const player = document.createElement("aside");
  player.className = "musicbar";
  player.id = "musicbar";
  player.setAttribute("aria-label", "Optional music player");
  player.innerHTML = `
    <div class="music-screen" id="music-screen" aria-label="Music video player"></div>
    <div class="music-info">
      <p class="music-label">Optional soundtrack</p>
      <p class="music-title">Just Give Me a Reason</p>
      <p class="music-artist">P!nk · Nate Ruess</p>
      <div class="music-controls">
        <button class="music-toggle" id="music-toggle" type="button" aria-pressed="false">▶ Play song</button>
        <button class="music-close" id="music-close" type="button" aria-label="Hide music player">×</button>
      </div>
    </div>`;
  site.append(player);

  const screen = player.querySelector("#music-screen");
  const toggle = player.querySelector("#music-toggle");
  let iframe = null;
  let playing = false;

  function setPlaying(next) {
    playing = next;
    player.classList.toggle("is-playing", next);
    toggle.textContent = next ? "Ⅱ Pause" : "▶ Play song";
    toggle.setAttribute("aria-pressed", String(next));
  }

  toggle.addEventListener("click", () => {
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.title = "Just Give Me a Reason music video by P!nk featuring Nate Ruess";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.src = "https://www.youtube-nocookie.com/embed/OpQFFLBMEPI?autoplay=1&controls=1&playsinline=1&rel=0";
      screen.append(iframe);
      setPlaying(true);
      return;
    }

    const command = playing ? "pauseVideo" : "playVideo";
    iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "https://www.youtube-nocookie.com");
    setPlaying(!playing);
  });

  player.querySelector("#music-close").addEventListener("click", () => {
    if (iframe) iframe.src = "about:blank";
    player.remove();
  });
}

// Mark the current section for a useful nav state; supports both page nav versions.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .navlinks a[href^="#"]');
if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  sections.forEach((section) => navObserver.observe(section));
}
