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

// Load the new guide styles and replace only the article body; the welcome intro stays untouched.
for (const href of ["content-upgrade.css", "enhancements.css"]) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    document.head.append(stylesheet);
  }
}

const site = document.querySelector("#site") || document.querySelector(".site");
const main = document.querySelector("main");
const footer = document.querySelector(".site-footer, .footer");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (main && main.id === "main" && main.querySelector("#about")) {
  main.innerHTML = `
    <section class="guide-section" id="about" aria-labelledby="about-title">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">01 · The basics</p><h2 id="about-title">Celiac disease, in plain language.</h2><p>A long-term autoimmune condition where eating gluten triggers an immune response that can damage the small intestine.</p></header>
        <div class="guide-columns">
          <div class="guide-copy">
            <p><strong>Gluten</strong> is a group of proteins found in wheat, barley, and rye. In someone with celiac disease, the immune response to gluten can injure the lining of the small intestine, including the tiny structures called villi that help absorb nutrients.</p>
            <p>Celiac disease is not a food preference, a wheat allergy, or the same thing as non-celiac gluten sensitivity. It can affect people at any age, and symptoms can look different from person to person.</p>
            <p class="guide-callout"><strong>Key idea:</strong> Symptoms alone can’t confirm celiac disease. Diagnosis requires appropriate medical evaluation and testing.</p>
          </div>
          <aside class="guide-card"><h3>Gluten is found in</h3><div class="guide-pills"><span class="guide-pill">Wheat</span><span class="guide-pill">Barley</span><span class="guide-pill">Rye</span></div><p>It can also appear in foods made with these grains. Read labels and get advice from a qualified clinician or dietitian when you need help identifying safe foods.</p></aside>
        </div>
      </div>
    </section>

    <section class="guide-section" aria-labelledby="symptoms-title" id="symptoms">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">02 · Symptoms</p><h2>There isn’t one “celiac look.”</h2><p>Symptoms can be digestive, non-digestive, subtle, or absent. These examples are for learning—not a diagnostic checklist.</p></header>
        <div class="guide-grid">
          <article class="guide-tile"><span class="tile-number">01</span><h3>Digestive symptoms</h3><p>Diarrhea, constipation, bloating, gas, abdominal pain, nausea, or vomiting.</p></article>
          <article class="guide-tile"><span class="tile-number">02</span><h3>Nutrition &amp; energy</h3><p>Fatigue, iron-deficiency anemia, or difficulty maintaining weight can occur.</p></article>
          <article class="guide-tile"><span class="tile-number">03</span><h3>Other signs</h3><p>Some people have an itchy rash, bone or joint concerns, or growth issues as children.</p></article>
        </div>
        <p class="guide-caveat">These symptoms can have many causes. If you have health concerns, contact a healthcare professional rather than trying to diagnose yourself.</p>
      </div>
    </section>

    <section class="guide-section" aria-labelledby="causes-title" id="causes">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">03 · Why it happens</p><h2>Genes matter, but they aren’t the whole story.</h2><p>Celiac disease involves an immune response to gluten and genetic susceptibility. It is not contagious.</p></header>
        <div class="guide-columns">
          <div class="guide-copy"><p>Certain genes—often described as HLA-DQ2 or HLA-DQ8—are associated with celiac disease. Many people with these genes never develop the condition, so genes alone cannot diagnose it.</p><p>Oats are naturally gluten-free, but they may come into contact with wheat, barley, or rye during growing and processing. Ask your clinician or dietitian whether oats and particular products are suitable for you.</p></div>
          <aside class="guide-card"><h3>Three different things</h3><p><strong>Celiac disease:</strong> an autoimmune condition.</p><p><strong>Wheat allergy:</strong> an allergic reaction to wheat proteins.</p><p><strong>Non-celiac gluten sensitivity:</strong> symptoms linked to gluten or wheat without the same celiac findings.</p><p>A clinician can help distinguish these conditions.</p></aside>
        </div>
      </div>
    </section>

    <section class="guide-section" aria-labelledby="diagnosis-title" id="diagnosis">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">04 · Diagnosis</p><h2>Get tested before changing your diet.</h2><p>Removing gluten before evaluation can affect test results. Don’t make a diet change for testing without discussing it with a healthcare professional.</p></header>
        <div class="guide-grid">
          <article class="guide-tile"><span class="tile-number">01</span><h3>Talk through your history</h3><p>A clinician reviews symptoms, family history, and other relevant health information.</p></article>
          <article class="guide-tile"><span class="tile-number">02</span><h3>Blood tests</h3><p>Evaluation often begins with celiac antibody blood tests. The clinician selects and interprets the appropriate tests.</p></article>
          <article class="guide-tile"><span class="tile-number">03</span><h3>More tests if needed</h3><p>An upper endoscopy with small-intestine biopsies may be used. The approach can vary, including for children.</p></article>
        </div>
        <p class="guide-callout" style="margin-top:1.2rem"><strong>If you already stopped eating gluten:</strong> tell the clinician. They can discuss the safest next steps; don’t restart or change your diet solely based on this page.</p>
      </div>
    </section>

    <section class="guide-section" aria-labelledby="treatment-title" id="treatment">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">05 · Treatment &amp; daily life</p><h2>Care is more than a grocery list.</h2><p>The established treatment is a strict, lifelong gluten-free diet, supported by individualized medical and nutrition care.</p></header>
        <div class="guide-columns">
          <div class="guide-copy"><p>A healthcare professional and registered dietitian can help build a balanced eating plan, understand food labels, and navigate meals away from home. Follow-up care may help monitor symptoms, nutrition, and recovery.</p><p>Cross-contact—when gluten-containing food or crumbs get into otherwise gluten-free food—can matter. Practical kitchen and restaurant routines can reduce risk; get personalized guidance for your situation.</p><p class="guide-callout"><strong>There’s support.</strong> Adjusting to a new diagnosis can take time. A care team can help make the plan manageable and meet your nutritional needs.</p></div>
          <aside class="guide-card"><h3>Helpful first steps</h3><ul class="guide-checklist"><li>Talk with a clinician before changing your diet.</li><li>Ask for a dietitian experienced in celiac disease.</li><li>Learn label-reading and cross-contact basics together.</li><li>Keep recommended follow-up appointments.</li></ul></aside>
        </div>
      </div>
    </section>

    <section class="guide-section" aria-labelledby="faq-title" id="faq">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">06 · Quick answers</p><h2 id="faq-title">A few common questions.</h2><p>Clear answers, without replacing advice from your own healthcare team.</p></header>
        <div class="guide-faq">
          <details><summary>Should I stop eating gluten before a test?</summary><p>No—not unless your healthcare professional tells you to. Testing can be less reliable after gluten has been removed. If you have already stopped, let the clinician know.</p></details>
          <details><summary>Can someone have celiac disease without obvious symptoms?</summary><p>Yes. Some people have few or no noticeable symptoms. A clinician can advise whether testing is appropriate based on personal and family health history.</p></details>
          <details><summary>Is a gluten-free diet a cure?</summary><p>No. It is the established treatment and needs to be maintained long term. A healthcare professional can guide treatment and follow-up.</p></details>
          <details><summary>Can I use this page to diagnose myself?</summary><p>No. Symptoms overlap with other conditions, and diagnosis needs appropriate clinical evaluation and testing.</p></details>
        </div>
      </div>
    </section>

    <section class="guide-section" aria-labelledby="sources-title" id="sources">
      <div class="guide-wrap">
        <header class="guide-heading"><p class="guide-eyebrow">07 · Keep learning</p><h2 id="sources-title">Reliable places to read more.</h2><p>This student guide is an introduction. For personal questions, use a qualified healthcare professional.</p></header>
        <div class="guide-sources">
          <a class="guide-source" href="https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease" target="_blank" rel="noopener noreferrer"><strong>NIDDK · Celiac Disease ↗</strong><span>Symptoms, diagnosis, treatment, and research.</span></a>
          <a class="guide-source" href="https://www.nhs.uk/conditions/coeliac-disease/" target="_blank" rel="noopener noreferrer"><strong>NHS · Coeliac disease ↗</strong><span>Testing, symptoms, and care overview.</span></a>
          <a class="guide-source" href="https://celiac.org/about-celiac-disease/what-is-celiac-disease/" target="_blank" rel="noopener noreferrer"><strong>Celiac Disease Foundation ↗</strong><span>Introductory information about celiac disease.</span></a>
          <a class="guide-source" href="https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition" target="_blank" rel="noopener noreferrer"><strong>NIDDK · Diet &amp; Nutrition ↗</strong><span>Diet-related information and practical considerations.</span></a>
        </div>
        <p class="guide-caveat">Health guidance can vary by age, location, and personal medical history. Content last reviewed for this project: November 2026.</p>
      </div>
    </section>`;
}

// Add an end-of-page rating prompt. Votes stay in the visitor's browser only.
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
        item.classList.toggle("selected", Number(item.dataset.rating) <= score);
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
  } catch (_) { /* Rating still works for this visit. */ }
}

// Reading-progress ribbon.
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

const animatedItems = document.querySelectorAll(".hero-visual, .section-header, .guide-heading, .guide-tile, .guide-card, .guide-faq details, .guide-source, .rating-card");
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

// Optional song player. Playback begins only after the visitor explicitly presses Play.
if (site && !document.querySelector("#musicbar")) {
  const player = document.createElement("aside");
  player.className = "musicbar";
  player.id = "musicbar";
  player.setAttribute("aria-label", "Optional music player");
  player.innerHTML = `
    <div class="music-screen" id="music-screen" aria-label="Music video player"></div>
    <div class="music-info"><p class="music-label">Optional soundtrack</p><p class="music-title">Just Give Me a Reason</p><p class="music-artist">P!nk · Nate Ruess</p><div class="music-controls"><button class="music-toggle" id="music-toggle" type="button" aria-pressed="false">▶ Play song</button><button class="music-close" id="music-close" type="button" aria-label="Hide music player">×</button></div></div>`;
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

// Active state for the page's section navigation.
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
