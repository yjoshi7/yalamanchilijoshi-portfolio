// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nameAnimationElements = document.querySelectorAll('#name-animation, #hero-animation, #footer-animation');
const yearElement = document.getElementById('year');
const messageForm = document.getElementById('messageForm');

// Name/Award Animation Texts
const nameText = "Yalamanchili Joshi";
const awardText = "Financial Technology Aspirant";
const paddedName = `|     ${nameText}      `; // 5 spaces before name
const paddedAward = `${awardText}|`;

// Animation Steps
function createAnimationSteps() {
  const steps = [];
  const minSpaces = 5; // Minimum 5 spaces between | and text
  
  // Initial state with name (| followed by 5 spaces)
  steps.push(`|${' '.repeat(minSpaces)}${nameText}${' '.repeat(6)}`);
  
  // Transition from name to award
  for (let i = 0; i <= awardText.length; i++) {
    const leftPart = awardText.slice(0, i);
    const rightPart = nameText.slice(i);
    const spacesAfter = Math.max(minSpaces - i, 0);
    const step = `${leftPart}|${' '.repeat(spacesAfter)}${rightPart}${' '.repeat(6)}`;
    steps.push(step);
  }
  
  // Final state with award
  steps.push(`${awardText}|`);
  
  // Transition from award back to name
  for (let i = awardText.length; i >= 0; i--) {
    const leftPart = awardText.slice(0, i);
    const rightPart = nameText.slice(i);
    const spacesAfter = Math.max(minSpaces - i, 0);
    const step = `${leftPart}|${' '.repeat(spacesAfter)}${rightPart}${' '.repeat(6)}`;
    steps.push(step);
  }
  
  return steps;
}

const animationSteps = createAnimationSteps();
let currentStep = 0;

// Animate Name/Award Text
function animateText() {
  nameAnimationElements.forEach(element => {
    element.textContent = animationSteps[currentStep];
  });
  
  currentStep = (currentStep + 1) % animationSteps.length;
}

// Start the animation
const animationInterval = setInterval(animateText, 350); // Speed of typing effect

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission
if (messageForm) {
  messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just log it and show a success message
    console.log('Form submitted:', { name, email, subject, message });
    
    alert('Thank you for your message! I will get back to you soon.');
    messageForm.reset();
  });
}

// Scroll Reveal Animation
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
  const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .edu-card');
  
  revealElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initialize elements as hidden
document.addEventListener('DOMContentLoaded', () => {
  const elementsToReveal = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-card, .edu-card');
  
  elementsToReveal.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Trigger initial reveal check
  revealOnScroll();
});