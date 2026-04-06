const menuBtn = document.querySelector("[data-mobile-menu-btn]");
const menuPanel = document.querySelector("[data-mobile-menu]");
const iconOpen = document.querySelector("[data-menu-icon-open]");
const iconClose = document.querySelector("[data-menu-icon-close]");

if (menuBtn && menuPanel) {
  const setOpen = (open) => {
    menuPanel.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  };

  menuBtn.addEventListener("click", () => {
    const next = menuPanel.classList.contains("hidden");
    setOpen(next);
  });

  document.querySelectorAll("[data-mobile-nav-link]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

const heroDoctorImg = document.querySelector("[data-hero-doctor-img]");
const heroDoctorFallback = document.querySelector("[data-hero-doctor-fallback]");

if (heroDoctorImg && heroDoctorFallback) {
  heroDoctorImg.addEventListener("error", () => {
    heroDoctorImg.classList.add("hidden");
    heroDoctorFallback.classList.remove("hidden");
  });
}

const fdaImg = document.querySelector("[data-fda-img]");
const fdaWrap = document.querySelector("[data-fda-wrap]");

if (fdaImg && fdaWrap) {
  fdaImg.addEventListener("error", () => {
    fdaWrap.classList.add("hidden");
  });
}

const faqItems = document.querySelectorAll(".faq-list details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.removeAttribute("open");
      }
    });
  });
});

const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

// Treatment cards mobile toggle
const treatmentToggles = document.querySelectorAll('[data-treatment-toggle]');

treatmentToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const index = toggle.getAttribute('data-treatment-toggle');
    const content = document.querySelector(`[data-treatment-content="${index}"]`);
    const chevron = toggle.querySelector('[data-chevron]');
    
    if (content && chevron) {
      const isHidden = content.classList.contains('hidden');
      
      // Toggle content
      content.classList.toggle('hidden', !isHidden);
      
      // Rotate chevron
      if (isHidden) {
        chevron.classList.add('rotate-180', 'text-primary');
        chevron.classList.remove('text-gray-400');
      } else {
        chevron.classList.remove('rotate-180', 'text-primary');
        chevron.classList.add('text-gray-400');
      }
    }
  });
});
