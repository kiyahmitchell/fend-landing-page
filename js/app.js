/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/**
 * Global Variables
 */
// Global Variables
// Define Global Variables
// Global Variables
const navMenu = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

// Helper Functions

// Main Functions
function buildNavMenu() {
  const fragment = document.createDocumentFragment();
  sections.forEach((section) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`;
    fragment.appendChild(listItem);
  });

  navMenu.appendChild(fragment);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", buildNavMenu);

// Scroll to anchor ID using scrollIntoView event
const scrollToSection = (event) => {
  event.preventDefault();
  const link = event.target;
  const section = document.getElementById(link.getAttribute("href").slice(1));
  
  // Remove active class from all sections
  sections.forEach((section) => {
    section.classList.remove("your-active-class");
  });
  
  // Add active class to the clicked section
  section.classList.add("your-active-class");
  
  section.scrollIntoView({ behavior: "smooth" });
};

// Attach click event to navigation links
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

// Highlight active section in viewport upon scrolling
function highlightActiveSection() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.scrollY;

    // Remove any existing classes
    section.classList.remove("your-active-class");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Add class to section that is in view
      section.classList.add("your-active-class");

      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${section.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}
// Attach scroll event to highlight active section
window.addEventListener("scroll", highlightActiveSection);

document.addEventListener("click", (event) => {
  const target = event.target;
  const isInsideWebpage = navMenu.contains(target) || sections.some((section) => section.contains(target));
  
  if (!isInsideWebpage) {
    sections.forEach((section) => {
      section.classList.remove("your-active-class");
    });
  }
});