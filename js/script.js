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
  console.log(sectionIndex);
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
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

// <!-- Simple Loading Animation Script
// Simple loading animation
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContainer = document.getElementById("mainContainer");

  // Hide loading screen after 2 seconds
  setTimeout(function () {
    loadingScreen.classList.add("fade-out");

    // Show main content after fade out completes
    setTimeout(function () {
      loadingScreen.style.display = "none";
      mainContainer.classList.add("loaded");
      document.body.style.overflow = "auto";
    }, 600);
  }, 1000);
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Function to initialize animations
    function initScrollAnimations() {
      // Observe all elements with animation classes
      const animatedElements = document.querySelectorAll(
        '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .timeline-item, .portfolio__item, .service-item, .contact-info-item'
      );
      
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }

    // Initialize animations when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      // Small delay to ensure page is fully loaded
      setTimeout(initScrollAnimations, 300);
      
      // Initialize home section animations immediately if it's visible
      const homeSection = document.querySelector('#home');
      if (homeSection && homeSection.classList.contains('active')) {
        const homeElements = homeSection.querySelectorAll('.fade-in-left, .fade-in-right');
        homeElements.forEach(el => {
          setTimeout(() => el.classList.add('animate'), 500);
        });
      }
    });

    // Re-initialize animations when sections change (for single page navigation)
    document.addEventListener('click', (e) => {
      if (e.target.closest('.nav a')) {
        setTimeout(() => {
          const activeSection = document.querySelector('.section.active');
          if (activeSection) {
            const sectionElements = activeSection.querySelectorAll(
              '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
            );
            sectionElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate');
              }, index * 100);
            });
          }
        }, 100);
      }
    });

    // Progress bar animation for skills
    function animateProgressBars() {
      const skillItems = document.querySelectorAll('.skill-item');
      skillItems.forEach((skill, index) => {
        const progressBar = skill.querySelector('.progress-in');
        const percent = progressBar.style.width;
        
        // Reset width
        progressBar.style.width = '0%';
        
        // Animate after delay
        setTimeout(() => {
          progressBar.style.transition = 'width 1.5s ease-in-out';
          progressBar.style.width = percent;
        }, index * 200 + 500);
      });
    }

    // Trigger progress bar animation when skills section is visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
      const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgressBars();
            skillsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      skillsObserver.observe(skillsSection);
    }

    // Add hover effects for service items
    document.addEventListener('DOMContentLoaded', () => {
      const serviceItems = document.querySelectorAll('.service-item-inner');
      serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-10px) scale(1.02)';
          item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0) scale(1)';
        });
      });
    });

    // Add hover effects for portfolio items
    document.addEventListener('DOMContentLoaded', () => {
      const portfolioItems = document.querySelectorAll('.portfolio__item');
      portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-5px)';
          item.style.transition = 'all 0.3s ease';
          if (img) {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'all 0.3s ease';
          }
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0)';
          if (img) {
            img.style.transform = 'scale(1)';
          }
        });
      });
    });

    // Add stagger animation for timeline items
    function animateTimeline() {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 200);
      });
    }

    // Observe timeline sections
    const timelineSections = document.querySelectorAll('.education, .experience');
    timelineSections.forEach(section => {
      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate');
              }, index * 200);
            });
            timelineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      timelineObserver.observe(section);
    });

   