(() => {
  const welcome = document.querySelector('#welcome-screen');
  const countdown = document.querySelector('#welcome-countdown');
  const countdownNumber = document.querySelector('#countdown-number');
  const question = document.querySelector('#welcome-question');
  const note = document.querySelector('#welcome-note');
  const yesButton = document.querySelector('#welcome-yes');
  const noButton = document.querySelector('#welcome-no');
  const menuButton = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('#nav-links');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (welcome) {
    document.body.classList.add('locked');
    let seconds = 3;
    const timer = window.setInterval(() => {
      seconds -= 1;
      if (countdownNumber) countdownNumber.textContent = String(Math.max(seconds, 0));
      if (seconds <= 0) {
        window.clearInterval(timer);
        if (countdown) countdown.hidden = true;
        if (question) {
          question.hidden = false;
          question.classList.add('question-arrived');
          yesButton?.focus({ preventScroll: true });
        }
      }
    }, 1000);
  }

  yesButton?.addEventListener('click', () => {
    if (!welcome) return;
    welcome.classList.add('welcome-exit');
    document.body.classList.remove('welcome-active', 'locked');
    window.setTimeout(() => { welcome.hidden = true; }, reducedMotion ? 0 : 650);
  });

  noButton?.addEventListener('click', () => {
    note.textContent = 'This page cannot close itself in every browser. You can close this tab now.';
    window.close();
  });

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.textContent = isOpen ? 'Menu' : 'Close';
      navLinks.classList.toggle('open', !isOpen);
    });
    navLinks.addEventListener('click', event => {
      if (!event.target.closest('a')) return;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
      navLinks.classList.remove('open');
    });
  }

  // Add small, accessible learning visuals to the existing guide sections.
  const prevalenceSection = document.querySelector('#prevalence .guide-wrap');
  if (prevalenceSection) {
    const chart = document.createElement('figure');
    chart.className = 'guide-visual prevalence-visual reveal';
    chart.setAttribute('aria-labelledby', 'prevalence-chart-title prevalence-chart-caption');
    chart.innerHTML = '<h3 id="prevalence-chart-title">A one-in-100 estimate</h3><div class="prevalence-dots" role="img" aria-label="One highlighted dot among 100 dots, representing an approximate 1 percent prevalence estimate"></div><p class="prevalence-caption" id="prevalence-chart-caption">About 1 in 100 people worldwide are estimated to have celiac disease. Estimates vary by population, and some people may not yet be diagnosed.</p>';
    const dots = chart.querySelector('.prevalence-dots');
    for (let i = 0; i < 100; i += 1) dots.append(document.createElement('span'));
    prevalenceSection.append(chart);
  }

  const treatmentSection = document.querySelector('#treatment .guide-wrap');
  if (treatmentSection) {
    const gallery = document.createElement('div');
    gallery.className = 'food-photo-grid reveal';
    gallery.setAttribute('aria-label', 'Food photographs for the gluten-free diet section');
    gallery.innerHTML = `
      <figure class="food-photo-card"><img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="A colorful bowl of vegetables and grains" loading="lazy"><figcaption>Build meals around naturally gluten-free ingredients.</figcaption></figure>
      <figure class="food-photo-card"><img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Freshly baked bread on a table" loading="lazy"><figcaption>Check labels carefully on packaged foods, including bread.</figcaption></figure>
      <figure class="food-photo-card"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="A fresh salad prepared with vegetables" loading="lazy"><figcaption>Preventing cross-contact matters when preparing food.</figcaption></figure>`;
    treatmentSection.append(gallery);
  }

  const detectionSection = document.querySelector('#detection .guide-wrap');
  if (detectionSection) {
    const flow = document.createElement('figure');
    flow.className = 'guide-visual testing-visual reveal';
    flow.setAttribute('aria-labelledby', 'testing-visual-title');
    flow.innerHTML = '<h3 id="testing-visual-title">A simple testing pathway</h3><ol class="testing-steps"><li><strong>Keep eating gluten</strong><span>Stopping beforehand may affect test results. Ask a healthcare professional for advice.</span></li><li><strong>Talk with a clinician</strong><span>They can decide whether blood tests are appropriate.</span></li><li><strong>Review next steps</strong><span>A specialist may recommend further testing based on your results.</span></li></ol><figcaption>Testing decisions should be made with a qualified healthcare professional.</figcaption>';
    detectionSection.append(flow);
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('in'); observer.unobserve(entry.target); });
    }, { threshold: 0.1 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in'));
  }

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  document.body.append(progress);
  const progressFill = progress.firstElementChild;
  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressFill.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
  }
  window.addEventListener('scroll', () => requestAnimationFrame(updateProgress), { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const sections = document.querySelectorAll('main section[id]');
  const sectionLinks = document.querySelectorAll('.navlinks a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length && sectionLinks.length) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }
})();
