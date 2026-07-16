/* ==========================================================
   Yalamanchili Joshi – Finance Portfolio
   Complete JavaScript (No Typewriter)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializePortfolio();
});

/* ============================================
   Master Initialisation
============================================ */
function initializePortfolio() {
    stickyHeader();
    mobileNavigation();
    smoothScrolling();
    activeNavigation();
    updateFooterYear();
    createScrollTopButton();
    revealOnScroll();
    contactForm();
    animatedCounters();
    animateProgressBars();
    lazyImages();
    copyEmail();
    copyPhone();
    projectSearch();
    filterProjects();
    loadingScreen();
    darkMode();
    resumeDownload();
    externalLinks();
    animateSkills();
    currentYear();
    scrollProgress();
    greeting();
}

/* ============================================
   Sticky Header
============================================ */
function stickyHeader() {
    const header = document.querySelector(".header");
    if (!header) return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });
}

/* ============================================
   Mobile Navigation (Hamburger)
============================================ */
function mobileNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}

/* ============================================
   Smooth Scrolling
============================================ */
function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

/* ============================================
   Active Navigation Link
============================================ */
function activeNavigation() {
    const current = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        if (href === current) {
            link.classList.add("active-link");
        }
    });
}

/* ============================================
   Footer Year Update
============================================ */
function updateFooterYear() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* ============================================
   Scroll‑to‑Top Button
============================================ */
function createScrollTopButton() {
    const btn = document.createElement("button");
    btn.id = "scrollTop";
    btn.innerHTML = "↑";
    document.body.appendChild(btn);

    btn.style.cssText = `
        position: fixed;
        right: 30px;
        bottom: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #2563EB;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 10px 20px rgba(0,0,0,.15);
        transition: .3s;
    `;

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================================
   Reveal on Scroll (fade‑up cards)
============================================ */
function revealOnScroll() {
    const reveals = document.querySelectorAll(".card, .project-card, .experience-card, .stat-card, .timeline-content");
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-up");
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(item => observer.observe(item));
}

/* ============================================
   Contact Form Handling
============================================ */
function contactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector("textarea");

        if (!name || !email || !message) return;

        if (!name.value.trim()) {
            alert("Please enter your name.");
            name.focus();
            return;
        }
        if (!email.value.trim()) {
            alert("Please enter your email.");
            email.focus();
            return;
        }
        if (!message.value.trim()) {
            alert("Please enter your message.");
            message.focus();
            return;
        }

        toast("Thank you! I'll get back to you soon.");
        form.reset();
    });
}

/* ============================================
   Animated Counters (data-count)
============================================ */
function animatedCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (counters.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function update() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }
            update();
            observer.unobserve(counter);
        });
    }, { threshold: 0.4 });

    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   Animate Progress Bars
============================================ */
function animateProgressBars() {
    const bars = document.querySelectorAll(".progress-fill");
    if (bars.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width || entry.target.style.width || 0;
                entry.target.style.width = width + "%";
            }
        });
    });

    bars.forEach(bar => observer.observe(bar));
}

/* ============================================
   Lazy Image Loading (data-src)
============================================ */
function lazyImages() {
    const images = document.querySelectorAll("img[data-src]");
    if (images.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => observer.observe(img));
}

/* ============================================
   Copy Email to Clipboard
============================================ */
function copyEmail() {
    const emailEl = document.querySelector(".copy-email");
    if (!emailEl) return;

    emailEl.addEventListener("click", () => {
        navigator.clipboard.writeText(emailEl.textContent.trim());
        toast("Email copied!");
    });
}

/* ============================================
   Copy Phone to Clipboard
============================================ */
function copyPhone() {
    const phoneEl = document.querySelector(".copy-phone");
    if (!phoneEl) return;

    phoneEl.addEventListener("click", () => {
        navigator.clipboard.writeText(phoneEl.textContent.trim());
        toast("Phone number copied.");
    });
}

/* ============================================
   Project Search
============================================ */
function projectSearch() {
    const search = document.getElementById("projectSearch");
    if (!search) return;

    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();
        document.querySelectorAll(".project-card").forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(value) ? "block" : "none";
        });
    });
}

/* ============================================
   Project Filter (buttons)
============================================ */
function filterProjects() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card");
    if (buttons.length === 0) return;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            cards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ============================================
   Loading Screen
============================================ */
function loadingScreen() {
    const loader = document.querySelector(".loader");
    if (!loader) return;

    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 600);
    });
}

/* ============================================
   Dark Mode Toggle (if #themeToggle exists)
============================================ */
function darkMode() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
}

/* ============================================
   Resume Download (if .download-resume exists)
============================================ */
function resumeDownload() {
    const btn = document.querySelector(".download-resume");
    if (!btn) return;

    btn.addEventListener("click", () => {
        window.open("assets/resume/Resume.pdf", "_blank");
    });
}

/* ============================================
   External Links (rel="noopener noreferrer")
============================================ */
function externalLinks() {
    document.querySelectorAll("a[target='_blank']").forEach(link => {
        link.setAttribute("rel", "noopener noreferrer");
    });
}

/* ============================================
   Animate Skills (data-level) – if used
============================================ */
function animateSkills() {
    const skills = document.querySelectorAll(".skill-progress");
    if (skills.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.level + "%";
            }
        });
    });

    skills.forEach(skill => observer.observe(skill));
}

/* ============================================
   Current Year (multiple .current-year)
============================================ */
function currentYear() {
    document.querySelectorAll(".current-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

/* ============================================
   Scroll Progress Bar
============================================ */
function scrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;

    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const current = (window.scrollY / total) * 100;
        bar.style.width = current + "%";
    });
}

/* ============================================
   Greeting (Good Morning / Afternoon / Evening)
============================================ */
function greeting() {
    const greet = document.querySelector(".greeting");
    if (!greet) return;

    const hour = new Date().getHours();
    if (hour < 12) greet.textContent = "Good Morning";
    else if (hour < 17) greet.textContent = "Good Afternoon";
    else greet.textContent = "Good Evening";
}

/* ============================================
   Toast Notification Utility
============================================ */
function toast(message) {
    const toastEl = document.querySelector(".toast");
    if (!toastEl) return;

    toastEl.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => {
        toastEl.classList.remove("show");
    }, 3000);
}

/* ============================================
   Debounce Utility (used for scroll progress)
============================================ */
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

console.log("Finance Portfolio Loaded Successfully");