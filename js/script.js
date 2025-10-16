// typing animation
var typed = new Typed(".typing", {
  strings: [
    "Web Developer",
    "Web Designer",
    "Frontend Developer",
    "Backend Developer",
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

/*===========================Aside==================== */
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);

    // Trigger animations on click
    const href = this.getAttribute("href").replace("#", "");
    const targetSection = document.getElementById(href);
    if (targetSection) {
      setTimeout(() => {
        triggerSectionAnimation(targetSection);
      }, 100);
    }

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}

function addBackSection(num) {
  allSection[num].classList.add("back-section");
}

function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}

document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);

  // Trigger animations on hire me click
  const href = this.getAttribute("href").replace("#", "");
  const targetSection = document.getElementById(href);
  if (targetSection) {
    setTimeout(() => {
      triggerSectionAnimation(targetSection);
    }, 100);
  }
});

const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

// Simple loading animation
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContainer = document.getElementById("mainContainer");

  setTimeout(function () {
    loadingScreen.classList.add("fade-out");

    setTimeout(function () {
      loadingScreen.style.display = "none";
      mainContainer.classList.add("loaded");
      document.body.style.overflow = "auto";

      // Initialize animations after load
      initializeAnimations();
    }, 600);
  }, 1000);
});

// ============ ANIMATION SYSTEM - CLICK + SCROLL ============

// Track which elements have been animated in current section view
let currentSectionAnimated = new Set();

function initializeAnimations() {
  // Initialize home section animations
  animateHomeSection();

  // Setup scroll listeners for each section
  setupScrollAnimations();
}

// Animate Home Section on Load
function animateHomeSection() {
  const homeSection = document.getElementById("home");
  if (homeSection) {
    triggerSectionAnimation(homeSection);
  }
}

// Setup scroll-based animations for all sections
function setupScrollAnimations() {
  // Add scroll listener to each section
  allSection.forEach((section) => {
    section.addEventListener("scroll", function () {
      handleSectionScroll(this);
    });
  });
}

// Handle scroll within a section
function handleSectionScroll(section) {
  const animatableElements = getAnimatableElements(section);

  animatableElements.forEach((item) => {
    if (
      isElementInViewport(item, section) &&
      !currentSectionAnimated.has(item)
    ) {
      animateElement(item);
      currentSectionAnimated.add(item);
    }
  });
}

// Get elements that should be animated based on section
function getAnimatableElements(section) {
  const sectionId = section.id;
  let elements = [];

  switch (sectionId) {
    case "about":
      elements = [
        ...section.querySelectorAll(".about-text"),
        ...section.querySelectorAll(".personal-info"),
        ...section.querySelectorAll(".skills"),
        ...section.querySelectorAll(".progress-in"),
        ...section.querySelectorAll(".education .timeline-item"),
        ...section.querySelectorAll(".experience .timeline-item"),
      ];
      break;
    case "service":
      elements = [...section.querySelectorAll(".service-item")];
      break;
    case "portfolio":
      elements = [
        ...section.querySelectorAll(".section__header"),
        ...section.querySelectorAll(".portfolio_1"),
      ];
      break;
    case "contact":
      elements = [
        ...section.querySelectorAll(".contact-info-item"),
        ...section.querySelectorAll(".formInput"),
      ];
      break;
  }

  return elements;
}

// Check if element is in viewport within scrollable section
function isElementInViewport(el, container) {
  const rect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return (
    rect.top >= containerRect.top - 100 &&
    rect.top <= containerRect.bottom - 100
  );
}

// Animate individual element based on its type
function animateElement(element) {
  // Remove any existing animation classes first
  element.classList.remove(
    "animate__animated",
    "animate__fadeInLeft",
    "animate__fadeInRight",
    "animate__fadeInUp",
    "animate__fadeInDown",
    "animate__slideInLeft",
    "animate__zoomIn"
  );

  // Force reflow
  void element.offsetWidth;

  // Determine animation type based on element class
  if (element.classList.contains("about-text")) {
    element.classList.add("animate__animated", "animate__fadeInLeft");
  } else if (element.classList.contains("personal-info")) {
    element.classList.add("animate__animated", "animate__fadeInUp");
  } else if (element.classList.contains("skills")) {
    element.classList.add("animate__animated", "animate__fadeInRight");
  } else if (element.classList.contains("progress-in")) {
    // Custom width animation for progress bars on scroll
    const targetPercent = element.style.width;

    element.style.width = "0%";
    element.style.transition = "none";

    // Force reflow
    void element.offsetWidth;

    setTimeout(() => {
      element.style.transition = "width 1.5s ease-out";
      element.style.width = targetPercent;
    }, 50);
  } else if (element.classList.contains("timeline-item")) {
    element.classList.add("animate__animated", "animate__fadeInUp");
  } else if (element.classList.contains("service-item")) {
    element.classList.add("animate__animated", "animate__fadeInUp");
  } else if (element.classList.contains("section__header")) {
    element.classList.add("animate__animated", "animate__fadeInDown");
  } else if (element.classList.contains("portfolio_1")) {
    element.classList.add("animate__animated", "animate__zoomIn");
  } else if (element.classList.contains("contact-info-item")) {
    element.classList.add("animate__animated", "animate__fadeInUp");
  } else if (element.classList.contains("formInput")) {
    element.classList.add("animate__animated", "animate__fadeInRight");
  }
}

// Trigger animations when section becomes active (for navigation clicks)
function triggerSectionAnimation(section) {
  const sectionId = section.id;

  // Clear current section animated elements
  currentSectionAnimated.clear();

  // Remove all existing animations
  removeAllAnimations(section);

  // Small delay to ensure clean animation
  setTimeout(() => {
    switch (sectionId) {
      case "home":
        animateHome(section);
        break;
      case "about":
        animateAbout(section);
        break;
      case "service":
        animateService(section);
        break;
      case "portfolio":
        animatePortfolio(section);
        break;
      case "contact":
        animateContact(section);
        break;
    }
  }, 50);
}

// Remove all animation classes
function removeAllAnimations(section) {
  const animatedEls = section.querySelectorAll('[class*="animate__"]');
  animatedEls.forEach((el) => {
    el.classList.remove(
      "animate__animated",
      "animate__fadeInLeft",
      "animate__fadeInRight",
      "animate__fadeInUp",
      "animate__fadeInDown",
      "animate__slideInLeft",
      "animate__zoomIn",
      "animate__fadeIn",
      "animate__bounceInLeft",
      "animate__bounceInRight",
      "animate__pulse"
    );
  });
}

// Home Section Animation
function animateHome(section) {
  const homeInfo = section.querySelector(".home-info");
  const homeImg = section.querySelector(".home-img");

  if (homeInfo) {
    homeInfo.classList.add("animate__animated", "animate__fadeInLeft");
    currentSectionAnimated.add(homeInfo);
  }
  if (homeImg) {
    setTimeout(() => {
      homeImg.classList.add("animate__animated", "animate__fadeInRight");
      currentSectionAnimated.add(homeImg);
    }, 200);
  }
}

// About Section Animation
function animateAbout(section) {
  // Section title
  const sectionTitle = section.querySelector(".section-title");
  if (sectionTitle) {
    sectionTitle.classList.add("animate__animated", "animate__fadeInDown");
    currentSectionAnimated.add(sectionTitle);
  }

  // About text
  const aboutText = section.querySelector(".about-text");
  if (aboutText) {
    setTimeout(() => {
      aboutText.classList.add("animate__animated", "animate__fadeInLeft");
      currentSectionAnimated.add(aboutText);
    }, 200);
  }

  // Personal info
  const personalInfo = section.querySelector(".personal-info");
  if (personalInfo) {
    setTimeout(() => {
      personalInfo.classList.add("animate__animated", "animate__fadeInUp");
      currentSectionAnimated.add(personalInfo);
    }, 400);
  }

  // Skills
  const skills = section.querySelector(".skills");
  if (skills) {
    setTimeout(() => {
      skills.classList.add("animate__animated", "animate__fadeInRight");
      currentSectionAnimated.add(skills);
    }, 600);
  }

  // Progress bars with custom fill animation
  const progressBars = section.querySelectorAll(".progress-in");
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      currentSectionAnimated.add(bar);

      // Store original width
      const computedStyle = window.getComputedStyle(bar);
      const originalWidth = computedStyle.width;
      const targetPercent = bar.style.width; // Get the percentage from inline style

      // Start from 0
      bar.style.width = "0%";
      bar.style.transition = "none";

      // Force reflow
      void bar.offsetWidth;

      // Animate to target width
      setTimeout(() => {
        bar.style.transition = "width 1.5s ease-out";
        bar.style.width = targetPercent;
      }, 50);
    }, 800 + index * 100);
  });

  // Education items (visible ones only)
  const educationItems = section.querySelectorAll(".education .timeline-item");
  educationItems.forEach((item, index) => {
    if (isElementInViewport(item, section)) {
      setTimeout(() => {
        item.classList.add("animate__animated", "animate__fadeInUp");
        currentSectionAnimated.add(item);
      }, 1000 + index * 200);
    }
  });

  // Experience items (visible ones only)
  const experienceItems = section.querySelectorAll(
    ".experience .timeline-item"
  );
  experienceItems.forEach((item, index) => {
    if (isElementInViewport(item, section)) {
      setTimeout(() => {
        item.classList.add("animate__animated", "animate__fadeInUp");
        currentSectionAnimated.add(item);
      }, 1000 + index * 200);
    }
  });
}

// Service Section Animation
function animateService(section) {
  const sectionTitle = section.querySelector(".section-title");
  if (sectionTitle) {
    sectionTitle.classList.add("animate__animated", "animate__fadeInDown");
    currentSectionAnimated.add(sectionTitle);
  }

  // Only animate visible items initially, rest will animate on scroll
  const serviceItems = section.querySelectorAll(".service-item");
  serviceItems.forEach((item, index) => {
    if (isElementInViewport(item, section)) {
      setTimeout(() => {
        item.classList.add("animate__animated", "animate__fadeInUp");
        currentSectionAnimated.add(item);
      }, 200 + index * 150);
    }
  });
}

// Portfolio Section Animation
function animatePortfolio(section) {
  const sectionTitle = section.querySelector(".section-title");
  if (sectionTitle) {
    sectionTitle.classList.add("animate__animated", "animate__fadeInDown");
    currentSectionAnimated.add(sectionTitle);
  }

  const sectionHeader = section.querySelector(".section__header");
  if (sectionHeader) {
    setTimeout(() => {
      sectionHeader.classList.add("animate__animated", "animate__fadeInUp");
      currentSectionAnimated.add(sectionHeader);
    }, 200);
  }

  // Only animate visible items initially, rest will animate on scroll
  const portfolioItems = section.querySelectorAll(".portfolio_1");
  portfolioItems.forEach((item, index) => {
    if (isElementInViewport(item, section)) {
      setTimeout(() => {
        item.classList.add("animate__animated", "animate__zoomIn");
        currentSectionAnimated.add(item);
      }, 400 + index * 200);
    }
  });
}

// Contact Section Animation
function animateContact(section) {
  const sectionTitle = section.querySelector(".section-title");
  if (sectionTitle) {
    sectionTitle.classList.add("animate__animated", "animate__fadeInDown");
    currentSectionAnimated.add(sectionTitle);
  }

  const contactTitle = section.querySelector(".contact-title");
  const contactSubTitle = section.querySelector(".contact-sub-title");

  if (contactTitle) {
    setTimeout(() => {
      contactTitle.classList.add("animate__animated", "animate__fadeIn");
      currentSectionAnimated.add(contactTitle);
    }, 200);
  }

  if (contactSubTitle) {
    setTimeout(() => {
      contactSubTitle.classList.add("animate__animated", "animate__fadeIn");
      currentSectionAnimated.add(contactSubTitle);
    }, 300);
  }

  // Only animate visible items initially, rest will animate on scroll
  const contactInfoItems = section.querySelectorAll(".contact-info-item");
  contactInfoItems.forEach((item, index) => {
    if (isElementInViewport(item, section)) {
      setTimeout(() => {
        item.classList.add("animate__animated", "animate__fadeInUp");
        currentSectionAnimated.add(item);
      }, 400 + index * 150);
    }
  });

  // Only animate visible form inputs initially, rest will animate on scroll
  const formInputs = section.querySelectorAll(".formInput");
  formInputs.forEach((input, index) => {
    if (isElementInViewport(input, section)) {
      setTimeout(() => {
        input.classList.add("animate__animated", "animate__fadeInRight");
        currentSectionAnimated.add(input);
      }, 800 + index * 150);
    }
  });
}

// Add hover effects for service items
const serviceItems = document.querySelectorAll(".service-item");
serviceItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    const inner = this.querySelector(".service-item-inner");
    if (inner && !inner.classList.contains("animate__pulse")) {
      inner.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        inner.classList.remove("animate__animated", "animate__pulse");
      }, 1000);
    }
  });
});

// Add hover effects for portfolio items
const portfolioItems = document.querySelectorAll(".portfolio__item");
portfolioItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    if (!this.classList.contains("animate__pulse")) {
      this.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        this.classList.remove("animate__animated", "animate__pulse");
      }, 1000);
    }
  });
});
