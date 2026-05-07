// =========================================
// Preloader
// =========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// =========================================
// Theme Toggle (Dark/Light Mode)
// =========================================
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// =========================================
// Header & Mobile Menu
// =========================================
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close Mobile Menu on Overlay Click
sidebarOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close Mobile Menu on Link Click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// =========================================
// Scroll Spy (Active Nav Link)
// =========================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// =========================================
// Back to Top Button
// =========================================
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// =========================================
// Stats Counter Animation
// =========================================
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + (target > 1000 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + (target > 1000 ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation on scroll
const statsSection = document.querySelector('.about-stats');
window.addEventListener('scroll', () => {
    if (statsSection && !hasAnimated) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight) {
            animateCounters();
            hasAnimated = true;
        }
    }
});

// =========================================
// Testimonial Slider
// =========================================
let slideIndex = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function currentSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
}

// Auto Slide
setInterval(() => {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    showSlide(slideIndex);
}, 5000);

// =========================================
// Form Validation
// =========================================
const form = document.getElementById('appointmentForm');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Name Validation
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim() === '') {
            nameError.innerText = 'Name is required';
            isValid = false;
        } else {
            nameError.innerText = '';
        }
        
        // Email Validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.innerText = 'Valid email is required';
            isValid = false;
        } else {
            emailError.innerText = '';
        }
        
        // Phone Validation
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        if (phone.value.trim() === '' || phone.value.length < 10) {
            phoneError.innerText = 'Valid phone number is required';
            isValid = false;
        } else {
            phoneError.innerText = '';
        }
        
        // Date Validation
        const date = document.getElementById('date');
        const dateError = document.getElementById('dateError');
        if (date.value === '') {
            dateError.innerText = 'Date is required';
            isValid = false;
        } else {
            dateError.innerText = '';
        }
        
        // Department Validation
        const dept = document.getElementById('department');
        const deptError = document.getElementById('deptError');
        if (dept.value === '') {
            deptError.innerText = 'Please select a department';
            isValid = false;
        } else {
            deptError.innerText = '';
        }
        
        if (isValid) {
            // Simulate form submission
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Submitting...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Request Sent Successfully!';
                btn.style.backgroundColor = '#1ed760';
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        }
    });
}

// =========================================
// Scroll Reveal Animations
// =========================================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: observer.unobserve(entry.target) if you only want it to animate once
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});
