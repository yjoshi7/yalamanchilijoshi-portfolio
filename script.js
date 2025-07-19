// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nameAnimationElements = document.querySelectorAll('#name-animation, #hero-animation, #footer-animation');
const yearElement = document.getElementById('year');
const messageForm = document.getElementById('messageForm');

// Updated Texts
const nameText = "Yalamanchili Joshi";
const awardText = "IT Freelancer"; // Changed from "Financial Technology Aspirant"
const paddedName = `|     ${nameText}      `;
const paddedAward = `${awardText}|`;

// Animation Configuration
const typingSpeed = 100; // Speed of typing effect (ms)
const pauseDuration = 3000; // 3 second pause (ms)

// Animation Steps with Pause
function createAnimationSteps() {
  const steps = [];
  const minSpaces = 5;
  
  // Initial state with name (paused for 3 seconds)
  steps.push({ text: `|${' '.repeat(minSpaces)}${nameText}${' '.repeat(6)}`, pause: true });
  
  // Transition from name to award
  for (let i = 0; i <= awardText.length; i++) {
    const leftPart = awardText.slice(0, i);
    const rightPart = nameText.slice(i);
    const spacesAfter = Math.max(minSpaces - i, 0);
    steps.push({ text: `${leftPart}|${' '.repeat(spacesAfter)}${rightPart}${' '.repeat(6)}`, pause: false });
  }
  
  // Final state with award (paused for 3 seconds)
  steps.push({ text: `${awardText}|`, pause: true });
  
  // Transition from award back to name
  for (let i = awardText.length; i >= 0; i--) {
    const leftPart = awardText.slice(0, i);
    const rightPart = nameText.slice(i);
    const spacesAfter = Math.max(minSpaces - i, 0);
    steps.push({ text: `${leftPart}|${' '.repeat(spacesAfter)}${rightPart}${' '.repeat(6)}`, pause: false });
  }
  
  return steps;
}

const animationSteps = createAnimationSteps();
let currentStep = 0;
let animationTimeout;

// Animate Text with Pause Support
function animateText() {
  clearTimeout(animationTimeout);
  
  const currentAnimation = animationSteps[currentStep];
  
  // Update all animation elements
  nameAnimationElements.forEach(element => {
    element.textContent = currentAnimation.text;
  });
  
  // Calculate delay (longer for pause steps)
  const delay = currentAnimation.pause ? pauseDuration : typingSpeed;
  
  // Move to next step
  currentStep = (currentStep + 1) % animationSteps.length;
  
  // Schedule next animation frame
  animationTimeout = setTimeout(animateText, delay);
}

// Start the animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Start animation
  animateText();
  
  // Mobile Navigation Toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navLinks) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
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
      
      console.log('Form submitted:', { name, email, subject, message });
      alert('Thank you for your message! I will get back to you soon.');
      messageForm.reset();
    });
  }
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
