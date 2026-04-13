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
      const label = toggle.querySelector('[data-toggle-label]');
      
      // Toggle content
      content.classList.toggle('hidden', !isHidden);
      
      // Rotate chevron
      if (isHidden) {
        chevron.classList.add('rotate-180', 'text-primary');
        chevron.classList.remove('text-gray-400');
        if (label) label.textContent = 'Read less';
      } else {
        chevron.classList.remove('rotate-180', 'text-primary');
        chevron.classList.add('text-gray-400');
        if (label) label.textContent = 'Read more';
      }
    }
  });
});

// Consultation Modal Functions
function openConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    // Reset form
    document.getElementById('consultationForm').reset();
    document.getElementById('consultationSuccess').classList.add('hidden');
    document.getElementById('consultationError').classList.add('hidden');
  }
}

// Close modal when clicking outside
document.getElementById('consultationModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'consultationModal') {
    closeConsultationModal();
  }
});

// Phone number input validation
document.getElementById('consultationPhone')?.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
});

// Form submission
async function handleConsultationSubmit(e) {
  e.preventDefault();
  
  const form = document.getElementById('consultationForm');
  const name = document.getElementById('consultationName').value.trim();
  const phone = document.getElementById('consultationPhone').value.trim();
  const problem = document.getElementById('consultationProblem').value.trim();
  
  const successDiv = document.getElementById('consultationSuccess');
  const errorDiv = document.getElementById('consultationError');
  const errorMsg = document.getElementById('consultationErrorMessage');
  const submitBtn = document.getElementById('consultationSubmitBtn');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  
  // Reset messages
  successDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');
  
  // Validate
  if (!name || !phone) {
    errorMsg.textContent = 'Please enter your name and phone number.';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  if (phone.length !== 10) {
    errorMsg.textContent = 'Please enter a valid 10-digit phone number.';
    errorDiv.classList.remove('hidden');
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitText.classList.add('hidden');
  submitSpinner.classList.remove('hidden');
  
  try {
    // For now, just show success (replace with actual API call if needed)
    successDiv.classList.remove('hidden');
    form.reset();
    
    // Close modal after 2 seconds
    setTimeout(() => {
      closeConsultationModal();
    }, 2000);
  } catch (error) {
    console.error('Error:', error);
    errorMsg.textContent = 'Something went wrong. Please try again or contact us directly.';
    errorDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    submitSpinner.classList.add('hidden');
  }
}

// Update all contact links to open modal
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openConsultationModal();
  });
});
