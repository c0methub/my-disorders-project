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
