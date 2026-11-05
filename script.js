const intro = document.getElementById("intro");
const question = document.getElementById("question");
const profile = document.getElementById("profile");
const visitor = document.getElementById("visitor");
const site = document.getElementById("site");
const menuButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".navlinks");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.style.overflow = "hidden";

function showStage(stage) {
  [question, profile, visitor].forEach((item) => {
    item.hidden = true;
    item.classList.remove("show");
  });
  stage.hidden = false;
  requestAnimationFrame(() => stage.classList.add("show"));
}

function revealQuestion() {
  showStage(question);
}

function enterSite() {
  intro.setAttribute("aria-hidden", "true");
  site.hidden = false;
  requestAnimationFrame(() => site.classList.add("visible"));
  document.body.style.overflow = "";
}

window.setTimeout(revealQuestion, reducedMotion ? 700 : 1800);

document.getElementById("yes").addEventListener("click", () => showStage(profile));
document.getElementById("no").addEventListener("click", () => showStage(visitor));
document.getElementById("continue").addEventListener("click", enterSite);
document.getElementById("enter").addEventListener("click", enterSite);

document.getElementById("photo").addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  const image = document.createElement("img");
  image.alt = "Selected profile photo";
  image.src = URL.createObjectURL(file);
  const avatar = document.getElementById("avatar");
  if (avatar) avatar.replaceChildren(image);
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
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll('.navlinks a[href^="#"]');

if ("IntersectionObserver" in window && sections.length && links.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -65% 0px" });

  sections.forEach((section) => navObserver.observe(section));
}
