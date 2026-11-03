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

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  sections.forEach((section) => observer.observe(section));
}
