// DOM Elements
const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('a[href^="#"]');

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu-open');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('menu-open');
        mobileMenu.classList.add('hidden');
    });
});

// Header Style Change on Scroll
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow and background when scrolled
    if (currentScroll > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for Fade-in Animations
const fadeInSections = document.querySelectorAll('.fade-in-section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in sections
fadeInSections.forEach(section => {
    fadeInObserver.observe(section);
});

// Active Navigation Link Highlight - Dark Theme
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-purple-400');
                link.classList.add('text-gray-300');
            });

            // Add active class to current section link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.remove('text-gray-300');
                activeLink.classList.add('text-purple-400');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll check
    highlightNavLink();

    // Add stagger delay to skill cards
    const skillCards = document.querySelectorAll('#skills .fade-in-section');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger delay to project cards
    const projectCards = document.querySelectorAll('#projects .fade-in-section');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add stagger delay to contact cards
    const contactCards = document.querySelectorAll('#contact .fade-in-section');
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Typing Effect for Hero Section (Optional Enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Parallax Effect for Hero Section (Subtle)
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        // Apply subtle parallax to grid pattern
        const gridPattern = hero.querySelector('.grid-pattern');
        if (gridPattern) {
            gridPattern.style.transform = `translateY(${rate * 0.5}px)`;
        }
    }
});

// Mouse Move Effect for Hero Section (Subtle glow following cursor)
const heroSection = document.getElementById('hero');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        heroSection.style.setProperty('--mouse-x', `${x}px`);
        heroSection.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Demo Popup for NEMO project
function showDemoPopup(event) {
    event.preventDefault();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center';
    overlay.id = 'demo-popup-overlay';

    // Create popup
    overlay.innerHTML = `
        <div class="bg-dark-secondary border border-gray-700 rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div class="w-16 h-16 mx-auto mb-4 bg-yellow-900/30 rounded-full flex items-center justify-center">
                <i class="fas fa-exclamation-triangle text-yellow-400 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Service Temporarily Unavailable</h3>
            <p class="text-gray-400 mb-6">
                The live demo is currently suspended due to budget constraints.
                Please check the GitHub repository for more details.
            </p>
            <button onclick="closeDemoPopup()" class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeDemoPopup();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', handleEscKey);
}

function closeDemoPopup() {
    const overlay = document.getElementById('demo-popup-overlay');
    if (overlay) {
        overlay.remove();
    }
    document.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeDemoPopup();
        closeVideoPopup();
    }
}

// Video Popup for NEMO project demo
function showVideoPopup(event) {
    event.preventDefault();

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    overlay.id = 'video-popup-overlay';

    overlay.innerHTML = `
        <div class="relative w-full max-w-4xl">
            <button onclick="closeVideoPopup()" class="absolute -top-10 right-0 text-white hover:text-purple-400 transition-colors">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <video controls autoplay class="w-full max-h-[80vh] rounded-xl shadow-2xl">
                <source src="assets/videos/project1.MP4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeVideoPopup();
        }
    });

    document.addEventListener('keydown', handleEscKey);
}

function closeVideoPopup() {
    const overlay = document.getElementById('video-popup-overlay');
    if (overlay) {
        const video = overlay.querySelector('video');
        if (video) video.pause();
        overlay.remove();
    }
}

// Video Popup for CSE 316 project demo
function showVideoPopup2(event) {
    event.preventDefault();

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    overlay.id = 'video-popup-overlay';

    overlay.innerHTML = `
        <div class="relative w-full max-w-4xl">
            <button onclick="closeVideoPopup()" class="absolute -top-10 right-0 text-white hover:text-purple-400 transition-colors">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <video controls autoplay playsinline class="w-full max-h-[80vh] rounded-xl shadow-2xl">
                <source src="assets/videos/project2.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeVideoPopup();
        }
    });

    document.addEventListener('keydown', handleEscKey);
}

// Video Popup for Biz-News project demo
function showVideoPopup3(event) {
    event.preventDefault();

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    overlay.id = 'video-popup-overlay';

    overlay.innerHTML = `
        <div class="relative w-full max-w-4xl">
            <button onclick="closeVideoPopup()" class="absolute -top-10 right-0 text-white hover:text-orange-400 transition-colors">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <video controls autoplay playsinline class="w-full max-h-[80vh] rounded-xl shadow-2xl">
                <source src="assets/videos/project3.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeVideoPopup();
        }
    });

    document.addEventListener('keydown', handleEscKey);
}
