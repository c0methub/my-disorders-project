const intro = document.getElementById("intro");
const question = document.getElementById("question");
const profile = document.getElementById("profile");
const visitor = document.getElementById("visitor");
const site = document.getElementById("site");
const menuButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".navlinks");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Give each welcome step a smooth entrance and make the profile feel personal.
const polishStyles = document.createElement("style");
polishStyles.textContent = `
  .intro::before, .intro::after {
    content: ""; position: absolute; width: min(60vw, 560px); aspect-ratio: 1;
    border-radius: 50%; pointer-events: none; filter: blur(2px); opacity: .48;
    background: radial-gradient(circle, rgba(91,145,111,.34), transparent 68%);
    animation: intro-drift 12s ease-in-out infinite alternate;
  }
  .intro::before { top: -25%; left: -16%; }
  .intro::after { right: -18%; bottom: -34%; animation-delay: -5s; background: radial-gradient(circle, rgba(216,114,72,.25), transparent 68%); }
  .intro-box { position: relative; z-index: 1; animation: intro-card-in .8s cubic-bezier(.2,.8,.2,1) both; }
  .stage { animation: stage-in .55s cubic-bezier(.2,.8,.2,1) both; }
  .stage[hidden] { display: none !important; }
  .stage-icon { color: #efad7c; font-size: 2rem; }
  .profile-avatar {
    width: 126px; height: 126px; margin: 0 auto .35rem; padding: 5px;
    border-radius: 50%; background: linear-gradient(135deg,#efad7c,#d9f4d8,#70a987);
    box-shadow: 0 0 0 8px rgba(255,255,255,.05), 0 18px 40px rgba(0,0,0,.24);
    animation: avatar-float 4s ease-in-out infinite;
  }
  .profile-avatar img, .profile-avatar .avatar-fallback {
    width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
    background: #e8dfd1; color: #163e35;
  }
  .profile-avatar .avatar-fallback { display: grid; place-items: center; font: 600 2.4rem Georgia,serif; }
  .profile-name { margin-bottom: -.2rem !important; }
  .profile-tag { display: inline-flex; justify-self: center; padding: .42rem .75rem; border: 1px solid rgba(217,244,216,.2); border-radius: 999px; color: #d9f4d8; font-size: .78rem; font-weight: 700; }
  .profile-heart { color: #ffb6a2 !important; font-size: 1.15rem; }
  .goodbye-icon { display: grid; place-items: center; width: 66px; height: 66px; margin: 0 auto; border-radius: 50%; background: rgba(255,255,255,.08); color: #efad7c; font-size: 1.8rem; }
  .site.visible .hero > div:first-child { animation: content-rise .75s .08s both; }
  .site.visible .hero-visual { animation: content-rise .85s .18s both; }
  .hero-photo { transition: transform .6s cubic-bezier(.2,.8,.2,1), box-shadow .6s ease; }
  .hero-photo:hover { transform: translateY(-7px) rotate(1deg); box-shadow: 0 36px 64px rgba(16,37,31,.24); }
  .floating-note { animation: note-float 5s ease-in-out infinite; }
  .label { display: inline-flex; align-items: center; gap: .55rem; padding: .44rem .72rem; border: 1px solid rgba(216,114,72,.16); border-radius: 999px; background: rgba(255,248,241,.76); }
  .info-box, .mini-card, .fact-card, .creative-box, .source-list a { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .mini-card:hover, .fact-card:hover, .info-box:hover, .source-list a:hover {
    transform: translateY(-5px); border-color: rgba(216,114,72,.35);
    box-shadow: 0 20px 34px rgba(22,62,53,.1);
  }
  .fact-card h3, .mini-card h3 { margin-top: .1rem; font-family: var(--serif); font-size: 1.35rem; }
  .fact-card p, .mini-card p, .info-box p, .creative-box p { color: var(--muted); line-height: 1.7; }
  .notice { box-shadow: 0 16px 34px rgba(22,62,53,.07); }
  .reading-progress { position: fixed; inset: 0 auto auto 0; z-index: 70; width: 100%; height: 3px; pointer-events: none; }
  .reading-progress span { display: block; width: 100%; height: 100%; transform: scaleX(0); transform-origin: left; background: linear-gradient(90deg,#d87248,#efad7c,#7ca77d); }
  .navlinks a { transition: color .2s ease; }
  .navlinks a:hover { color: var(--orange); }
  .button { transition: transform .2s ease, box-shadow .2s ease; }
  .button:hover { transform: translateY(-3px); box-shadow: 0 20px 36px rgba(216,114,72,.32); }
  @keyframes intro-drift { to { transform: translate(35px, 28px) scale(1.12); } }
  @keyframes intro-card-in { from { opacity: 0; transform: translateY(20px) scale(.97); } to { opacity: 1; transform: none; } }
  @keyframes stage-in { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: none; } }
  @keyframes avatar-float { 50% { transform: translateY(-5px); } }
  @keyframes content-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
  @keyframes note-float { 50% { transform: translateY(-8px) rotate(1deg); } }
  @media (max-width: 700px) { .profile-avatar { width: 108px; height: 108px; } }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
  }
`;
document.head.append(polishStyles);

// Use the photo stored in the user's website-assets repository.
if (profile) {
  const avatar = document.createElement("div");
  avatar.className = "profile-avatar";
  const image = document.createElement("img");
  image.src = "https://raw.githubusercontent.com/c0methub/website-assets/main/Screenshot_20261027_123721_Snapchat.jpg";
  image.alt = "Mo. Dewan";
  image.onerror = () => {
    avatar.innerHTML = '<span class="avatar-fallback" aria-hidden="true">M</span>';
  };
  avatar.append(image);

  const heading = profile.querySelector("h2");
  if (heading) {
    heading.before(avatar);
    heading.textContent = "Hi, I’m Mo.";
    heading.classList.add("profile-name");
  }

  const description = profile.querySelector("p");
  if (description) description.textContent = "I’m presenting celiac disease to you. I hope you enjoy it!";

  const badge = document.createElement("span");
  badge.className = "profile-tag";
  badge.textContent = "✦ My celiac disease presentation";
  const picker = profile.querySelector(".photo-label");
  if (picker) picker.before(badge);

  const heart = document.createElement("p");
  heart.className = "profile-heart";
  heart.textContent = "Made for you with love <3";
  if (picker) picker.before(heart);
}

// A clear goodbye screen is used for "No". Browsers do not let a webpage
// close a tab unless that page opened it, so visitors can close it themselves.
if (visitor) {
  visitor.innerHTML = `
    <div class="goodbye-icon" aria-hidden="true">✦</div>
    <h2>Thanks for stopping by.</h2>
    <p>This presentation is for Miss Halsted. You can close this tab now.</p>
    <button class="continue" id="close-page" type="button">Close this page</button>
    <p class="intro-small" id="close-note" aria-live="polite"></p>`;
}

if (intro && site) document.body.style.overflow = "hidden";

function showStage(stage) {
  [question, profile, visitor].forEach((item) => {
    if (!item) return;
    item.hidden = true;
    item.classList.remove("show");
  });
  stage.hidden = false;
  requestAnimationFrame(() => stage.classList.add("show"));
}

function enterSite() {
  if (!intro || !site) return;
  intro.setAttribute("aria-hidden", "true");
  site.hidden = false;
  requestAnimationFrame(() => site.classList.add("visible"));
  document.body.style.overflow = "";
}

// "Yes" opens Mo's profile first; the presentation only appears after Continue.
document.getElementById("yes")?.addEventListener("click", () => showStage(profile));
document.getElementById("no")?.addEventListener("click", () => showStage(visitor));
document.getElementById("continue")?.addEventListener("click", enterSite);
document.getElementById("enter")?.addEventListener("click", enterSite);
document.getElementById("close-page")?.addEventListener("click", () => {
  window.close();
  const note = document.getElementById("close-note");
  if (note) note.textContent = "Your browser may not allow a page to close itself. Please close this tab.";
});

document.getElementById("photo")?.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file || !file.type.startsWith("image/")) return;
  const image = document.querySelector(".profile-avatar img");
  if (image) image.src = URL.createObjectURL(file);
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

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealEls.forEach((element) => revealObserver.observe(element));
} else {
  revealEls.forEach((element) => element.classList.add("in"));
}

// Reading-progress line.
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

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll('.navlinks a[href^="#"]');
if ("IntersectionObserver" in window && sections.length && links.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -65% 0px" });
  sections.forEach((section) => navObserver.observe(section));
}
